// variables
const openPopupButtons = document.querySelectorAll('.open-popup-button');
const closePopupButtons = document.querySelectorAll('.popup__close-button');

const profileNameEl = document.querySelector('.profile__name');
const profileDescriptionEl = document.querySelector('.profile__description');

const cardsListEl = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card');
const illustrationPopup = document.querySelector('.popup[data-popup="illustration"]');

const popupImage = document.querySelector('.popup__illustration-image');
const popupCaption = document.querySelector('.popup__illustration-caption');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// profile
function fillProfilePopup() {
  const { name, desc } = document.forms.profile;
  name.value = profileNameEl.textContent;
  desc.value = profileDescriptionEl.textContent;
}

function fillProfileContent() {
  const { name, desc } = document.forms.profile;
  profileNameEl.textContent = name.value;
  profileDescriptionEl.textContent = desc.value;
}

// cards
initialCards.forEach(({ name, link }) => {
  const card = createCard(name, link);
  cardsListEl.append(card);
});

function createCard(name, link) {
  const card = cardTemplate.content.cloneNode(true);
  const imageEl = card.querySelector('.card__image');
  const titleEl = card.querySelector('.card__title');

  imageEl.src = link;
  imageEl.alt = name;
  titleEl.textContent = name;

  addCardEvents(card);
  return card;
}

function addCard() {
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
    const popupName = form.getAttribute('name');
    const popup = form.closest('.popup');

    if (popupName === 'profile') {
      fillProfileContent();
    }

    if (popupName === 'new-card') {
      addCard();
    }

    closePopup(popup);
    form.reset();
  });
});

// common functions
function openPopup(popup) {
  popup.classList.add('popup_active');
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
}
