const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const gridFsStorage = require("multer-gridfs-storage");
const grid = require("gridfs-stream");
const crypto = require("crypto");
const mongoURI = "mongodb://localhost/snapped";
const conn = mongoose.createConnection(mongoURI);

module.exports = app => {
let gfs;
conn.once("open", () => {
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection("uploads");
});
var storage = new gridFsStorage({
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
  const upload = multer({ storage });
  app.post("/upload", upload.single("file"), (req, res) => {
   res.redirect("/mysnapps")
  console.log(req.files);
  });
  app.get("/mysnapps/api/showAll", (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if(err) throw err;
    files.map(file => {
      if(file.contentType === "image/jpeg" || file.contentType === "image/png"){
        file.isImage = true;
      }
      else{
        file.isImage = false;
      }
    });
    res.json({files: files});
    
  });

  });
};
