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
    $("#name-input").keypress(function(e) {
        if(e.which == 13) {
            alert('You added a map to the database (NOT YET)');
            $("#search-input").slideToggle("fast");
            $("#name-input").slideToggle("fast");
            $("#search-input").select();
        }
    });

});