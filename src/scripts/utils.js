import { closePopup } from './modal';

export function disableButton(buttonElement, disabled = true) {
  buttonElement.disabled = disabled;
}

export function afterSubmitForm(form, popup) {
  closePopup(popup);
  form.reset();
}
