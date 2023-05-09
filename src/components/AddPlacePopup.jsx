import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
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
        // ref={cardNameRef}
        onChange={handleChangeName}
        value={name}
      />
      <span className="popup__error-message card-name-error"></span>
      <input
        className="popup__input popup__input_type_link"
        id="card-url"
        type="url"
        placeholder="Ссылка на картинку"
        required
        name="link"
        // ref={cardLinkRef}
        onChange={handleChangeLink}
        value={link}
      />
      <span className="popup__error-message card-url-error"></span>
    </PopupWithForm>
  );
}
