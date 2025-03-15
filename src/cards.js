
import {openImageModal} from "./index.js";
import {openModal,closeModal,closeOverlay,closeEscape } from "./modal.js";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Удаление карточки-----------------------------------------
export function deleteCard(deleteButton) {
  const closestCard = deleteButton.target.closest(".card");
  closestCard.remove();
}

// Лайк карточки----------------------------------------------
export function likeCard(like) {
  like.target.classList.toggle("card__like-button_is-active");
}

// Coздание карточки------------------------------------------
export function createСard(cardData, deleteCard, likeCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const imageModal = document.querySelector(".popup_type_image");
  const popupCloseButton = document.querySelector("#img_Close");
  const imgText = cardData.name;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const cardLikeButton = cardElement.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", likeCard);

  cardImage.addEventListener("click", () => openImageModal(cardImage, imgText));
  cardImage.addEventListener("click", () => openModal(imageModal));
  popupCloseButton.addEventListener("click", () => closeModal(imageModal));
  imageModal.addEventListener("click", () => closeOverlay(imageModal));

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

