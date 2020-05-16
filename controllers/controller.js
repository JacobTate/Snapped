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
    gfs.collection("testUploads");
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
   res.json({file: req.file})
  console.log(req.file);
 
  });
};
