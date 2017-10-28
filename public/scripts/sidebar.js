$(document).ready(function() {

    $("#likes-display").click(function(){
        $("#likes-div").slideToggle("fast");
    });

    $("#contributor-display").click(function(){
        $("#contributor-div").slideToggle("fast");
    });

    $("#maps-display").click(function(){
        $("#maps-div").slideToggle("fast");
    });


    // Added click event for new icon map
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
                    data: {name: textInput}
                }).done(() => {
                    console.log("POST map name");
                }).fail((err) => {
                    console.log({name: textInput});
                    console.log("error");
                });
                // alert("You added this map (NOT YET)");
                $("#search-input").slideToggle("fast");
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

    var $mapId = $(e.target).data("mapId");
    $.ajax({
      method: "POST",
      url: `/maps/${$mapId}/points/new`,
      data: {title: $title}
    }).done(() => {
      console.log("POST map point");
  }).fail((err) => {
      console.log({title: $title});
    console.log("error");
  });


  });

});