const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8080;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.get("/api/public/users", (req, res) => {
  let username = req.query.username;
  if (username === "bogdanjava") {
    res.status(200);
    res.send({
      "photoUrl": "https://pp.userapi.com/c850020/v850020091/f1889/fi9ykvDcuMU.jpg",
      "username": "bogdanjava",
    });
  } else {
    res.status(404);
    res.send({
      "message": "No such user exists",
    });
  }
});

app.post("/api/auth/token", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "bogdanjava" && password === "bugaga1") {
    res.status(202);
    res.send({
      "expiresAt": 5125125121212,
      "token": "ajfoh9hr2io13h1fasf_fasf",
    });
  } else {
    res.status(401);
    res.send({
      "message": "Invalid username or password",
    });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
