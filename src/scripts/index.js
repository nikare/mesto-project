import { createCard, addCard, cardsListEl } from './card';
import { openPopup, closePopup } from './modal';
import { enableValidation } from './validate';
import { initialCards } from './cards-data';
import { disableButton } from './utils';
import { api } from './api';

// variables
const openPopupButtons = document.querySelectorAll('.open-popup-button');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const profileNameEl = document.querySelector('.profile__name');
const profileDescriptionEl = document.querySelector('.profile__description');
const profileAvatarEl = document.querySelector('.profile__avatar');

// fetch content
api('users/me').then((data) => {
  profileAvatarEl.src = data.avatar;
  fillProfileContent(data.name, data.about);
});

// forms
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
});

// cards
initialCards.forEach(({ name, link }) => {
  const card = createCard(name, link);
  cardsListEl.append(card);
});

// profile
function fillProfileContent(name, desc) {
  profileNameEl.textContent = name;
  profileDescriptionEl.textContent = desc;
}

export function fillProfilePopup() {
  const { name, desc } = document.forms.profile.elements;
  name.value = profileNameEl.textContent;
  desc.value = profileDescriptionEl.textContent;
}

// events
openPopupButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popupName = button.getAttribute('data-popup');
    const popup = document.querySelector(`.popup[data-popup=${popupName}]`);

    if (popupName === 'profile') {
      fillProfilePopup();
    }

    openPopup(popup);
  });
});

closePopupButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closePopup(popup);
  });
});

Array.from(document.forms).forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    disableButton(form.querySelector('.form__button[type="submit"]'));

    const popupName = form.getAttribute('name');
    const popup = form.closest('.popup');

    if (popupName === 'profile') {
      const { name, desc } = form.elements;
      fillProfileContent(name.value, desc.value);
    }

    if (popupName === 'new-card') {
      addCard();
    }

    closePopup(popup);
    form.reset();
  });
});
