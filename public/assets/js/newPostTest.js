const loggedInUser = 2;

$(document).ready(function () {
  $("#newpost").on("submit", function (event) {
    console.log(event)
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
    console.log("newThread is ", newThread);
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
//   console.log("newThread is ", newThread);
//   submitNewConvo(newThread);
// });

});

function submitNewThread(Post) {
  console.log("in submit function");
  console.log(Post);
  // $.post("/api/newthread", Post, function() {
  //   console.log("in here")
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
//   console.log("in submit function")
//   console.log(Post)
//   // $.post("/api/newthread", Post, function() {
//   //   console.log("in here")
//   //   // window.location.href = "/api/publicposts";
//   // });

//   $.ajax({
//     url: '/api/newConvo',
//     type: 'POST',
//     contentType: 'application/json',
//     data: JSON.stringify(Post)
//   })

}