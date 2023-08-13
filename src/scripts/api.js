export async function api(url, method = 'GET') {
  return fetch(`https://nomoreparties.co/v1/plus-cohort-27/${url}`, {
    method: method,
    headers: { authorization: '62c4f3cc-13e3-43aa-8c7b-1efac6a855f6' },
  })
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
