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
var Main_tuple = function(a) {
  return function(b) {
    return { a: a, b: b };
  };
};
var Main_main = { object: Main_object, tuple: Main_tuple };
