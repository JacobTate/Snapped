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
//const Users = require("../models").Users;
var db = require("../models/index");

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

    //console.log("req.file.id: " + req.file.id);
    //console.log("req.body: " + JSON.stringify(req.file, null, 2))
    //console.log("userEmail: " + req.body.userEmail)
    //const fileId = req.file.id;

    db.Users.findOneAndUpdate({
        email: req.body.userEmail
      }, {
        $push: {
          photos: req.file.id
        }
      }, {
        new: true
      })
      .then(function (dbUsers) {
        //res.json(dbUsers);
        res.redirect("/mysnapps");
      })
      .catch(function (err) {
        res.json(err);
      });

  });
  let userEmail;
  app.post("/api/myimages", (req, res) => {
    userEmail = req.body.userEmail
  });
  app.get("/api/show/myimages", (req, res) => {
    const userImages = [];
    const allImages = [];
    const userImagesArr = [];
    console.log("userEmail: " + userEmail);
    db.Users.find({
      email: userEmail
    }).then(data => {
      for (let x=0; x <data[0].photos.length; x++) {
        console.log("user.photos: " + data[0].photos[x]);
        userImages.push(data[0].photos[x]);
        console.log("userImages: " + userImages);
      }
      // testID = "5ec349ef7198213ad05df85a";
      // gfs.find({ _id: testID}).toArray(function (err, files) {
      //   // if (err) ...
      //   console.log(files);
      // })

      // gfs.findOne({ _id: '5ec349ef7198213ad05df85a'}, function (err, file) {
      //   console.log(file);
      // });

      gfs.find().toArray((err,files) => {
        //console.log(files);
        allImages.push(files);
        //console.log(allImages)
        
      // })
      console.log("images.length: " + allImages.length)
      console.log("files.length: " + files.length)
      for (let y=0; y < files.length; y++) {
        console.log("Y: " + y)
        //if (files[y].filename == 'e17a121cbea2b8958ed47e69913b7a11.jpg') {
        if (files[y]._id == '5ec349ef7198213ad05df85a') {  
          console.log("match found")
          userImagesArr.push(files[y])
          //return;
        }
        console.log("userImagesArr: " + JSON.stringify(userImagesArr,null,2))

        //TODO: START
        const f = userImagesArr
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
          // return res.render("/mysnapps", {
          // files: f
          //  });     
          // res.json({
          //   files: f
          // });
          
          //});
        //}

        //TODO: END
      //}
      
      //})

      // gfs.find().toArray((err, files) => {
      // for (let i = 0; i < data[0].photos.length; i++) {
      //   userImages.push(data[0].photos[i]);
      // };
      // for (let j = 0; j < files.length; j++) {
      //   userImageArr.push(files[j]._id);
      // }
      // console.log(userImageArr);
      
      // for (let i = 0; i < userImages.length; i++) {
      //   for (let j = 0; j < userImageArr.length; j++) {
      //     if(userImages[i] == userImageArr[j]){
      //       console.log(true);
      //     }
          
      //   }
      // }
    });
      // if (!gfs) {
      //   console.log("some error occured, check connection to db");
      //   res.send("some error occured, check connection to db");
      //   process.exit(0);
      // }
     // console.log(userImagePathArr);
      
    
      // gfs.find().toArray((err, files) => {
      //   // check if files
      //   if (!files || files.length === 0) {
      //     // return res.render("index", {
      //     //   files: false
      //     // });
      //   } else {
      //     const f = files.map(file => {
      //         if (
      //           file.contentType === "image/png" ||
      //           file.contentType === "image/jpeg"
      //         ) {
      //           file.isImage = true;
      //           file.filename = "image/" + file.filename;
      //         } else {
      //           file.isImage = false;
      //         }
      //         return file;
      //       })
      //       .sort((a, b) => {
      //         return (
      //           new Date(b["uploadDate"]).getTime() -
      //           new Date(a["uploadDate"]).getTime()
      //         );
      //       });

      //     //return res.render("index", {
      //     //return res.render("/mysnapps", {
      //     //files: f
      //     res.json({
      //       files: f
      //     });
      //     //});
      //   }

      //   // return res.json(files);
      // });
    //});
  });


  //   app.get("/mysnapps/api/showAll", (req, res) => {
  //     if (!gfs) {
  //       console.log("some error occured, check connection to db");
  //       res.send("some error occured, check connection to db");
  //       process.exit(0);
  //     }
  //     gfs.find().toArray((err, files) => {
  //       // check if files
  //       if (!files || files.length === 0) {
  //         // return res.render("index", {
  //         //   files: false
  //         // });
  //       } else {
  //         const f = files
  //           .map(file => {
  //             if (
  //               file.contentType === "image/png" ||
  //               file.contentType === "image/jpeg"
  //             ) {
  //               file.isImage = true;
  //               file.filename = "image/" + file.filename;
  //             } else {
  //               file.isImage = false;
  //             }
  //             return file;
  //           })
  //           .sort((a, b) => {
  //             return (
  //               new Date(b["uploadDate"]).getTime() -
  //               new Date(a["uploadDate"]).getTime()
  //             );
  //           });

  //         //return res.render("index", {
  //         //return res.render("/mysnapps", {
  //         //files: f
  //         res.json({
  //           files: f
  //         });
  //         //});
  //       }

  //       // return res.json(files);
  //     });

  // app.get("/username", (req, res) => {
  // console.log(req.body);

  // });
  //   });

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
    db.Users.create({
      email: req.body.email,
      name: req.body.name,
      photos: []
    });

  });

};