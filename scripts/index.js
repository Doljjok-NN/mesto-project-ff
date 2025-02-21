// @todo: Темплейт карточки

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

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
