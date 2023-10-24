export const validateTelephoneNumber = (telephone: string) => {
  return fetch(`http://apilayer.net/api/validate?access_key=40f9d88b9f643c2271948f1d9db131c2&number=
    ${telephone}&country_code=RU&format=1`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};
