import "./index.css";

// Открыть попап
export function openModal(open) {
  open.classList.add("popup_is-opened");
  open.classList.add("popup_is-animated");
}

// Закрыть попап
export function closeModal(close) {
  close.classList.remove("popup_is-opened");
}

// Закрыть через Оверлей
export function closeOverlay(close) {
  close.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closeModal(evt.target);
    }
  });
}

// Через Escape
export function closeEscape(close) {
  close.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 27) {
      closeModal(contentPopup);
      closeModal(imagePopup);
      closeModal(imageModal);
    }
  });
}
