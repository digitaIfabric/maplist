DELETE FROM points WHERE map_id>4;
DELETE FROM cont_list WHERE map_id>4;
DELETE FROM like_list WHERE map_id>4;
DELETE FROM maps WHERE id>4;

-- Insert points
INSERT INTO points (id, lat, lng, map_id, title, description, image)
    VALUES (3, 45.49810849999999 , -73.5778785 , 2, 'VapeLion', 'The best vape shop', 'https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg');

INSERT INTO points (id, lat, lng, map_id, title, description, image)
    VALUES (4, 45.496067,-73.5801167, 1, 'Café Myriade', 'Acclaimed barista Anthony Benda’s fresh-roasted coffees brewed in a bustling space with a patio', 'https://s3-media2.fl.yelpcdn.com/bphoto/nRB5jJ0hbV_ksDkp23Li0Q/ls.jpg');

INSERT INTO points (id, lat, lng, map_id, title, description, image)
    VALUES (5, 45.5011694, -73.5678161, 1, 'Espace Café', 'Snug, warm espresso bar serving a menu of panini, pastries & wraps in a grand stone building.', 'https://s3-media3.fl.yelpcdn.com/bphoto/fjHgawVuphOlUqJof5D_bw/o.jpg');

INSERT INTO points (id, lat, lng, map_id, title, description, image) VALUES (7, 45.502331, -73.5614527, 1, 'Crew Colletive & Café', 'My favourite place to get coffee', 'https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg');

INSERT INTO points (id, lat, lng, map_id, title, description, image) VALUES (8, 45.5241048, -73.60025009999998, 1, 'Café Olimpico', 'Good bagels', 'http://www.eligiblemagazine.com/wp-content/uploads/2015/06/cafe_olimpico_converted.jpg');

-- Map contributor list
INSERT INTO like_list (id, map_id, user_id) VALUES (3, 1, 2);
INSERT INTO like_list (id, map_id, user_id) VALUES (4, 2, 2);
INSERT INTO cont_list (id, map_id, user_id) VALUES (3, 2, 2);