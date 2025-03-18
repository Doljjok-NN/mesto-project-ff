import "./index.css";
import { initialCards } from "./cards.js";
import { createСard, deleteCard, likeCard } from "./card.js";
import { closeModal, openModal } from "./modal.js";

// ------------------СОЗДАНИЕ КАРТОЧКИ----------------------------------------------
const cardsContainer = document.querySelector(".places__list");

initialCards.forEach(function (cardData) {
  const newCard = createСard(cardData, deleteCard, likeCard, openImageModal);

  cardsContainer.append(newCard);
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
const popupTypeEdit = document.querySelector(".popup_type_edit");

const popuTypeNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");

const imgModalClose = document.querySelector("#Close_img");

profileEditButton.addEventListener("click", () => openModal(popupTypeEdit));
profileAddButton.addEventListener("click", () => openModal(popuTypeNewCard));

imgModalClose.addEventListener("click", () => closeModal(popupImageModalka));

// ---------------------------------ФОРМА-----------------------------------------------------
const formEditProfile = document.querySelector("#profile_form");
const formNameInput = formEditProfile.querySelector(".popup__input_type_name");
const formWorkInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);

function submitEditProfileForm(evt) {
  evt.preventDefault();

  const valueName = formNameInput.value;
  const valueWork = formWorkInput.value;

  const inputName = document.querySelector(".profile__title");
  const inputWork = document.querySelector(".profile__description");

  inputName.textContent = valueName;
  inputWork.textContent = valueWork;

  closeModal(popupTypeEdit);
}
formEditProfile.addEventListener("submit", submitEditProfileForm);

//-------------------------ДОБАВЛЕНИЕ КАРТОЧКИ-----------------------------------------------
const formNewCard = document.getElementById("form_card");
formNewCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const addNewCardName = document.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const addNewCardUrl = document.querySelector(".popup__input_type_url").value;

  const item = {
    link: addNewCardUrl,
    name: addNewCardName,
  };

  const newCard = createСard(item, deleteCard, likeCard, openImageModal);
  cardsContainer.prepend(newCard);
  formNewCard.reset();
  closeModal(popuTypeNewCard);
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
