const express = require("express");
const router = express.Router();
const filecontroller = require("./file.controller");
const datacontroller = require("./data.controller");
const oauth = require("./oauth.controller");
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
  router.get("/oauth", oauth.getForgeToken);
  router.post("/login", loginValidation, oauth.postLogin);
  router.post("/get-user", loginValidation, oauth.postGetUser);
  router.post('/register', signupValidation, oauth.postRegister);


  app.use(router);
};
module.exports = routes;