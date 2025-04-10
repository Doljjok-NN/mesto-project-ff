// ---------------------------СОЗДАНИЕ КАРТОЧКИ-------------------------------
export function createСard(
  cardData,
  deleteCard,
  likeCard,
  deleteLike,
  openImageModal,
  user
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const popupImage = document.querySelector(".popup__image");
  const likeElement = cardElement.querySelector(".like-elements");
  const buttonUser = cardElement.querySelector(".card__like-button");

  const imgText = cardData.name;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;

  likeElement.textContent = cardData.likes.length;

  if (cardData.likes.some((like) => like._id === user)) {
    buttonUser.classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => openImageModal(cardImage, imgText));
  popupImage.addEventListener("click", () =>
    openImageModal(popupImage, imgText)
  );

  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  //-------------------Удаление корзины если карточка не моя--------------
  if (cardData.owner._id !== user) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", function () {
      deleteCard(cardData._id)
        .then((res) => {
          const deleteCard = deleteButton.closest(".card");
          deleteCard.remove();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  // ---------------ОРАБОТЧИКИ ЛАЙКОВ-------------------------
  buttonUser.addEventListener("click", function (evt) {
    const likeButton = evt.target;
    if (!cardData.likes.some((like) => like._id === user)) {
      likeCard(cardData._id)
        .then((resCard) => {
          cardData.likes = resCard.likes;
          likeButton.classList.add("card__like-button_is-active");
          likeElement.textContent++;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      deleteLike(cardData._id)
        .then((resCard) => {
          cardData.likes = resCard.likes;
          likeButton.classList.remove("card__like-button_is-active");
          likeElement.textContent--;
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  });

  return cardElement;
}
