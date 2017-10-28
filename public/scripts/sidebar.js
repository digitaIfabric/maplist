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
        $("#name-input").slideToggle("slow");
        $("#name-input").select();
    });

});
