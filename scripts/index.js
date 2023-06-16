// variables
const openPopupButtons = document.querySelectorAll('.open-popup-button');
const closePopupButtons = document.querySelectorAll('.popup__close-button');

const profileNameEl = document.querySelector('.profile__name');
const profileDescriptionEl = document.querySelector('.profile__description');

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

    closePopup(popup);
  });
});

// common functions
function openPopup(popup) {
  popup.classList.add('popup_active');
}

function closePopup(popup) {
  popup.classList.remove('popup_active');
}
