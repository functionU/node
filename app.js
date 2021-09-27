var express = require("express");
var path = require("path");
var app = express();
var router = require("./Router/router.js");
var session = require("express-session");
app.use(
  session({
    secret: "zxbb",
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/public/", express.static(path.join(__dirname, "./public/")));
app.use(
  "/node_modules/",
  express.static(path.join(__dirname, "../../node_modules/"))
);
app.engine("html", require("express-art-template"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.listen(8000, function (error) {
  if (error) {
    throw err;
  }
  console.log("Server Running in 8000");
});
