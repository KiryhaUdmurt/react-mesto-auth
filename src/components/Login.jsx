import React from "react";

const Login = () => {
  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form">
        <input
          className="login__input"
          // id="profile-name"
          type="email"
          placeholder="Email"
          required
          name="email"
          minLength="2"
          maxLength="40"
          // value={}
          // onChange={}
        />
        <span className="login__error-message"></span>
        <input
          className="login__input"
          // id="profile-job"
          type="password"
          placeholder="Пароль"
          required
          name="password"
          minLength="2"
          maxLength="200"
          // value={}
          // onChange={}
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
