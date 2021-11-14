/* your script go here */

/* Menu Toggle */
$("#navbarcollapse ul li .nav-link").click(function () {
    if ($(window).width() <= 991) {
        $("#navbar-toggler").click();
    }
});

$(document).on("show.bs.modal", function (e) {
    const modalId = e.target.id;
    const ww = $(window).width();
    /** Reset position */
    $('#loader-modal .modal-content').css({
        'padding-left': '15px'
    });
    if (modalId === 'guest-modal') {
        if (ww > 768) {
            $('#loader-modal .modal-content').css({
                'margin-left': '-10px'
            });
        }
    }
});