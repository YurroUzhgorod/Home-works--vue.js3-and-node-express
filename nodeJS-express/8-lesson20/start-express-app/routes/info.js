var express = require("express");
const data = require("./data.json");
var router = express.Router();

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.redirect("/info/about-me");
}),
  router.get("/:myLinks", function (req, res, next) {
    if (req.params.myLinks === "about-me") {
      res.render("about-me", {
        title: "About-Yura-page",
        name: "Yura",
      });
    }

    if (req.params.myLinks === "favorite-cinemas") {
      res.render("cinemas", {
        title: "Cinemas pages",
        cinemas: data.cinemas,
      });
    }

    if (req.params.myLinks === "favorite-web-sites") {
      res.render("web-sites", {
        title: "favorite-web-sites pages",
        webSites: data.webSites,
      });
    }
  });
module.exports = router;
