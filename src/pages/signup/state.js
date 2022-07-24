export default {
  signupFields: [
    {
      placeholder: "Почта",
      id: "email",
      type: "text",
      errorMessage: "Почта уже сушествует",
    },
    {
      placeholder: "Логин",
      id: "login",
      type: "text",
      errorMessage: "Логин уже существует",
    },
    {
      placeholder: "Имя",
      id: "first_name",
      type: "text",
      errorMessage: "",
    },
    {
      placeholder: "Фамилия",
      id: "last_name",
      type: "text",
      errorMessage: "",
    },
    {
      placeholder: "Пароль",
      id: "password",
      type: "password",
      errorMessage: "Почта уже сушествует",
    },
    {
      placeholder: "И еще разочек Пароль",
      id: "password_repeat",
      type: "password",
      errorMessage: "Пароли не совпадают",
    },
  ],
};
