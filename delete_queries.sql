INSERT INTO points (id, lat, lng, map_id, title, description, image) VALUES (3, 45.502331, -73.5614527, 1, 'Crew Colletive & Café', 'My favourite place to get coffee', 'https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg');
INSERT INTO points (id, lat, lng, map_id, title, description, image) VALUES (9, 45.502331, -73.5614527, 307, 'Crew Colletive & Café', 'My favourite place to get coffee', 'https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg');


DELETE FROM points WHERE map_id=2;
DELETE FROM cont_list WHERE map_id=2;
DELETE FROM like_list WHERE map_id=2;
DELETE FROM maps WHERE id=2;

-- Insert points
INSERT INTO points (id, lat, lng, map_id, title, description, image)
    VALUES (3, 45.49810849999999 , -73.5778785 , 2, 'VapeLion', 'The best vape shop', 'https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg');

INSERT INTO points (id, lat, lng, map_id, title, description, image)
    VALUES (1, 45.496067,-73.5801167, 1, 'Café Myriade', 'Acclaimed barista Anthony Benda’s fresh-roasted coffees brewed in a bustling space with a patio', 'https://s3-media2.fl.yelpcdn.com/bphoto/nRB5jJ0hbV_ksDkp23Li0Q/ls.jpg');

INSERT INTO points (id, lat, lng, map_id, title, description, image)
    VALUES (2, 45.5011694, -73.5678161, 1, 'Espace Café', 'Snug, warm espresso bar serving a menu of panini, pastries & wraps in a grand stone building.', 'https://s3-media3.fl.yelpcdn.com/bphoto/fjHgawVuphOlUqJof5D_bw/o.jpg');



INSERT INTO points (id, lat, lng, map_id, title, description, image) VALUES (8, 45.5241048, -73.60025009999998, 1, 'Café Olimpico', 'Good bagels', 'http://www.eligiblemagazine.com/wp-content/uploads/2015/06/cafe_olimpico_converted.jpg');

-- Map contributor list
INSERT INTO like_list (id, map_id, user_id) VALUES (3, 1, 2);
INSERT INTO like_list (id, map_id, user_id) VALUES (4, 2, 2);
INSERT INTO cont_list (id, map_id, user_id) VALUES (3, 2, 2);


DELETE FROM cont_list WHERE id=3;
DELETE FROM cont_list WHERE id=4;
DELETE FROM like_list WHERE id=3;
DELETE FROM like_list WHERE id=4;




DELETE FROM cont_list WHERE id=1;
INSERT INTO cont_list (id, map_id, user_id) VALUES (3, 1, 2);



UPDATE points SET image = 'https://s3-media2.fl.yelpcdn.com/bphoto/iASpsjav5aRCXCUxZADzDA/ls.jpg' WHERE id=3;

UPDATE points SET image = 'https://s3-media1.fl.yelpcdn.com/bphoto/TmQawabhE2nfPpUvJuZqxg/180s.jpg' WHERE id=2;

-- vape lion 3
-- vaporus 2



DELETE FROM points WHERE map_id=319;
DELETE FROM cont_list WHERE map_id=319;
DELETE FROM like_list WHERE map_id=319;
DELETE FROM maps WHERE id=319;