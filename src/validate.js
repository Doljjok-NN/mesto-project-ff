function showInputError(formElement, inputElement, errorMessage, valid) {
  console.log(valid);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(valid.inputTypeError);

  errorElement.textContent = errorMessage;

  errorElement.classList.add(valid.inputTypeErrorActive);
}

function hideInputError(formElement, inputElement, valid) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(valid.inputTypeError);

  errorElement.classList.remove(valid.inputTypeErrorActive);

  errorElement.textContent = "";
}

function diableSubmitButton(button, valid) {
  button.disabled = false;
  button.classList.remove(valid.inActiveButton);
}

export function clearValidation(form, valid) {
  const buttonClear = form.querySelector(valid.formsPopupButton);
  const inputs = form.querySelectorAll(valid.formSelector);
  inputs.forEach((evt) => {
    evt.value = "";
    hideInputError(form, evt, valid);
  });
  diableSubmitButton(buttonClear, valid);
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
      checkInputValidity(formElement, inputElement, valid);

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
