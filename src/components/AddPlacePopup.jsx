import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const cardNameRef = useRef(null);
  const cardLinkRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
  }

  useEffect(() => {
    cardNameRef.current.value = "";
    cardLinkRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        id="card-name"
        type="text"
        placeholder="Название"
        required
        name="name"
        minLength="2"
        maxLength="30"
        ref={cardNameRef}
      />
      <span className="popup__error-message card-name-error"></span>
      <input
        className="popup__input popup__input_type_link"
        id="card-url"
        type="url"
        placeholder="Ссылка на картинку"
        required
        name="link"
        ref={cardLinkRef}
      />
      <span className="popup__error-message card-url-error"></span>
    </PopupWithForm>
  );
}
