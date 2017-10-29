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
    $("body").append(`<input id="search-input" class="controls exists" type="text" placeholder="Add a location" autocomplete="off" style="z-index: 0; position: absolute; left: 0px; top: 0px;">`);
    const $mapId = $(e.target).data("id");
    $.ajax({
      method: "GET",
      url: `/maps/${$mapId}`
    }).done((mapPoints) => {
      showPoints(mapPoints);
    });
  });

  //editing the points in a single map
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
        let counter = 0;
        let counterObj = {};
        console.log(userInfo[0][0].name);
        $("#user-profile-likes > #likers").empty();
        $("#user-profile-likes > #contributors").empty();
        userInfo.forEach((e, index) => {
          e.forEach((el) => {
            console.log(el);
            idArr.push(el.id);
            console.log('idArr:',idArr)
            for (var i = 0; i < idArr.length; i++) {
              if (idArr[index] === idArr[i]) {
                console.log('aldready exists');
              }
            }
            // idArr.forEach((element) => {
            //   if (element === el.id) {
            //     console.log('element: ', element, 'id: ', el.id);
            //     counter += 1;
            //     console.log(counter);
            //   }
            //   if (counter > 1) {
            //     console.log('above will appended to likes');
            //     $("#user-profile-likes > #likers").append(`<p>${el.name}</p>`);
            //     return true;
            //   } else if (counter <= 1) {
            //     console.log('above will be appended to conts')
            //     $("#user-profile-likes > #contributors").append(`<p>${el.name}</p>`);
            //   }
            // })

          });
        });
        console.log($("#user-profile-likes > #likers").text());
    });
  });

  $(document).on("click", "#contributor-div > p", function(e) {
    const $userName = $("#contributor-div").text();
  });


});





