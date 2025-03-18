//-------------------- ОТКРЫТИЕ ПОПАПОВ-----------------------
export function openModal(popup) {
  popup.classList.add("popup_is-opened", "popup_is-animated");
  popup.addEventListener("click", closeOverlay);
  document.addEventListener("keydown", closePopupEsc);
}

// ----------------------ЗАКРЫТИЕ ПОПАПОВ--------------------------
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened", "popup_is-animated");
  document.removeEventListener("keydown", closePopupEsc);
}

// --------------------------ЧЕРЕЗ ОВЕРЛЕЙ----------------------------
function closeOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
}

// -------------------------- ЧЕРЕЗ ESC-------------------------------
function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}
