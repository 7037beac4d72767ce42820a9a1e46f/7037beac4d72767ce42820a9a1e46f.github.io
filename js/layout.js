$(() => {
  $("#layout-header").load(
    "https://portfolio.jttorate.com/layout/header.html",
    function () {
      /* Navigation active status */
      const url = window.location.href;
      const urlQueries = url.split("/");
      const urlLastQuery = urlQueries[urlQueries.length - 1];
      const index = urlLastQuery.indexOf("index") >= 0;
      const skills = urlLastQuery.indexOf("skills") >= 0;
      const services = urlLastQuery.indexOf("services") >= 0;
      const experience = urlLastQuery.indexOf("experience") >= 0;
      const references = urlLastQuery.indexOf("references") >= 0;
      const certification = urlLastQuery.indexOf("certification") >= 0;
      const contactMe = urlLastQuery.indexOf("contact-me") >= 0;

      if (index || urlLastQuery === "") {
        $("#layout-header header nav ul").find(".nav-index").addClass("active");
      } else if (skills) {
        $("#layout-header header nav ul")
          .find(".nav-skills")
          .addClass("active");
      } else if (services) {
        $("#layout-header header nav ul")
          .find(".nav-services")
          .addClass("active");
      } else if (experience) {
        $("#layout-header header nav ul")
          .find(".nav-experience")
          .addClass("active");
      } else if (references) {
        $("#layout-header header nav ul")
          .find(".nav-references")
          .addClass("active");
      } else if (certification) {
        $("#layout-header header nav ul")
          .find(".nav-certification")
          .addClass("active");
      } else if (contactMe) {
        $("#layout-header header nav ul")
          .find(".nav-contact-me")
          .addClass("active");
      }
    }
  );

  $("#layout-footer").load("https://portfolio.jttorate.com/layout/footer.html");
});
