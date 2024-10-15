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
    console.log(myUrl);

    fs.appendFile("log.txt", log, (err, data) => {
      switch (myUrl.pathname) {
        case "/":
          res.end("HomePage");
          break;
        case "/about":
          const userName = myUrl.query.name;
          res.end(`Hello, ${userName}`);
          break;

        case "/search":
          const serchResult = myUrl.query.search_query;
          res.end("Here are your result for" + serchResult);
        default:
          res.end("404 Not Found");
      }
    });

    console.log(req.headers);
  })
  .listen(PORT, () => console.log(`server listening on ${PORT}`));
