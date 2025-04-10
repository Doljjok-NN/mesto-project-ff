import { getProfil, getProfileEdit } from "./api";
import { closeModal } from "./modal";
import { setSubmitButtonStatus, popupTypeEdit } from "./index";

export const formEditProfile = document.querySelector("#profile_form");
const buttonProfile = document.querySelector(".button-profile");
const formNameInput = formEditProfile.querySelector(".popup__input_type_name");
const formWorkInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const inputName = document.querySelector(".profile__title");
const inputWork = document.querySelector(".profile__description");

export function profileSubmit(evt) {
  setSubmitButtonStatus(buttonProfile, true);
  evt.preventDefault();
  getProfileEdit(formNameInput.value, formWorkInput.value)
    .then((data) => {
      inputName.textContent = data.name;
      inputWork.textContent = data.about;
      closeModal(popupTypeEdit);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    })
    .finally(() => {
      setSubmitButtonStatus(buttonProfile, false);
    });
}

// -----------------ПОЛУЧЕНИЕ ДАННЫХ ФОРМЫ С СЕРВЕРА---------------------
function init(users) {
  inputName.textContent = users.name;
  inputWork.textContent = users.about;
}
getProfil().then(init);
