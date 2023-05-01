import React from "react";
import successPin from "../images/success-logo.svg";
import errorPin from "../images/errror-logo.svg";

const InfoTooltip = () => {
  return (
    <div className="popup popup_type_info">
      <div className="popup__container">
        <img className="popup__info-img" src={successPin} alt="Успешно"/>
        <p className="popup__text">Вы успешно зарегистрировались!</p>
        <button
          className="popup__close-btn"
          type="button"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  );
};

export default InfoTooltip;
