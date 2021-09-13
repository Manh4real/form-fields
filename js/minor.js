export {
  TAKEN_NAMES,
  alertMessage,
  showHidePW,
  errorAlertTaken,
  removeErrorStyle,
  isEmpty,
  tempAlertMessage,
  switchOnIntermediateElems,
};

const TAKEN_NAMES = [
  "Nguyen",
  "Van",
  "Manh",
  "Nguyen Van",
  "Van Manh",
  "Nguyen Manh",
];
function alertMessage(status, mes) {
  this.querySelector(".alert.error")?.remove();
  this.insertAdjacentHTML(
    "beforeend",
    `<div class="alert ${status}">${mes}</div>`
  );
}
function showHidePW() {
  const showPW = document.querySelectorAll(".show-pw");
  showPW.forEach(run);

  function run(item) {
    item.onclick = function () {
      let check = this.classList.toggle("hide-pw");
      if (check) {
        this.nextElementSibling.type = "text";
        this.innerHTML = `<i class="fas fa-eye-slash"></i>`;
      } else {
        this.nextElementSibling.type = "password";
        this.innerHTML = `<i class="fas fa-eye"></i>`;
      }
    };
  }
}
function errorAlertTaken(item, mes) {
  item.parentNode.querySelector(".message")?.remove();
  alertMessage.call(item.parentNode, "error", mes);
  item.parentNode.classList.add("error");
  return false;
}
function removeErrorStyle(item) {
  item.parentNode.classList.remove("error");
  item.parentNode.querySelector(".alert.error")?.remove();
}
function isEmpty(item) {
  return !item.value;
}
function tempAlertMessage(status, mes) {
  this.insertAdjacentHTML(
    "beforeend",
    `<div class="alert ${status}">${mes}</div>`
  );
  let alertMes = document.querySelectorAll(`.alert`);
  setTimeout(() => {
    alertMes.forEach((mes) => mes.remove());
  }, 1200);
}
function switchOnIntermediateElems(activeEl) {
  // "this" - fields collection.
  this.forEach((field, i) => {
    if (activeEl == field) this[i + 1]?.focus();
  });
}
