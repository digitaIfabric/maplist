function CenterControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginRight = '10px';
    controlUI.style.marginTop = '10px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '13px';
    controlText.style.lineHeight = '30px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Center map';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
        map.setCenter({lat: 45.4998913, lng: -73.5605561});
    });
}

createInfoWindow = function(markerTitle, markerDesc){
var WO = new google.maps.InfoWindow({
  maxWidth: 200,
  maxHeight: 500,
  // var contentString = `<div data-mapId="${mapId}"><h5 id="map-title">Title: </h5><p contenteditable="true" data-id="${pointId}" id="map-title-edit">${title}</p><h5>Description:</h5><p contenteditable="true" id="map-description-edit">${description}</p><h5>Image: </h5><img src="${image}" height="50" width="50"><br/><button id="edit-point-button">Edit point</button><br/><button id="delete-point-button">Delete point</button></div>`;
  content:  `<div id="map-info"><h5 data-mapId="${map.id}"> Title: </h5><input id="map-title" value="${markerTitle}">
            <h5>Description: </h5><input id="point-description" value="${markerDesc}"> 
            <h5>Image:</h5><img src="https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg" height="50" width="50">
            </br><button id="add-point-button">Add to map</button></div>`
})
    return WO;
};

function initMap() {

    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType(
        [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f5f5f5"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#9a908c"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#a3ccff"},{"visibility":"on"}]}],{name: 'Styled Map'});

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
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
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
    });

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

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        //Console logs for places array;
        console.log(places[0]);
        console.log("{lat: ",places[0].geometry.location.lat(),"lng: ",places[0].geometry.location.lng(),"}");
        console.log(places[0].geometry.location.lat());
        console.log(places[0].geometry.location.lng());
        console.log("title: ", places[0].name);
        console.log("description: ", places[0].website);
        console.log("image: ", places[0].icon);

        if (places.length == 0) {
            return;
        }

        var infowindows = {};
        // Clear out the old markers.
        markers.forEach(function(marker) {
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
        markers = [];

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
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

              markers[markers.length - 1].addListener('click', function() {
                createInfoWindow(markers[markers.length -1].title, markers[markers.length -1].website).open(map, markers[markers.length - 1]);
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


}