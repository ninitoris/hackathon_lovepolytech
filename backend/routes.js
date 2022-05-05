const express = require("express");
const router = express.Router();
const filecontroller = require("./file.controller");
const datacontroller = require("./data.controller");
const auth = require("./auth.controller");
const { signupValidation, loginValidation } = require('./validation');


let routes = (app) => {
  //router.post("/upload", filecontroller.upload);
  router.get("/files", filecontroller.getListFiles);
  router.get("/files/:name", filecontroller.download);
  router.get("/data", datacontroller.getData);
  router.get("/classes", datacontroller.getClasses);
  router.get("/subclasses", datacontroller.getSubclasses);
  router.get("/groups", datacontroller.getGroups);
  router.get("/subgroups", datacontroller.getSubgroups);
  router.get("/types", datacontroller.getTypes);
  router.get("/users", datacontroller.getUsers);
  router.get("/oauth", auth.getForgeToken);
  router.post("/login", loginValidation, auth.postLogin);
  router.post("/get-user", loginValidation, auth.postGetUser);
  router.post('/register', signupValidation, auth.postRegister);
  router.post('/changepassword', auth.changePassword);

  


  app.use(router);
};
module.exports = routes;