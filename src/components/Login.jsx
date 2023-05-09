import React from "react";
import useForm from "../hooks/useForm";

const Login = ({ authorizeUser }) => {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    authorizeUser(values);
  };

  return (
    <div className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          required
          name="email"
          minLength="2"
          maxLength="40"
          value={values.email}
          onChange={handleChange}
        />
        <span className="login__error-message"></span>
        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          required
          name="password"
          minLength="2"
          value={values.password}
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
