import { openPopup } from './modal';
import { disableButton } from './utils';
import { api } from './api';

export const cardsListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card');
const popupImage = document.querySelector('.popup__illustration-image');
const popupCaption = document.querySelector('.popup__illustration-caption');
const illustrationPopup = document.querySelector('.popup[data-popup="illustration"]');

export function createCard(name, link, likesAmount, ownerId, myId, cardId, isLiked) {
  const card = cardTemplate.content.cloneNode(true);
  const imageEl = card.querySelector('.card__image');
  const titleEl = card.querySelector('.card__title');
  const likeButton = card.querySelector('.card__like-button');
  const likeAmountEl = card.querySelector('.card__like-amount');
  const removeButton = card.querySelector('.card__remove-button');

  if (isLiked) {
    likeButton.classList.add('card__like-button_active');
  }

  if (ownerId !== myId) {
    removeButton.remove();
  }

  imageEl.src = link;
  imageEl.alt = name;
  titleEl.textContent = name;
  likeAmountEl.textContent = likesAmount;

  addCardEvents(card, cardId);
  return card;
}

export function addCard(name, link) {
  const card = createCard(name, link);
  cardsListEl.prepend(card);
}

function addCardEvents(card, cardId) {
  const imageEl = card.querySelector('.card__image');
  const likeButtonEl = card.querySelector('.card__like-button');
  const removeButtonEl = card.querySelector('.card__remove-button');

  imageEl.addEventListener('click', openCard);

  likeButtonEl.addEventListener('click', ({ target }) => {
    likeCard(target, cardId);
  });

  if (removeButtonEl) {
    removeButtonEl.addEventListener('click', ({ target }) => {
      removeCard(target, cardId);
    });
  }
}

function openCard(event) {
  const imageEl = event.target;
  const cardEl = imageEl.closest('.card');
  const name = cardEl.querySelector('.card__title').textContent;

  popupImage.src = imageEl.src;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openPopup(illustrationPopup);
}

function likeCard(buttonElement, cardId) {
  const isLiked = buttonElement.classList.contains('card__like-button_active');
  const likesAmountEl = buttonElement.nextElementSibling;
  disableButton(buttonElement);

  if (isLiked) {
    api.delete(`cards/likes/${cardId}`).then(({ likes }) => {
      buttonElement.classList.remove('card__like-button_active');
      likesAmountEl.textContent = likes.length;
      disableButton(buttonElement, false);
    });
  } else {
    api.put(`cards/likes/${cardId}`).then(({ likes }) => {
      buttonElement.classList.add('card__like-button_active');
      likesAmountEl.textContent = likes.length;
      disableButton(buttonElement, false);
    });
  }
}

function removeCard(buttonElement, cardId) {
  disableButton(buttonElement);
  const cardEl = buttonElement.closest('.card');

  api.delete(`cards/${cardId}`).then(() => {
    cardEl.remove();
    disableButton(buttonElement, false);
  });
}
