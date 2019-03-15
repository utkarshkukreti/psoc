(function() {
  var Main_$foreign = require("./t/output/Main/foreign.js");
  var Main_tuple = function(a) {
    return function(b$prime) {
      return { a: a, b: b$prime };
    };
  };
  var A_array = [1, 2, 3];
  var Main_array = A_array;
  var Main_boolean = true;
  var Main_char = "π";
  var Main_int = 42;
  var Main_number = 1.23;
  var Main_string$prime = "πr²";
  var Main_numbers = { one: 1 };
  var Main_object = {
    array: Main_array,
    boolean: Main_boolean,
    char: Main_char,
    int: Main_int,
    number: Main_number,
    "string'": Main_string$prime,
    one: Main_numbers["one"]
  };
  var Main_D1_1 = 0;
  var Main_D2_1 = 0;
  var Main_D2_2 = 1;
  var Main_D3_1 = function(value0) {
    return value0;
  };
  var Main_D4_1 = function(value0) {
    return function(value1) {
      return [value0, value1];
    };
  };
  var Main_D5_1 = function(value0) {
    return [value0];
  };
  var Main_D5_2 = 1;
  var Main_D6_1 = function(value0) {
    return [value0];
  };
  var Main_D6_2 = 1;
  var Main_D6_3 = 2;
  var Main_D7_1 = function(value0) {
    return [0, value0];
  };
  var Main_D7_2$prime = function(value0) {
    return [1, value0];
  };
  var Main_N = function(x) {
    return x;
  };
  var Main_datas = Main_tuple(Main_D1_1)(
    Main_tuple(Main_D2_1)(
      Main_tuple(Main_D2_2)(
        Main_tuple(Main_D3_1)(
          Main_tuple(Main_D4_1)(
            Main_tuple(Main_D5_1)(
              Main_tuple(Main_D5_2)(
                Main_tuple(Main_D6_1)(
                  Main_tuple(Main_D6_2)(
                    Main_tuple(Main_D6_3)(
                      Main_tuple(Main_D7_1)(Main_tuple(Main_D7_2$prime)(Main_N))
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
  var Main_fourTuple = function(x) {
    return function(y) {
      var a$prime = Main_tuple(x)(y);
      var d = (function() {
        var b = Main_tuple(a$prime)(a$prime);
        var c = Main_tuple(b)(b);
        return Main_tuple(c)(c);
      })();
      return Main_tuple(d)(d);
    };
  };
  var Main_f = function(x) {
    return x;
  };
  var Main_m = function(a) {
    return function(b) {
      return function(c) {
        var v = Main_f(c);
        var v1 = b;
        var v2 = Main_f(a);
        if (v2 === 0 && v1 === 0 && v === 0) return "zeros";
        if (v2 === 1 && v1 === 1 && v === 1) return "ones";
        return "others";
      };
    };
  };
  var Main_caseBoolean = function(v) {
    if (v === true) return "true";
    return "other";
  };
  var Main_caseChar = function(v) {
    if (v === "π") return "pi";
    return "other";
  };
  var Main_caseInt = function(v) {
    if (v === 42) return "42";
    return "other";
  };
  var Main_caseNumber = function(v) {
    if (v === 1.23) return "1.23";
    return "other";
  };
  var Main_caseString = function(v) {
    if (v === "hi") return "hi";
    return "other";
  };
  var Main_caseArray = function(v) {
    if (v["length"] === 0) return 0;
    if (v["length"] === 3 && v[0] === 0 && v[2] === 2) return v[1];
    if (v["length"] === 3) return v[2];
    return 9;
  };
  var Main_caseArrays = Main_tuple(Main_caseArray([]))(
    Main_tuple(Main_caseArray([0, 1, 2]))(
      Main_tuple(Main_caseArray([7, 6, 5]))(Main_caseArray([2]))
    )
  );
  var Main_caseObject = function(v) {
    if (v["a"] === 1) return ".a is 1";
    if (v["b"] === "b") return ".b is b";
    if (v["c"] === "c" && v["d'"]["e"]["f"] === 4)
      return ".c is c and .d'.e.f is 4.0";
    return "other";
  };
  var Main_caseNamed = function(v) {
    if (v["a"]["length"] === 1 && v["a"][0] === 0) {
      var b = v["a"];
      return (function() {
        var bb = b;
        return bb;
      })();
    }
    if (v["b"]["c"]["d"]["length"] === 1 && v["b"]["c"]["d"][0] === 1) {
      var b$prime = v["b"]["c"]["d"];
      return (function() {
        var bb = b$prime;
        return bb;
      })();
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
      return (function() {
        var bb = b;
        return bb;
      })();
    }
    return [];
  };
  var Main_caseData1 = function(v) {
    if (v === 0) return 1;
  };
  var Main_caseData2 = function(v) {
    if (v === 0) return 1;
    if (v === 1) return 2;
  };
  var Main_caseData3 = function(v) {
    return v;
  };
  var Main_caseData4 = function(v) {
    if (typeof v !== "number") {
      var x = v[0];
      var y = v[1];
      return Main_tuple(x)(y);
    }
  };
  var Main_caseData5 = function(v) {
    if (typeof v !== "number") return v[0];
    if (v === 1) return 2;
  };
  var Main_caseData6 = function(v) {
    if (typeof v !== "number") return v[0];
    if (v === 1) return 2;
    if (v === 2) return 3;
  };
  var Main_caseData7 = function(v) {
    if (v[0] === 0) return v[1];
    if (v[0] === 1) return v[1];
  };
  var Main_caseNewtype = function(v) {
    return v;
  };
  var Main_caseDatas = Main_tuple(Main_caseData1)(
    Main_tuple(Main_caseData2)(
      Main_tuple(Main_caseData3)(
        Main_tuple(Main_caseData4)(
          Main_tuple(Main_caseData5)(
            Main_tuple(Main_caseData6)(
              Main_tuple(Main_caseData7)(Main_caseNewtype)
            )
          )
        )
      )
    )
  );
  var Main_cases = Main_tuple(Main_caseBoolean(true))(
    Main_tuple(Main_caseChar("π"))(
      Main_tuple(Main_caseInt(43))(
        Main_tuple(Main_caseNumber(1.234))(
          Main_tuple(Main_caseString("hi"))(
            Main_tuple(Main_caseArrays)(
              Main_tuple(Main_caseObject)(
                Main_tuple(Main_caseNamed)(Main_caseDatas)
              )
            )
          )
        )
      )
    )
  );
  var Main_forever = function(x) {
    return Main_forever(x);
  };
  var Main_show = function(dict) {
    return dict["show"];
  };
  var Main_Show = function(show) {
    return { show: show };
  };
  var Main_showInt = Main_Show(function(v) {
    return "Int";
  });
  var Main_showNumber = Main_Show(function(v) {
    return "Number";
  });
  var Main_showArray = function(dictShow) {
    return Main_Show(function(v) {
      return "Array";
    });
  };
  var Main_typeclass = Main_tuple(Main_show(Main_showInt)(1))(
    Main_tuple(Main_show(Main_showNumber)(1.23))(
      Main_tuple(Main_show(Main_showArray(Main_showInt))([1, 2]))(
        Main_show(Main_showArray(Main_showNumber))([1.2, 3.4])
      )
    )
  );
  var Main_tuplizeA = function(o) {
    var v = o;
    return Object["assign"]({}, v, { a: Main_tuple(o["a"])(o["a"]) });
  };
  var Main_matchHello = function(v) {
    return v;
  };
  var Main_isOne = function(v) {
    if (v === 1) return true;
    return false;
  };
  var Main_guardedMatch = function(v) {
    var v1 = function(v2) {
      var v3 = function(v4) {
        var v5 = function(v6) {
          return 0;
        };
        if (v["length"] === 3) {
          var x = v[0];
          var y = v[1];
          var z = v[2];
          return (function() {
            var m_0 = Main_isOne(x);
            if (m_0 === true)
              return (function() {
                var m_1 = Main_isOne(z);
                if (m_1 === true) return y;
                return v5(true);
              })();
            return v5(true);
          })();
        }
        return v5(true);
      };
      if (v["length"] === 3) {
        var x = v[0];
        var y = v[1];
        var z = v[2];
        return (function() {
          var m_2 = Main_isOne(y);
          if (m_2 === true)
            return (function() {
              var m_3 = Main_isOne(z);
              if (m_3 === true) return x;
              return v3(true);
            })();
          return v3(true);
        })();
      }
      return v3(true);
    };
    if (v["length"] === 3) {
      var x = v[0];
      var y = v[1];
      var z = v[2];
      return (function() {
        var m_4 = Main_isOne(x);
        if (m_4 === true)
          return (function() {
            var m_5 = Main_isOne(y);
            if (m_5 === true) return z;
            return v1(true);
          })();
        return v1(true);
      })();
    }
    return v1(true);
  };
  var Main_guardedMatches = [
    Main_guardedMatch([]),
    Main_guardedMatch([1, 1, 1]),
    Main_guardedMatch([2, 1, 1]),
    Main_guardedMatch([1, 3, 1])
  ];
  var Main_void$prime = (function() {
    var $$void = "void";
    return $$void;
  })();
  var Main_main = Main_$foreign["log"](
    Main_tuple(Main_object)(
      Main_tuple(Main_tuple)(
        Main_tuple(Main_datas)(
          Main_tuple(Main_fourTuple)(
            Main_tuple(Main_m(0)(0)(0))(
              Main_tuple(Main_m(1)(1)(1))(
                Main_tuple(Main_m(0)(1)(0))(
                  Main_tuple(Main_m(3)(3)(3))(
                    Main_tuple(Main_cases)(
                      Main_tuple(Main_forever)(
                        Main_tuple(Main_typeclass)(
                          Main_tuple(Main_tuplizeA)(
                            Main_tuple(Main_matchHello)(
                              Main_tuple(Main_guardedMatches)(Main_void$prime)
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
  return Main_main;
})()();
