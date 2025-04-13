import { profileEdit } from "./api";
import { closeModal } from "./modal";
import { setSubmitButtonStatus, popupTypeEdit } from "./utils";
import { changeAvatarProfile } from "./avatar";

export const formEditProfile = document.querySelector("#profile_form");
const buttonProfile = document.querySelector(".button-profile");
const formNameInput = formEditProfile.querySelector(".popup__input_type_name");
const formWorkInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const inputName = document.querySelector(".profile__title");
const inputWork = document.querySelector(".profile__description");
formNameInput.textContent = inputName.value;
export function profileSubmit(evt) {
  setSubmitButtonStatus(buttonProfile, true);
  evt.preventDefault();
  profileEdit(formNameInput.value, formWorkInput.value)
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
export function initProfil(user) {
  inputName.textContent = user.name;
  inputWork.textContent = user.about;
  changeAvatarProfile(user.avatar);
}
