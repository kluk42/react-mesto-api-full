import React from 'react';

const ImagePopup = ({card, isOpen, onClose, clickPopupOverlay}) => {
    return (
        <div className={`popup popup_type_picture ${isOpen && 'popup-opener'}`} onClick={clickPopupOverlay} >
            <div className="popup__envelope">
                <button className="close-button popup__close-button" type="button" onClick={onClose} />
                <img src={card.imgLink} alt={card.description} className="popup__picture"/>
                <p className="popup__sign">{card.description}</p>
            </div>
        </div>
    )
}

export default ImagePopup