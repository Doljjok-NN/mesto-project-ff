const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "7bda876f-318f-4941-a0cf-9029fab62bbc",
    "Content-Type": "application/json",
  },
};

// GET - запрос данных
// POST - отправка данных
// PUT - заменна данных на сервере
// PATCH - частичная замена
// DELETE - удаление данных
// HEAD - запросы только заголовков

// запрос сервера
function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`ошибка ${res.status}`);
}

// запрос профиля
export function getProfil() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(getResponse);
}

//Редактирование профиля
export function profileEdit(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(getResponse);
}

// запрос массива карточек
export function getCard() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(getResponse);
}

// новая карточка
export function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(getResponse);
}

// удаление карточки
export function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

// добавление лайка
export function likeCard(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  });
}

// удаление лайка
export function deleteLike(id) {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

// аватар
export function changeAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    })
  }).then(getResponse);
}
