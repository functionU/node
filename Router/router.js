var express = require("express");
const user = require("../models/user");
var router = express.Router();
var User = require("../models/user");
var md5 = require("blueimp-md5");

router.get("/", function (req, res) {
  res.render("index.html", {
    user: req.session.user,
  });
});
router.get("/login", function (req, res) {
  res.render("login.html");
});
router.post("/login", function (req, res) {
  user.findOne(
    {
      email: req.body.email,
      password: md5(md5(req.body.password)),
    },
    function (error, date) {
      if (error) {
        return res.json({ err_code: 500, message: "error" });
      }
      if (date) {
        req.session.user = req.body;
        res.json({
          err_code: 0,
          message: "login successed",
        });
      } else {
        return res.json({
          err_code: 1,
          message: "email or password wrong",
        });
      }
    }
  );
});
router.get("/register", function (req, res) {
  res.render("./register.html");
});
router.post("/register", function (req, res) {
  user.findOne(
    { $or: [{ email: req.body.email }, { nickname: req.body.nickname }] },
    function (error, date) {
      if (error) {
        return res.json({ err_code: 500, message: "error" });
      }
      if (date) {
        return res.json({
          err_code: 1,
          message: "email or nickname already be use",
        });
      }
      req.body.password = md5(md5(req.body.password));
      new User(req.body).save();
      req.session.user = req.body;
      res.json({ err_code: 0, message: "register successed" });
    }
  );
});
router.get("/logout", function (req, res) {
  req.session.user = null;
  res.redirect("/");
});

module.exports = router;
