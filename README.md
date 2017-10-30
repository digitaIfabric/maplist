# WikiMaps - maplist.world

## Team Members
- [Cem Olcusenler](https://github.com/mcemolcusenler)
- [David Wawryko](https://github.com/digitalfabric92)

## Project

A web app that allows users to collaboratively create maps which list multiple "points", for example: "Best Places to Eat Around Town" or "Locations of Movie Scenes". Inspired by [Lighthouse Labs](https://github.com/lighthouse-labs). Project still in development.
1. Users can see a list of the available maps
2. Users can view a map
3. A map can contain many points
4. Each point can have: a title, description, and image
5. Authenticated users can create maps*  
6. Authenticated users can modify maps (add, edit, remove points)*
7. Users can favourite a map*
8. Users have profiles, indicating their favourite maps and maps they've contributed to
## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Dependencies

- "Node": 5.10.x or above
- "NPM": 3.8.x or above
- "body-parser": "^1.15.2",
- "dotenv": "^4.0.0",
- "express": "^4.13.4",
- "knex": "^0.13.0",
- "Morgan": "^1.7.0",
- "node-sass": "4.3.0",
- "node-sass-middleware": "^0.11.0",
- "pg": "^7.0.1"

 ## Screenshots
 
 ![Homescreen](https://github.com/digitalfabric92/maplist/blob/master/public/images/maplist_world_mapname.png)
 ![List of maps](https://github.com/digitalfabric92/maplist/blob/master/public/images/maplist_world_maplist.png)
 ![Points](https://github.com/digitalfabric92/maplist/blob/master/public/images/maplist_world_infowindow.png)
 ![Places](https://github.com/digitalfabric92/maplist/blob/master/public/images/maplist_world_places.png)
 ![Cont](https://github.com/digitalfabric92/maplist/blob/master/public/images/maplist_world_cont.png)
