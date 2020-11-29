import React from 'react';

const PopupWithForm = ({title, name, isOpen, onClose, children, onSubmit, hasInvalid, buttonTitle, isLoading, clickPopupOverlay}) => {
    return (
        <div className={
            `popup popup_type_${name}
             ${isOpen && 'popup-opener'}`
        }
        onClick={clickPopupOverlay}
        >
            <div className="popup__window">
                <h2 className="popup__header">{title}</h2>
                <button className="close-button popup__close-button" type="button" onClick={onClose}/>
                <form className="form" name={name} noValidate onSubmit={onSubmit}>
                    {children}
                    <button
                        className={`submit-button form__submit-button ${hasInvalid ? 'submit-button_disabled' : ''}`}
                        type="submit"
                        disabled={hasInvalid}
                    >
                        {isLoading ? `Выполняем...` : `${buttonTitle}`}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;