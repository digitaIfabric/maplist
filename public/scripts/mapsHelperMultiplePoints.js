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
      mapTypeControl: false,
      mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
              'styled_map'],
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_LEFT
      },
      zoomControl: false,
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
  var infoWindow = new google.maps.InfoWindow({maxWidth: 200, maxHeight: 500, pixelOffset: new google.maps.Size(-25,0)/*, content: infoWindowContent[i]}*/}), marker, i;

  // Loop through our array of markers & place each one on the map
  for( i = 0; i < markers.length; i++ ) {
    var position = new google.maps.LatLng(markers[i].lat, markers[i].lng);
    // bounds.extend(position);
    marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i].title,
        animation: google.maps.Animation.DROP
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


  createInfoWindow = function(markerTitle, markerDesc, markerLat, markerLng){
    var WO = new google.maps.InfoWindow({
      maxWidth: 200,
      maxHeight: 500,
      pixelOffset: new google.maps.Size(-25,0),
      content:  `<div id="map-info" data-mapid="${map.id}"><h5> Title: </h5><input id="point-title" value="${markerTitle}">
            <h5>Description: </h5><input id="point-description" value="${markerDesc}">
            <input id="point-lat" value="${markerLat}"> <input id="point-lng" value="${markerLng}">
            <h5>Image:</h5><img id="point-image" src="https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg" height="50" width="50">
            </br><button id="add-point-button">Add to map</button></div>`
    })
    return WO;
  };

// function xyz(){
//   alert('Add point to DB captured');
//   //console.log(places[0].geometry.location.lat());
//   //console.log(places[0].geometry.location.lng());
//   console.log($("#map-info").find("#point-title").val());
//   console.log($("#point-lat").val());
//   console.log($("#point-lng").val());
//   // var $mapId = $("#map-info").data("mapId"); //getter
//   var $image = "https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg";
//   console.log("The mapId is: ", `${map.id}` );
//
//   $.ajax({
//     method: "POST",
//     url: "/maps/269/points/new",
//     data: {lat: $("#point-lat").val(),
//            lng: $("#point-lng").val(),
//            map_id: 274,
//            title: $("#map-info").find("#point-title").val(),
//            description: $("#map-info").find("#point-description").val(),
//            image: $image
//           },
//     success: function (data) {
//       console.log("The data is: ", data);
//     },
//     error : function (xhr,status,error) {
//       alert("Status: " + status);
//       alert("Error: " + error);
//       alert("xhr: " + xhr.readyState);
//       console.log("error info: ", data.lat, data.lng, 274, data.title, data.description, data.image);
//     }
//     })
//   //WO.close();
//   // WO.setContent('<div style="background-color: green">'"</div>");
// }



    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    // var styledMapType = new google.maps.StyledMapType(
    //   [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f5f5f5"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#9a908c"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#a3ccff"},{"visibility":"on"}]}],{name: 'Styled Map'});
    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    // var map = new google.maps.Map(document.getElementById('map'), {
    //   center: {lat: 45.4998913, lng: -73.5605561},
    //   zoom: 13,
    //   mapControl: false,
    //   mapTypeControl: false,
    //   mapTypeControlOptions: {
    //     mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
    //       'styled_map'],
    //     style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
    //     position: google.maps.ControlPosition.TOP_LEFT
    //   },
    //   zoomControl: false,
    //   zoomControlOptions: {
    //     position: google.maps.ControlPosition.LEFT_CENTER
    //   },
    //   scaleControl: true,
    //   streetViewControl: true,
    //   streetViewControlOptions: {
    //     position: google.maps.ControlPosition.LEFT_BOTTOM
    //   },
    //   fullscreenControl: false,
    //   fullscreenControlOptions: {
    //     position: google.maps.ControlPosition.BOTTOM_CENTER
    //   },
    // });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('search-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);

    var markersSearch = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      //Console logs for places array;
      // console.log(places[0]);
      // console.log("{lat: ",places[0].geometry.location.lat(),"lng: ",places[0].geometry.location.lng(),"}");
      // console.log("map.js lat: ", places[0].geometry.location.lat());
      var lattitude = places[0].geometry.location.lat();
      // console.log("Lattitude:",lattitude)
      // console.log("map.js lng: ", places[0].geometry.location.lng());
      var longitude = places[0].geometry.location.lng();
      // console.log("Longitude:",longitude)
      // console.log("title: ", places[0].name);
      // console.log("description: ", places[0].website);
      // console.log("image: ", places[0].icon);

      if (places.length == 0) {
        return;
      }

      var infowindows = {};
      // Clear out the old markers.
      markersSearch.forEach(function(marker) {
        var contentString = '<p>Test</p>';
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        infowindows[marker.title] = {
          contentString: contentString,
          infoWindow: infowindow,
          marker: marker
        };
        marker.setMap(null);
        marker.addListener('click', function() {
          infowindows[marker.title].infoWindow.open(map, marker);
        });
      });
      markersSearch = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markersSearch.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location,
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
          animation: google.maps.Animation.DROP
        }));

        markersSearch[markersSearch.length - 1].addListener('click', function() {
          var mark = markersSearch[markersSearch.length - 1];
          createInfoWindow(mark.title, mark.website, lattitude, longitude).open(map, mark);
        });



        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    // Add point to database
    //   map.addListener('bounds_changed', function() {
    //     searchBox.setBounds(map.getBounds());
    //   });









}


