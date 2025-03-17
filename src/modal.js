//-------------------- ОТКРЫТИЕ ПОПАПОВ-----------------------
export function openModal(popup) {
  popup.classList.add("popup_is-opened", "popup_is-animated");
  popup.addEventListener("click", closeOverlay);
  document.addEventListener("keydown", closePopupEsc);
}

// ----------------------ЗАКРЫТИЕ ПОПАПОВ--------------------------
export function closeModal(closeVan, closeTwo) {
  closeVan.classList.remove("popup_is-opened", "popup_is-animated");
  closeTwo.classList.remove("popup_is-opened", "popup_is-animated");
  document.removeEventListener("keydown", closePopupEsc);
}

// --------------------------ЧЕРЕЗ ОВЕРЛЕЙ----------------------------
function closeOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target, evt.target);
  }
}

// -------------------------- ЧЕРЕЗ ESC-------------------------------
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup, popup);
  }
}

//--------------------------- ОТКРЫТИЕ КАРТИНКИ---------------------------------
export const popupImageModal = document.querySelector(".popup_type_image");
const imgStylePopup = document.querySelector(".popup__image");
const imageModalText = document.querySelector(".popup__caption");

export function openImageModal(styleImag, textImg) {
  imgStylePopup.src = styleImag.src;
  imgStylePopup.alt = styleImag.alt;
  imageModalText.textContent = textImg;
  openModal(popupImageModal);
}
