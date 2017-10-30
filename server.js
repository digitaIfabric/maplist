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

//global var object

var globalVar = {};

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
      results.forEach(function(e) {
        globalVar.title = e.title;
        console.log('globalVar.title', globalVar.title);
        globalVar.description = e.description;
        console.log('globalVar.description', globalVar.description);
      })
      res.json(results);
    });
});

// Insert map name into the database (Add data atribute to map div)

app.post("/maps/new", (req, res) => {
  // const mapid = req.params.id;
  const mapName = req.body.name;
  knex('maps').insert({name: mapName}).then((results) => {
    console.log("Added name to database");
  }).catch((err) => {
    console.log("Error", err);
  })

});





// app.post("/maps/new", (req, res) => {
//     //const mapid = req.params.id;
//     const mapName = req.body.name;
//
//
// knex('maps')
//     .insert({name: mapName})
//     .then((results) => {
//         knex('maps')
//           .select('id')
//           .where('name', mapName)
//           .then((results) => {
//             console.log("New results: ",results);
//           }).catch((err) => {
//             console.log("Error: ",err);
//       })
//     })
//   .catch((err) => {
//     console.log("Error: ",err);
//   });
//
// });

// function () {
//   return Promise.all([
//     knex('users').insert({id: 1, user_name: 'David', email_address: 'dwawryko@gmail.com'}),
//     knex('users').insert({id: 2, user_name: 'Cem', email_address: 'cem.olcusenler@gmail.com'}),
//
// function (knex,callback) {
//

// function(knex, Promise) {
  //   return Promise.all([
  // knex('maps').insert({name: mapName}),
  // knex('maps').select('id').where('name', mapName).then((results) => {
  //     console.log("Added map name to database");
  //     console.log("New results",results);
  //     console.log("Added map name to database");
  //     }).catch((err) => {
  //       console.log("Error", err);
  //     });
  //   ]);
  // };
      // knex('maps').insert({name: mapName}).then((results) => {
      //res.send({result: results});
      //
      // SELECT id FROM maps WHERE name = mapName
      //res.send({ mapId : results.rowCount });
      //console.log("THIS is the results object",results);
      // const mapId = results.body.mapId;

    // }).catch((err) => {
    //     console.log("Error", err);
    // })

// // Insert point into the database
// app.post("maps/:id/points/new", (req, res) => {
//   // const mapid = req.params.id;
//   // req.params.id
//   // const pointLat = req.body.lat;
//   // const pointLng = req.body.lng;
//   // const mapId = req.body.map_id;
//   // const pointTitle = req.body.title;
//   // const pointDescription = req.body.description;
//   // const pointImage = req.body.image;
//   knex('points')
//       .insert({lat: req.body.lat,
//                lng: req.body.lng,
//                map_id: req.body.map_id,
//                title: req.body.title,
//                description: req.body.description,
//                image: req.body.image})
//     .then((results) => {
//         //res.json(results)
//         console.log("Here are the server results: ", results);
//     }).catch((err) => {
//         console.log("Server error: ", err);
//     })
// });

// Insert point into the database
// TODO DEBUG this
app.post("maps/:id/points/new", (req, res) => {
  console.log("Server post for new point")
  console.log(req.body);
  //const $mapId = req.body.map_id;
  knex('points')
  .insert({
            lat: req.body.lat,
            lng: req.body.lng,
            map_id: req.body.map_id,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
          }).then((results) => {
          }).catch((err) => {
            console.log(err);
            res.status(400).send("Point marker error");
          });
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

//edit points in a map
app.post("/maps/:id/points/:pointId", (req, res) => {
  knex("points")
    .where("id", req.params.pointId).andWhere("map_id", req.params.id)
    .update({
      title: req.body.title,
      description: req.body.description
    })
    .then((results) => {
      console.log("This is inside the results!")
    });
});

//delete points from a map
app.post("/maps/:id/points/:pointId/delete", (req, res) => {
  knex("points")
    .where("id", req.params.pointId).andWhere("map_id", req.params.id)
    .del()
    .then((results) => {
      res.json(results);
    });
});

//get the user profile
app.get("/users/:username", (req, res) => {
  return Promise.all([
    knex
      .select("*")
      .from("users").innerJoin("cont_list", "user_id", "users.id").innerJoin("maps", "maps.id", "map_id")
      .where("user_name", req.params.username),
    knex
      .select("*")
      .from("users").innerJoin("like_list", "user_id", "users.id").innerJoin("maps", "maps.id", "map_id")
      .where("user_name", req.params.username)
    ]).then((results) => {
        res.json(results)
      });
});