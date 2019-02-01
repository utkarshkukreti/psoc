exports.log = function(a) {
  return function() {
    console.log(JSON.stringify(a, null, 2));
  };
};
