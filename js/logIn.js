import {
  TAKEN_NAMES,
  showHidePW,
  errorAlertTaken,
  removeErrorStyle,
} from "./minor.js";

const btnEl = document.querySelector(".btn");
const btn = document.querySelector(".log-in-btn");
const nameInput = document.querySelector("#name-input");
const passwordInput = document.querySelector("#pw-input");
const fields = document.querySelectorAll(".field input");

// just to make simple data.
let accounts = new Map();
TAKEN_NAMES.forEach((name) => {
  accounts.set(name, name + "P@$$w0rd.");
});

window.addEventListener("load", function () {
  setTimeout(() => {
    nameInput.focus();
  }, 800);
  showHidePW(); // active show-hide password functionality
});

class Confirmation {
  constructor(name, password) {
    this.name = name;
    this.password = password;
  }
  confirmName(input) {
    return accounts.get(input) ?? false; // if has signed-up account yet
  }
  confirmPassword(input) {
    return accounts.get(this.name.value) == input; // if has correct password or not
  }
  isAlright() {
    // is it cool to submit?
    return (
      this.confirmName(this.name.value) &&
      this.confirmPassword(this.password.value)
    );
  }
  isEmpty() {
    // if has any empty fields
    let check = false;
    for (let key of Object.keys(this)) {
      if (this[key].value == "") {
        errorAlertTaken(this[key], "Please fill out!");
        check = true;
      }
    }
    return check;
  }
}

let confirmation = new Confirmation(nameInput, passwordInput);
btn.onclick = submitFields;
nameInput.onfocus = passwordInput.onfocus = function () {
  removeErrorStyle(this);
};
function errorMes() {
  console.log("empty");
  removeMes();
  let p = document.createElement("p");
  p.className = "alert incorrect";
  p.textContent = "Incorrect name or password";
  btnEl.append(p);
}
function successMes() {
  console.log("success");
  removeMes();
  let p = document.createElement("p");
  p.className = "alert fulfilled";
  p.textContent = "All done!";
  btnEl.append(p);
}
function removeMes() {
  // remove error message if there's any.
  btnEl.querySelector(".alert.incorrect")?.remove();
  btnEl.querySelector(".alert.fulfilled")?.remove();
}

window.addEventListener("keydown", switchField);
function switchField(e) {
  // click "Enter", then switch to next field, if there's last field then do submit.
  if (e.key != "Enter") return;
  let a = document.activeElement;
  fields.forEach((field, i) => {
    if (a == field) fields[i + 1]?.focus();
  });
  if (a == fields[fields.length - 1]) submitFields();
}
function submitFields() {
  if (confirmation.isEmpty()) return;

  let check = confirmation.isAlright();
  if (!check) errorMes();
  else successMes();
}
