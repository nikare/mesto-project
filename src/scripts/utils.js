import { closePopup } from './modal';

export function disableButton(buttonElement, disabled = true, isFetching = false) {
  buttonElement.disabled = disabled;

  if (isFetching) {
    buttonElement.textContent = buttonElement.dataset.fetchingText;
  } else {
    buttonElement.textContent = buttonElement.dataset.defaultText;
  }
}

export function afterSubmitForm(form, popup, buttonElement) {
  closePopup(popup);
  disableButton(buttonElement, true, false);
  form.reset();
}
