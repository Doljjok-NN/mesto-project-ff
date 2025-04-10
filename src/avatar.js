import { changeAvatar } from "./api";
import { closeModal } from "./modal";
import {setSubmitButtonStatus} from "./index"

const popupAvatara = document.querySelector(".popup_type_avatar");
const popupFormAvatar = document.querySelector("#avatar_form");
const avatarProfile = document.querySelector(".new_image");
const avatarInput = document.querySelector(".avatar-input");
const buttonSaveNewAvatar = document.querySelector('.avatar-button')

export function changeAvatarProfile(url) {
  avatarProfile.src = url;
}

function changeAvatarServer(url) {
  setSubmitButtonStatus(buttonSaveNewAvatar, true)
  changeAvatar(url)
    .then((user) => {
      changeAvatarProfile(user.avatar);
      popupFormAvatar.reset();
      closeModal(popupAvatara);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
        setSubmitButtonStatus(buttonSaveNewAvatar,false)
    })
}

export function saveAvatar(evt) {
  evt.preventDefault();
  changeAvatarServer(avatarInput.value);
}
