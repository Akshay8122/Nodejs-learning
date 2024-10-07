function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

// using exports

// exports.sub = (a, b) => a - b;

module.exports = { add, sub };
