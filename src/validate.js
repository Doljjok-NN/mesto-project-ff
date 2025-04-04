function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
    );
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
    inputElement.setCustomValidity("");
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelectorAll(".popup__button");
  buttonElement.forEach((evt) => {
    toggleButtonState(inputList, evt);
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      buttonElement.forEach((evt) => {
        toggleButtonState(inputList, evt);
      });
    });
  });
}

export function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("button_inactive");
  }
}
