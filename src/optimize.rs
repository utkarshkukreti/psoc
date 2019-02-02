use escodegen as j;
use escodegen::g;

pub fn optimize(mut expr: j::Expr) -> j::Expr {
    loop {
        let new_expr = optimize_once(expr.clone());
        if new_expr == expr {
            return new_expr;
        }
        expr = new_expr;
    }
}

fn optimize_once(expr: j::Expr) -> j::Expr {
    walk(expr, |expr| {
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
    })
}

fn walk(mut expr: j::Expr, mut f: impl FnMut(&mut j::Expr) -> Option<j::Expr>) -> j::Expr {
    j::walk::walk_expr_mut(
        &mut expr,
        &mut |_| (),
        &mut |_| (),
        &mut |expr| {
            if let Some(new) = f(expr) {
                *expr = new;
            }
        },
        &mut |_| (),
    );
    expr
}
