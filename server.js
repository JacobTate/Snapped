/* eslint-disable no-console */
const express = require("express");
const { join } = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require('method-override');

const app = express();

const port = process.env.SERVER_PORT || 3001;

app.use(express.json());
app.use(express.static(join(__dirname, "build")));
app.use(methodOverride('_method'));

const uri = process.env.ATLAS_URI;
mongoose.connect('uri', {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () =>{   
    console.log("Mongodb database connection successful");
})


// app.use(morgan("dev"));
// app.use(express.static(join(__dirname, "build")));

app.listen(port, () => console.log(`Listening on port ${port}`));









// const express = require("express");
// const { join } = require("path");
// const morgan = require("morgan");
// const app = express();

// const port = process.env.SERVER_PORT || 3001;

// app.use(morgan("dev"));
// app.use(express.static(join(__dirname, "build")));

// app.listen(port, () => console.log(`Listening on port ${port}`));
