/* your script go here */

/* Menu Toggle */
$("#navbarcollapse ul li .nav-link").click(() => {
  if ($(window).width() <= 991) {
    $("#navbar-toggler").click();
  }
});

$(() => {
  $("[rel='tooltip']").tooltip();
});
