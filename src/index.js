import "./index.css";
import { createСard } from "./card.js";
import { closeModal, openModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validate.js";
import {
  getProfil,
  addCard,
  deleteCard,
  likeCard,
  deleteLike,
  getCard,
} from "./api.js";
import { saveAvatar } from "./avatar.js";
import { profileSubmit, formEditProfile, initProfil } from "./profile.js";
import {
  valid,
  cardsContainer,
  popupTypeEdit,
  setSubmitButtonStatus,
} from "./utils.js";

//------------------------------USER ID , AVATAR----------------------------------
let userId;
Promise.all([getProfil(), getCard()])
  .then(([profile, newCard]) => {
    userId = profile;
    initProfil(profile);
    newCard.reverse();
    newCard.forEach((card) => {
      cardsContainer.append(
        createСard(card, deleteCards, openImageModal, userId, likes)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

//------------------------- ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ НА КРЕСТИК---------------------
const formsClean = document.querySelectorAll(valid.formsPopup);
formsClean.forEach(function (event) {
  const popupClose = document.querySelectorAll(valid.popupClose);
  popupClose.forEach((evt) => {
    evt.addEventListener("click", () => clearValidation(valid));
  });
});
const popups = document.querySelectorAll(valid.popup);
popups.forEach(function (event) {
  const popupClose = document.querySelectorAll(valid.popupClose);
  popupClose.forEach((evt) =>
    evt.addEventListener("click", () => closeModal(event))
  );
});

const profileEditButton = document.querySelector(".profile__edit-button");
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
        deleteCards,
        openImageModal,
        userId,
        likes
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

export function openImageModal(styleImag, textImg) {
  imgStylePopup.src = styleImag.src;
  imgStylePopup.alt = styleImag.alt;
  imageModalText.textContent = textImg;
  openModal(popupImageModalka);
}

// ----------------------------ВАЛИДАЦИЯ----------------------------------------
enableValidation(valid);

// ----------------------------АВАТАР--------------------------
const popupFormAvatar = document.querySelector("#avatar_form");

popupFormAvatar.addEventListener("submit", saveAvatar);

// ------------------------------УДАЛЕНИЕ КАРТОЧКИ---------------------------------------------
export function deleteCards(cardId, card) {
  deleteCard(cardId)
    .then((res) => {
      card.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

// ------------------------------ФУНКЦИЯ ЛАЙКА КАРТОЧЕК-------------------------------------
export function likes(cardId, userId, likeElement, evt) {
  const likeButton = evt.target;
  const likeMethod = cardId.likes.some((like) => like._id === userId)
    ? deleteLike
    : likeCard;
  likeMethod(cardId._id)
    .then((resCard) => {
      cardId.likes = resCard.likes;
      likeButton.classList.toggle("card__like-button_is-active");
      likeElement.textContent = resCard.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

