$(function () {
    $('#layout-header').load("layout/header.html", function () {

        /* Navigation active status */
        const url = window.location.href;
        const urlQueries = url.split('/');
        const urlLastQuery = urlQueries[urlQueries.length - 1];
        const index = urlLastQuery.indexOf("index") >= 0;
        const skill = urlLastQuery.indexOf("skill") >= 0;
        const service = urlLastQuery.indexOf("service") >= 0;
        const experience = urlLastQuery.indexOf("experience") >= 0;
        const reference = urlLastQuery.indexOf("reference") >= 0;
        const certification = urlLastQuery.indexOf("certification") >= 0;
        const contactMe = urlLastQuery.indexOf("contact-me") >= 0;

        if (index || urlLastQuery === "") {
            $("#layout-header header nav ul").find(".nav-index").addClass("active");
        } else if (skill) {
            $("#layout-header header nav ul").find(".nav-skill").addClass("active");
        } else if (service) {
            $("#layout-header header nav ul").find(".nav-service").addClass("active");
        } else if (experience) {
            $("#layout-header header nav ul").find(".nav-experience").addClass("active");
        } else if (reference) {
            $("#layout-header header nav ul").find(".nav-reference").addClass("active");
        } else if (certification) {
            $("#layout-header header nav ul").find(".nav-certification").addClass("active");
        } else if (contactMe) {
            $("#layout-header header nav ul").find(".nav-contact-me").addClass("active");
        }
    });

    $('#layout-footer').load("layout/footer.html");
});