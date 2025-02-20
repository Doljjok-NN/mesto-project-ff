// @todo: Темплейт карточки

function deleteCard(deleteButton) {
  let closestCard = deleteButton.target.closest(".card");
  closestCard.remove();
}

let cardsContainer = document.querySelector(".places__list");

function createСard(cardData, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  let cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = cardData.link;
  cardElement.querySelector(".card__image").alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  let deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  return cardElement;
}

initialCards.forEach(function (cardData) {
  const newCard = createСard(cardData, deleteCard);

  cardsContainer.append(newCard);
});

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
