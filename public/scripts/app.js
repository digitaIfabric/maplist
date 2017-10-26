$(document).ready(function() {

  $("#maps-display").on("click", function () {
    $.ajax({
      method: "GET",
      url: "/maps"
    }).done((maps) => {
      $("#maps-div").empty();
      for (map of maps) {
        $("#maps-div").append(`<p class="map-name">${map.name}</p>`);
      }
    });
  });


    // $('.new-tweet form').submit(function(event) {
    //     console.log("Event Submitted")
    //     event.preventDefault();
    //     let tweetContent = $(this).find("textarea").val();
    //     if (tweetContent === "") {
    //         let $emptyTweetErr = $("<p>").text("Write something!").css("color", "red");
    //         $("#errors").append($emptyTweetErr);
    //     } else if ($(".counter").text() < 0){
    //         let $counterTweetErr = $("<p>").text("Less than 280 characters!").css("color", "red");
    //         $("#errors").append($counterTweetErr);
    //     } else {
    //         $("#errors").empty();
    //         $.ajax({
    //             url: '/tweets/',
    //             method: 'POST',
    //             // let serData = $( this ).serialize(),
    //             data: $(this).serialize(),
    //             success: function (tweet) {
    //                 // this refers to the '.new-tweet form' selector
    //                 //console.log(tweet);
    //                 renderTweets([tweet]);
    //
    //             }
    //
    //         })
    //
    //     }
    //
    //
    // })


    // $("#maps-display").on("click", function () {
    //     $.ajax({
    //         method: "GET",
    //         url: "/maps"
    //     }).done((maps) => {
    //         $("#maps-div").empty();
    //     for (map of maps) {
    //         $("#maps-div").append(`<p class="map-name">${map.name}</p>`);
    //     }
    // });

});