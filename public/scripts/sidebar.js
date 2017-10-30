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
    // $("#new-point-icon").click(function(){
    //    $("#search-input").slideToggle("fast");
    // });

    // Display the user profile on clicking the user name in likes-div
    $(document).on("click", "#likes-div > p", function(e) {
        $("#user-profile-likes").slideToggle("fast");
    });

    //Display the user profile on clicking the user name in contributor-div
    $(document).on("click", "#contributor-div > p", function(e) {
        $("#user-profile-contributors").slideToggle("fast");
    });

    // Display map name input on click
    $("#new-map-icon").click(function(){
        $("#name-input").slideToggle("fast");
        $("#name-input").select();
    });

      $("#new-point-icon").click(function(){
        // alert("HEY");
        $("#search-input").slideToggle("fast");
      });

    //=============================
    //             // alert("You added this map (NOT YET)");
    //             $("#search-input").slideToggle("fast");
    //             $("#name-input").slideToggle("fast");
    //             // $("#search-input").select();
    //         }
    //     }
    // });
    //=============================

    //Display search-input on click
    // $("#new-point-icon").click(function(){
    //     if ($("#search-input").hasClass("exists")) {
    //         $("#search-input").remove();
    //     };
    // });

});
