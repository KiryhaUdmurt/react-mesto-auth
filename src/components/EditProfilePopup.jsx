import React, { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        id="profile-name"
        type="text"
        placeholder="Имя"
        required
        name="name"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="popup__error-message profile-name-error"></span>
      <input
        className="popup__input popup__input_type_status"
        id="profile-job"
        type="text"
        placeholder="О себе"
        required
        name="job"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span className="popup__error-message profile-job-error"></span>
    </PopupWithForm>
  );
}
