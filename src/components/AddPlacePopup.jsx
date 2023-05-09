import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

export default function AddPlacePopup(props) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    link: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  useEffect(() => {
    setValues({
      name: "",
      link: "",
    });
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
        onChange={handleChange}
        value={values.name}
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
        onChange={handleChange}
        value={values.link}
      />
      <span className="popup__error-message card-url-error"></span>
    </PopupWithForm>
  );
}
