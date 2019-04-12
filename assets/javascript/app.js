// Global variable declaration
var topic = [
  "Nicolas Cage",
  "Chris Hemsworth",
  "Jennifer Lawrence",
  "Will Smith",
  "Paul Walker",
  "Maisie Williams",
  "Ryan Gosling",
  "Ryan Reynolds",
  "Tom Hiddleston",
  "Bruce Lee"
];
var $searchInput = ""
var apiKey = "l9UUgKJTCsuko1IP4Vr6Ei45RatYYsSZ"


//create buttons from array
$(document).ready(function () {

  //create a form that takes new search items and adds them to the array

  var $searchButton = $("#search-button");
  var $searchInput = $("#search-input");
  $searchButton.on("click", function (event) {
    event.preventDefault()
    if ($searchInput.val() === "") {
      alert("You have not made a valid selection");
    } else {
      var gifRequest = $searchInput.val().trim()
      topic.push(gifRequest);
      makeButtons();
    }
  })

  function makeButtons() {
    $("#button-pool").empty();
    for (var i = 0; i < topic.length; i++) {
      var $gifButton = $("<button>");
      $gifButton.addClass("gif-button btn btn-primary btn-lg mr-2 mt-2 flex-column");
      $gifButton.attr("data-name", topic[i]);
      $gifButton.text(topic[i]);
      $("#button-pool").append($gifButton)
    }
  }

  makeButtons();
  // pause();



  //make request to api and display the gifs based on a button click

  $(document).on("click", "button", function () {
    var giphy = $(this).attr("data-name")

    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${giphy}&api_key=${apiKey}&limit=10`;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

          if (results[i].rating !== "r") {
            var gifDiv = $("<div>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var imgGif = $("<img>");
            imgGif.attr("src", results[i].images.fixed_height_small_still.url);
            imgGif.attr("data-still", results[i].images.fixed_height_small_still.url);
            imgGif.attr("data-animate", results[i].images.fixed_height_small.url);
            imgGif.attr("data-state", "animate");
            console.log(imgGif);
            gifDiv.append(imgGif);

            $("#gifDisplay").prepend(gifDiv, p);


            $("img").on("click", function () {

              var state = $(this).attr("data-state");

              if (state === "still") {
                console.log(state);
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }

            })
          }
        }
      })

  })

})