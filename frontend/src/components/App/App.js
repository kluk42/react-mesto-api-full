import React, {useEffect, useState} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js'
import ImagePopup from '../ImagePopup/ImagePopup.js'
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import Api from '../../utils/Api.js';
import {CurrentUserContext} from '../Contexts/CurrentUserContext';
import {CardsContext} from '../Contexts/CardsContext';
import {cardsFromServerReprocessor} from '../../utils/utils';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login.js';
import Registration from '../Registration/Registration.js';
import { authorization } from '../Auth/Auth';
import { authorize } from '../Auth/Auth';
import { register } from '../Auth/Auth';
import InfoToolTip from '../InfoToolTip/InfoToolTip';

function App() {
    const [currentUser, setCurrentUser] = useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [isImgPopupOpen, setIsImgPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ headerLink, setHeaderLink ] = useState({to:'', linkText:''});
    const [ userEmail, setUserEmail ] = useState('');
    const [ infoToolTipErrorMessage, setInfoToolTipErrorMessage ] = useState('');
    const [ isSuccessInfoToolTip, setIsSuccessInfoToolTip ] = useState(false);
    const [ isInfoToolTipOpen, setIsInfoToolTipOpen ] = useState(false);
    const [ api, setApi ] = useState({});
    const [ baseUrl, setBaseUrl ] = useState('http://api.kluk.students.nomoredomains.rocks/');
    const history = useHistory();

    useEffect (() => {
//        history.push('/');
        const tokenValidator = async () => {
            try {
                const localToken = localStorage.getItem('token');
                if (localToken !== null) {
                    setApi(new Api({ baseUrl, token: localToken }));
                    const response = await authorization(localToken);
                    const authorizationResult = await response.json();
                    setIsLoggedIn(true);
                    setUserEmail(authorizationResult.email);
                    setHeaderLink({
                        ...headerLink,
                        linkText: 'Выйти',
                    });
                    history.push('/');
                }
            } catch (err) {
                console.log(err);
            }
        }
        tokenValidator();
    }, [])

    useEffect (() => {
        const getUserAndCards =  async () => {
            try {
                if (isLoggedIn) {
                    const userInfo = await api.getUserInfo();
                    const cardsFromServer = await api.getInitialCards();
                    const cardsToSet = cardsFromServer.map(item => {
                        return cardsFromServerReprocessor(item, userInfo)
                    })
                    setCards(cardsToSet);
                    setCurrentUser(userInfo);
                }
            } catch (err) {
                console.log(err)
            }
        }
        getUserAndCards()
    }, [isLoggedIn])

    const handleEditProfileButton = () => {
        setIsEditProfilePopupOpen(true);
        window.addEventListener('keydown',  handleEscClose)
    }

    const handleAddPlaceButton = () => {
        setIsAddPlacePopupOpen(true);
        window.addEventListener('keydown',  handleEscClose)
    }

    const handleEditAvatarButton = () => {
        setIsEditAvatarPopupOpen(true);
        window.addEventListener('keydown',  handleEscClose)
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImgPopupOpen(false);
        setIsConfirmationPopupOpen(false);
        window.removeEventListener('keydown', handleEscClose);
    }

    const handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            closeAllPopups()
        }
    }

    const clickPopupOverlay= (evt) => {
        if (evt.target.classList.contains('popup')) {
            closeAllPopups()
        }
    }

    const handleCardClicked = (evt) => {
        const card = {
            imgLink: evt.target.src,
            description: evt.target.alt
        }
        setSelectedCard(card);
        setIsImgPopupOpen(true);
        window.addEventListener('keydown',  handleEscClose)
    }

    const onUpdateUser = async (userData) => {
        try {
            const newUser = await api.sendUserInfo(userData);
            setCurrentUser(newUser);
        }
        catch (err) {
            console.log(err)
        }
        closeAllPopups()
    }

    const onUpdateAvatar = async (avatarLink) => {
        try {
            const newUser = await api.uploadAvatar(avatarLink);
            console.log(newUser)
            setCurrentUser(newUser);
        }
        catch (err) {
            console.log(err)
        }
        closeAllPopups()
    }

    const handleCardLike = async (card) => {
        try{
            // Отправляем запрос в API и получаем обновлённые данные карточки
            const newCardFromServer = card.isLiked ? await api.dislikeCard(card.cardId) : await api.likeCard(card.cardId);
            const newCard = cardsFromServerReprocessor(newCardFromServer, currentUser)
            console.log(newCard);
            const newCards = cards.map((c) => {
                const cardToReturn = c.cardId === card.cardId ? newCard : c;//Подставляем в массив карточек ту, которую лайкнули
                return cardToReturn
            });
            setCards(newCards);
        }
        catch (err) {
            console.log(err)
        }
    }

    const cardDelete = async (id) => {
        try {
            await api.deleteCard(id);
            const newCards = cards.filter(item => {
                return item.cardId !== id
            })
            setCards(newCards)
        }
        catch (err) {
            console.log(err)
        }
    }

    const onCardDelete = (card) => {
        setSelectedCard(card);
        setIsConfirmationPopupOpen(true);
    }

    const handleAddPlaceSubmit = async (card) => {
        try {
            const newCard = await api.uploadCard(card);
            const cardToSet = cardsFromServerReprocessor(newCard, currentUser);
            setCards([cardToSet, ...cards])
        }
        catch (err) {
            console.log(err)
        }    
        setIsAddPlacePopupOpen(false)
    }

    const headerLinkSetter = (link) => {
        setHeaderLink({
            ...headerLink,
            to: link.to,
            linkText: link.linkText
        })
    }

    const onCloseInfoToolTipFailure = () => {
        setIsInfoToolTipOpen(false);
    }

    const handleLogin = async (evt, loggingData) => {
        try {
            evt.preventDefault();
            const response = await authorize(loggingData);
            const data = await response.json();
            console.log(data.token);
            localStorage.setItem('token', data.token);
            setApi(new Api({ baseUrl, token: data.token }));
            setIsLoggedIn(true);
            setUserEmail(loggingData.email);
            setHeaderLink({
                ...headerLink,
                linkText: 'Выйти',
            })
            history.push('/');

        } catch (err) {
            console.log(err)
            if (err.status === 401) {
                setInfoToolTipErrorMessage('Неправильный email или пароль');
                setIsSuccessInfoToolTip(false);
                setIsInfoToolTipOpen(true);
            }
            if (err.status === 400) {
                setInfoToolTipErrorMessage('Неправильный email или пароль короче 6-ти символов');
                setIsSuccessInfoToolTip(false);
                setIsInfoToolTipOpen(true);
            }
            if ((err.status !== 400) && (err.status !== 401)) {
                setInfoToolTipErrorMessage('Что-то пошло не так');
                setIsSuccessInfoToolTip(false);
                setIsInfoToolTipOpen(true);
            }
        }
    }

    const handleRegister = async (evt, formValues) => {
        try {
            evt.preventDefault();
            const result = await register(formValues);
            setIsSuccessInfoToolTip(true);
            setIsInfoToolTipOpen(true);
        } catch (err) {
            if (err.status === 409) {
                setInfoToolTipErrorMessage(err.message);
                setIsSuccessInfoToolTip(false);
                setIsInfoToolTipOpen(true);
            }
            if (err.status === 400) {
                setInfoToolTipErrorMessage('Неправильный email или пароль короче 8-ми символов');
                setIsSuccessInfoToolTip(false);
                setIsInfoToolTipOpen(true);
            }
            if ((err.status !== 400) && (err.status !== 409)) {
                setInfoToolTipErrorMessage('Что-то пошло не так');
                setIsSuccessInfoToolTip(false);
                setIsInfoToolTipOpen(true);
            }
        }
    }

    const onCloseInfoToolTipSuccessfulRegistration = () => {
        setIsInfoToolTipOpen(false);
        if (isSuccessInfoToolTip) {
            history.push('/sign-in');
        }
    }

    const onSignOut = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        history.push('/sign-in');
    }

    return (
        <div className="root">
            <CurrentUserContext.Provider value={currentUser}>
                <CardsContext.Provider value={cards}>
                    <Switch>
                        <ProtectedRoute loggedIn={isLoggedIn} exact path="/">
                            <Header link={headerLink} email={userEmail} handleLogoutBtn={onSignOut} />
                            <Main
                                onEditProfile={handleEditProfileButton}
                                onAddPlace={handleAddPlaceButton}
                                onEditAvatar={handleEditAvatarButton}
                                handleCardClicked={handleCardClicked}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={onCardDelete}
                            />
                            <ImagePopup 
                                card = {selectedCard}
                                isOpen = {isImgPopupOpen}
                                onClose = {closeAllPopups}
                                clickPopupOverlay={clickPopupOverlay}
                            />
                            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={onUpdateUser} clickPopupOverlay={clickPopupOverlay} /> 
                            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} clickPopupOverlay={clickPopupOverlay} />
                            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={onUpdateAvatar} clickPopupOverlay={clickPopupOverlay} />
                            <ConfirmationPopup 
                                isOpen={isConfirmationPopupOpen} 
                                onClose={closeAllPopups} 
                                cardId={selectedCard.cardId} 
                                action={cardDelete}
                                clickPopupOverlay={clickPopupOverlay}
                            />
                            <Footer />
                        </ProtectedRoute>
                        <Route path="/sign-in">
                            <Header link={headerLink} />
                            <Login onLogin={handleLogin} headerLinkSetter={headerLinkSetter} />
                            {isInfoToolTipOpen && <InfoToolTip isSuccess={isSuccessInfoToolTip} onClose={onCloseInfoToolTipFailure} errorMessage={infoToolTipErrorMessage}></InfoToolTip>}
                        </Route>
                        <Route path="/sign-up">
                            <Header link={headerLink} />
                            <Registration headerLinkSetter={headerLinkSetter} onRegister={handleRegister} />
                            {isInfoToolTipOpen && <InfoToolTip isSuccess={isSuccessInfoToolTip} onClose={onCloseInfoToolTipSuccessfulRegistration} errorMessage={infoToolTipErrorMessage}></InfoToolTip>}
                        </Route>
                    </Switch>
                </CardsContext.Provider>
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
