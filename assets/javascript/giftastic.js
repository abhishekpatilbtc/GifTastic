//Define name of buttons
var titles = ["Cat", "Dog", "Dolphin", "Tiger", "Duck", "Eagle", "Penguin", "Horse", "Wolf", "Rabbit"];

// Function to create Buttons for the titles
function newButton() {
    $("#buttons").empty();
    for (var i = 0; i < titles.length; i++) {
        var a = $("<button>");
        // a.addClass("titles");
        a.attr("id", "titles");
        a.addClass("btn btn-dark")
        a.attr("data-titles", titles[i]);
        a.text(titles[i]);
        $("#buttons").append(a);
    }
}
//Call the function
newButton();

// The function adds a new button to the page when user enters the name and clicks on Add
$("#add-button").on("click", function (event) {
    event.preventDefault();
    var newSeries = $("#titles-input").val().trim();
    titles.push(newSeries);
    newButton();
    $("#titles-input").val('');
});

//Define Offset
let offset = 0;

// Click on document using titles class since page is going to be dynamic
$(document).on("click", "#titles", function () {

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
                    // var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var giphyImage = $("<img>");

                    // Setting the src attribute of the image to a property pulled off the result item
                    giphyImage.attr("src", results[i].images.fixed_height_still.url);
                    giphyImage.attr("data-still", results[i].images.fixed_height_still.url);
                    giphyImage.attr("data-animate", results[i].images.fixed_height.url);

                    // Appending the paragraph and image tag to the giphyDiv
                    // giphyDiv.append(p);
                    giphyDiv.append(giphyImage);

                    // Prependng the giphyDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(giphyDiv);

                    //
                }
            }
            offset += 10;
        });

});

// Image needs to move after clicking on it
$(document).on("click", "img", function () {

    var src = $(this).attr("src");
    var still = $(this).attr("data-still");
    var animate = $(this).attr("data-animate");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value

    if (src == still) {
        $(this).attr("src", animate);
    } else {
        $(this).attr("src", still);
    }

});


//Clearing gifs when cleared button is pressed
$("#clear").on("click", "img", function () {
    $("#gifs-appear-here").empty();
})





