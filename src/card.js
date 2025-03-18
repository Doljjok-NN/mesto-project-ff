// --------------------------Удаление карточки--------------------------------
export function deleteCard(deleteButton) {
  const closestCard = deleteButton.target.closest(".card");
  closestCard.remove();
}

// ----------------------------Лайк карточки----------------------------------
export function likeCard(like) {
  if (like.target.classList.contains("card__like-button")) {
    like.target.classList.toggle("card__like-button_is-active");
  }
}

// ---------------------------СОЗДАНИЕ КАРТОЧКИ-------------------------------
export function createСard(cardData, deleteCard, likeCard, openImageModal) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const popupImage = document.querySelector(".popup__image");

  const imgText = cardData.name;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;

  cardImage.addEventListener("click", () => openImageModal(cardImage, imgText));
  popupImage.addEventListener("click", () =>
    openImageModal(popupImage, imgText)
  );

  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", deleteCard);

  cardElement.addEventListener("click", likeCard);

  return cardElement;
}
