import React, { useState } from "react";

const Login = ({authorizeUser}) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authorizeUser(formValue);
  };

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          // id="profile-name"
          type="email"
          placeholder="Email"
          required
          name="email"
          // minLength="2"
          // maxLength="40"
          // value={}
          onChange={handleChange}
        />
        <span className="login__error-message"></span>
        <input
          className="login__input"
          // id="profile-job"
          type="password"
          placeholder="Пароль"
          required
          name="password"
          // minLength="2"
          // maxLength="200"
          // value={}
          onChange={handleChange}
        />
        <span className="login__error-message"></span>
        <button className="login__save-btn" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
