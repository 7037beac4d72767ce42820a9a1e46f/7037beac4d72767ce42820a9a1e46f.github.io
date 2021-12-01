/** Elements */
const $guestForm = document.querySelector('#guest-form');
const $guestFormInput = $guestForm.querySelector('input');
const $guestFormTextarea = $guestForm.querySelector('textarea');
const $guestFormButton = $guestForm.querySelector('button');
const $guestFormError = $guestForm.querySelector('.error');
const $guestModal = $('#guest-modal');
/** URL */
const baseUrl = window.location.origin;
const hostUrl = window.location.host;
const hrefUrl = window.location.href;
const urlArray = window.location.pathname.split('/');
/* Get source app URL params if exist */
const queryString = window.location.search.substring(1);
const parsedQs = parseQueryString(queryString);
const appCode = (parsedQs.app ?? 'GLOBAL').toString().trim().toUpperCase();
let guestModalOpen = false; // Default

$(document).ready(() => {
	window.scrollTo(window.scrollX, window.scrollY - 1); /** Trigger scroll without scrolling */

	$(window).scroll(() => {
		const lastTwoPath = urlArray.length !== 2 ? urlArray.slice(Math.max(urlArray.length - 2, 1)) : urlArray;
		console.log(lastTwoPath);
		if ($(this).scrollTop() > 50) {
			if (!getCookie(`${domainName}_guestId`) && windowUrlRequiredGuestModal(lastTwoPath[0], lastTwoPath[1])) {
				$guestModal.modal('show');
				guestModalOpen = true;
				/* Trigger geolocation permission */
				navigatorGeolocation((error, coords) => { });
			}
		} else {
			$guestModal.modal('hide');
		}
	});
});

/** Guest Modal Form Submit */
$guestForm.addEventListener('submit', (e) => {
	e.preventDefault();

	/** Check if geolocation was allowed */
	navigator.permissions.query({ name: 'geolocation' }).then((data) => {
		if (data.state === 'denied') {
			$guestFormError.innerHTML = 'Your location is not enabled. Please enable to use this site.';
		} else {
			showLoaderModal();
			$guestFormError.innerHTML = '';
			/** Disable Button */
			$guestFormButton.setAttribute('disabled', 'disabled');

			const guestName = e.target.elements.guestName.value;
			const guestMsg = e.target.elements.guestMessage.value;

			guestLogger(appCode, guestName, guestMsg, (error, data) => {
				$guestFormButton.removeAttribute('disabled');
				setTimeout(() => {
					hideLoaderModal();

					if (!error) {
						/** Enable Form */
						$guestFormInput.value = '';
						$guestFormTextarea.value = '';
						$guestModal.modal('hide');
						guestModalOpen = false;
					}
				}, 5000);
			});
		}
	});
});

guestModalOpenGetStatus = () => {
	return guestModalOpen;
}

windowUrlRequiredGuestModal = (path1, path2) => {
	const requiredUrl = ['', 'disclaimer', 'cookie-policy'];
	return (path1?.trim() === "" && requiredUrl.indexOf(path2?.trim()) !== -1) || (path1?.trim() === "" && path2?.trim() === "");
}