const { add, sub } = require("./math");
const fs = require("fs");

console.log("Addition of two num is", add(3, 2));

console.log("Substraction of two num is", sub(5, 2));

const data = fs.writeFileSync("helo.txt", "hello world");
console.log(data);

fs.writeFile("new.txt", "This is new file", (err) => {});
