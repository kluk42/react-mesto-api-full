import lidPath from '../../images/Lid.svg';
import binPath from '../../images/Bin.svg';
import React, {useContext} from 'react';
import {CurrentUserContext} from '../Contexts/CurrentUserContext';

function Card ({imgLink, name, likesNumber, isLiked, handleCardClicked, cardOwnerId, onCardLike, c, onCardDelete}) {
    const card = c; //Объект с карточкой из Main
    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = cardOwnerId === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (`delete-button ${isOwn ? '' : 'delete-button_state_hidden'}`);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `like-button ${isLiked ? 'like-button_state_active' : ''}`;

    const handleLikeClick = () => {
        onCardLike(card)
    }

    const handleDeleteClick = () => {
        onCardDelete(card)
    }

    return(
        <div className="card">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}>
                <img src={lidPath} alt="Крышка" className="delete-button__lid"/>
                <img src={binPath} alt="Урна" className="delete-button__bin"/>
            </button>
            <img src={imgLink} className="card__picture" alt={name} onClick={handleCardClicked}/>
            <div className="card__bottom">
                <p className="card__name">{name}</p>
                <div className="like-section">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <p className="like-section__likes-counter">{likesNumber}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;