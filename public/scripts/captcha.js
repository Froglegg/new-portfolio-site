grecaptcha.ready(function() {
  grecaptcha
    .execute("6LdDwtIUAAAAAAuP5uena5_0wLGBiO5UWonKkEaf", {
      action: "contact"
    })
    .then(function(token) {
      document.getElementById("tokenField").setAttribute("value", token);
    });
});
