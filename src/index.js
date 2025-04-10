import "./index.css";
import { createСard } from "./card.js";
import { closeModal, openModal } from "./modal.js";
import { enableValidation } from "./validate.js";
import {
  getProfil,
  getCard,
  addCard,
  deleteCard,
  likeCard,
  deleteLike,
} from "./api.js";
import { changeAvatarProfile, saveAvatar } from "./avatar.js";
import { profileSubmit, formEditProfile } from "./profile.js";
import { data } from "autoprefixer";

const cardsContainer = document.querySelector(".places__list");

//------------------------------USER ID , AVATAR----------------------------------
let userId;

function initi(user) {
  userId = user._id;
  changeAvatarProfile(user.avatar);
}
getProfil().then(initi);

// ------------------------СОЗДАНИЕ КАРТОЧКИ----------------------------------------------
getCard()
  .then((cardArray) => {
    cardArray.reverse();
    cardArray.forEach((card) => {
      const newCard = createСard(
        card,
        deleteCard,
        likeCard,
        deleteLike,
        openImageModal,
        userId
      );
      cardsContainer.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//------------------------- ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ НА КРЕСТИК---------------------
const popup = document.querySelectorAll(".popup");
popup.forEach(function (event) {
  const popupClose = document.querySelectorAll(".popup__close");
  popupClose.forEach((evt) =>
    evt.addEventListener("click", () => closeModal(event))
  );
});
const profileEditButton = document.querySelector(".profile__edit-button");
export const popupTypeEdit = document.querySelector(".popup_type_edit");

const popuTypeNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");

const popupAvatar = document.querySelector(".popup_type_avatar");
const profileAvatar = document.querySelector(".profile__image");

const imgModalClose = document.querySelector("#Close_img");

profileEditButton.addEventListener("click", () => openModal(popupTypeEdit));
profileAddButton.addEventListener("click", () => openModal(popuTypeNewCard));
profileAvatar.addEventListener("click", () => openModal(popupAvatar));

imgModalClose.addEventListener("click", () => closeModal(popupImageModalka));

// // ---------------------------------ПРОФИЛЬ-----------------------------------------------------

formEditProfile.addEventListener("submit", profileSubmit);

//-------------------------ДОБАВЛЕНИЕ КАРТОЧКИ-----------------------------------------------
const formNewCard = document.getElementById("form_card");
const buttonCards = document.querySelector(".button-cards");
formNewCard.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const addNewCardName = document.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const addNewCardUrl = document.querySelector(".popup__input_type_url").value;
  setSubmitButtonStatus(buttonCards, true);
  addCard(addNewCardName, addNewCardUrl)
    .then((card) => {
      const addNewCard = createСard(
        card,
        deleteCard,
        likeCard,
        deleteLike,
        openImageModal,
        userId
      );

      cardsContainer.prepend(addNewCard);
      closeModal(popuTypeNewCard);
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`);
    })
    .finally(() => {
      setSubmitButtonStatus(buttonCards, false);
    });

  formNewCard.reset();
});

// --------------------------------ОТКРЫТИЕ КАРТИНКИ------------------------------------------------
const popupImageModalka = document.querySelector(".popup_type_image");
const imgStylePopup = document.querySelector(".popup__image");
const imageModalText = document.querySelector(".popup__caption");

function openImageModal(styleImag, textImg) {
  imgStylePopup.src = styleImag.src;
  imgStylePopup.alt = styleImag.alt;
  imageModalText.textContent = textImg;
  openModal(popupImageModalka);
}

// ----------------------------ВАЛИДАЦИЯ----------------------------------------
enableValidation();

// ----------------------------АВАТАР--------------------------
const popupFormAvatar = document.querySelector("#avatar_form");

popupFormAvatar.addEventListener("submit", saveAvatar);

// -----------------------------------UX FORM-------------------
export function setSubmitButtonStatus(button, save) {
  if (save) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}
