const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const gridFsStorage = require("multer-gridfs-storage");
const grid = require("gridfs-stream");
const crypto = require("crypto");
const mongoURI = "mongodb://localhost/snapped";
const conn = mongoose.createConnection(mongoURI);
mongoose.connect(mongoURI, {
  useNewUrlParser: true
});
const Users = require("../models").Users;
module.exports = app => {

  let gfs;

  conn.once("open", () => {
    // init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "uploads"
    });
  });

  const storage = new gridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

  const upload = multer({
    storage
  });

  app.post("/upload", upload.single("file"), (req, res) => {
    res.redirect("/mysnapps");
    console.log(req.file.id);
    const fileId = req.file.id;
    app.post("/username", (req, res) => {
      const userEmail = req.body.email
      // Users.create().then(data => {
      //   return Users.findOneAndUpdate({ email: userEmail }, { $push: {photos: fileId }  }, { new: true});
      // })
      Users.findOneAndUpdate({email: userEmail}, {$push: {photos: fileId}});
    });
 ;
  });

  app.get("/mysnapps/api/showAll", (req, res) => {
 
    if (!gfs) {
      console.log("some error occured, check connection to db");
      res.send("some error occured, check connection to db");
      process.exit(0);
    }
    gfs.find().toArray((err, files) => {
      // check if files
      if (!files || files.length === 0) {
        // return res.render("index", {
        //   files: false
        // });
      } else {
        const f = files
          .map(file => {
            if (
              file.contentType === "image/png" ||
              file.contentType === "image/jpeg"
            ) {
              file.isImage = true;
              file.filename = "image/" + file.filename;
            } else {
              file.isImage = false;
            }
            return file;
          })
          .sort((a, b) => {
            return (
              new Date(b["uploadDate"]).getTime() -
              new Date(a["uploadDate"]).getTime()
            );
          });

        //return res.render("index", {
        //return res.render("/mysnapps", {
        //files: f
        res.json({
          files: f
        });
        //});
      }

      // return res.json(files);
    });

  });

  app.get("/image/:filename", (req, res) => {
    const file = gfs
      .find({
        filename: req.params.filename
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "no files exist"
          });
        }
        //console.log("filename: " + req.params.filename)
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      });

  });
  app.post("/username", (req, res) => {
    Users.create({
      email: req.body.email,
      photos: []
    });

  });

};