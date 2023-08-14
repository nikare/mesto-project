export const userId = 'e3e254c8614a98964613142c';
const token = '62c4f3cc-13e3-43aa-8c7b-1efac6a855f6';

const instance = async (url, options) => {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-27/${url}`, {
    headers: { authorization: token },
    ...options,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  });
};

export const api = {
  async get(url) {
    return instance(url);
  },

  async patch(url, data) {
    return instance(url, {
      headers: { authorization: token, 'Content-Type': 'application/json' },
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async post(url, data) {
    return instance(url, {
      headers: { authorization: token, 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async delete(url) {
    return instance(url, { method: 'DELETE' });
  },

  async put(url) {
    return instance(url, { method: 'PUT' });
  },
};
