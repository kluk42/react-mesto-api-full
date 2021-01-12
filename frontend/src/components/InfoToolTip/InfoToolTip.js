import React from 'react';
import successImgPath from '../../images/success-status.png';
import failureImgPath from '../../images/failure-status.png';

const InfoToolTip = ({ isSuccess, onClose, errorMessage, clickPopupOverlay }) => {

    const onCloseClick = () => {
        onClose();
    }

    return (
        <div className="popup popup-opener" onClick={clickPopupOverlay}>
            <div className="popup__window">
                <button className="close-button popup__close-button" type="button" onClick={onCloseClick}/>
                {isSuccess ? <img className="popup__img-status" src={successImgPath} alt="галочка"></img> : <img className="popup__img-status" src={failureImgPath} alt="крестик"></img>}
                {isSuccess ? <p className="popup__text-status">Вы успешно зарегистрировались!</p> : <p className="popup__text-status">{errorMessage}</p>}
            </div>
        </div>
    )
}

export default InfoToolTip;