showLoaderModal = () => {
	const ww = $(window).width();
	const guestModalOpen = guestModalOpenGetStatus();

	if (guestModalOpen) {
		if (ww > 768) {
			$('#loader-modal .modal-content').css({
				'margin-left': '-10px'
			});
		}
	}

	$("#loader-modal").modal({
		backdrop: "static",
		keyboard: false,
		show: true
	});
};

hideLoaderModal = () => {
	$("#loader-modal").modal("hide");
	/** Reset position */
	$('#loader-modal .modal-content').css({
		'padding-left': '15px',
		'margin-left': '0px'
	});
};

