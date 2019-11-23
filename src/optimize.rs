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
            if let j::Expr::Function(args, stmts) = expr {
                if let [j::Stmt::Block(ref stmts)] = stmts.as_slice() {
                    if let [stmt] = stmts.as_slice() {
                        return Some(j::Expr::Function(args.clone(), vec![stmt.clone()]));
                    }
                }
            }

            if let j::Expr::Function(args, stmts) = expr {
                let stmt = g::block(stmts.clone());
                let new_stmt = optimize_stmt(stmt.clone());
                if stmt != new_stmt {
                    return Some(j::Expr::Function(args.clone(), vec![new_stmt]));
                }
            }
            // REWRITE:
            // (function() { return $expr; })()
            // TO:
            // $expr
            if let j::Expr::Call(ref expr, ref args) = expr {
                if args.len() == 0 {
                    if let j::Expr::Function(ref args__, ref stmts) = **expr {
                        assert!(args__.len() == 0);
                        if let [return_] = stmts.as_slice() {
                            if let j::Stmt::Return(Some(expr)) = return_ {
                                return Some(expr.clone());
                            }
                        }
                    }
                }
            }
            None
        },
        |stmt| Some(optimize_stmt(stmt.clone())),
    )
}

fn optimize_stmt(mut stmt: j::Stmt) -> j::Stmt {
    loop {
        let new_stmt = optimize_stmt_once(stmt.clone());
        if new_stmt == stmt {
            return new_stmt;
        }
        stmt = new_stmt;
    }
}

fn optimize_stmt_once(stmt: j::Stmt) -> j::Stmt {
    // REWRITE:
    // { var x = y; return x; }
    // TO:
    // return y;
    if let j::Stmt::Block(ref stmts) = stmt {
        if let [let_, return_] = stmts.as_slice() {
            if let j::Stmt::Var(name, Some(expr)) = let_ {
                if let j::Stmt::Return(Some(j::Expr::Var(name_))) = return_ {
                    if name == name_ {
                        return g::return_(Some(expr.clone()));
                    }
                }
            }
        }
    }
    // REWRITE:
    // return (function() {
    //   ...stmts
    // })();
    // TO:
    // ...stmts
    // }
    if let j::Stmt::Return(Some(ref expr)) = stmt {
        if let j::Expr::Call(ref expr, ref args_) = expr {
            if args_.len() == 0 {
                if let j::Expr::Function(ref args__, ref stmts) = **expr {
                    assert!(args__.len() == 0);
                    return g::block(stmts.clone());
                }
            }
        }
    }
    stmt
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
