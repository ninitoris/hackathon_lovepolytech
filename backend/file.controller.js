const fs = require('fs');
const path = require('path');
const dstpath = '/models/';
let Client = require('ssh2-sftp-client');
let sftp = new Client();
let remotePath = './models/';
const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, path.join(__dirname, '../', '/pictures/'));
    },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const uploadImg = multer({storage: storage}).single('image');

const newFile = (req, res, next) =>{
  const image = req.image;
  res.send({message: 'File uploaded successfully.', image});
}


let config = {
    host: '194.58.103.233',
    //port: '8080',
    username: 'sammy_sftp',
    password: 'sammy'
};

const getListFiles = (req, res) => {
    fs.readdir(dstpath, function(err, files){
        let fileInfos = [];
        try{
          // sftp.end()
        }catch(err){
          console.log(err)
        }
        sftp.connect(config).then(() => {
            return sftp.list('/models');
          }).then(data => {
              for (let el of data){
                  fileInfos.push(el.name)
              }
            
          }).then(()=>{
            sftp.end();
        })
          .then(()=>{
            res.status(200).send(fileInfos);


          })
          
          .catch(err => {
            console.log(err, 'catch error');
            sftp.end();
            res.send(err)
          });
    })
} 

const download = (req, res) => {
    const fileName = req.params.name;
    try{
      // sftp.end()
    }catch(err){
      // console.log(err)
    }
    sftp.connect(config)
  .then(() => {
    return sftp.get(remotePath + fileName, path.join(__dirname, '../',dstpath, fileName) );
  })
  .then(() => {
    sftp.end();
  })
  .then(()=>{
    res.download(path.join(__dirname, '../',dstpath, fileName), fileName, (err) => {
        if (err) {
          res.status(500).send({
            message: "Could not download the file. " + err,
          });
        }
      });
  })
  .catch(err => {
    console.error(err.message);
    sftp.end();
    res.status(500).send(err.message)

  });
};

module.exports = {
    getListFiles,
    download,
    uploadImg,
    newFile
}