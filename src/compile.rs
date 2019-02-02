use crate::{optimize, Opt};
use escodegen as j;
use escodegen::g;
use purescript_corefn as p;
use std::collections::{HashMap, HashSet};

#[derive(Default)]
struct Compiler {
    map: HashMap<String, j::Expr>,
    constructors: HashMap<String, Constructor>,
    gen: u32,
}

#[derive(Default, Debug)]
struct Constructor {
    variants: Vec<Variant>,
}

enum ConstructorRepr {
    Unboxed,
    OnlyTag(u32),
    WithTag(u32),
    WithoutTag,
}

#[derive(Default, Debug)]
struct Variant {
    name: String,
    fields: Vec<String>,
}

impl Constructor {
    fn variant(&self, name: &str) -> &Variant {
        self.variants.iter().find(|v| v.name == name).unwrap()
    }

    fn index(&self, name: &str) -> u32 {
        self.variants.iter().position(|v| v.name == name).unwrap() as u32
    }

    fn tag(&self, name: &str) -> Option<u32> {
        // Tag is only necessary when there are more than 1 variants with fields.
        if self.variants.iter().filter(|v| v.fields.len() > 0).count() == 1 {
            None
        } else {
            Some(self.index(name))
        }
    }

    fn unboxed(&self) -> bool {
        // No boxing if there's only one variant and only one field.
        self.variants.len() == 1 && self.variants[0].fields.len() == 1
    }

    fn repr(&self, name: &str) -> ConstructorRepr {
        use ConstructorRepr::*;
        let variant = self.variant(name);
        if variant.fields.is_empty() {
            OnlyTag(self.index(name))
        } else if self.unboxed() {
            Unboxed
        } else if let Some(tag) = self.tag(name) {
            WithTag(tag)
        } else {
            WithoutTag
        }
    }
}

impl Compiler {
    fn compile(mut self, modules: &[p::Module], opt: &Opt) -> String {
        let entry = opt.entry.replace(".", "_");

        for module in modules {
            each_bind(&module.decls, |bind| {
                self.collect_constructors(module, bind)
            });
        }

        for module in modules {
            each_bind(&module.decls, |bind| self.compile_bind(module, bind));
        }

        assert!(self.map.contains_key(&entry));
        let mut used = Vec::new();
        let mut stack = vec![entry.clone()];
        while let Some(var) = stack.pop() {
            if !self.map.contains_key(&*var) {
                continue;
            }
            let expr = &self.map[&var];
            used.push(var);
            j::walk::walk_expr(
                expr,
                &mut |_| {},
                &mut |_| {},
                &mut |expr| match expr {
                    j::Expr::Var(var) => {
                        stack.push(var.clone());
                    }
                    _ => {}
                },
                &mut |_| {},
            );
        }
        used.reverse();

        let mut string = String::new();

        string += "(function() {";

        for module in modules {
            if !module.foreign.is_empty() {
                string += &format!(
                    "var {}_$foreign = require('./{}/{}/foreign.js');\n",
                    module.name.join("_"),
                    opt.input,
                    &module.name.join(".")
                );
            }
        }

        let mut done = HashSet::new();
        for var in &used {
            if done.contains(&var) {
                continue;
            }
            done.insert(var);
            string += &format!(
                "var {} = {};\n",
                var,
                optimize::optimize(self.map[var].clone())
            );
        }

        string += &format!("return {};\n", entry);
        string += "})()();";
        string
    }

    fn collect_constructors(&mut self, module: &p::Module, bind: &p::Bind) {
        match &bind.expression {
            p::Expression::Abs {
                argument,
                annotation,
                ..
            } if annotation
                .meta
                .as_ref()
                .map_or(false, |m| *m == p::Meta::Newtype) =>
            {
                let type_name = id(&module.name, &bind.identifier);
                self.constructors
                    .entry(type_name)
                    .or_default()
                    .variants
                    .push(Variant {
                        name: bind.identifier.clone(),
                        fields: vec![argument.clone()],
                    });
            }
            p::Expression::Constructor {
                name,
                type_,
                fields,
                ..
            } => {
                let type_name = id(&module.name, &type_);
                self.constructors
                    .entry(type_name)
                    .or_default()
                    .variants
                    .push(Variant {
                        name: name.clone(),
                        fields: fields.clone(),
                    });
            }
            _ => {}
        }
    }

    fn compile_bind(&mut self, module: &p::Module, bind: &p::Bind) {
        let name = module.name.join("_") + "_" + &bind.identifier;
        let expr = self.compile_expression(module, &bind.expression);
        self.map.insert(name, expr);
    }

    fn compile_expression(&mut self, module: &p::Module, expression: &p::Expression) -> j::Expr {
        use p::Expression::*;
        match expression {
            Abs { argument, body, .. } => g::function(
                Some(argument.clone()),
                vec![g::return_(Some(self.compile_expression(module, body)))],
            ),
            App {
                abstraction,
                argument,
                ..
            } => g::call(
                self.compile_expression(module, abstraction),
                Some(self.compile_expression(module, argument)),
            ),
            Accessor {
                expression, field, ..
            } => g::member(
                self.compile_expression(module, expression),
                g::string(field.clone()),
            ),
            Case {
                alternatives,
                expressions,
                ..
            } => {
                let mut stmts = Vec::new();
                let mut vars = Vec::new();
                for expression in expressions {
                    let compiled = self.compile_expression(module, expression);
                    if let j::Expr::Var(name) = compiled {
                        vars.push(name.clone());
                    } else {
                        let var = self.gen("m_");
                        stmts.push(g::let_(var.clone(), Some(compiled)));
                        vars.push(var);
                    }
                }
                for alternative in alternatives {
                    self.compile_alternative(module, alternative, &vars, &mut stmts);
                }
                // TODO: Handle No Match
                g::call(g::function::<_, String>(None, stmts), None)
            }
            Constructor {
                name,
                type_,
                fields,
                ..
            } => {
                use ConstructorRepr::*;
                let constructor = &self.constructors[&id(&module.name, type_)];
                let tag = match constructor.repr(&name) {
                    Unboxed => {
                        return g::function(
                            Some(fields[0].clone()),
                            vec![g::return_(Some(g::var(fields[0].clone())))],
                        );
                    }
                    OnlyTag(tag) => return g::number(tag as f64),
                    WithTag(tag) => Some(tag),
                    WithoutTag => None,
                };
                let expr = g::array(
                    tag.map(|n| g::number(n as f64))
                        .into_iter()
                        .chain(fields.iter().map(|field| g::var(field.clone()))),
                );
                fields.iter().rev().fold(expr, |acc, x| {
                    g::function(Some(x.clone()), vec![g::return_(Some(acc))])
                })
            }
            Let {
                expression, binds, ..
            } => {
                let mut stmts = Vec::new();
                each_bind(&binds, |bind| {
                    stmts.push(g::let_(
                        bind.identifier.clone(),
                        Some(self.compile_expression(module, &bind.expression)),
                    ));
                });
                stmts.push(g::return_(Some(
                    self.compile_expression(module, expression),
                )));
                g::call(g::function::<_, String>(None, stmts), None)
            }
            Literal { value, .. } => self.compile_literal(module, value),
            Var { value, annotation } => {
                let is_foreign = annotation
                    .meta
                    .as_ref()
                    .map_or(false, |m| *m == p::Meta::Foreign);

                if is_foreign {
                    g::member(
                        g::var(
                            value.module.as_ref().unwrap_or(&module.name).join("_") + "_$foreign",
                        ),
                        g::string(value.identifier.clone()),
                    )
                } else {
                    g::var(qid(value))
                }
            }
        }
    }

    fn compile_alternative(
        &mut self,
        module: &p::Module,
        alternative: &p::Alternative,
        vars: &[String],
        stmts: &mut Vec<j::Stmt>,
    ) {
        match alternative {
            p::Alternative::Guarded { .. } => unimplemented!(),
            p::Alternative::Unguarded {
                binders,
                expression,
            } => {
                let mut when = Vec::new();
                let mut then = Vec::new();
                for (binder, var) in binders.iter().zip(vars) {
                    self.compile_binder(binder, g::var(var.clone()), &mut when, &mut then);
                }
                then.push(g::return_(Some(
                    self.compile_expression(module, expression),
                )));
                let then = if then.len() == 1 {
                    then.remove(0)
                } else {
                    g::block(then)
                };
                if when.is_empty() {
                    stmts.push(then)
                } else {
                    let first = when.remove(0);
                    let when = when
                        .into_iter()
                        .fold(first, |acc, x| g::binary(g::And, acc, x));
                    stmts.push(g::if_(when, then, None));
                }
            }
        }
    }

    fn compile_binder(
        &mut self,
        binder: &p::Binder,
        var: j::Expr,
        when: &mut Vec<j::Expr>,
        stmts: &mut Vec<j::Stmt>,
    ) {
        match binder {
            p::Binder::Constructor {
                constructor,
                type_,
                binders,
                ..
            } => {
                use ConstructorRepr::*;
                let name = &constructor.identifier;
                let constructor = &self.constructors[&qid(&type_)];
                match constructor.repr(name) {
                    Unboxed => {
                        assert!(binders.len() == 1);
                        self.compile_binder(&binders[0], var, when, stmts);
                    }
                    OnlyTag(tag) => {
                        assert!(binders.len() == 0);
                        when.push(g::binary(g::Eqq, var, g::number(tag as f64)));
                    }
                    WithTag(tag) => {
                        when.push(g::binary(
                            g::Eqq,
                            g::member(var.clone(), g::number(0.0)),
                            g::number(tag as f64),
                        ));
                        for (index, binder) in binders.iter().enumerate() {
                            self.compile_binder(
                                binder,
                                g::member(var.clone(), g::number(index as f64 + 1.0)),
                                when,
                                stmts,
                            );
                        }
                    }
                    WithoutTag => {
                        when.push(g::binary(
                            g::NotEqq,
                            g::unary(g::UnaryOperator::Typeof, var.clone()),
                            g::string("number"),
                        ));
                        for (index, binder) in binders.iter().enumerate() {
                            self.compile_binder(
                                binder,
                                g::member(var.clone(), g::number(index as f64)),
                                when,
                                stmts,
                            );
                        }
                    }
                }
            }
            p::Binder::Literal { literal } => {
                let mut eq = |expr| when.push(g::binary(g::Eqq, var.clone(), expr));
                match literal {
                    p::LiteralBinder::Array { value } => {
                        when.push(g::binary(
                            g::Eqq,
                            g::member(var.clone(), g::string("length")),
                            g::number(value.len() as f64),
                        ));
                        for (index, binder) in value.iter().enumerate() {
                            self.compile_binder(
                                binder,
                                g::member(var.clone(), g::number(index as f64)),
                                when,
                                stmts,
                            );
                        }
                    }
                    p::LiteralBinder::Boolean { value } => {
                        eq(g::bool(*value));
                    }
                    p::LiteralBinder::Char { value } => {
                        eq(g::string(Some(value).into_iter().collect::<String>()));
                    }
                    p::LiteralBinder::Int { value } => {
                        eq(g::number(*value as f64));
                    }
                    p::LiteralBinder::Number { value } => {
                        eq(g::number(*value));
                    }
                    p::LiteralBinder::Object { value } => {
                        for (field, binder) in value {
                            self.compile_binder(
                                binder,
                                g::member(var.clone(), g::string(field.clone())),
                                when,
                                stmts,
                            );
                        }
                    }
                    p::LiteralBinder::String { value } => {
                        eq(g::string(value.clone()));
                    }
                }
            }
            p::Binder::Named { identifier, binder } => {
                self.compile_binder(binder, var.clone(), when, stmts);
                stmts.push(g::let_(identifier.clone(), Some(var)));
            }
            p::Binder::Null {} => {}
            p::Binder::Var { identifier } => {
                stmts.push(g::let_(identifier.clone(), Some(var)));
            }
        }
    }

    fn compile_literal(&mut self, module: &p::Module, literal: &p::Literal) -> j::Expr {
        use p::Literal::*;

        match literal {
            Array { value } => g::array(value.iter().map(|v| self.compile_expression(module, v))),
            Boolean { value } => g::bool(*value),
            Char { value } => g::string(Some(*value).into_iter().collect::<std::string::String>()),
            Int { value } => g::number(*value as f64),
            Number { value } => g::number(*value),
            Object { value } => g::object(
                value
                    .iter()
                    .map(|(k, v)| (k.clone(), self.compile_expression(module, v))),
            ),
            String { value } => g::string(value.clone()),
        }
    }

    fn gen(&mut self, prefix: &str) -> String {
        self.gen += 1;
        format!("{}{}", prefix, self.gen - 1)
    }
}

fn each_bind(decls: &[p::Decl], mut f: impl FnMut(&p::Bind)) {
    for decl in decls {
        match decl {
            p::Decl::NonRec(bind) => f(bind),
            p::Decl::Rec { binds } => {
                for bind in binds {
                    f(bind)
                }
            }
        }
    }
}

fn qid(qualified: &p::Qualified) -> String {
    id(
        qualified.module.as_ref().unwrap_or(&Vec::new()),
        &qualified.identifier,
    )
}

fn id(module: &[String], identifier: &str) -> String {
    (if module.is_empty() {
        String::new()
    } else {
        module.join("_") + "_"
    }) + &identifier
}

pub fn compile(modules: &[p::Module], opt: &Opt) -> String {
    Compiler::default().compile(modules, opt)
}
