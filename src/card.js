// ---------------------------СОЗДАНИЕ КАРТОЧКИ-------------------------------
export function createСard(cardData, deleteCards, openImageModal, user, likes) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");

  const likeElement = cardElement.querySelector(".like-elements");
  const buttonUser = cardElement.querySelector(".card__like-button");

  const imgText = cardData.name;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  likeElement.textContent = cardData.likes.length;

  if (cardData.likes.some((like) => like._id === user._id)) {
    buttonUser.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => openImageModal(cardImage, imgText));

  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  //-------------------Удаление корзины если карточка не моя--------------
  if (cardData.owner._id !== user._id) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () =>
      deleteCards(cardData._id, cardElement)
    );
  }
  // ----------------------ОРАБОТЧИКИ ЛАЙКОВ-------------------------
  buttonUser.addEventListener("click", (evt) =>
    likes(cardData, user._id, likeElement, evt)
  );

  return cardElement;
}
