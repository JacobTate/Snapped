const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const gridFsStorage = require("multer-gridfs-storage");
const grid = require("gridfs-stream");
const crypto = require("crypto");
const mongoURI = process.env.MONGODB_URI;
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

  let userTag;
  app.post("/api/test/tag", (req, res) => {
    //   console.log(req.body);
    userTag = req.body.tag

  });
  app.post("/api/tags/changeLocation", (req, res) => {
    console.log(req.body);
    console.log(userTag);
    db.LocationTags.findOneAndUpdate({
        location: req.body.currentLocation
      }, {
        $pull: {
          images: mongoose.Types.ObjectId(req.body.fileId)
        }
      })
      .then(function (dbArticles) {})
      .catch(function (err) {
        res.json(err);
      });
    db.LocationTags.findOneAndUpdate({
        location: userTag
      }, {
        $push: {
          images: mongoose.Types.ObjectId(req.body.fileId)
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
  });

  //Upload file
  app.post("/upload", upload.single("file"), (req, res) => {
    console.log(userTag);
    console.log("upload: " + req.file.id)
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
    //console.log("myImages userEmail: " + userEmail)
    db.Users.find({
      email: userEmail
    }).then(data => {
      //console.log("myImages data: " + data) //FIXME: troubleshooting
      //console.log("myImages photo.length: " + data[0].photos.length)
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
    };
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

  const activityTagsArr = ["Beach", "Lake", "Gulf of Mexico", "Dog", "Cats", "Kayak", "Boat", "Bike", "Skate", "Swimming", "Paddle Boarding", "Kite Boarding", "Wake Boarding", "Skiing", "Walking", "Animal", "Golf Cart", "Car", "Sunset", "Sunrise", "Kids", "Couple", "Family", "Woman", "Man", "Turtle", "Dolphin", "Shark", "Fish", "Crab", "Shell", "Reef", "Scuba Diving", "Snorkling", "Surfing", "Body Board", "Food", "Drinks", "Exercise", "Reading", "Games", "Airplane", "Parasailing"];

  db.ActivityTags.find().then(data => {
    if (data.length === 0 || !data) {
      for (let i = 0; i < activityTagsArr.length; i++) {
        db.ActivityTags.create({
          tag: activityTagsArr[i],
          images: []
        });
      };
    }
  });

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
    const imageId = mongoose.Types.ObjectId(req.body.imageId);
    db.ActivityTags.findOneAndUpdate({
        tag: activityTag
      }, {
        $push: {
          images: imageId
        }
      }, {
        new: true
      })
      .then(function (dbActivityTags) {
        res.json(dbActivityTags);
       // res.redirect("/mysnapps");
        activityTag = "";
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  //Display search results
  app.post("/api/searchresults", (req, res) => {
    searchTags = req.body.searchTags
    userEmail = req.body.userEmail
  });

  //Display search results
  app.get("/api/show/searchresults", (req, res) => {

    let userSavedImages = [];

    let filter = []
    let taggedImages = []
    let taggedActivityImages = []
    let taggedImagesArr = []

    //Build filter array of tags chosen in search dropdown
    for (let n = 0; n < searchTags.length; n++) {
      filter.push(searchTags[n].label)
    }

    Promise.resolve()
      .then(() => getUserSavedImages())
      .then(() => getLocationImages())
      .then(() => getActivityImages())
      .then(() => getImages())
      .then((resolve, reject) => {
        console.log('all done');
      })

    async function getUserSavedImages() {
      //let taggedSavedImagesArr = [];
      //console.log("resA: " + resA)
      console.log('getting users saved photos')
      //Get all images user has saved
      await db.Users.find({
          email: userEmail
        }).then(svPhotos => {
          if (svPhotos[0].saved_photos) {
            userSavedImages.push(svPhotos[0].saved_photos)
          } else { //user has not saved photos yet
            console.log("no saved_photos for user")
          }
          //console.log("saved_photos: " + userSavedImages)
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          console.log("error fetching users saved photos")
          res.json(err);
        });

      //userSavedImages = taggedSavedImagesArr
      return
    };

    async function getLocationImages() {

      //console.log("userSavedImages: " + userSavedImages)
      console.log('getting location data')
      
      let filterOnlyActivityTags = false;

      await db.LocationTags.find({
          location: {
            $in: filter
          }
        })
        .then(data => {
          //console.log("data.length: " + data.length)
          //console.log("data: " + data)
          for (let i = 0; i < data.length; i++) {
            //console.log("data.images.length: " + data[i].images.length)
            for (let x = 0; x < data[i].images.length; x++) {
              //taggedImages.push({"image": data[i].images[x], "mySavedImage": true})
              taggedImages.push(data[i].images[x])
              //console.log("taggedImages: " + data[i].images[x])
            }
          }
          //console.log("final taggedImages: " + JSON.stringify(taggedImages))
          return;
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          console.log("error fetching location photos")
          res.json(err);
        });
    }

    async function getActivityImages() {

      //console.log("userSavedImages: " + userSavedImages)

      console.log('getting activity data')
      await db.ActivityTags.find({
          tag: {
            $in: filter
          }
        })
        .then(data => {
          //console.log("data.length: " + data.length)
          //console.log("data: " + data)
          for (let i = 0; i < data.length; i++) {
            //console.log("data.images.length: " + data[i].images.length)
            for (let x = 0; x < data[i].images.length; x++) {
              //taggedImages.push({"image": data[i].images[x], "mySavedImage": true})
              
              //Check if image already is in array
              if (String(taggedImages).includes(data[i].images[x])) {
                console.log("images already added to array")
              } else {
                taggedImages.push(data[i].images[x])
              }  
              //console.log("taggedImages: " + data[i].images[x])
            }
          }
          //console.log("final taggedImages: " + JSON.stringify(taggedImages))
          return;
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          console.log("error fetching activity photos")
          res.json(err);
        });
    }

    async function getImages() {
      console.log("getting images")
      //console.log("userSavedImages: " + userSavedImages)

      if (taggedImages) {

        await gfs.find().toArray((err, files) => {
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
                //console.log ("file.filename: " + file.filename)
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
            files: f,
            userSavedImages: userSavedImages,
          });
        });
      }

    }
  });

  //Get searchTags for Home page
  app.get("/api/getAllTags", (req, res) => {
    let allTagsArr = [];

    db.LocationTags.find().then(data => {
      for (let j = 0; j < data.length; j++) {
        //allTagsArr.push(data[j].location);
        allTagsArr.push({
          "label": data[j].location,
          "value": data[j]._id,
          "type": "location"
        })
      }
      //res.json(allTagsArr)
      // });

      db.ActivityTags.find().then(data => {
        for (let j = 0; j < data.length; j++) {
          //allTagsArr.push(data[j].tag);
          allTagsArr.push({
            "label": data[j].tag,
            "value": data[j]._id,
            "type": "activity"
          })
        }

        allTagsArr.sort(fieldSorter(['label']));

        function fieldSorter(fields) {
          return function (a, b) {
            return fields
              .map(function (o) {
                var dir = 1;
                if (o[0] === '-') {
                  dir = -1;
                  o = o.substring(1);
                }
                if (a[o] > b[o]) return dir;
                if (a[o] < b[o]) return -(dir);
                return 0;
              })
              .reduce(function firstNonZeroValue(p, n) {
                return p ? p : n;
              }, 0);
          };
        }

        res.json(allTagsArr)
      });
    });
  });

  //Add (save) an image to the user's profile
  app.post("/save", (req, res) => {
    console.log("saving image")
    console.log("save imageId: " + req.body.imageId)
    let fileObjId = mongoose.Types.ObjectId(req.body.imageId);
    //console.log("testID: " + testID)
    db.Users.findOneAndUpdate({
        email: req.body.userEmail
      }, {
        $push: {
          saved_photos: fileObjId
        }
      }, {
        new: true
      })
      .then(function (dbUsers) {
        res.json(dbUsers);
      })
      .catch(function (err) {
        res.json(err);
      });

  });

  //Remove (unsave) an image from the user's profile
  app.post("/unsave", (req, res) => {
    console.log("unsaving image")
    console.log("unsave imageId: " + req.body.imageId)

    let fileObjId = mongoose.Types.ObjectId(req.body.imageId);

    db.Users.findOneAndUpdate({
        email: req.body.userEmail
      }, {
        $pull: {
          saved_photos: fileObjId
        }
      }, {
        new: true
      })
      .then(function (dbUsers) {
        res.json(dbUsers);
      })
      .catch(function (err) {
        res.json(err);
      });

  });

  //Get searchTags
  app.post("/api/saved", (req, res) => {
    userEmail = req.body.userEmail
  });

  app.get("/api/show/saved", (req, res) => {

    let taggedImages = []
    let taggedImagesArr = []

    Promise.resolve()
      .then(() => getUserSavedImages())
      .then(() => getImages())
      .then((resolve, reject) => {
        console.log('all done');
      })

    async function getUserSavedImages() {
      //let taggedSavedImagesArr = [];
      //console.log("resA: " + resA)
      console.log('getting users saved photos')
      //Get all images user has saved
      await db.Users.find({
          email: userEmail
        }).then(svPhotos => {
          if (svPhotos[0].saved_photos) {
            for (let i = 0; i < svPhotos[0].saved_photos.length; i++) {
              //userSavedImages.push(svPhotos[0].saved_photos)
              taggedImages.push(svPhotos[0].saved_photos[i])
            }
          } else { //user has not saved photos yet
            console.log("no saved_photos for user")
          }
          //console.log("saved_photos: " + taggedImages)
        })
        .catch(function (err) {
          // If an error occurred, send it to the client
          console.log("error fetching users saved photos")
          res.json(err);
        });

      //userSavedImages = taggedSavedImagesArr
      return
    };

    async function getImages() {
      console.log("getting images")
      //console.log("taggedImages: " + taggedImages)
      //console.log("taggedImages.length: " + taggedImages.length)

      if (taggedImages) {

        await gfs.find().toArray((err, files) => {
          for (let z = 0; z < taggedImages.length; z++) {
            for (let y = 0; y < files.length; y++) {
              if (files[y]._id == String(taggedImages[z])) {
                taggedImagesArr.push(files[y])
                //console.log("adding image to taggedImagesArr")
              }
            }
          }
          //console.log("here I am")
          //console.log("taggedImagesArr: " + taggedImagesArr)
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
            files: f,
            //userSavedImages: userSavedImages

          });
        });
      }

    }
  })
  //delete from mysnapps page
  app.post("/api/delete/", (req, res) => {
    let fileId = req.body.fileId;
    //delete the file from the database
    gfs.delete(new mongoose.Types.ObjectId(fileId), (err, gridStore) => {
      if (err) {
        return res.status(404).json({
          err: err
        });
      }

      res.redirect('/mysnapps');
    });

    //remove the image objectId from the users photos array 
    db.Users.find().then(data => {
      let userId = "";
      for (let i = 0; i < data.length; i++) {
        if (data[i].photos.length > 0) {
          for (let j = 0; j < data[i].photos.length; j++) {
            if (String(data[i].photos[j]) == fileId) {
              userId = data[i]._id;
            };
          };
        };
      };
      let userObjId = mongoose.Types.ObjectId(userId);
      let fileObjId = mongoose.Types.ObjectId(fileId);
      db.Users.findOneAndUpdate({
          _id: userObjId
        }, {
          $pull: {
            photos: fileObjId
          }
        })
        .then(function (dbArticles) {})
        .catch(function (err) {
          res.json(err);
        });

      db.Users.findOneAndUpdate({
          _id: userObjId
        }, {
          $pull: {
            saved_photos: fileObjId
          }
        })
        .then(function (dbArticles) {})
        .catch(function (err) {
          res.json(err);
        });
    });

    //remove the image objectId from the location tags images array
    db.LocationTags.find().then(data => {
      let lTagId = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].images.length > 0) {
          for (let j = 0; j < data[i].images.length; j++) {
            if (String(data[i].images[j]).includes(fileId)) {
              lTagId.push(data[i]._id);
            };
          };
        };
      };
      let fileObjId = mongoose.Types.ObjectId(fileId);
      for (let i = 0; i < lTagId.length; i++) {
        db.LocationTags.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(lTagId[i])
          }, {
            $pull: {
              images: fileObjId
            }
          })
          .then(function (dbArticles) {})
          .catch(function (err) {
            res.json(err);
          });
      }

    });

    //remove the image objectId from the activity tags images array
    db.ActivityTags.find().then(data => {
      let aTagId = [];
      let imagesArr = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].images.length > 0) {
          for (let j = 0; j < data[i].images.length; j++) {
            if (String(data[i].images[j]).includes(fileId)) {
              //   console.log(data[i]._id);
              aTagId.push(data[i]._id)
            };
          };
        };

      };
      let fileObjId = mongoose.Types.ObjectId(fileId);
      for (let i = 0; i < aTagId.length; i++) {
        console.log(aTagId[i]);
        db.ActivityTags.findOneAndUpdate({
            _id: mongoose.Types.ObjectId(aTagId[i])
          }, {
            $pull: {
              images: fileObjId
            }
          })
          .then(function (dbArticles) {})
          .catch(function (err) {
            res.json(err);
          });
      };

    });
  });

  app.get("/api/tags/:id", (req, res) => {
    let fileId = req.params.id;
    db.ActivityTags.find().then(data => {
      const aTagsArr = [];
      for (let i = 0; i < data.length; i++) {
        if (data[i].images.length > 0) {
          for (let j = 0; j < data[i].images.length; j++) {
            if (String(data[i].images[j]) == fileId) {
              aTagsArr.push(data[i].tag);
            };
          };
        };
      };

      db.LocationTags.find().then(data => {
        let lTags;
        for (let i = 0; i < data.length; i++) {
          if (data[i].images.length > 0) {
            for (let j = 0; j < data[i].images.length; j++) {
              if (String(data[i].images[j]) == fileId) {
                lTags = data[i].location;
              };
            };
          };
        };
        const tagsObj = {
          aTags: aTagsArr,
          lTags: lTags
        };
        console.log(tagsObj);

        res.json(tagsObj);
      });
    });


  });
  
  app.delete("/api/tags/delete/:tag/:fileId", (req, res) => {
    const tag = req.params.tag;
    let fileId = req.params.fileId;
    let fileObjId = mongoose.Types.ObjectId(fileId);
    return db.ActivityTags.findOneAndUpdate({
        tag: tag
      }, {
        $pull: {
          images: fileObjId
        }
      })
      .then(function (dbArticles) {})
      .catch(function (err) {
        res.json(err);
      });
  });
    //the auth0 infomation
 app.get("/api/getAuth", (req, res) => {
  const auth_config = {
    domain: process.env.DOMAIN,
    clientId: process.env.CLIENTID
  };
  res.json(auth_config)
 });

};