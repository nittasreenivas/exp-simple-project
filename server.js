const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cors = require("cors");
var cookieParser = require("cookie-parser");

const users = [
  {
    username: "warner",
    password: "123",
  },
  {
    username: "finch",
    password: "456",
  },
];
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

function checkLogin(req, res, next) {
  if (req.cookies.username && req.cookies.password) {
    next();
  } else {
    res.sendFile(__dirname + "/login.html");
  }
}
app.get("/", (req, res) => {
  if (req.cookies.username) {
    res.sendFile(__dirname + "/home.html");
  } else {
    res.sendFile(__dirname + "/login.html");
  }
});

app.get("/aboutus", (req, res) => {
  res.sendFile(__dirname + "/aboutus.html");
});

app.get("/careers", checkLogin, (req, res) => {
  console.log("careers", req.cookies);
  res.sendFile(__dirname + "/careers.html");
});

app.get("/products", checkLogin, (req, res) => {
  console.log("products", req.cookies);
  res.sendFile(__dirname + "/products.html");
});

app.get("/pokimons", checkLogin, (req, res) => {
  console.log("pokimons", req.cookies);
  res.sendFile(__dirname + "/pokimon.html");
});
app.get("/blue-car.jpg", (req, res) => {
  res.sendFile(__dirname + "/blue-car.jpg");
});

app.get("/singlepokimon", (req, res) => {
  res.sendFile(__dirname + "/singlepokimon.html");
});

app.get("/login", (req, res) => {
  console.log("login", req.query);
  var x = users.some((user) => {
    if (
      user.username === req.query.username &&
      user.password === req.query.password
    ) {
      return true;
    }
  });
  if (x) {
    res.cookie("username", req.query.username);
    res.cookie("password", req.query.password);
    res.sendFile(__dirname + "/home.html");
  } else {
    res.sendFile(__dirname + "/error.html");
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.clearCookie("password");
  console.log("logout", req.cookies);
  res.sendFile(__dirname + "/login.html")
});
app.get("/add", (req, res) => {
  console.log(req.query);
  res.send("addition:" + (+req.query.num1 + +req.query.num2));
});

app.post("/add", (req, res) => {
  console.log(req.body);
  //res.send(`hi this is post req`)
  res.json({ add: +(+req.body.num1 + +req.body.num2) });
});

const port = 3500;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
