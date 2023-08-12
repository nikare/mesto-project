import { openPopup } from './modal';

export const cardsListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card');
const popupImage = document.querySelector('.popup__illustration-image');
const popupCaption = document.querySelector('.popup__illustration-caption');
const illustrationPopup = document.querySelector('.popup[data-popup="illustration"]');

export function createCard(name, link) {
  const card = cardTemplate.content.cloneNode(true);
  const imageEl = card.querySelector('.card__image');
  const titleEl = card.querySelector('.card__title');

  imageEl.src = link;
  imageEl.alt = name;
  titleEl.textContent = name;

  addCardEvents(card);
  return card;
}

export function addCard() {
  const { name, link } = document.forms['new-card'];
  const card = createCard(name.value, link.value);
  cardsListEl.prepend(card);
}

function addCardEvents(card) {
  const imageEl = card.querySelector('.card__image');
  const likeButtonEl = card.querySelector('.card__like-button');
  const removeButtonEl = card.querySelector('.card__remove-button');

  imageEl.addEventListener('click', openCard);
  likeButtonEl.addEventListener('click', likeCard);
  removeButtonEl.addEventListener('click', removeCard);
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

function likeCard(event) {
  const likeButtonEl = event.target;
  likeButtonEl.classList.toggle('card__like-button_active');
}

function removeCard(event) {
  const cardEl = event.target.closest('.card');
  cardEl.remove();
}
