    $(".contactForm").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var contactData = {
            name: $("#name").val().trim(),
            email: $("#email").val().trim(),
            message: $("#message").val.trim()
        };

        if (validate(newBurger.burger_name)) {
            // Send the POST request.
            $.ajax("/contact", {
                type: "POST",
                data: contactData
            }).then(
                function() {
                }
            );
        } else {
            alert("Please validate here");
        }
    });