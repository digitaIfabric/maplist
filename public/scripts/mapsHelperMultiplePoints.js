//shows markers on a map
function showPoints (data) {
  //retrieve & store the points data from the AJAX call
  var markers = data;
  console.log(markers);

  //initialize a map that is centered in Montreal
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

  // Create the search box and link it to the UI element.
  var input = document.getElementById('search-input');
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  //create an Info Window Content array, will loop thru the data array
  var infoWindowContent = [];
  markers.forEach(function(e) {
    infoWindowContent.push(`<div data-mapId="${e.map_id}"><h5 id="map-title">Title: </h5><p contenteditable="true" data-id="${e.id}" id="map-title-edit">${e.title}</p><h5>Description:</h5><p contenteditable="true" id="map-description-edit">${e.description}</p><h5>Image: </h5><img src="${e.image}" height="50" width="50"><br/><button id="edit-point-button">Edit point</button><br/><button id="delete-point-button">Delete point</button></div>`);
  })
  console.log(infoWindowContent);

  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow({maxWidth: 200, maxHeight: 500/*, content: infoWindowContent[i]}*/}), marker, i;

  // Loop through our array of markers & place each one on the map
  for( i = 0; i < markers.length; i++ ) {
    var position = new google.maps.LatLng(markers[i].lat, markers[i].lng);
    // bounds.extend(position);
    marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i].title
    });
    // Allow each marker to have an info window
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        console.log(infoWindowContent[i]);
        infoWindow.setContent(infoWindowContent[i]);
        infoWindow.open(map, marker);
      }
    })(marker, i));

    // Automatically center the map fitting all markers on the screen
    // map.fitBounds(bounds);
  }

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
}


