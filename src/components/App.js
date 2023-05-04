import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRouteElement from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAuthInfoPopupOpen, setIsAuthInfoPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInformation(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser(userInfo);
        setCards(initialCards);
      })
      .catch((err) => console.log(err));
  }, []);

  // ЗАКРЫТИЕ ПОПАПОВ
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setIsAuthInfoPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoPopupClick() {
    setIsAuthInfoPopupOpen(true);
  }

  // ЛАЙК И ДИЗЛАЙК
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    isLiked
      ? api
          .deleteLike(card._id)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((err) => console.log(err))
      : api
          .addLike(card._id)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((err) => console.log(err));
  }

  // УДАЛЕНИЕ КАРТОЧКИ
  function handleDeleteCard(card) {
    const isOwnCard = card.owner._id === currentUser._id;

    if (isOwnCard) {
      api
        .deleteCard(card._id)
        .then(() => {
          setCards((state) =>
            state.filter((c) => {
              return c._id !== card._id;
            })
          );
        })
        .catch((err) => console.log(err));
    }
  }

  // ДОБАВЛЕНИЕ КАРТОЧКИ
  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // СМЕНА ДАННЫХ ПРОФИЛЯ
  function handleUpdateUser(data) {
    api
      .changeProfileInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // СМЕНА АВАТАРА
  function handleUpdateAvatar(data) {
    api
      .changeAvatar(data)
      .then((data) => {
        console.log(data);
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // --------------------AUTHENTIFICATION---------------------------

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState("");
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token)
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    auth
      .getContent(token)
      .then((user) => {
        setUserData(user.data.email);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  }, [token, navigate]);

  const registerUser = ({ email, password }) => {
    auth
      .register(email, password)
      .then((res) => {
        console.log(res);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => console.log(err));
    // ВЫВОД ОШИБОК В ПОПАП ДОБАВИТЬ
  };

  const authorizeUser = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.token);
        setToken(res.token);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setToken("");
    setUserData("")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoggedIn={isLoggedIn} onLogout={logOut} userData={userData}/>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCard}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register registerUser={registerUser} onInfoClick={handleInfoPopupClick}/>}
          />
          <Route
            path="/sign-in"
            element={<Login authorizeUser={authorizeUser} />}
          />
        </Routes>
        <Footer isLoggedIn={isLoggedIn}/>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={selectedCard}
        />
        <InfoTooltip isLoggedIn={isLoggedIn} onClose={closeAllPopups} isOpen={isAuthInfoPopupOpen}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
