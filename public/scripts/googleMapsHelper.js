//this is a helper function which should get triggered by app.js in the .done statement
function getPoints(lat, lng, title) {
  var myLatLng = {lat: lat, lng: lng};

  var styledMapType = new google.maps.StyledMapType(
        [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f5f5f5"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#9a908c"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#a3ccff"},{"visibility":"on"}]}],{name: 'Styled Map'});

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

  var contentString = '<p data-title="${title} id="map-title-edit">' + '${title}' + '</p>' +
                      '<p data-description="${title} id="map-description-edit">' + '${description}: This is a test description' + '</p>';
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  // Add listener
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });


}