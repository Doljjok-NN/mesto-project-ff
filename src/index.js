// @todo: Темплейт карточки
import "./index.css";
import {initialCards,createСard,deleteCard,likeCard} from "./cards.js";
import {openModal,closeModal,closeOverlay,closeEscape} from "./modal.js";

const cardsContainer = document.querySelector(".places__list");

initialCards.forEach(function (cardData) {
  const newCard = createСard(cardData, deleteCard, likeCard, openImageModal);

  cardsContainer.append(newCard);
});


// Открытие модалки с картинкой--------------------------------
export function openImageModal(styleImag, textImg) {
  const imgStylePopup = document.querySelector(".popup__image");
  const imageModalText = document.querySelector(".popup__caption");
  imgStylePopup.src = styleImag.src;
  imgStylePopup.alt = styleImag.alt;
  imageModalText.textContent = textImg;
}

// --------ФОРМА----------
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const name = document.querySelector(".profile__title");
const profilTitle = document.querySelector(".profile__description");

nameInput.value = name.innerHTML;
jobInput.value = profilTitle.innerHTML;

export function handleFormSubmit(evt) {
  evt.preventDefault();

  const valueVan = nameInput.value;
  const valueTwo = jobInput.value;

  const poleVandam = document.querySelector(".profile__title");
  const poleDvam = document.querySelector(".profile__description");

  poleVandam.textContent = valueVan;
  poleDvam.textContent = valueTwo;

  closeModal(contentPopup);
}
formElement.addEventListener("submit", handleFormSubmit);
// --------------------------------------------------------------

// -----ПОПАПЫ---------------------------------------------------
const contentPopup = document.querySelector(".popup");
const popupProfile = document.querySelector(".popup_type_edit");
const openModalka = document.querySelector(".profile__edit-button");
const closeModalka = document.querySelector(".popup__close");
const imageModal = document.querySelector(".popup_type_image");

openModalka.addEventListener("click", () => openModal(popupProfile));
closeModalka.addEventListener("click", () => closeModal(popupProfile));
contentPopup.addEventListener("click", () => closeOverlay(contentPopup));
// --------------------------------------------------------------------

// ----ДОБАВЛЕНИЕ КАРТОЧКИ-----------------------------------------------
const buttonImage = document.querySelector(".profile__add-button");
const imagePopup = document.querySelector(".popup_type_new-card");
const closeImagePopup = document.getElementById("close");

buttonImage.addEventListener("click", () => openModal(imagePopup));
closeImagePopup.addEventListener("click", () => closeModal(imagePopup));
imagePopup.addEventListener("click", () => closeOverlay(imagePopup));

export function newCard(value, url, deleteCard, likeCard) {
  const template = document.querySelector("#card-template").content;
  const templateClone = template.querySelector(".card").cloneNode(true);
  
  templateClone.querySelector(".card__image").src = url;
  templateClone.querySelector(".card__title").textContent = value;
  templateClone.querySelector(".card__image").alt = value;

  cardsContainer.prepend(templateClone);

  const cardLikeButton = document.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", likeCard);

  const deleteButton = document.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  return templateClone;
}

const formNewCard = document.getElementById("form_card");

formNewCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const addNewCardName = document.querySelector(
    ".popup__input_type_card-name"
  ).value;
  const addNewCardUrl = document.querySelector(".popup__input_type_url").value;
  newCard(addNewCardName, addNewCardUrl, deleteCard, likeCard);
  formNewCard.reset();
  closeModal(imagePopup);
});
// -------------------------------------------------------------

// Закрыть карточку на Esc-------------------------------------------
document.addEventListener("keydown", () => closeEscape(document));
// ------------------------------------------------------------------


