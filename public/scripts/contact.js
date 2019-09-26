    $(".contactForm").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var contactData = {
            name: $("#name").val().trim(),
            email: $("#email").val().trim(),
            message: $("#message").val().trim()
        };

        // Send the POST request.
        $.ajax("/contactForm", {
            type: "POST",
            data: contactData
        }).then(
            function() {
                console.log(`contact data is ${contactData}`);
                
            }
        );

    });