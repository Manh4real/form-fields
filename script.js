import { Validation } from "./js/validation.js";
import { showHidePW, TAKEN_NAMES } from "./js/minor.js";
import { tempAlertMessage } from "./js/minor.js";

const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const phoneInput = document.querySelector("#phone-input");
const pwInput = document.querySelector("#pw-input");
const confirmInput = document.querySelector("#confirm-input");
const btn = document.querySelector(".sign-up-btn");
const fields = document.querySelectorAll(".field input");

window.addEventListener("load", function () {
  setTimeout(() => {
    nameInput.focus();
  }, 800);
  showHidePW();
});

let validation = new Validation(
  nameInput,
  emailInput,
  phoneInput,
  pwInput,
  confirmInput
);
let checkName, checkEmail, checkPhone, checkPW, checkCP;
nameInput.onchange = function () {
  checkName = validation.validateName(this.value, TAKEN_NAMES);
};
emailInput.onchange = function () {
  checkEmail = validation.validateEmail(this.value);
};
phoneInput.onchange = function () {
  checkPhone = validation.validatePhone(this.value);
};
pwInput.onchange = function () {
  checkPW = validation.validatePW(this.value);
  let val = confirmInput.value;
  if (val != "") checkCP = validation.validateConfirmPW(val);
};
confirmInput.onchange = function () {
  checkCP = validation.validateConfirmPW(this.value);
};
pwInput.addEventListener("focus", function () {
  this.parentNode.querySelector(".alert.error")?.remove();
  if (!document.querySelector(".pw-field .message"))
    this.parentNode.insertAdjacentHTML(
      "beforeend",
      `<p class="message">
        Use 8 or more characters with a mix of letters, numbers &
        symbols
      </p>`
    );
});
btn.onclick = submitFields;
function success() {
  tempAlertMessage.call(btn, "success", "All done!");
}
window.addEventListener("keydown", switchField);

function submitFields() {
  validation.isOK = checkName && checkEmail && checkPhone && checkPW && checkCP; // change the "isOK" prop
  if (validation.isAlright()) success();
  else alert("Don't be dumb!");
}
function switchField(e) {
  if (e.key == "Enter") {
    let a = document.activeElement;
    fields.forEach((field, i) => {
      if (a == field) fields[i + 1]?.focus();
    });
    if (a == fields[fields.length - 1]) {
      checkCP = validation.validateConfirmPW(confirmInput.value);
      submitFields();
    }
  }
}
