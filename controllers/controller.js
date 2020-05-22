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

  //let userTag;

  //app.post("/api/test/tag", (req, res) => {
  // console.log(req.body);
    //userTag = req.body.tag
  //});

  //app.post("/upload", upload.single("file"), (req, res) => {
   //console.log(userTag);
   //db.LocationTags.findOneAndUpdate({
    //location: userTag
  //}, {
    //$push: {
      //images: req.file.id
    //}
  //}, {
    //new: true
  //})
  //.then(function (dbLocationTags) {
    ////res.json(dbUsers);
    //res.redirect("/mysnapps");
    //userTag = "";
  //})
  //.catch(function (err) {
    //res.json(err);

  let userTag;
  app.post("/api/test/tag", (req, res) => {
    // console.log(req.body);
    userTag = req.body.tag

  });
  app.post("/upload", upload.single("file"), (req, res) => {
    console.log(userTag);
    db.LocationTags.findOneAndUpdate({
      location: userTag
    }, {
      $push: {
        images: req.file.id
      }
    }, {
      new: true
    })
      .then(function (dbLocationTags) {
        //res.json(dbUsers);
        res.redirect("/mysnapps");
        userTag = "";
      })
      .catch(function (err) {
        res.json(err);
      });
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
    db.Users.find({
      email: userEmail
    }).then(data => {
      for (let x = 0; x < data[0].photos.length; x++) {
        //console.log("user.photos: " + data[0].photos[x]);
        userImages.push(data[0].photos[x]);
      }

      gfs.find().toArray((err, files) => {
        for (let z = 0; z < userImages.length; z++) {
          for (let y = 0; y < files.length; y++) {
            if (files[y]._id == String(userImages[z])) {
              userImagesArr.push(files[y])
            }
          }
        }

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
        res.json({
          files: f
        });

      });
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
    db.Users.create({
      email: req.body.email,
      name: req.body.name,
      photos: []
    });

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

  const LocationTagsArr = ["Inlet", "Rosemary", "Seacrest", "Alys", "WaterSound", "Seagrove", "Seaside", "WaterColor", "Grayton", "Blue Mountain", "Gulf Place", "Dune Allen"];
  //only creates tags if they do not exist

  db.LocationTags.find().then(data => {
    if (data.length === 0 || !data) {
      for (let i = 0; i < LocationTagsArr.length; i++) {
        db.LocationTags.create({
          location: LocationTagsArr[i],
          images: []
        });
      };
    }
  });
  
  app.get("/api/find/locationTags", (req, res) => {
    let locationArr = [];
    db.LocationTags.find().then(data => {
      for (let j = 0; j < data.length; j++) {
        locationArr.push(data[j].location);
      }
      res.json(locationArr)
    });
  });
  const activityTagsArr = ["Beach", "Lake", "Gulf of Mexico", "Dog", "Cats", "Kayak", "Boat", "Bike", "Skate", "Swimming", "Paddle Boarding", "Kite Boarding", "Wake Boarding", "Skiing", "Walking", "Animal", "Golf Cart", "Car", "Sunset", "Sunrise", "Kids", "Couple", "Family", "Woman", "Man", "Turtle", "Dolphin", "Shark", "Fish", "Crab", "Shell", "Reef", "Scuba Diving", "Snorkling", "Surfing", "Body Board", "Food", "Drinks", "Exercise", "Reading", "Beach", "Games", "Airplane", "Parasailing"];
  //db.ActivityTags.find().then(data => {
  //  if(data.length === 0 || !data){


  app.post("/api/searchresults", (req, res) => {
    searchTags = req.body.searchTags
  });
  //Get images based on Tags and redirect to SearchResults page
  app.get("/api/show/searchresults", (req, res) => {
    var isArr = Array.isArray(searchTags);
    console.log("api/show/searchresults isArr: " + isArr)
    console.log("array length: " + searchTags.length)
    console.log("searchTags: " + JSON.stringify(searchTags))
    console.log("1st value: " + searchTags[0].value)
    
    let filter = []
    for (let n = 0; n < searchTags.length; n++) {
      filter.push(searchTags[n].label)
    }

    let taggedImages = []
    let taggedImagesArr = []

    //  db.LocationTags.find({location: "Gulf Place"})
    db.LocationTags.find({ location: { $in: filter } })
    //db.LocationTags.find({ location: { $in: ['5bd45277f5b9430013f4a604', '5bd470fe452cb33af4b8407a'] } })
    .then(data => {
      for (let i=0; i < data.length; i++) {
        for (let x=0; x < data[i].images.length; x++) {    
            if (data[i].images[x]) {
            taggedImages.push(data[i].images[x])
            }
        }
        if (taggedImages) {
          gfs.find().toArray((err, files) => {
            for (let z = 0; z < taggedImages.length; z++) {
              for (let y = 0; y < files.length; y++) {
                if (files[y]._id == String(taggedImages[z])) {
                  taggedImagesArr.push(files[y])
                }
              }
            }
    
            const f = taggedImagesArr
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
            res.json({
              files: f
            });
          });
        }
      }    
      //res.json(taggedImages)
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      console.log("error fetching locationtags")
      res.json(err);
    });
  })


  for (let i = 0; i < activityTagsArr.length; i++) {
    db.ActivityTags.create({
      tag: activityTagsArr[i],
      images: []
    });
  };
  //}
  //});
  app.get("/api/getTags", (req, res) => {
    let activityArr = [];
    db.ActivityTags.find().then(data => {
      for (let j = 0; j < data.length; j++) {
        activityArr.push(data[j].tag);
      }
      res.json(activityArr)
    });
  });
  let activityTag;
  app.post("/api/tags/addImage", (req, res) => {
    console.log(req.body.tag);
    activityTag = req.body.tag;
  });
  app.post("/api/imageId", (req, res) => {
    db.ActivityTags.findOneAndUpdate({
      tag: activityTag
    }, {
      $push: {
        images: req.body.imageId
      }
    }, {
      new: true
    })
      .then(function (dbLocationTags) {
        //res.json(dbUsers);
        res.redirect("/mysnapps");
        activityTag = "";
      })
      .catch(function (err) {
        res.json(err);
      });
  });

};