/* eslint-disable no-console */
const { join } = require("path");
const morgan = require("morgan");
const express = require("express");
const methodOveride = require("method-override");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOveride("_method"));
app.use(express.static(join(__dirname, "build")));
require("./controllers/controller")(app);
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  };
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
