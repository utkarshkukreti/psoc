(function() {
  var Main_$foreign = require("./t/output/Main/foreign.js");
  var Main_tuple = function(a) {
    return function(b) {
      return { a: a, b: b };
    };
  };
  var Main_array = [1, 2, 3];
  var Main_boolean = true;
  var Main_char = "π";
  var Main_int = 42;
  var Main_number = 1.23;
  var Main_string = "πr²";
  var Main_numbers = { one: 1 };
  var Main_object = {
    array: Main_array,
    boolean: Main_boolean,
    char: Main_char,
    int: Main_int,
    number: Main_number,
    string: Main_string,
    one: Main_numbers.one
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
  var Main_D7_2 = function(value0) {
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
                      Main_tuple(Main_D7_1)(Main_tuple(Main_D7_2)(Main_N))
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
      return (function() {
        var a = Main_tuple(x)(y);
        var d = (function() {
          var b = Main_tuple(a)(a);
          var c = Main_tuple(b)(b);
          return Main_tuple(c)(c);
        })();
        return Main_tuple(d)(d);
      })();
    };
  };
  var Main_f = function(x) {
    return x;
  };
  var Main_m = function(a) {
    return function(b) {
      return function(c) {
        return (function() {
          var v = Main_f(c);
          var v1 = b;
          var v2 = Main_f(a);
          return (function() {
            var m_0 = v2;
            var m_1 = v1;
            var m_2 = v;
            if (m_0 === 0 && m_1 === 0 && m_2 === 0) {
              return "zeros";
            }
            if (m_0 === 1 && m_1 === 1 && m_2 === 1) {
              return "ones";
            }
            return "others";
          })();
        })();
      };
    };
  };
  var Main_main = Main_$foreign.log(
    Main_tuple(Main_object)(
      Main_tuple(Main_tuple)(
        Main_tuple(Main_datas)(
          Main_tuple(Main_fourTuple)(
            Main_tuple(Main_m(0)(0)(0))(
              Main_tuple(Main_m(1)(1)(1))(
                Main_tuple(Main_m(0)(1)(0))(Main_m(3)(3)(3))
              )
            )
          )
        )
      )
    )
  );
  return Main_main;
})()();
