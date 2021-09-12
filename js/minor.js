export const TAKEN_NAMES = [
  "Nguyen",
  "Van",
  "Manh",
  "Nguyen Van",
  "Van Manh",
  "Nguyen Manh",
];

export function alertMessage(status, mes) {
  let check = this.querySelector(".alert.error");
  if (check) check.remove();
  this.insertAdjacentHTML(
    "beforeend",
    `<div class="alert ${status}">${mes}</div>`
  );
}
export function showHidePW() {
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
export function errorAlertTaken(item, mes) {
  item.parentNode.querySelector(".message")?.remove();
  alertMessage.call(item.parentNode, "error", mes);
  item.parentNode.classList.add("error");
  return false;
}
export function removeErrorStyle(item) {
  item.parentNode.classList.remove("error");
  item.parentNode.querySelector(".alert.error")?.remove();
}
export function isEmpty(item) {
  return !item.value;
}
