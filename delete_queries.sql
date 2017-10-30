DELETE FROM points WHERE map_id>4;
DELETE FROM cont_list WHERE map_id>4;
DELETE FROM like_list WHERE map_id>4;
DELETE FROM maps WHERE id>4;


INSERT INTO points (id, lat, lng, map_id, title, description, image)
    VALUES (3, 45.49810849999999 , -73.5778785 , 2, 'VapeLion', 'The best vape shop', 'https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg');
