$(document).ready(function () {

    var replyInput = ""; // saving our replies here


    $("#chirp-submit").on("click", function (event) {
        event.preventDefault();

        var newChirp = {
            author: $("#author").val().trim(),
            body: $("#chirp-box").val().trim(),
            input: replyInput,
            created_at: moment().format("YYYY-MM-DD HH:mm:ss")
        };

        console.log(newChirp);

        $.post("/api/new", newChirp)
            .then(function () {
                var row = $("<div>");
                row.addClass("chirp");

                row.append("<p>" + newChirp.author + " chirped: </p>");
                row.append("<p>" + newChirp.body + "</p>");
                row.append("<p>At " + moment(newChirp.created_at).format("h:mma on dddd") + "</p>")

                $("#chirp-area").prepend(row);

                location.reload();
            })

        $("#author").val("");
        $("#chirp-box").val("");
    });



    // When the page loads, grab and display all of our chirps

    $.get("/api/all", function (data) {


        //console.log(data)
        if (data.length !== 0) {
            for (var i = 0; i < data.length; i++) {
                var row = $("<div>");
                row.addClass("chirp");

                row.append("<p><strong>" + data[i].author + "</strong> posted.. </p>");
                row.append("<p>" + data[i].body + "</p>");
                row.append("<p>At " + moment(data[i].created_at).format("h:mma on dddd") + "</p>");

                var reply = $("<div>");
                reply.addClass("replyId");
                reply.append("<p><strong> reply  </strong></p>")



                var newComment = $("<div>");
                newComment.addClass("post");
                row.append(newComment);


                $(reply).on("click", function (event) {

                    event.preventDefault();

                    $(".post").show("slow", function () {

                        $(this).append("<textarea id='comment'  class='form-control' rows='3' placeholder='Reply Here!' ></textarea>");

                        $(this).append("<input id='send' type= 'submit' class='btn btn-primary'></input>")
                        $(this).append("<button id ='cancel' type= 'button' class='btn btn-primary'>Cancel</button>")

                    });

                                        
                    $("#send").on("click ",  function (event) {
                        replyInput = $("textarea").val().trim()

                       console.log(replyInput);
                       event.preventDefault();

                       $("textarea").val("");
                   });

                });

                row.append(reply);
                $("#chirp-area").prepend(row);
            };
        };
    });

});


