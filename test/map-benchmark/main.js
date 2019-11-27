var Effect$Console$foreign = require('./output/Effect.Console/foreign.js');
var Data$Array$foreign = require('./output/Data.Array/foreign.js');
var Data$Ord$foreign = require('./output/Data.Ord/foreign.js');
var Data$Ring$foreign = require('./output/Data.Ring/foreign.js');
var Data$Show$foreign = require('./output/Data.Show/foreign.js');
var Data$Semiring$foreign = require('./output/Data.Semiring/foreign.js');
var Data$Eq$foreign = require('./output/Data.Eq/foreign.js');
var Data$Foldable$foreign = require('./output/Data.Foldable/foreign.js');
var Data$Show$Show = function(show) {
  return { show: show };
};
var Data$Show$showInt = Data$Show$Show(Data$Show$foreign.showIntImpl);
var Data$Show$show = function(dict) {
  return dict.show;
};
var Data$Eq$Eq = function(eq) {
  return { eq: eq };
};
var Data$Eq$eqInt = Data$Eq$Eq(Data$Eq$foreign.eqIntImpl);
var Data$Semigroup$append = function(dict) {
  return dict.append;
};
var Data$Semiring$Semiring = function(add) {
  return function(mul) {
    return function(one) {
      return function(zero) {
        return { add: add, mul: mul, one: one, zero: zero };
      };
    };
  };
};
var Data$Semiring$semiringInt = Data$Semiring$Semiring(
  Data$Semiring$foreign.intAdd,
)(Data$Semiring$foreign.intMul)(1)(0);
var Data$Semiring$add = function(dict) {
  return dict.add;
};
var Data$Ring$Ring = function(Semiring0) {
  return function(sub) {
    return { Semiring0: Semiring0, sub: sub };
  };
};
var Data$Ring$sub = function(dict) {
  return dict.sub;
};
var Data$Ring$ringInt = Data$Ring$Ring(function($__unused) {
  return Data$Semiring$semiringInt;
})(Data$Ring$foreign.intSub);
var Data$Ord$Ord = function(Eq0) {
  return function(compare) {
    return { Eq0: Eq0, compare: compare };
  };
};
var Data$Ord$ordInt = Data$Ord$Ord(function($__unused) {
  return Data$Eq$eqInt;
})(Data$Ord$foreign.ordIntImpl(0)(2)(1));
var Data$Ord$compare = function(dict) {
  return dict.compare;
};
var Data$Function$apply = function(f) {
  return function(x) {
    return f(x);
  };
};
var Data$Monoid$mempty = function(dict) {
  return dict.mempty;
};
var Data$Foldable$Foldable = function(foldMap) {
  return function(foldl) {
    return function(foldr) {
      return { foldMap: foldMap, foldl: foldl, foldr: foldr };
    };
  };
};
var Data$Foldable$foldr = function(dict) {
  return dict.foldr;
};
var Data$Foldable$foldl = function(dict) {
  return dict.foldl;
};
var Data$Foldable$foldMapDefaultR = function(dictFoldable) {
  return function(dictMonoid) {
    return function(f) {
      return Data$Foldable$foldr(dictFoldable)(function(x) {
        return function(acc) {
          return Data$Semigroup$append(dictMonoid.Semigroup0(undefined))(f(x))(
            acc,
          );
        };
      })(Data$Monoid$mempty(dictMonoid));
    };
  };
};
var Data$Foldable$foldableArray = Data$Foldable$Foldable(function(dictMonoid) {
  return Data$Foldable$foldMapDefaultR(Data$Foldable$foldableArray)(dictMonoid);
})(Data$Foldable$foreign.foldlArray)(Data$Foldable$foreign.foldrArray);
var Data$List$Types$Cons = function(value0) {
  return function(value1) {
    return [value0, value1];
  };
};
var Data$Map$Internal$Two = function(value0) {
  return function(value1) {
    return function(value2) {
      return function(value3) {
        return [1, value0, value1, value2, value3];
      };
    };
  };
};
var Data$Map$Internal$Three = function(value0) {
  return function(value1) {
    return function(value2) {
      return function(value3) {
        return function(value4) {
          return function(value5) {
            return function(value6) {
              return [
                2,
                value0,
                value1,
                value2,
                value3,
                value4,
                value5,
                value6,
              ];
            };
          };
        };
      };
    };
  };
};
var Data$Map$Internal$TwoLeft = function(value0) {
  return function(value1) {
    return function(value2) {
      return [0, value0, value1, value2];
    };
  };
};
var Data$Map$Internal$TwoRight = function(value0) {
  return function(value1) {
    return function(value2) {
      return [1, value0, value1, value2];
    };
  };
};
var Data$Map$Internal$ThreeLeft = function(value0) {
  return function(value1) {
    return function(value2) {
      return function(value3) {
        return function(value4) {
          return function(value5) {
            return [2, value0, value1, value2, value3, value4, value5];
          };
        };
      };
    };
  };
};
var Data$Map$Internal$ThreeMiddle = function(value0) {
  return function(value1) {
    return function(value2) {
      return function(value3) {
        return function(value4) {
          return function(value5) {
            return [3, value0, value1, value2, value3, value4, value5];
          };
        };
      };
    };
  };
};
var Data$Map$Internal$ThreeRight = function(value0) {
  return function(value1) {
    return function(value2) {
      return function(value3) {
        return function(value4) {
          return function(value5) {
            return [4, value0, value1, value2, value3, value4, value5];
          };
        };
      };
    };
  };
};
var Data$Map$Internal$KickUp = function(value0) {
  return function(value1) {
    return function(value2) {
      return function(value3) {
        return [value0, value1, value2, value3];
      };
    };
  };
};
var Data$Map$Internal$size = function(v) {
  if (v === 0) return 0;
  if (v[0] === 1) {
    var m1 = v[1];
    var m2 = v[4];
    return Data$Semiring$add(Data$Semiring$semiringInt)(
      Data$Semiring$add(Data$Semiring$semiringInt)(1)(
        Data$Map$Internal$size(m1),
      ),
    )(Data$Map$Internal$size(m2));
  }
  if (v[0] === 2) {
    var m1 = v[1];
    var m2 = v[4];
    var m3 = v[7];
    return Data$Semiring$add(Data$Semiring$semiringInt)(
      Data$Semiring$add(Data$Semiring$semiringInt)(
        Data$Semiring$add(Data$Semiring$semiringInt)(2)(
          Data$Map$Internal$size(m1),
        ),
      )(Data$Map$Internal$size(m2)),
    )(Data$Map$Internal$size(m3));
  }
};
var Data$Map$Internal$fromZipper = function(dictOrd) {
  return function(v) {
    return function(tree) {
      if (v === 0) return tree;
      if (typeof v !== 'number') {
        var x = v[0];
        var ctx = v[1];
        var tree1 = tree;
        {
          if (x[0] === 0) {
            var k1 = x[1];
            var v1 = x[2];
            var right = x[3];
            return Data$Map$Internal$fromZipper(dictOrd)(ctx)(
              Data$Map$Internal$Two(tree1)(k1)(v1)(right),
            );
          }
          if (x[0] === 1) {
            var left = x[1];
            var k1 = x[2];
            var v1 = x[3];
            return Data$Map$Internal$fromZipper(dictOrd)(ctx)(
              Data$Map$Internal$Two(left)(k1)(v1)(tree1),
            );
          }
          if (x[0] === 2) {
            var k1 = x[1];
            var v1 = x[2];
            var mid = x[3];
            var k2 = x[4];
            var v2 = x[5];
            var right = x[6];
            return Data$Map$Internal$fromZipper(dictOrd)(ctx)(
              Data$Map$Internal$Three(tree1)(k1)(v1)(mid)(k2)(v2)(right),
            );
          }
          if (x[0] === 3) {
            var left = x[1];
            var k1 = x[2];
            var v1 = x[3];
            var k2 = x[4];
            var v2 = x[5];
            var right = x[6];
            return Data$Map$Internal$fromZipper(dictOrd)(ctx)(
              Data$Map$Internal$Three(left)(k1)(v1)(tree1)(k2)(v2)(right),
            );
          }
          if (x[0] === 4) {
            var left = x[1];
            var k1 = x[2];
            var v1 = x[3];
            var mid = x[4];
            var k2 = x[5];
            var v2 = x[6];
            return Data$Map$Internal$fromZipper(dictOrd)(ctx)(
              Data$Map$Internal$Three(left)(k1)(v1)(mid)(k2)(v2)(tree1),
            );
          }
        }
      }
    };
  };
};
var Data$Map$Internal$insert = function(dictOrd) {
  return function(k) {
    return function(v) {
      var up = function(v1) {
        return function(v2) {
          if (v1 === 0) {
            var left = v2[0];
            var k$prime = v2[1];
            var v$prime = v2[2];
            var right = v2[3];
            return Data$Map$Internal$Two(left)(k$prime)(v$prime)(right);
          }
          if (typeof v1 !== 'number') {
            var x = v1[0];
            var ctx = v1[1];
            var kup = v2;
            {
              if (x[0] === 0) {
                var k1 = x[1];
                var v11 = x[2];
                var right = x[3];
                var left = kup[0];
                var k$prime = kup[1];
                var v$prime = kup[2];
                var mid = kup[3];
                return Data$Map$Internal$fromZipper(dictOrd)(ctx)(
                  Data$Map$Internal$Three(left)(k$prime)(v$prime)(mid)(k1)(v11)(
                    right,
                  ),
                );
              }
              if (x[0] === 1) {
                var left = x[1];
                var k1 = x[2];
                var v11 = x[3];
                var mid = kup[0];
                var k$prime = kup[1];
                var v$prime = kup[2];
                var right = kup[3];
                return Data$Map$Internal$fromZipper(dictOrd)(ctx)(
                  Data$Map$Internal$Three(left)(k1)(v11)(mid)(k$prime)(v$prime)(
                    right,
                  ),
                );
              }
              if (x[0] === 2) {
                var k1 = x[1];
                var v11 = x[2];
                var c = x[3];
                var k2 = x[4];
                var v21 = x[5];
                var d = x[6];
                var a = kup[0];
                var k$prime = kup[1];
                var v$prime = kup[2];
                var b = kup[3];
                return up(ctx)(
                  Data$Map$Internal$KickUp(
                    Data$Map$Internal$Two(a)(k$prime)(v$prime)(b),
                  )(k1)(v11)(Data$Map$Internal$Two(c)(k2)(v21)(d)),
                );
              }
              if (x[0] === 3) {
                var a = x[1];
                var k1 = x[2];
                var v11 = x[3];
                var k2 = x[4];
                var v21 = x[5];
                var d = x[6];
                var b = kup[0];
                var k$prime = kup[1];
                var v$prime = kup[2];
                var c = kup[3];
                return up(ctx)(
                  Data$Map$Internal$KickUp(
                    Data$Map$Internal$Two(a)(k1)(v11)(b),
                  )(k$prime)(v$prime)(Data$Map$Internal$Two(c)(k2)(v21)(d)),
                );
              }
              if (x[0] === 4) {
                var a = x[1];
                var k1 = x[2];
                var v11 = x[3];
                var b = x[4];
                var k2 = x[5];
                var v21 = x[6];
                var c = kup[0];
                var k$prime = kup[1];
                var v$prime = kup[2];
                var d = kup[3];
                return up(ctx)(
                  Data$Map$Internal$KickUp(
                    Data$Map$Internal$Two(a)(k1)(v11)(b),
                  )(k2)(v21)(Data$Map$Internal$Two(c)(k$prime)(v$prime)(d)),
                );
              }
            }
          }
        };
      };
      var comp = Data$Ord$compare(dictOrd);
      var down = function(ctx) {
        return function(v1) {
          if (v1 === 0) {
            var ctx1 = ctx;
            return up(ctx1)(Data$Map$Internal$KickUp(0)(k)(v)(0));
          }
          if (v1[0] === 1) {
            var ctx1 = ctx;
            var left = v1[1];
            var k1 = v1[2];
            var v11 = v1[3];
            var right = v1[4];
            {
              var v2 = comp(k)(k1);
              {
                if (v2 === 2)
                  return Data$Map$Internal$fromZipper(dictOrd)(ctx1)(
                    Data$Map$Internal$Two(left)(k)(v)(right),
                  );
                if (v2 === 0)
                  return down(
                    Data$List$Types$Cons(
                      Data$Map$Internal$TwoLeft(k1)(v11)(right),
                    )(ctx1),
                  )(left);
                return down(
                  Data$List$Types$Cons(
                    Data$Map$Internal$TwoRight(left)(k1)(v11),
                  )(ctx1),
                )(right);
              }
            }
          }
          if (v1[0] === 2) {
            var ctx1 = ctx;
            var left = v1[1];
            var k1 = v1[2];
            var v11 = v1[3];
            var mid = v1[4];
            var k2 = v1[5];
            var v2 = v1[6];
            var right = v1[7];
            {
              var v3 = comp(k)(k1);
              {
                if (v3 === 2)
                  return Data$Map$Internal$fromZipper(dictOrd)(ctx1)(
                    Data$Map$Internal$Three(left)(k)(v)(mid)(k2)(v2)(right),
                  );
                {
                  var c1 = v3;
                  {
                    var v4 = comp(k)(k2);
                    var v5 = c1;
                    {
                      if (v4 === 2)
                        return Data$Map$Internal$fromZipper(dictOrd)(ctx1)(
                          Data$Map$Internal$Three(left)(k1)(v11)(mid)(k)(v)(
                            right,
                          ),
                        );
                      if (v5 === 0)
                        return down(
                          Data$List$Types$Cons(
                            Data$Map$Internal$ThreeLeft(k1)(v11)(mid)(k2)(v2)(
                              right,
                            ),
                          )(ctx1),
                        )(left);
                      if (v5 === 1 && v4 === 0)
                        return down(
                          Data$List$Types$Cons(
                            Data$Map$Internal$ThreeMiddle(left)(k1)(v11)(k2)(
                              v2,
                            )(right),
                          )(ctx1),
                        )(mid);
                      return down(
                        Data$List$Types$Cons(
                          Data$Map$Internal$ThreeRight(left)(k1)(v11)(mid)(k2)(
                            v2,
                          ),
                        )(ctx1),
                      )(right);
                    }
                  }
                }
              }
            }
          }
        };
      };
      return down(0);
    };
  };
};
var Main$main = (function() {
  var array = Data$Array$foreign.range(1)(100000);
  var go = function(v) {
    if (v === 0) return 0;
    {
      var n = v;
      {
        var map = Data$Foldable$foldl(Data$Foldable$foldableArray)(function(
          acc,
        ) {
          return function(x) {
            return Data$Map$Internal$insert(Data$Ord$ordInt)(x)(x)(acc);
          };
        })(0)(array);
        return Data$Semiring$add(Data$Semiring$semiringInt)(
          Data$Map$Internal$size(map),
        )(go(Data$Ring$sub(Data$Ring$ringInt)(n)(1)));
      }
    }
  };
  return Data$Function$apply(Effect$Console$foreign.log)(
    Data$Function$apply(Data$Show$show(Data$Show$showInt))(go(50)),
  );
})();
Main$main();
