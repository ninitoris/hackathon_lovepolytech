const fs = require('fs');
const dstpath = './models/';
let Client = require('ssh2-sftp-client');
let sftp = new Client();
let remotePath = '/models/';

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
          sftp.end()
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
            res.send(err)
          });
    })
} 

const download = (req, res) => {
    const fileName = req.params.name;
    try{
      sftp.end()
    }catch(err){
      console.log(err)
    }
    sftp.connect(config)
  .then(() => {
    return sftp.get(remotePath + fileName, dstpath + fileName);
  })
  .then(() => {
    sftp.end();
  })
  .then(()=>{
    res.download(dstpath + fileName, fileName, (err) => {
        if (err) {
          res.status(500).send({
            message: "Could not download the file. " + err,
          });
        }
      });
  })
  .catch(err => {
    console.error(err.message);
    res.status(500).send(err)
  });
};

module.exports = {
    getListFiles,
    download
}