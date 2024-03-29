$(document).ready(function() {
  //getting the list of maps
  $("#maps-display").on("click", function () {
    $.ajax({
      method: "GET",
      url: "/maps"
    }).done((maps) => {
      $("#maps-div").empty();
      for (map of maps) {
        $("#maps-div").append(`<p class="map-name" data-id="${map.id}">${map.name}</p>`);
      }
    });
  });

  //getting likes
  $("#maps-div").on("click", ".map-name", function(e) {
    const $mapId = $(e.target).data("id");
    $.ajax({
      method: "GET",
      url: `/maps/${$mapId}/likes`
    }).done((likes) => {
      $("#likes-div").empty();
      likes.forEach(function(e) {
        $("#likes-div").append(`<p>${e.user_name}</p>`);
      });
    });
  });

  //getting contributors
  $("#maps-div").on("click", ".map-name", function(e) {
    const $mapId = $(e.target).data("id");
    $.ajax({
      method: "GET",
      url: `/maps/${$mapId}/contributors`
    }).done((contributors) => {
      $("#contributor-div").empty();
      contributors.forEach(function(e) {
        $("#contributor-div").append(`<p>${e.user_name}</p>`);
      });
    });
  });

  //getting the points in a single map
  $("#maps-div").on("click", ".map-name", function(e) {
    $(".map-name").css("text-decoration", "none");
    $(this).css("text-decoration", "underline");
    $("body").append(`<input id="search-input" class="controls exists" type="text" placeholder="Search locations" style="z-index: 0; position: absolute; left: 0px; top: 0px;">`);
    const $mapId = $(e.target).data("id");
    $.ajax({
      method: "GET",
      url: `/maps/${$mapId}`
    }).done((mapPoints) => {
      mapPoints.forEach((e) => {
          getPoints(e.lat, e.lng, e.title, e.id, e.description, e.image, e.map_id);
      });
      showPoints(mapPoints);
      // initMap();
    });
  });

  //editing the points in a single map
  $var = $("#edit-point-button")
  $(document).on("click", "#edit-point-button", function(e) {
    const $title = $("#map-title-edit").text();
    const $description = $("#map-description-edit").text();
    const $mapId = $(this).parent().data("mapid");
    const $pointId = $(this).parent().find("#map-title-edit").data("id");
    $.ajax({
      method: "POST",
      url: `/maps/${$mapId}/points/${$pointId}`,
      data: {
        title: $title,
        description: $description
      }
    }).done(() => {
      console.log('we are in done');
    })
  });


// =======================================================================
// Added sidebar.js Events
// =======================================================================

// Posting map name (key press enter event)
$("#name-input").keypress(function(e) {
    if(e.which === 13) {
        var textInput = $("#name-input").val();
        if (textInput === "") {
            alert("You must write a map name!");
        }
        else {
            $.ajax({
                method: "POST",
                url: "/maps/new",
                data: {name: textInput},
                //success: callback or function with response parameter
                success: function (data) {
                  console.log("The data is: ", data);
                  // TODO Check the data object and get the mapId
                  $("#map").data("mapId", data);
                  //$('#mydiv').data('myval',20); //setter

                }
            }).done(() => {
                console.log("POST map name");
            }).fail((err) => {
                console.log({name: textInput});
                console.log("error");
            });
            // $("#search-input").slideToggle("fast");
            $("#name-input").slideToggle("fast");
            // $("#search-input").select();

        }
    }
});

//Event to add points to db
$(document).on('click', "#add-point-button", function(e){
e.preventDefault();
var points = {};
points.title = $("#map-info").find("#point-title").val();
points.description = $("#map-info").find("#point-description").val();
points.lat = $("#point-lat").val();
points.lng = $("#point-lng").val();
// points.mapId = $("#map-info").data("mapid"); //undefined
console.log("Hello", points);
var $image = "https://s3-media3.fl.yelpcdn.com/bphoto/J74IH84zwxBnpjkrW_gn9Q/o.jpg";
// var $mapId = $("#map-info").data("mapid");
// var $mapId = $("#map-info").data("mapid"); //getter
// console.log("YOUR MAP ID IS: ",$mapId);
  $.ajax({
    method: "POST",
    url: `/maps/324/points/new`,
    data: {lat: points.lat,
           lng: points.lng,
           map_id: 324,
           title: points.title,
           description: points.description,
           image: $image
          },
    success: function (data) {
      console.log("The data is: ", data);
    },
    error : function (error) {
      console.log("error info data: ", error);
    }
  });
});

});
  //deleting the points in a single map
  $(document).on("click", "#delete-point-button", function(e) {
    const $mapId = $(this).parent().data("mapid");
    const $pointId = $(this).parent().find("#map-title-edit").data("id");
    $.ajax({
      method: "POST",
      url: `/maps/${$mapId}/points/${$pointId}/delete`
    }).done((mapPoints) => {
      console.log('Deleted.');
    })
  });

  //getting the user profiles
  $(document).on("click", "#likes-div > p", function(e) {
    const $userName = $("#likes-div").text();
    $.ajax({
      method: "GET",
      url: `/users/${$userName}`
    }).done((userInfo) => {
        let idArr = [];
        let counterObj = {};
        console.log(userInfo[0]);
        $("#user-profile-likes > #likers").empty();
        $("#user-profile-likes > #contributors").empty();
        userInfo[0].forEach((e) => {
          console.log(e.name);
          $("#user-profile-likes > #contributors").append(`<p>${toTitleCase(e.name)}</p>`);
        });
        userInfo[1].forEach((e) => {
          $("#user-profile-likes > #likers").append(`<p>${toTitleCase(e.name)}</p>`);
        });
    });

  $(document).on("click", "#contributor-div > p", function(e) {
    const $userName = $("#contributor-div").text();
    $.ajax({
      method: "GET",
      url: `/users/${$userName}`
    }).done((userInfo) => {
        let idArr = [];
        let counterObj = {};
        console.log(userInfo[0]);
        $("#user-profile-contributors > #likers").empty();
        $("#user-profile-contributors > #contributors").empty();
        userInfo[0].forEach((e) => {
          console.log(e.name);
          $("#user-profile-contributors > #contributors").append(`<p>${toTitleCase(e.name)}</p>`);
        });
        userInfo[1].forEach((e) => {
          $("#user-profile-contributors > #likers").append(`<p>${toTitleCase(e.name)}</p>`);
        });
    });
  });

  $(document).on("click", "#contributor-div > p", function(e) {
    const $userName = $("#contributor-div").text();
});

  //function to capitalize first letters after space
  function toTitleCase(str)
  {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

});