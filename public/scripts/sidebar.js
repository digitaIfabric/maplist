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
    // Enter key press event for adding points
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
                $("#search-input").select();
            }
        }
    });
});