import React, {useState, useContext} from 'react';
import brushPath from '../../images/brush.svg';
import Card from '../Card/Card';
import {CurrentUserContext} from '../Contexts/CurrentUserContext';

function Main ({onEditProfile, onAddPlace, onEditAvatar, handleCardClicked, onCardLike, onCardDelete, cards}) {
    const [isAvatarHovered, setIsAvatarHovered] = useState(false);

    const currentUser = useContext(CurrentUserContext);//Подписка на данные о пользователе

/* Функции рендера кнопки на аватарке */
    const handleMouseEnterAvatar = () => {
        setIsAvatarHovered(true);
    }

    const handleMouseLeaveAvatar = () => {
        setIsAvatarHovered(false);
    }
    
    return (
        <main className="content">
        <section className="profile section">
            <div className="profile-avatar">
                <img 
                src={currentUser.avatar}
                alt={currentUser.name}
                className="profile-avatar__image"
                onMouseEnter={handleMouseEnterAvatar}
                onMouseLeave={handleMouseLeaveAvatar}
                />
                <img 
                    src={brushPath} 
                    alt="Кисточка" 
                    className={`profile-avatar__brush ${isAvatarHovered && 'profile-avatar__brush_state_visible'}`} 
                    onClick={onEditAvatar}
                    onMouseEnter={handleMouseEnterAvatar}
                />
            </div>
            <div className="profile__info">
                <div className="profile__info-line">
                <h2 className="profile__name">{currentUser.name}</h2>
                    <button className="edit-button profile__edit-button" onClick={onEditProfile}/>
                </div>
                <p className="profile__description">{currentUser.about}</p>
            </div>
            <button className="add-button profile__add-button" onClick={onAddPlace}></button>
        </section>
        <section className="gallery section">
            {cards.map(card => <Card key={card.cardId} {...card} c={card} handleCardClicked={handleCardClicked} onCardLike={onCardLike} onCardDelete={onCardDelete}/>)}
        </section>
    </main>
    )
}

export default Main;