/* global moment */

// When user clicks add-btn
$("#chirp-submit").on("click", function (event) {
  event.preventDefault();

  // Make a newChirp object
  var newChirp = {
    author: $("#author").val().trim(),
    body: $("#chirp-box").val().trim(),
    created_at: moment().format("YYYY-MM-DD HH:mm:ss")
    
  };

  console.log(newChirp);

  // Send an AJAX POST-request with jQuery
  $.post("/api/new", newChirp)
    // On success, run the following code
    .then(function () {

      var row = $("<div>");
      row.addClass("chirp");

      row.append("<h4>" + newChirp.body + "</h4>");
      row.append("<p> posted by " + newChirp.author + "</p>");
      // row.append("<p>At " + moment(newChirp.created_at).format("h:mma on dddd") + "</p>");
      row.append("<p>" + moment(newChirp.created_at).startOf("h:mma on dddd").fromNow() + "</p>");
     

      $("#chirp-area").prepend(row);

    });

  // Empty each input box by replacing the value with an empty string
  $("#author").val("");
  $("#chirp-box").val("");
});

// When the page loads, grab all of our chirps
$.get("/api/all", function (data) {

  if (data.length !== 0) {

    for (var i = 0; i < data.length; i++) {

      var row = $("<div>");
      row.addClass("chirp");
      row.attr("id", data[i].id);
      // row.append("<p> number:" + data[i].id + "</p>");
      row.append("<h4>" + data[i].body + "</h4>");
      row.append("<p> posted by " + data[i].author + "</p>");
      // row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");
      row.append("<p>" + moment(newChirp.created_at).startOf("h:mma on dddd").fromNow() + "</p>");

      $("#chirp-area").prepend(row);

    }

  }

});

$(document).on("click", '.chirp', function (event) {
  // $.get("/api/all", function (data) {
  //   console.log(this.id);
  // });
  var id = $(this).attr("id");
  console.log(id);
 
});

