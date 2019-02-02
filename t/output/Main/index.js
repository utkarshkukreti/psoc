// Generated by purs version 0.12.1
"use strict";
var $foreign = require("./foreign.js");
var N = function (x) {
    return x;
};
var D7_1 = (function () {
    function D7_1(value0) {
        this.value0 = value0;
    };
    D7_1.create = function (value0) {
        return new D7_1(value0);
    };
    return D7_1;
})();
var D7_2 = (function () {
    function D7_2(value0) {
        this.value0 = value0;
    };
    D7_2.create = function (value0) {
        return new D7_2(value0);
    };
    return D7_2;
})();
var D6_1 = (function () {
    function D6_1(value0) {
        this.value0 = value0;
    };
    D6_1.create = function (value0) {
        return new D6_1(value0);
    };
    return D6_1;
})();
var D6_2 = (function () {
    function D6_2() {

    };
    D6_2.value = new D6_2();
    return D6_2;
})();
var D6_3 = (function () {
    function D6_3() {

    };
    D6_3.value = new D6_3();
    return D6_3;
})();
var D5_1 = (function () {
    function D5_1(value0) {
        this.value0 = value0;
    };
    D5_1.create = function (value0) {
        return new D5_1(value0);
    };
    return D5_1;
})();
var D5_2 = (function () {
    function D5_2() {

    };
    D5_2.value = new D5_2();
    return D5_2;
})();
var D4_1 = (function () {
    function D4_1(value0, value1) {
        this.value0 = value0;
        this.value1 = value1;
    };
    D4_1.create = function (value0) {
        return function (value1) {
            return new D4_1(value0, value1);
        };
    };
    return D4_1;
})();
var D3_1 = (function () {
    function D3_1(value0) {
        this.value0 = value0;
    };
    D3_1.create = function (value0) {
        return new D3_1(value0);
    };
    return D3_1;
})();
var D2_1 = (function () {
    function D2_1() {

    };
    D2_1.value = new D2_1();
    return D2_1;
})();
var D2_2 = (function () {
    function D2_2() {

    };
    D2_2.value = new D2_2();
    return D2_2;
})();
var D1_1 = (function () {
    function D1_1() {

    };
    D1_1.value = new D1_1();
    return D1_1;
})();
var tuple = function (a) {
    return function (b) {
        return {
            a: a,
            b: b
        };
    };
};
var string = "\u03c0r\xb2";
var numbers = {
    one: 1
};
var number = 1.23;
var $$int = 42;
var fourTuple = function (x) {
    return function (y) {
        var a = tuple(x)(y);
        var d = (function () {
            var b = tuple(a)(a);
            var c = tuple(b)(b);
            return tuple(c)(c);
        })();
        return tuple(d)(d);
    };
};
var f = function (x) {
    return x;
};
var m = function (a) {
    return function (b) {
        return function (c) {
            var v = f(c);
            var v2 = f(a);
            if (v2 === 0 && (b === 0 && v === 0)) {
                return "zeros";
            };
            if (v2 === 1 && (b === 1 && v === 1)) {
                return "ones";
            };
            return "others";
        };
    };
};
var datas = tuple(D1_1.value)(tuple(D2_1.value)(tuple(D2_2.value)(tuple(D3_1.create)(tuple(D4_1.create)(tuple(D5_1.create)(tuple(D5_2.value)(tuple(D6_1.create)(tuple(D6_2.value)(tuple(D6_3.value)(tuple(D7_1.create)(tuple(D7_2.create)(N))))))))))));
var $$char = "\u03c0";
var caseString = function (v) {
    if (v === "hi") {
        return "hi";
    };
    return "other";
};
var caseNumber = function (v) {
    if (v === 1.23) {
        return "1.23";
    };
    return "other";
};
var caseInt = function (v) {
    if (v === 42) {
        return "42";
    };
    return "other";
};
var caseChar = function (v) {
    if (v === "\u03c0") {
        return "pi";
    };
    return "other";
};
var caseBoolean = function (v) {
    if (v) {
        return "true";
    };
    return "other";
};
var caseArray = function (v) {
    if (v.length === 0) {
        return 0;
    };
    if (v.length === 3 && (v[0] === 0 && v[2] === 2)) {
        return v[1];
    };
    if (v.length === 3) {
        return v[2];
    };
    return 9;
};
var caseArrays = tuple(caseArray([  ]))(tuple(caseArray([ 0, 1, 2 ]))(tuple(caseArray([ 7, 6, 5 ]))(caseArray([ 2 ]))));
var cases = tuple(caseBoolean(true))(tuple(caseChar("\u03c0"))(tuple(caseInt(43))(tuple(caseNumber(1.234))(tuple(caseString("hi"))(caseArrays)))));
var $$boolean = true;
var array = [ 1, 2, 3 ];
var object = {
    array: array,
    "boolean": $$boolean,
    "char": $$char,
    "int": $$int,
    number: number,
    string: string,
    one: numbers.one
};
var main = $foreign.log(tuple(object)(tuple(tuple)(tuple(datas)(tuple(fourTuple)(tuple(m(0)(0)(0))(tuple(m(1)(1)(1))(tuple(m(0)(1)(0))(tuple(m(3)(3)(3))(cases)))))))));
module.exports = {
    array: array,
    "boolean": $$boolean,
    "char": $$char,
    "int": $$int,
    number: number,
    object: object,
    string: string,
    numbers: numbers,
    tuple: tuple,
    D1_1: D1_1,
    D2_1: D2_1,
    D2_2: D2_2,
    D3_1: D3_1,
    D4_1: D4_1,
    D5_1: D5_1,
    D5_2: D5_2,
    D6_1: D6_1,
    D6_2: D6_2,
    D6_3: D6_3,
    D7_1: D7_1,
    D7_2: D7_2,
    N: N,
    datas: datas,
    fourTuple: fourTuple,
    f: f,
    m: m,
    caseArray: caseArray,
    caseArrays: caseArrays,
    caseBoolean: caseBoolean,
    caseChar: caseChar,
    caseInt: caseInt,
    caseNumber: caseNumber,
    caseString: caseString,
    cases: cases,
    main: main,
    log: $foreign.log
};
