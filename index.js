let PORT = 5000;
const http = require("http");
const fs = require("fs");

const myServer = http
  .createServer((req, res) => {
    const log = `${Date.now()} ${req.url} Request recived\n`;

    fs.appendFile("log.txt", log, (err, data) => {
      switch (req.url) {
        case "/":
          res.end("HomePage");
          break;
        case "/about":
          res.end("Hello from Akshay Patel");
          break;
        default:
          res.end("404 Not Found");
      }
    });

    console.log(req.headers);
  })
  .listen(PORT, () => console.log(`server listening on ${PORT}`));
