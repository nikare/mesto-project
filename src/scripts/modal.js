const popups = Array.from(document.querySelectorAll('.popup'));

popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target !== popup) return;
    closePopup(popup);
  });
});

export function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closePopupByEscape);
}

export function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupByEscape);
}

function closePopupByEscape(event) {
  if (event.key !== 'Escape') return;
  const activePopup = popups.find((popup) => popup.classList.contains('popup_active'));
  closePopup(activePopup);
}
