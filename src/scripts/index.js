import { createCard, addCard, cardsListEl } from './card';
import { openPopup, closePopup } from './modal';
import { enableValidation } from './validate';
import { disableButton } from './utils';
import { api } from './api';

// variables
const openPopupButtons = document.querySelectorAll('.open-popup-button');
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const profileNameEl = document.querySelector('.profile__name');
const profileDescriptionEl = document.querySelector('.profile__description');
const profileAvatarEl = document.querySelector('.profile__avatar');

// fetch content
api.get('users/me').then(({ avatar, name, about, _id: myId }) => {
  profileAvatarEl.src = avatar;
  fillProfileContent(name, about);

  api.get('cards').then((data) => {
    data.forEach(({ name, link, likes, owner, _id: cardId }) => {
      const isLiked = Boolean(likes.find(({ _id }) => _id === myId));
      const card = createCard(name, link, likes.length, owner._id, myId, cardId, isLiked);
      cardsListEl.append(card);
    });
  });
});

// forms
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
});

// profile
function fillProfileContent(name, about) {
  profileNameEl.textContent = name;
  profileDescriptionEl.textContent = about;
}

export function fillProfilePopup() {
  const { name, about } = document.forms.profile.elements;
  name.value = profileNameEl.textContent;
  about.value = profileDescriptionEl.textContent;
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
      const name = form.elements.name.value;
      const about = form.elements.about.value;

      api.patch('users/me', { name, about }).then(() => {
        fillProfileContent(name, about);
        closePopup(popup);
        form.reset();
      });
    } else if (popupName === 'new-card') {
      const name = document.forms['new-card'].name.value;
      const link = document.forms['new-card'].link.value;

      api.post('cards', { name, link }).then(() => {
        addCard(name, link);
        closePopup(popup);
        form.reset();
      });
    } else {
      closePopup(popup);
      form.reset();
    }
  });
});
