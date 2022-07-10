/** Elements */
const $guestForm = document.querySelector("#guest-form");
const $guestFormInput = $guestForm.querySelector("input");
const $guestFormTextarea = $guestForm.querySelector("textarea");
const $guestFormButton = $guestForm.querySelector("button");
const $guestFormError = $guestForm.querySelector(".error");
const $guestModal = $("#guest-modal");
/** URL */
const baseUrl = window.location.origin;
const hostUrl = window.location.host;
const hrefUrl = window.location.href;
const pathArray = window.location.pathname.split("/");
/* Get source app URL params if exist */
const queryString = window.location.search.substring(1);
const parsedQs = parseQueryString(queryString);
const appCode = (parsedQs.app ?? "GLOBAL").toString().trim().toUpperCase();
let guestModalOpen = false; // Default

$(document).ready(() => {
  window.scrollTo(
    window.scrollX,
    window.scrollY - 1
  ); /** Trigger scroll without scrolling */

  $(window).scroll(() => {
    const lastTwoPath =
      pathArray.length !== 2
        ? pathArray.slice(Math.max(pathArray.length - 2, 1))
        : pathArray;

    if (lastTwoPath[0]?.trim() === "" && lastTwoPath[1]?.trim() === "") {
      if ($(this).scrollTop() > 50) {
        openGuestModal(lastTwoPath[0]?.trim(), lastTwoPath[1]?.trim());
      }
    } else {
      openGuestModal(lastTwoPath[0]?.trim(), lastTwoPath[1]?.trim());
    }
  });
});

openGuestModal = (path1, path2) => {
  if (
    !getCookie(`${domainName}_guestId`) &&
    !windowPathNotRequiredGuestModal(path1, path2)
  ) {
    $guestModal.modal("show");
    guestModalOpen = true;
    /* Trigger geolocation permission */
    // navigatorGeolocation((error, coords) => { });
  }
};

guestModalOpenGetStatus = () => {
  return guestModalOpen;
};

windowPathNotRequiredGuestModal = (path1, path2) => {
  const requiredPath1 = ["login"];
  const requiredPath2 = [""];
  return (
    requiredPath1.indexOf(path1?.trim()) !== -1 &&
    requiredPath2.indexOf(path2?.trim()) !== -1
  );
};

/** Guest Modal Form Submit */
$guestForm.addEventListener("submit", (e) => {
  e.preventDefault();

  /** Check if geolocation was allowed */
  navigator.permissions.query({ name: "geolocation" }).then((data) => {
    // if (data.state === "denied") {
    //   $guestFormError.innerHTML =
    //     "Your location is not enabled. Please enable to use this site.";
    // } else {
    showLoaderModal();
    $guestFormError.innerHTML = "";
    /** Disable Button */
    $guestFormButton.setAttribute("disabled", "disabled");

    const guestName = e.target.elements.guestName.value;
    const guestMsg = e.target.elements.guestMessage.value;

    guestLogger(appCode, guestName, guestMsg, (error, data) => {
      $guestFormButton.removeAttribute("disabled");
      hideLoaderModal();

      if (!error) {
        /** Enable Form */
        $guestFormInput.value = "";
        $guestFormTextarea.value = "";
        $guestModal.modal("hide");
        guestModalOpen = false;
      }
    });
    // }
  });
});
