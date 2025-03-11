// @todo: Темплейт карточки
import "./index.css";
import { initialCards } from "./cards.js";

function deleteCard(deleteButton) {
  const closestCard = deleteButton.target.closest(".card");
  closestCard.remove();
}

const cardsContainer = document.querySelector(".places__list");

function createСard(cardData, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

initialCards.forEach(function (cardData) {
  const newCard = createСard(cardData, deleteCard);

  cardsContainer.append(newCard);
});






// --------ФОРМА----------

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const name = document.querySelector('.profile__title');
const profilTitle = document.querySelector('.profile__description');



nameInput.value = name.innerHTML;
jobInput.value = profilTitle.innerHTML;



function handleFormSubmit(evt){
  evt.preventDefault();
  
  const valueVan = nameInput.value;
  const valueTwo = jobInput.value;
  

  const poleVandam = document.querySelector('.profile__title');
  const poleDvam = document.querySelector('.profile__description');

  poleVandam.textContent = valueVan;
  poleDvam.textContent = valueTwo;
  
  closeModal(contentPopup)
  
}
formElement.addEventListener('submit', handleFormSubmit); 
// --------------------------------------------------------------

// -----ПОПАПЫ---------------------------------------------------
const contentPopup = document.querySelector(".popup");
const popupProfile = document.querySelector(".popup_type_edit");
const openModalka = document.querySelector(".profile__edit-button");
const closeModalka = document.querySelector(".popup__close");


openModalka.addEventListener("click", () => openModal(popupProfile));
closeModalka.addEventListener("click", () => closeModal(popupProfile));
contentPopup.addEventListener('click', () => closeOverlay(contentPopup));
// --------------------------------------------------------------------

// ----ДОБАВЛЕНИЕ КАРТОЧКИ-----------------------------------------------
const buttonImage = document.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.popup_type_new-card');
const closeImagePopup = document.getElementById('close');


buttonImage.addEventListener("click", () => openModal(imagePopup));
closeImagePopup.addEventListener("click", () => closeModal(imagePopup));
imagePopup.addEventListener("click", () => closeOverlay(imagePopup));
// -------------------------------------------------------------

// Закрыть карточку на Esc-------------------------------------------
document.addEventListener('keydown', () => closeEscape(document));
// ------------------------------------------------------------------

// Открыть попап
function openModal(open) {
  open.classList.add("popup_is-opened");
  open.classList.add("popup_is-animated");
}

// Закрыть попап
function closeModal(close) {
  close.classList.remove("popup_is-opened");
}

// Закрыть через Оверлей
function closeOverlay(close) {
  close.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(evt.target);
    }
  });
}

// Через Escape
function closeEscape(close) {
  close.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
     closeModal(contentPopup);
     closeModal(imagePopup);
    }
  })
}






// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
