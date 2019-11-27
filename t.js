var Main$foreign = require("./t/output/Main/foreign.js");
var A$array = [1, 2, 3];
var Main$N = function(x) {
  return x;
};
var Main$D7_1 = function(value0) {
  return [0, value0];
};
var Main$D7_2$prime = function(value0) {
  return [1, value0];
};
var Main$D6_1 = function(value0) {
  return [value0];
};
var Main$D5_1 = function(value0) {
  return [value0];
};
var Main$D4_1 = function(value0) {
  return function(value1) {
    return [value0, value1];
  };
};
var Main$D3_1 = function(value0) {
  return value0;
};
var Main$Show = function(show) {
  return { show: show };
};
var Main$void$prime = (function() {
  var $$void = "void";
  return $$void;
})();
var Main$tuple = function(a) {
  return function(b$prime) {
    return { a: a, b: b$prime };
  };
};
var Main$tuplizeA = function(o) {
  var v = o;
  return Object["assign"]({}, v, { a: Main$tuple(o["a"])(o["a"]) });
};
var Main$showNumber = Main$Show(function(v) {
  return "Number";
});
var Main$showInt = Main$Show(function(v) {
  return "Int";
});
var Main$showArray = function(dictShow) {
  return Main$Show(function(v) {
    return "Array";
  });
};
var Main$show = function(dict) {
  return dict["show"];
};
var Main$typeclass = Main$tuple(Main$show(Main$showInt)(1))(
  Main$tuple(Main$show(Main$showNumber)(1.23))(
    Main$tuple(Main$show(Main$showArray(Main$showInt))([1, 2]))(
      Main$show(Main$showArray(Main$showNumber))([1.2, 3.4])
    )
  )
);
var Main$numbers = { one: 1 };
var Main$matchHello = function(v) {
  var hi = v;
  return hi;
};
var Main$isOne = function(v) {
  if (v === 1) return true;
  return false;
};
var Main$guardedMatch = function(v) {
  var v1 = function(v2) {
    var v3 = function(v4) {
      var v5 = function(v6) {
        return 0;
      };
      {
        if (v["length"] === 3) {
          var x = v[0];
          var y = v[1];
          var z = v[2];
          {
            var $match_0 = Main$isOne(x);
            if ($match_0 === true) {
              var $match_1 = Main$isOne(z);
              if ($match_1 === true) return y;
              return v5(true);
            }
            return v5(true);
          }
        }
        return v5(true);
      }
    };
    {
      if (v["length"] === 3) {
        var x = v[0];
        var y = v[1];
        var z = v[2];
        {
          var $match_2 = Main$isOne(y);
          if ($match_2 === true) {
            var $match_3 = Main$isOne(z);
            if ($match_3 === true) return x;
            return v3(true);
          }
          return v3(true);
        }
      }
      return v3(true);
    }
  };
  {
    if (v["length"] === 3) {
      var x = v[0];
      var y = v[1];
      var z = v[2];
      {
        var $match_4 = Main$isOne(x);
        if ($match_4 === true) {
          var $match_5 = Main$isOne(y);
          if ($match_5 === true) return z;
          return v1(true);
        }
        return v1(true);
      }
    }
    return v1(true);
  }
};
var Main$guardedMatches = [
  Main$guardedMatch([]),
  Main$guardedMatch([1, 1, 1]),
  Main$guardedMatch([2, 1, 1]),
  Main$guardedMatch([1, 3, 1])
];
var Main$fourTuple = function(x) {
  return function(y) {
    var a$prime = Main$tuple(x)(y);
    var d = (function() {
      var b = Main$tuple(a$prime)(a$prime);
      var c = Main$tuple(b)(b);
      return Main$tuple(c)(c);
    })();
    return Main$tuple(d)(d);
  };
};
var Main$forever = function(x) {
  return Main$forever(x);
};
var Main$f = function(x) {
  return x;
};
var Main$m = function(a) {
  return function(b) {
    return function(c) {
      var v = Main$f(c);
      var v1 = b;
      var v2 = Main$f(a);
      {
        if (v2 === 0 && v1 === 0 && v === 0) return "zeros";
        if (v2 === 1 && v1 === 1 && v === 1) return "ones";
        return "others";
      }
    };
  };
};
var Main$datas = Main$tuple(0)(
  Main$tuple(0)(
    Main$tuple(1)(
      Main$tuple(Main$D3_1)(
        Main$tuple(Main$D4_1)(
          Main$tuple(Main$D5_1)(
            Main$tuple(1)(
              Main$tuple(Main$D6_1)(
                Main$tuple(1)(
                  Main$tuple(2)(
                    Main$tuple(Main$D7_1)(Main$tuple(Main$D7_2$prime)(Main$N))
                  )
                )
              )
            )
          )
        )
      )
    )
  )
);
var Main$caseString = function(v) {
  if (v === "hi") return "hi";
  return "other";
};
var Main$caseObject = function(v) {
  if (v["a"] === 1) return ".a is 1";
  if (v["b"] === "b") return ".b is b";
  if (v["c"] === "c" && v["d'"]["e"]["f"] === 4)
    return ".c is c and .d'.e.f is 4.0";
  return "other";
};
var Main$caseNumber = function(v) {
  if (v === 1.23) return "1.23";
  return "other";
};
var Main$caseNewtype = function(v) {
  var x = v;
  return x;
};
var Main$caseNamed = function(v) {
  if (v["a"]["length"] === 1 && v["a"][0] === 0) {
    var b = v["a"];
    {
      var bb = b;
      return bb;
    }
  }
  if (v["b"]["c"]["d"]["length"] === 1 && v["b"]["c"]["d"][0] === 1) {
    var b$prime = v["b"]["c"]["d"];
    {
      var bb = b$prime;
      return bb;
    }
  }
  if (
    v["c"]["length"] === 1 &&
    v["c"][0]["length"] === 1 &&
    v["c"][0][0]["length"] === 1 &&
    v["c"][0][0][0]["length"] === 3 &&
    v["c"][0][0][0][0] === 1 &&
    v["c"][0][0][0][1] === 2 &&
    v["c"][0][0][0][2] === 3
  ) {
    var b = v["c"][0][0][0];
    {
      var bb = b;
      return bb;
    }
  }
  return [];
};
var Main$caseInt = function(v) {
  if (v === 42) return "42";
  return "other";
};
var Main$caseData7 = function(v) {
  if (v[0] === 0) {
    var x = v[1];
    return x;
  }
  if (v[0] === 1) {
    var x = v[1];
    return x;
  }
};
var Main$caseData6 = function(v) {
  if (typeof v !== "number") {
    var x = v[0];
    return x;
  }
  if (v === 1) return 2;
  if (v === 2) return 3;
};
var Main$caseData5 = function(v) {
  if (typeof v !== "number") {
    var x = v[0];
    return x;
  }
  if (v === 1) return 2;
};
var Main$caseData4 = function(v) {
  var x = v[0];
  var y = v[1];
  return Main$tuple(x)(y);
};
var Main$caseData3 = function(v) {
  var x = v;
  return x;
};
var Main$caseData2 = function(v) {
  if (v === 0) return 1;
  if (v === 1) return 2;
};
var Main$caseData1 = function(v) {
  if (v === 0) return 1;
};
var Main$caseDatas = Main$tuple(Main$caseData1)(
  Main$tuple(Main$caseData2)(
    Main$tuple(Main$caseData3)(
      Main$tuple(Main$caseData4)(
        Main$tuple(Main$caseData5)(
          Main$tuple(Main$caseData6)(
            Main$tuple(Main$caseData7)(Main$caseNewtype)
          )
        )
      )
    )
  )
);
var Main$caseChar = function(v) {
  if (v === "π") return "pi";
  return "other";
};
var Main$caseBoolean = function(v) {
  if (v === true) return "true";
  return "other";
};
var Main$caseArray = function(v) {
  if (v["length"] === 0) return 0;
  if (v["length"] === 3 && v[0] === 0 && v[2] === 2) {
    var x$prime = v[1];
    return x$prime;
  }
  if (v["length"] === 3) {
    var z = v[2];
    return z;
  }
  return 9;
};
var Main$caseArrays = Main$tuple(Main$caseArray([]))(
  Main$tuple(Main$caseArray([0, 1, 2]))(
    Main$tuple(Main$caseArray([7, 6, 5]))(Main$caseArray([2]))
  )
);
var Main$cases = Main$tuple(Main$caseBoolean(true))(
  Main$tuple(Main$caseChar("π"))(
    Main$tuple(Main$caseInt(43))(
      Main$tuple(Main$caseNumber(1.234))(
        Main$tuple(Main$caseString("hi"))(
          Main$tuple(Main$caseArrays)(
            Main$tuple(Main$caseObject)(
              Main$tuple(Main$caseNamed)(Main$caseDatas)
            )
          )
        )
      )
    )
  )
);
var Main$object = {
  array: A$array,
  boolean: true,
  char: "π",
  int: 42,
  number: 1.23,
  "string'": "πr²",
  one: Main$numbers["one"]
};
var Main$main = Main$foreign["log"](
  Main$tuple(Main$object)(
    Main$tuple(Main$tuple)(
      Main$tuple(Main$datas)(
        Main$tuple(Main$fourTuple)(
          Main$tuple(Main$m(0)(0)(0))(
            Main$tuple(Main$m(1)(1)(1))(
              Main$tuple(Main$m(0)(1)(0))(
                Main$tuple(Main$m(3)(3)(3))(
                  Main$tuple(Main$cases)(
                    Main$tuple(Main$forever)(
                      Main$tuple(Main$typeclass)(
                        Main$tuple(Main$tuplizeA)(
                          Main$tuple(Main$matchHello)(
                            Main$tuple(Main$guardedMatches)(Main$void$prime)
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  )
);
Main$main();
