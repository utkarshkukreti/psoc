use escodegen as j;
use escodegen::g;
use purescript_corefn as p;
use std::collections::{HashMap, HashSet};

#[derive(Default)]
pub struct Compiler {
    map: HashMap<String, j::Expr>,
}

impl Compiler {
    fn compile(mut self, modules: &[p::Module], entry: &str) -> String {
        for module in modules {
            each_bind(&module.decls, |bind| self.compile_bind(module, bind));
        }

        assert!(self.map.contains_key(entry));
        let mut used = Vec::new();
        let mut stack = vec![entry.to_string()];
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
        let mut done = HashSet::new();
        for var in &used {
            if done.contains(&var) {
                continue;
            }
            done.insert(var);
            string += &format!("var {} = {};\n", var, self.map[var]);
        }
        string
    }

    fn compile_bind(&mut self, module: &p::Module, bind: &p::Bind) {
        let name = module.name.join("_") + "_" + &bind.identifier;
        let expr = self.compile_expression(&bind.expression);
        self.map.insert(name, expr);
    }

    fn compile_expression(&mut self, expression: &p::Expression) -> j::Expr {
        use p::Expression::*;
        match expression {
            Abs { argument, body, .. } => g::function(
                Some(argument.clone()),
                vec![g::return_(Some(self.compile_expression(body)))],
            ),
            App {
                abstraction,
                argument,
                ..
            } => g::call(
                self.compile_expression(abstraction),
                Some(self.compile_expression(argument)),
            ),
            Accessor {
                expression, field, ..
            } => g::member(
                self.compile_expression(expression),
                g::string(field.clone()),
            ),
            Literal { value, .. } => self.compile_literal(value),
            Var { value, .. } => g::var(qid(value)),
            _ => unimplemented!("expression: {:?}", expression),
        }
    }

    fn compile_literal(&mut self, literal: &p::Literal) -> j::Expr {
        use p::Literal::*;

        match literal {
            Array { value } => g::array(value.iter().map(|v| self.compile_expression(v))),
            Boolean { value } => g::bool(*value),
            Char { value } => g::string(Some(*value).into_iter().collect::<std::string::String>()),
            Int { value } => g::number(*value as f64),
            Number { value } => g::number(*value),
            Object { value } => g::object(
                value
                    .iter()
                    .map(|(k, v)| (k.clone(), self.compile_expression(v))),
            ),
            String { value } => g::string(value.clone()),
        }
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

pub fn qid(qualified: &p::Qualified) -> String {
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

pub fn compile(modules: &[p::Module], entry: &str) -> String {
    Compiler::default().compile(modules, &entry.replace(".", "_"))
}
