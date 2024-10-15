let PORT = 5000;
const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http
  .createServer((req, res) => {
    if (req.url === "/favicon.ico") {
      return res.end();
    }
    const log = `${Date.now()} ${req.url} Request recived\n`;
    const myUrl = url.parse(req.url, true);

    fs.appendFile("log.txt", log, (err, data) => {
      switch (myUrl.pathname) {
        case "/":
          if (req.method === "GET") res.end("HomePage");
          break;
        case "/about":
          const userName = myUrl.query.name;
          res.end(`Hello, ${userName}`);
          break;

        case "/search":
          const serchResult = myUrl.query.search_query;
          res.end("Here are your result for" + serchResult);

        case "/signup":
          if (req.method === "GET") res.end("Welcome to signup page");
          else if (req.method === "POST") {
            // DB query

            res.end("Suceess");
          }
        default:
          res.end("404 Not Found");
      }
    });

    console.log(req.headers);
  })
  .listen(PORT, () => console.log(`server listening on ${PORT}`));
