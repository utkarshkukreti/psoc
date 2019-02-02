use escodegen as j;
use escodegen::g;

pub fn optimize(expr: j::Expr) -> j::Expr {
    walk(expr, |expr| {
        // REWRITE:
        // function(...args) {
        //   return (function() {
        //     ...stmts
        //   })();
        // }
        // TO:
        // function(...args) {
        //   ...stmts
        // }
        if let j::Expr::Function(ref args, ref stmts) = expr {
            if stmts.len() == 1 {
                if let j::Stmt::Return(Some(ref expr)) = stmts[0] {
                    if let j::Expr::Call(ref expr, ref args_) = expr {
                        if args_.len() == 0 {
                            if let j::Expr::Function(ref args__, ref stmts) = **expr {
                                assert!(args__.len() == 0);
                                return Some(g::function(args.clone(), stmts.clone()));
                            }
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
