use escodegen as j;
use escodegen::g;
use std::collections::BTreeMap;

pub fn optimize(map: &mut BTreeMap<String, j::Expr>) {
    let keys = map.keys().cloned().collect::<Vec<_>>();
    for key in keys {
        let value = map[&key].clone();
        let new_expr = optimize_expr(value, map);
        map.insert(key, new_expr);
    }
}

fn optimize_expr(mut expr: j::Expr, map: &mut BTreeMap<String, j::Expr>) -> j::Expr {
    loop {
        let new_expr = optimize_expr_once(expr.clone(), map);
        if new_expr == expr {
            return new_expr;
        }
        expr = new_expr;
    }
}

fn optimize_expr_once(expr: j::Expr, map: &mut BTreeMap<String, j::Expr>) -> j::Expr {
    walk(
        expr,
        |expr| {
            if let j::Expr::Var(name) = expr {
                if let Some(expr) = map.get(name) {
                    if is_simple(expr) {
                        return Some(expr.clone());
                    }
                }
            }

            if let j::Expr::Function(args, stmts) = expr {
                if let [j::Stmt::Block(ref stmts)] = stmts.as_slice() {
                    return Some(j::Expr::Function(args.clone(), stmts.clone()));
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
            // $expr === true
            // TO:
            // $expr
            if let j::Expr::Binary(j::BinaryOperator::Eqq, left, true_) = expr {
                if let j::Expr::Bool(true) = **true_ {
                    return Some(*left.clone());
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
    // REMOVED FOR NOW: This optimization is incorrect if `y` refers to the variable `x` anywhere.
    // E.g. `var x = function() { return x; };`
    // We need to check for that before doing this transformation.
    // UPDATE: Adding this back for values which can't refer to themselves.
    //
    // // REWRITE:
    // // { var x = y; return x; }
    // // TO:
    // // return y;
    if let j::Stmt::Block(ref stmts) = stmt {
        if let [let_, return_] = stmts.as_slice() {
            if let j::Stmt::Var(name, Some(expr)) = let_ {
                if let j::Stmt::Return(Some(j::Expr::Var(name_))) = return_ {
                    if is_simple(expr) && name == name_ {
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

fn is_simple(expr: &j::Expr) -> bool {
    match expr {
        j::Expr::Bool(_)
        | j::Expr::Member(_, _)
        | j::Expr::Number(_)
        | j::Expr::String(_)
        | j::Expr::Undefined
        | j::Expr::Var(_) => true,
        _ => false,
    }
}
