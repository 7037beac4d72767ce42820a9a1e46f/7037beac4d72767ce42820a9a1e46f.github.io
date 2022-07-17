/** Elements */
const $loginForm = document.querySelector("#login-form");
const $loginFormInput = document.querySelectorAll('input[type="text"]');
const $loginFormPassword = document.querySelectorAll('input[type="password"]');
const $loginFormButton = $loginForm.querySelector("button");

/** Contact Me Form Submit */
$loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  showLoaderModal();

  /** Disable Button */
  $loginFormButton.setAttribute("disabled", "disabled");

  loginForm(
    {
      username: e.target.elements.username.value,
      password: e.target.elements.password.value,
    },
    (error, data) => {
      $loginFormButton.removeAttribute("disabled");
      hideLoaderModal();

      if (!error) {
        /** Enable Form */
        for (var i = 0; i < $loginFormInput.length; i++) {
          $loginFormInput[i].value = "";
        }
        for (var i = 0; i < $loginFormPassword.length; i++) {
          $loginFormPassword[i].value = "";
        }
      }
    }
  );
});
