$(document).ready(function() {
    // Display likes list
    $("#likes-display").click(function(){
        $("#likes-div").slideToggle("fast");
    });

    // Display contributors list
    $("#contributor-display").click(function(){
        $("#contributor-div").slideToggle("fast");
    });

    // Display to show map name div
    $("#maps-display").click(function(){
        $("#maps-div").slideToggle("fast");
    });

    // Display search-input on click
    $("#new-point-icon").click(function(){
       $("#search-input").slideToggle("fast");
    });

    // Display map name input on click
    $("#new-map-icon").click(function(){
        $("#name-input").slideToggle("fast");
        $("#name-input").select();
    });
    // Enter key press event for adding map name
    $("#name-input").keypress(function(e) {
        if(e.which === 13) {
            var textInput = $("#name-input").val();
            if (textInput === "") {
                alert("You must write a map name!");
            }
            else {
                console.log(textInput);
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
                // alert("You added this map (NOT YET)");
                // $("#search-input").slideToggle("fast");
                $("#name-input").slideToggle("fast");
                // $("#search-input").select();
            }
        }
    });

  // Event to add points to db
  var $selector = "#add-point-button"; //class for your infobox buttons list
  $(document).on('click', $selector, function(e){
    e.preventDefault();
    alert("You added this point to the map (NOT YET)");
    var points = {title: "hi"};
    // $selector.slideToggle("fast");
    // console.log("#map-title".val());
    // points["title"] = $("#map-info").val();
    points.title = $("#map-info").find("#map-title").val();
    var $title = points.title;

    // Getter
    var $mapId = $('#map').data('mapId'); //getter
    console.log($mapId);
    //var $mapId = $(e.target).data("mapId");
    $.ajax({
      method: "POST",
      url: `/maps/${$mapId}/points/new`,
      data: {title: $title}
    }).done((msg) => {
      console.log(msg);
      alert( "Result:" + msg);
  }).fail((err) => {
      console.log({title: $title});
    console.log("This is an error getting the maps id");
  });


  });

});
