function clearValidation(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    inputElement.classList.add("form__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
  } else {
    inputElement.classList.remove("form__input_type_error");
    errorElement.classList.remove("form__input-error_active");
    errorElement.textContent = "";
    inputElement.setCustomValidity("");
  }
}

function setEventListeners(formElement, valid) {
  const inputList = Array.from(
    formElement.querySelectorAll(valid.formSelector)
  );

  const buttonElement = formElement.querySelectorAll(valid.formsPopupButton);

  buttonElement.forEach((evt) => {
    toggleButtonState(inputList, evt);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      clearValidation(
        formElement,
        inputElement,
        inputElement.validationMessage
      );

      buttonElement.forEach((evt) => {
        toggleButtonState(inputList, evt);
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

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;

    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.disabled = false;

    buttonElement.classList.remove("button_inactive");
  }
}
