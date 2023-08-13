export function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  errorClass,
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inputErrorClass,
      errorClass
    );
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  });
}

const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

const checkInputValidity = (inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorPattern);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  } else {
    hideInputError(inputElement, inputErrorClass, errorClass);
  }
};

const showInputError = (inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (inputElement, inputErrorClass, errorClass) => {
  // console.log({ inputElement, inputErrorClass, errorClass });
  const errorElement = inputElement.nextElementSibling;
  console.log(errorElement, inputErrorClass);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
