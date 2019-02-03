use escodegen as j;
use escodegen::g;
use std::collections::HashMap;

pub fn optimize(map: &mut HashMap<String, j::Expr>) {
    for (_, expr) in map {
        *expr = optimize_expr(expr.clone());
    }
}

fn optimize_expr(mut expr: j::Expr) -> j::Expr {
    loop {
        let new_expr = optimize_expr_once(expr.clone());
        if new_expr == expr {
            return new_expr;
        }
        expr = new_expr;
    }
}

fn optimize_expr_once(expr: j::Expr) -> j::Expr {
    walk(
        expr,
        |expr| {
            // REWRITE:
            // function(...args) {
            //   ...stmts1
            //   return (function() {
            //     ...stmts2
            //   })();
            // }
            // TO:
            // function(...args) {
            //   ...stmts1
            //   ...stmts2
            // }
            if let j::Expr::Function(ref args, ref stmts) = expr {
                if let Some(j::Stmt::Return(Some(ref expr))) = stmts.last() {
                    if let j::Expr::Call(ref expr, ref args_) = expr {
                        if args_.len() == 0 {
                            if let j::Expr::Function(ref args__, ref stmts_) = **expr {
                                assert!(args__.len() == 0);
                                let mut new_stmts = stmts.clone();
                                new_stmts.pop();
                                new_stmts.extend(stmts_.clone());
                                return Some(g::function(args.clone(), new_stmts));
                            }
                        }
                    }
                }
            }
            None
        },
        |stmt| {
            // REWRITE:
            // { var x = y; return x; }
            // TO:
            // return y;
            if let j::Stmt::Block(stmts) = stmt {
                if let [let_, return_] = stmts.as_slice() {
                    if let j::Stmt::Var(name, Some(expr)) = let_ {
                        if let j::Stmt::Return(Some(j::Expr::Var(name_))) = return_ {
                            if name == name_ {
                                return Some(g::return_(Some(expr.clone())));
                            }
                        }
                    }
                }
            }
            None
        },
    )
}

fn walk(
    mut expr: j::Expr,
    mut rewrite_expr: impl FnMut(&mut j::Expr) -> Option<j::Expr>,
    mut rewrite_stmt: impl FnMut(&mut j::Stmt) -> Option<j::Stmt>,
) -> j::Expr {
    j::walk::walk_expr_mut(
        &mut expr,
        &mut |stmt| {
            if let Some(new) = rewrite_stmt(stmt) {
                *stmt = new;
            }
        },
        &mut |_| (),
        &mut |expr| {
            if let Some(new) = rewrite_expr(expr) {
                *expr = new;
            }
        },
        &mut |_| (),
    );
    expr
}
