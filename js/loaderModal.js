showLoaderModal = () => {
	$("#loader-modal").modal({
		backdrop: "static",
		keyboard: false,
		show: true
	});
};

hideLoaderModal = () => {
	$("#loader-modal").modal("hide");
};

