export const cardsContainer = document.querySelector(".places__list");
export const popupTypeEdit = document.querySelector(".popup_type_edit");

export const valid = {
  formSelector: "#form__input",
  formsPopup: ".popup__form",
  formsPopupButton: ".popup__button",
  inputErrorClass: ".form__input-error",
  inActiveButton: ".button_inactive",
  inputTupeError: ".form__input_type_error",
};

// -----------------------------------UX FORM-------------------
export function setSubmitButtonStatus(button, save) {
  button.textContent = save ? "Сохранение..." : "Сохранить";
}
