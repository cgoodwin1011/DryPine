const loggedInUser = 2;

$(document).ready(function () {
  $("#newpost").on("submit", function (event) {
    event.preventDefault();
    // catch and kill blanks
    if (!$("#headline").val() || !$("#content").val()) {
      return;
    }
    var newThread = {
      initiatorId: loggedInUser,
      postWriter: loggedInUser,
      headline: $("#headline").val().trim(),
      content: $("#content").val().trim()
    };
    submitNewThread(newThread);
  });

  // $("#newConversation").on("submit", function (event) {
//   event.preventDefault();
//   // catch and kill blanks
//   if (!$("#content").val().trim()) {
//     return;
//   }
//   var newReply = {
//     initiatorId: loggedInUser,
//     postWriter: loggedInUser,
//     headline: "-------",
//     content: $("#content").val().trim()
//   }
//   submitNewConvo(newThread);
// });

});

function submitNewThread(Post) {
  // $.post("/api/newthread", Post, function() {
  //   // window.location.href = "/api/publicposts";
  // });
  $.ajax({
    url: '/api/newthread',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(Post)
  })
}

// function submitNewConvo(Post) {
//   // $.post("/api/newthread", Post, function() {
//   //   // window.location.href = "/api/publicposts";
//   // });

//   $.ajax({
//     url: '/api/newConvo',
//     type: 'POST',
//     contentType: 'application/json',
//     data: JSON.stringify(Post)
//   })

