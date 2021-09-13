import { Validation } from "./js/validation.js";
import {
  tempAlertMessage,
  switchOnIntermediateElems,
  showHidePW,
  TAKEN_NAMES,
} from "./js/minor.js";

const nameInput = document.querySelector("#name-input");
const emailInput = document.querySelector("#email-input");
const phoneInput = document.querySelector("#phone-input");
const pwInput = document.querySelector("#pw-input");
const confirmInput = document.querySelector("#confirm-input");
const btn = document.querySelector(".sign-up-btn");
const fields = document.querySelectorAll(".field input");

window.addEventListener("load", () => {
  showHidePW();
  setTimeout(() => {
    nameInput.focus();
  }, 800);
});
window.addEventListener("keydown", switchField);

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
  checkConfirmPW();
};
confirmInput.onchange = function () {
  checkCP = validation.validateConfirmPW(this.value);
};
pwInput.addEventListener("focus", function () {
  this.parentNode.querySelector(".alert.error")?.remove();
  if (!hadInstruction()) showPWIntruction.call(this);
});
btn.onclick = submitFields;

function success() {
  tempAlertMessage.call(btn, "success", "All done!");
}

function submitFields() {
  validation.isOK = checkName && checkEmail && checkPhone && checkPW && checkCP; // change the "isOK" prop
  if (validation.isAlright()) success();
  else alert("Don't be dumb!");
}

function switchField(e) {
  if (e.key == "Enter") {
    let a = document.activeElement;
    switchOnIntermediateElems.call(fields, a);
    submitOnLastEle(a);
  }
}

function checkConfirmPW() {
  let val = confirmInput.value;
  if (val != "") checkCP = validation.validateConfirmPW(val);
}

function submitOnLastEle(activeEl) {
  if (activeEl == fields[fields.length - 1]) {
    checkCP = validation.validateConfirmPW(confirmInput.value);
    submitFields();
  }
}

function hadInstruction() {
  return document.querySelector(".pw-field .message");
}

function showPWIntruction() {
  this.parentNode.insertAdjacentHTML(
    "beforeend",
    `<p class="message">
      Use 8 or more characters with a mix of letters, numbers &
      symbols
    </p>`
  );
}
