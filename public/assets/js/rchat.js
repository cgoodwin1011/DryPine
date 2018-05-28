$(document).ready(function () {

  var replyInput = ""; // saving our replies here


  // REGISTER BTN IMPLEMENTATION
  // handle clicks on 'registerBtn' which becomes logout btn if
  // a user is logged in
  $(document).on("click", "#registerBtn", function (req, res) {
      event.preventDefault();
      
      // register new user
      if ($("#registerBtn").val() == 'register') {
        var registerEmail = $("#userEmail");
        var registerPW = $("#userPassword");
        var userData = {
          email: registerEmail.val(),
          password: registerPW.val()
        };
        if (!userData.email || !userData.password) {
          $("#loginLabel").text("You entered a blank as username or password.  Try again!");
          return;
        }
        signUpUser(userData.email, userData.password);
      }

      // log out a logged in user
      else if ($("#registerBtn").val() == 'logout') {
        $.ajax({
          url: "/logout",
          method: 'GET',
          success: function () {
            $("#loginForm").show();
            $("#registerBtnTxt").text('Register');
            $("#newThreadBox").hide();
            // window.location = window.location.href + "#refresh";
            window.location.reload();
          }
        });
      }
  });

  // helper function for click on register button, above
  function signUpUser(email, password) {
    $.post("/api/signup", {
      email: email,
      password: password
    }).then(function (data) {
      loginUser(email, password);
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    })
  }

  // LOGIN BTN IMPLEMENTATION
  // handles clicks on login button
  $(document).on("click", "#logInBtn", function (event) {
    event.preventDefault();
    var loginEmail = $("#userEmail");
    var loginPW = $("#userPassword");
    var userData = {
      email: loginEmail.val(),
      password: loginPW.val()
    };

    // deal with the blanks in form.
    if (!userData.email || !userData.password) {
      $("#loginLabel").css('color', 'orange');
      $("#loginLabel").html("You entered a blank as <br>username or password.  <br>Please Correct");
      return;
    }
    // run the loginUser with username & pwd
    // clear the form
    loginUser(userData.email, userData.password);
    loginEmail.val("");
    loginPW.val("");
    // window.location = window.location.href + "#refresh";
    window.location.reload();
  });

  function loginUser(email, password) {
    console.log("calling loginUser...")
    $.post("/api/login", {
      email,
      password
    }, function (data) {
      // console.log(data);
      // window.location.replace(data);
      window.location.reload();
      // $("#loginLabel").text("Incorrect User Name or Password.  Please try again or register");
      // If there's an error, handle it by throwing up a bootstrap alert
    });
  }

  $("#rchat-submit").on("click", function (event) {
    event.preventDefault();
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

  // display all existing posts, in order
  // load conversation.html page.  If there is a
  // logged in user, threads show.  Else, keeps it blank
  $.get("/api/postsinorder", function (dataIn) {
    var theUser = dataIn[0];
    var data = dataIn[1];
    if (theUser.user) {
      // logged in ...
      if (data.length !== 0) {
        for (var i = data.length - 1; i >= 0; i--) {
          var row = $("<div>");
          row.addClass("rchat");
          row.addClass("clearfix");
          row.attr('data-postId', data[i].postId);
          row.attr('data-replyingTo', data[i].replyingTo);
          row.append("<p><strong>" + data[i].author + "</strong> posted at " + moment(data[i].pTimestamp).format("h:mma on dddd") + "</p>");
          row.append("<p>" + data[i].content + "</p>");
          // row.append("<form action='api/replypost/"+data[i].postId+"?_method=GET' method='POST'>");

          if (data[i].postId == data[i].replyingTo || data[i].replyingTo == -1) {
            row.append("<button id='replyTo" + data[i].postId + "' type='button' class='reply' onclick='onReplyClick(this.id)' style='float: right' >reply</button>");
            row.append("<div id='replyToForm" + data[i].postId + "' class='a-reply'><form action='/api/newreply/" + data[i].postId + "' method='POST' id='replyForm" + data[i].postId + "' name='comment'>Your thoughts?<input type='textarea' name='content'><br>Your Name:<input type='textarea' name='author'><button type='submit' class='reply' style='float: right'>submit reply</button></form></div>");
          } else {
            row.addClass("rreply");
          }
          $("#rchat-area").prepend(row);
        }
      }
      $("#loginLabel").text("Welcome " + theUser.user);
      $("#loginForm").hide();
      $("#registerBtnTxt").text('Log Out');
      $("#registerBtn").val('logout');
      $("#discussionHead").text("Recent Discussions");
      $("#newThreadBox").show();
      $("#newThreadBox").css('visibility', 'visible');

    } else {
      // not logged in
      $("#loginForm").show();
      $("#registerBtnTxt").text('Log In');
      $("#registerBtn").prop('value', 'login');
      $("#discussionHead").text("Please Sign In");
      $("#newThreadBox").hide();
      $("#registerBtn").val('register');
      $("#newThreadBox").css('visibility', 'hidden');
    }
  });
});

$(document).on("click", "#btn_a", function () {
  alert('button clicked');
});

function onReplyClick(id) {
  var formDivId = [id.slice(0, 7), "Form", id.slice(7)].join('');
  $("#" + id).toggle();
  $("#" + formDivId).css("border", "2px green solid");
  $("#" + formDivId).toggle();
}