"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

// Get the list of maps created
// error parameter to be added (req is what we recieve, res is what we respond)
app.get("/maps", (req, res) => {
  knex
    .select("*")
    .from("maps")
    .then((results) => {
      res.json(results);
    });
});

//get the points in a map
app.get("/maps/:id", (req, res) => {
  knex
    .select("*")
    .from("points")
    .where("map_id", req.params.id)
    .then((results) => {
      console.log('results', results);
      res.json(results);
    });
});

// Insert map name into the database
app.post("/maps/new", (req, res) => {
    // const mapid = req.params.id;
    const mapName = req.body.name;
    knex('maps').insert({name: mapName}).then((results) => {
      //res.send({result: results});
      //
      // TODO DEBUG this and determine results.id is the right thing to send
      //
      res.send({ mapId : results.id });
      console.log(results)
      // const mapId = results.body.mapId;
      console.log("Added name to database");
    }).catch((err) => {
        console.log("Error", err);
    })
});

// Insert point into the database
app.post("maps/:id/points/new", (req, res) => {
  // const mapid = req.params.id;
  // req.params.id
  //
  //
  const mapTitle = req.body.title;
  console.log("MAPTITLE is",mapTitle);
  knex('points').insert({title: mapTitle}).where("map_id", 4).then((results) => {
    console.log("Added point title to database");

  }).catch((err) => {
    console.log("Error", err);
  })
});

//Get the list of Users who liked the map
app.get("/maps/:id/likes", (req, res) => {
  knex
    .select("*")
    .from("like_list").innerJoin("users", "user_id", "users.id")
    .where("map_id", req.params.id)
    .then((results) => {
      results.forEach(function(e) {
        res.json(results);
      });
    });
});

//get the list of Users who contributed to the map
app.get("/maps/:id/contributors", (req, res) => {
  knex
    .select("*")
    .from("cont_list").innerJoin("users", "user_id", "users.id")
    .where("map_id", req.params.id)
    .then((results) => {
      results.forEach(function(e) {
        res.json(results);
      });
    });
});

//update points in a map
// app.post("/maps/:id/points/:pointId", (req, res) => {
//   knex
//     .select("*")
// })
