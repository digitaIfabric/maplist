//this is a helper function which should get triggered by app.js in the .done statement
function getPoints(lat, lng, title) {
  var myLatLng = {lat: lat, lng: lng};

  var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 45.4998913, lng: -73.5605561},
      zoom: 13,
      mapControl: false,
      mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
              'styled_map'],
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_LEFT
      },
      zoomControl: true,
      zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER
      },
      scaleControl: true,
      streetViewControl: true,
      streetViewControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      fullscreenControl: false,
      fullscreenControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
      },
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: title
  });
}