DELETE FROM points WHERE map_id>4;
DELETE FROM cont_list WHERE map_id>4;
DELETE FROM like_list WHERE map_id>4;
DELETE FROM maps WHERE id>4;


INSERT INTO points (id, lat, lng, map_id, title, description, image)
    VALUES (3, 45.49810849999999 , -73.5778785 , 2, 'VapeLion', 'The best vape shop', 'https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg');

INSERT INTO points (id, lat, lng, map_id, title, description, image)
    VALUES (4, 45.496067,-73.5801167, 1, 'Café Myriade', 'Acclaimed barista Anthony Benda’s fresh-roasted coffees brewed in a bustling space with a patio', 'https://s3-media2.fl.yelpcdn.com/bphoto/nRB5jJ0hbV_ksDkp23Li0Q/ls.jpg');

INSERT INTO points (id, lat, lng, map_id, title, description, image)
    VALUES (5, 45.5011694, -73.5678161, 1, 'Espace Café', 'Snug, warm espresso bar serving a menu of panini, pastries & wraps in a grand stone building.', 'https://s3-media3.fl.yelpcdn.com/bphoto/fjHgawVuphOlUqJof5D_bw/o.jpg');

INSERT INTO points (id, lat, lng, map_id, title, description, image) VALUES (6, 45.4831828, -73.5771912, 1, 'September Cafe', 'Coffee shop with surf retail store and DIY surfboard workshop', 'https://s3-media3.fl.yelpcdn.com/bphoto/9zAiduA9NTip_9weUpe8fA/348s.jpg');