$(document).ready(function() {
  $("#maps-display").on("click", function () {
    $.ajax({
      method: "GET",
      url: "/maps"
    }).done((maps) => {
      $("#maps-div").empty();
      for (map of maps) {
        //append the data atr to the p tag
        $("#maps-div").append(`<p class="map-name" data-id="${map.id}">${map.name}</p>`);
      }
    });
  });

  $("#maps-div").on("click", ".map-name", function(e) {
    console.log(e.target);
    // console.log('Inside the .map-name');
    //define var from data atr
    const $mapId = $(e.target).data("id");
    console.log($mapId);
    $.ajax({
      method: "GET",
      url: `/maps/${$mapId}/likes` //pass in the data atr
    }).done((likes) => {
      console.log("Display is here!");
    })
  });
});