// FOR SIGN UP

import { errorAlertTaken, removeErrorStyle, isEmpty } from "./minor.js";

export { Validation };
class Validation {
  constructor(name, email, phone, password, confirmPW) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.confirmPW = confirmPW;
    this.isOK = false;
  }
  validateName(input, takenNames) {
    if (isEmpty(this.name)) {
      return errorAlertTaken(this.name, "Please enter something!");
    }
    if (takenNames.includes(input)) {
      return errorAlertTaken(this.name, "This name is already taken");
    }
    removeErrorStyle(this.name);
    return true;
  }
  validateEmail(input) {
    if (isEmpty(this.email)) {
      return errorAlertTaken(this.email, "Please enter something!");
    }
    let check = /@\w+/.test(input);
    if (!check) {
      return errorAlertTaken(this.email, "Please enter correct email form!");
    }
    removeErrorStyle(this.email);
    return true;
  }
  validatePhone(input) {
    if (isEmpty(this.phone)) {
      return errorAlertTaken(this.phone, "Please enter something!");
    }
    let c = /[0-9]{10}/.test(input);
    if (!c) {
      return errorAlertTaken(
        this.phone,
        "Please enter correct phone number form!"
      );
    }
    removeErrorStyle(this.phone);
    return true;
  }
  validatePW(input) {
    if (isEmpty(this.password)) {
      this.password.parentNode.querySelector(".message")?.remove();
      return errorAlertTaken(this.password, "Please enter something!");
    }
    let check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/.test(
      input
    );
    if (!check) {
      this.password.parentNode.querySelector(".message")?.remove();
      return errorAlertTaken(this.password, "Password is too weak!");
    }
    removeErrorStyle(this.password);
    return true;
  }
  validateConfirmPW(input) {
    if (isEmpty(this.confirmPW)) {
      return errorAlertTaken(this.confirmPW, "Please enter something!");
    }
    if (input != this.password.value) {
      return errorAlertTaken(this.confirmPW, "Wrong password!");
    }
    removeErrorStyle(this.confirmPW);
    return true;
  }
  isAlright() {
    for (let key of Object.keys(this)) {
      if (key !== "isOK" && this[key].value == "") {
        errorAlertTaken(this[key], "Please fill out!");
      }
    }
    return this.isOK;
  }
}
