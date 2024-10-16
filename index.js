let PORT = 5000;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.send(`Hello from home page`);
});

app.get("/about", (req, res) => {
  return res.send(
    `Hey ${req.query.name}` + ` \n your id is ${req.query.userId}`
  );
});

app.listen(PORT, () => console.log("server started"));
