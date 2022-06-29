var express = require("express");
var router = express.Router();
const data = require("../db/data.json");
const fs = require("fs");
const formidable = require("formidable");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("UsersList", { title: "Users List", usersList: data.users });
});

router.get("/add", function (req, res, next) {
  res.render("AddUserForm", { title: "Add new user" });
});

router.post("/add", function (req, res, next) {
  num = 0;

  const form = formidable({ multiples: true });
  form
    .parse(req, (err, fields, files) => {
      console.log("111111");
      if (err) {
        next(err);
        return;
      }
      //Аналіз полів

      data.users.push({
        id: new Date().getTime(),
        name: fields.userName,
        age: parseFloat(fields.userAge),
        photo: "/images/" + files.userPhoto.originalFilename,
      });
    })
    .on("fileBegin", function (name, file) {
      console.log("222222");
      //Аналіз подій
      //Зміна розташування файлів
      file.filepath = req.imagesDir + "//" + file.originalFilename;
    });
  form.on("end", function (d) {
    console.log("3333333333");
    num++;
    //Помилка модуля (викликається двічі)
    if (num == 1) {
      fs.writeFileSync(req.dbDir + "/data.json", JSON.stringify(data));
      res.redirect("/users");
    }
  });
});

module.exports = router;
