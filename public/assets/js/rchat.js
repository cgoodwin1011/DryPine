$(document).ready(function () {

  var replyInput = ""; // saving our replies here


  $("#rchat-submit").on("click", function (event) {
    event.preventDefault();
    console.log("button is live");
    var newThread = {
      author: $("#author").val().trim(),
      content: $("#rchat-box").val().trim(),
    };
    // response.json(x.get('id'))

    $.post("/api/newthread", newThread)
      .then(function (res) {
        location.reload();  
      });

  });

  // display all existing posts

  $.get("/api/postsinorder", function (data) {
    if (data.length !== 0) {
      for (var i = data.length-1; i >= 0; i--) {
        var row = $("<div>");
        row.addClass("rchat");
        row.addClass("clearfix");
        row.attr('data-postId', data[i].postId);
        row.attr('data-replyingTo', data[i].replyingTo);
        row.append("<p><strong>" + data[i].author + "</strong> posted at " + moment(data[i].pTimestamp).format("h:mma on dddd") + "</p>");
        row.append("<p>" + data[i].content + "</p>");
        // row.append("<form action='api/replypost/"+data[i].postId+"?_method=GET' method='POST'>");
        // 
        
        if (data[i].postId == data[i].replyingTo || data[i].replyingTo == -1) {
            row.append("<button id='replyTo"+data[i].postId+"' type='button' class='reply' onclick='onReplyClick(this.id)' style='float: right' >reply</button>");
            row.append("<div id='replyToForm"+data[i].postId+"' class='a-reply'><form action='/api/newreply/"+data[i].postId+"' method='POST' id='replyForm"+data[i].postId+"' name='comment'>Your thoughts?<input type='textarea' name='content'><br>Your Name:<input type='textarea' name='author'><button type='submit' class='reply' style='float: right'>submit reply</button></form></div>");
        } else {
          row.addClass("rreply");
        }
        $("#rchat-area").prepend(row);
      };
    };
  });
});

  $(document).on("click", "#btn_a", function(){
    alert ('button clicked');
});


// $(".a-reply").click(function(){
//     //Get the id of this clicked item

//    pos = (this).attr("id");
//     console.log(pos);
// });

function onReplyClick(id) {
    console.log("that worked. Id is ", id);
    var formDivId = [id.slice(0,7), "Form", id.slice(7)].join('');
    console.log("formDivId is", formDivId)
    $("#"+id).toggle();
    $("#"+formDivId).css("border", "2px green solid");
    $("#"+formDivId).toggle();
}
