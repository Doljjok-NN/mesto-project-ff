import { valid } from "./utils";

// В функции showInputError  и hideInputError пришлось вставить из импорта, всячески пытался довести
// valid из других функций до них, проверял через console.log, но так и не нашел способ

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(valid.inputTypeError);

  errorElement.textContent = errorMessage;

  errorElement.classList.add(valid.inputTypeErrorActive);
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(valid.inputTypeError);

  errorElement.classList.remove(valid.inputTypeErrorActive);

  errorElement.textContent = "";
}

export function clearValidation(valid) {
  const buttonClear = document.querySelectorAll(valid.formsPopupButton);
  buttonClear.forEach((evt) => {
    evt.disabled = false;
    evt.classList.remove(valid.inActiveButton);
  });
  const inputClear = document.querySelectorAll(valid.formSelector);
  inputClear.forEach((evt) => {
    evt.classList.remove(valid.inputTypeError);
    evt.value = "";
  });
  const errorClass = document.querySelectorAll(valid.inputErrorClass);
  errorClass.forEach((evt) => {
    evt.classList.remove(valid.inputTypeErrorActive);
    evt.textContent = "";
  });
}

function checkInputValidity(formElement, inputElement, valid) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      valid
    );
  } else {
    hideInputError(formElement, inputElement, valid);
    inputElement.setCustomValidity("");
  }
}

function setEventListeners(formElement, valid) {
  const inputList = Array.from(
    formElement.querySelectorAll(valid.formSelector)
  );

  const buttonElement = formElement.querySelectorAll(valid.formsPopupButton);

  buttonElement.forEach((evt) => {
    toggleButtonState(inputList, evt, valid);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputElement.validationMessage,
        valid
      );

      buttonElement.forEach((evt) => {
        toggleButtonState(inputList, evt, valid);
      });
    });
  });
}

export function enableValidation(valid) {
  const formList = document.querySelectorAll(valid.formsPopup);

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, valid);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, valid) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;

    buttonElement.classList.add(valid.inActiveButton);
  } else {
    buttonElement.disabled = false;

    buttonElement.classList.remove(valid.inActiveButton);
  }
}
