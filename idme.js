$(function () {
  var IDme = {
    access_token: window.location.hash
      .split("&")[0]
      .match(/[^#access_token=]\w+/)[0],

    params: function () {
      return {
        url:
          "https://api.id.me/api/public/v3/attributes.json?access_token=" +
          this.access_token,
        dataType: "jsonp"
      };
    },

    request: function () {
      if (this.access_token) {
        $.get(this.params()).done(function (payload) {
          console.log("ID.me payload:", payload);

          if (payload.status[0].verified) {
            $("#idme-verification").hide();
            $("#idme-verification").before(
              "<span>Hi  " +
                payload.attributes[1].value + " " + payload.attributes[2].value + "!" + "<br>" +  
                "We have your email address as  " + payload.attributes[0].value + "." + "<br>" +
                "Your status with ID.me as a " + payload.status[0].subgroups[0] + " has been confirmed!</span>"
            );
          }
        });
      }
    }
  };

  IDme.request();
});
