import React, { useState } from "react";
import { Link } from "react-router-dom";


const Register = ({registerUser}) => {
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
    console.log(formValue);

    registerUser(formValue);
    // auth.register(email, password).then((res) => {
    //   console.log(res)
    //   navigate("/sign-in", { replace: true });
    // });
  };

  return (
    <div className="register">
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          className="register__input"
          // id="profile-name"
          type="email"
          placeholder="Email"
          required
          name="email"
          minLength="2"
          maxLength="40"
          value={formValue.email}
          onChange={handleChange}
        />
        <span className="register__error-message"></span>
        <input
          className="register__input"
          // id="profile-job"
          type="password"
          placeholder="Пароль"
          required
          name="password"
          minLength="2"
          maxLength="200"
          value={formValue.password}
          onChange={handleChange}
        />
        <span className="register__error-message"></span>
        <button className="register__save-btn" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
