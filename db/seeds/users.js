exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('cont_list').del(),
    knex('like_list').del(),
    knex('points').del(),
    knex('users').del(),
    knex('maps').del()
    ])
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, user_name: 'David', email_address: 'dwawryko@gmail.com'}),
        knex('users').insert({id: 2, user_name: 'Cem', email_address: 'cem.olcusenler@gmail.com'}),
        knex('maps').insert({id: 1, name: 'cafes'}),
        knex('maps').insert({id: 2, name: 'vape shops'}),
        knex('maps').insert({id: 3, name: 'bars'}),
        knex('cont_list').insert({id: 1, map_id: 1, user_id:1}),
        knex('cont_list').insert({id: 2, map_id: 2, user_id:1}),
        knex('cont_list').insert({id: 3, map_id: 3, user_id:2}),
        knex('like_list').insert({id: 1, map_id: 1, user_id:1}),
        knex('like_list').insert({id: 2, map_id: 2, user_id:1}),
        knex('like_list').insert({id: 3, map_id: 3, user_id:2}),
        knex('points').insert({id: 1, lat: 45.5023347, lng: -73.5614527, map_id: 1, title: 'Crew', description: 'Book a membership at the Collective or rent one of our beautiful meeting rooms. ', image: 'https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg'}),
        knex('points').insert({id: 2, lat: 45.5024503, lng: -73.5740849, map_id: 2, title: 'Vaporus', description: 'Quality liquids.', image: 'https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg'}),
        knex('points').insert({id: 3, lat: 45.5162606, lng: -73.5678409, map_id: 3, title: 'Le 4e mur', description: 'Bar / Lounge le4emur.com ', image: 'https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg'})
      ]);
    });
};