const express = require("express");
const router = express.Router();
const filecontroller = require("./file.controller");
const datacontroller = require("./data.controller");
const auth = require("./auth.controller");
const { signupValidation, loginValidation } = require('./validation');
// var multipart =require ('connect-multiparty') ;



let routes = (app) => {
  //router.post("/upload", filecontroller.upload);
  router.get("/files", filecontroller.getListFiles);
  router.get("/files/:name", filecontroller.download);

  router.post("/uploadimage", filecontroller.uploadImg, filecontroller.newFile);
  router.post("/uploadmodel", filecontroller.uploadModel, filecontroller.newModel);

  router.get("/data", datacontroller.getData);
  router.get("/classes", datacontroller.getClasses);
  router.get("/subclasses", datacontroller.getSubclasses);
  router.get("/groups", datacontroller.getGroups);
  router.get("/subgroups", datacontroller.getSubgroups);
  router.get("/types", datacontroller.getTypes);

  router.post('/getcode', datacontroller.getCode);
  router.post('/addcode', datacontroller.addCode);

  router.post('/addclass', datacontroller.addClass);
  router.post('/addsubclass', datacontroller.addSubClass);
  router.post('/addgroup', datacontroller.addGroup);
  router.post('/addsubgroup', datacontroller.addSubGroup);
  router.post('/addtype', datacontroller.addType);

  router.post('/postfavourites', datacontroller.writeFavourites);
  router.post('/updatefavourites', datacontroller.updateFavourites);
  router.post('/getfavourites', datacontroller.getFavourites);

  router.post('/updateclasses', datacontroller.updateClasses);
  router.post('/updatesubclasses', datacontroller.updateSubClasses);
  router.post('/updategroups', datacontroller.updateGroups);
  router.post('/updatesubgroups', datacontroller.updateSubGroups);
  router.post('/updateTypes', datacontroller.updateTypes);

  router.get("/users", datacontroller.getUsers);
  router.get("/oauth", auth.getForgeToken);
  router.post("/login", loginValidation, auth.postLogin);
  router.post("/get-user", loginValidation, auth.postGetUser);
  router.post('/register', signupValidation, auth.postRegister);
  router.post('/changepassword', auth.changePassword);

  // router.post ('/file', multipartMiddleware, function (req, res) {
  //   req
  //     .pipe (fs.createWriteStream ('./uploads/' + decodeURIComponent (req.headers ['x-file-name'])))
  //     .on ('finish', function (err) {
  //       res.end () ;
  //     })
  //     .on ('error', function (err) {
  //       res.status (500).end () ;
  //     })
  //     ;
  // }) ;
  

  app.use(router);
};
module.exports = routes;