 $(document).ready(function () {
  // Getting references to our form and inputs
  // each of these connects to an input 
  var loginForm = $("#logIn");
  var emailInput = $("#inputEmail");
  var passwordInput = $("#inputPws");
  var register = $("#signup");


  // reads sign up information from form then calls
  // signUpUser to ad user to user table
  $(document).on("click", "#signup", function (event) {
    event.preventDefault();
  //  console.log("clicked", event);
    var userData = {
      email: emailInput.val(),
      password: passwordInput.val()
    };
    // console.log(userData)
    signUpUser(userData.email, userData.password);
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
function signUpUser(email, password) {
      $.post("/api/signup", {email: email , password: password}).then(function(data) {
        // window.location.replace(data);
        // console.log(data);
        // If there's an error, handle it by throwing up a bootstrap alert
      });
    }
  });


  // login dialogue
  $(document).on("click", "#logIn", function (event)  {
    event.preventDefault();
    var loginEmail = $("#email");
    var loginPW = $("#pws");
    var userData = {
      email: loginEmail.val(),
      password: loginPW.val()
    };

    // console.log(userData);

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    loginEmail.val("");
    loginPW.val("");
    // console.log(event)
  });
  

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {email: email , password: password}).then(function(data) {
      console.log("data is ", data);
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    });
  }

