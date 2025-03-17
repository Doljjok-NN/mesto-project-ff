import "./index.css";
import { initialCards } from "./cards.js";
import { createСard, deleteCard, likeCard } from "./card.js";
import { closeModal, openModal, popupImageModal } from "./modal.js";

// ------------------СОЗДАНИЕ КАРТОЧКИ----------------------------------------------
const cardsContainer = document.querySelector(".places__list");

initialCards.forEach(function (cardData) {
  const newCard = createСard(cardData, deleteCard, likeCard);

  cardsContainer.append(newCard);
});

//------------------------- ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПОВ НА КРЕСТИК---------------------
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");

const popuTypeNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");

const imgModalClose = document.querySelector("#Close_img");
const popupClose = document.querySelectorAll(".popup__close");

profileEditButton.addEventListener("click", () => openModal(popupTypeEdit));
profileAddButton.addEventListener("click", () => openModal(popuTypeNewCard));
popupClose.forEach((evt) =>
  evt.addEventListener("click", () =>
    closeModal(popupTypeEdit, popuTypeNewCard)
  )
);

imgModalClose.addEventListener("click", () =>
  closeModal(popupImageModal, popupImageModal)
);

// ---------------------------------ФОРМА-----------------------------------------------------
const formEditProfile = document.querySelector("#profile_form");
const formNameInput = formEditProfile.querySelector(".popup__input_type_name");
const formWorkInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const name = document.querySelector(".profile__title");
const profilTitle = document.querySelector(".profile__description");

// nameInput.value = name.innerHTML;
// jobInput.value = profilTitle.innerHTML;

function submitEditProfileForm(evt) {
  evt.preventDefault();

  const valueName = formNameInput.value;
  const valueWork = formWorkInput.value;

  const poleName = document.querySelector(".profile__title");
  const poleWork = document.querySelector(".profile__description");

  poleName.textContent = valueName;
  poleWork.textContent = valueWork;

  closeModal(popupTypeEdit, popuTypeNewCard);
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

  const newCard = createСard(item, deleteCard, likeCard);
  cardsContainer.prepend(newCard);
  formNewCard.reset();
  closeModal(popupTypeEdit, popuTypeNewCard);
});
