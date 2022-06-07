var express = require("express");
const data = require("./data.json");
var router = express.Router();

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.render("goals", {
    title: "Goals list",
    goals: data.goals,
  });
});
module.exports = router;
