let PORT = 5000;
const express = require("express");
const app = express();
const fs = require("fs");
const users = require("./MOCK_DATA.json");

// Middleware configuration | plugins
app.use(express.urlencoded({ extended: false }));

// Routes

app.get("/users", (req, res) => {
  const html = `<ul>${users
    .map((userList) => `<li>${userList.first_name}</li>`)
    .join("")}</ul>`;

  return res.send(html);
});

// REST API

//List all users

app.get("/api/users", (req, res) => {
  res.json(users);
});

// List requested users with id

app
  .route("/api/users/:id")
  .get((req, res) => {
    const requestedUserwithId = users.find(
      (user) => user.id === Number(req.params.id)
    );
    return res.json(requestedUserwithId);
  })
  .patch((req, res) => {
    const id = req.params.id;
    const userIndex = users.findIndex((user) => user.id === id);

    users[userIndex] = {
      ...users[userIndex],
      ...req.body,
      id: Number(req.params.id),
    };

    users.push({ ...users[userIndex] });
    console.log(users[userIndex], "data");

    fs.writeFile(
      "MOCK_DATA.json",
      JSON.stringify(users, null, 2),
      (err, data) => {
        if (err) {
          return res
            .status(500)
            .json({ status: "fail", message: "Could not write to file" });
        }
        return res.json({ status: 200, message: "User updated successfully" });
      }
    );
  })
  .delete((req, res) => {
    const deletedUdserWithId = users.filter(
      (user) => user.id !== Number(req.params.id)
    );

    fs.writeFile(
      "MOCK_DATA.json",
      JSON.stringify(deletedUdserWithId),
      (err, data) => {
        if (err) {
          return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.json({
          message: "User deleted successfully",
          status: "success",
        });
      }
    );
  });

app.post("/api/users", (req, res) => {
  let body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log("server started"));
