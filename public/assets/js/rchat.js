$(document).ready(function () {

  var replyInput = ""; 
  // saving our replies here

  // handles submit of a new threat/topic
  $("#rchat-submit").on("click", function (event) {
    // instead of preventing default, how can we get default to set up the dataside of the new post and then post it.
    event.preventDefault();
    var newThread = {
      author: $("#author").val().trim(),
      content: $("#rchat-box").val().trim(),
    };
    $.post("/api/newthread", newThread)
      .then(function (res) {
        location.reload();  
      });
  });

  // displays existing posts in order 
  $.get("/api/postsinorder", function (data) {
    if (data.length !== 0) {
      for (var i = data.length-1; i >= 0; i--) {
        // the next 12-14 lines or so really should be moved into a pug file
        // START pug-ifying here..l...
        // should call a pug routine that takes an array of post objects from the database
        var row = $("<div>");
        row.addClass("rchat");
        row.addClass("clearfix");
        row.attr('data-postId', data[i].postId);
        row.attr('data-replyingTo', data[i].replyingTo);
        row.append("<p><strong>" + data[i].author + "</strong> posted at " + moment(data[i].pTimestamp).format("h:mma on dddd") + "</p>");
        row.append("<p>" + data[i].content + "</p>");
        if (data[i].postId == data[i].replyingTo || data[i].replyingTo == -1) {
            row.append("<button id='replyTo"+data[i].postId+"' type='button' class='reply' onclick='onReplyClick(this.id)' style='float: right' >reply</button>");
            row.append("<div id='replyToForm"+data[i].postId+"' class='a-reply'><form action='/api/newreply/"+data[i].postId+"' method='POST' id='replyForm"+data[i].postId+"' name='comment'>Your thoughts?<input type='textarea' name='content'><br>Your Name:<input type='textarea' name='author'><button type='submit' class='reply' style='float: right'>submit reply</button></form></div>");
        } else {
          row.addClass("rreply");
        }
        $("#rchat-area").prepend(row);
        // END pug-ifying here....
      }
    }
  });

});

// this is a function that displays the form for replying.
// the data entered in the form for replying is handled directly the 
// by the 'app.post("/api/newthread".... ' function in the api-routes.js file%%%%%%%%%%%
function onReplyClick(id) {
    console.log("that worked. Id is ", id);
    var formDivId = [id.slice(0,7), "Form", id.slice(7)].join('');
    console.log("formDivId is", formDivId);
    $("#"+id).toggle();
    $("#"+formDivId).css("border", "2px green solid");
    $("#"+formDivId).toggle();
}
