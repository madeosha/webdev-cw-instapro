const personalKey = "elena-kozlova";
const baseHost = "https://webdev-hw-api.vercel.app";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

//Список постов на сервере
export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

//Получение списка постов с сервера
export function getUserPosts({ data, token }) {

  return fetch(postsHost + `/user-posts/${data.userId}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
  .then((response) => {
//    console.log(response);
    return response.json();
  })
  .then((data) => {
 //   console.log(data);
    return data.posts;
  });
}

// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md#%D0%B0%D0%B2%D1%82%D0%BE%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C%D1%81%D1%8F

//Регистрация нового пользователя
export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

// Вход авторизованного пользователя
export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}

// Добавляем пост на сервер
export function addPost({ description, imageUrl, token }) {
  return fetch(postsHost, {
    method: "POST",
    body: JSON.stringify(
      {
        description,
        imageUrl,
      }
    ),
    headers: {
      Authorization: token,
    },
  })
}

//Записываем лайк на сервер и получаем данные
export function like({ id, token }) {
  return fetch(postsHost + `/${id}/like`, {
    method: "POST",
    
    headers: {
      Authorization: token,
    },
  })
  .then((response) => {
    return response.json();
  })
}

//Записываем снятие лайка и получаем данные
export function disLike({ id, token }) {
  return fetch(postsHost + `/${id}/dislike`, {
    method: "POST",
    
    headers: {
      Authorization: token,
    },
  })
  .then((response) => {
    return response.json();
  })
}