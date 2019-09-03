//Define name of buttons
var titles = ["Cat", "Dog", "Dolphin", "Tiger", "Duck", "Eagle", "Penguin", "Horse", "Wolf", "Rabbit"];

// Function to create Buttons for the titles

function newButton () {
    $("#buttons").empty();
    for (var i = 0; i < titles.length; i++) {
        var a = $("<button>");
        a.addClass("titles");
        a.attr("data-titles", titles[i]);
        a.text(titles[i]);
        $("#buttons").append(a);
    }
}
//Call the function
newButton();

//Define Offset
 let offset = 0;

// Click on document using titles class since page is going to be dynamic
$(document).on("click", ".titles", function () {
   
    // Grabbing and storing the data-giphy property value from the button
     var titles = $(this).attr("data-titles");

   
    // Constructing a queryURL using the giphy name
    var queryURL = `https://api.giphy.com/v1/gifs/search?q=${titles}&api_key=dc6zaTOxFJmzC&limit=10&offset=${offset}`;

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(response)
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating and storing a div tag
                    var giphyDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var giphyImage = $("<img>");

                    // Setting the src attribute of the image to a property pulled off the result item
                    giphyImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and image tag to the giphyDiv
                    giphyDiv.append(p);
                    giphyDiv.append(giphyImage);

                    // Prependng the giphyDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(giphyDiv);

                    $(".gif").on("click", function () {
                        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                        var state = $(this).attr("data-state");
                        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                        // Then, set the image's data-state to animate
                        // Else set src to the data-still value
                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                        }
                    });

                    //
                }
            }
            offset += 10;
        });
});
//Clearing gifs when cleared button is pressed
  $("#clear").on("click", function () {
      $("#gifs-appear-here").empty();
  })
  
  // The function adds a new button to the page when user enters the name and clicks on Add
  $("#add-button").on("click", function(event) {
      event.preventDefault();
      var newSeries = $("#titles-input").val().trim();
      titles.push(newSeries);
      newButton();
      $("#titles-input").val('');
  });
