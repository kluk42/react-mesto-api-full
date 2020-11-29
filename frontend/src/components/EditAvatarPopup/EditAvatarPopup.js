import React, {useRef, useState, useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, clickPopupOverlay}) {
    const [inputValue, setInputValue] = useState({
        avatarLink: ''
    })
    const [isValid, setIsValid] = useState({
        avatarLink: false,
    })
    const [hasInvalid, setHasInvalid] = useState(true);
    const [validationMessage, setValidationMessage] = useState({
        avatarLink: '',
    });
    
    const handleInput = (evt) => {
        const {name, value, validity} = evt.target;
        
        setInputValue({
            ...inputValue,
            [name]: value
        })

        setIsValid({
            ...isValid,
            [name]:validity.valid
        })

        setValidationMessage({
            ...validationMessage,
            [name]:evt.target.validationMessage
        });
    }

    useEffect(() => {
        isValid.avatarLink ? setHasInvalid(false) : setHasInvalid(true)
    }, [isValid])

    useEffect(() => {
        setInputValue({
            ...inputValue,
            avatarLink: '',
        })

        setIsValid({
            ...isValid,
            avatarLink: false,
        })

        setHasInvalid(true)

        setValidationMessage({
            ...validationMessage,
            avatarLink: ''
        })
    }, [isOpen]);

    const avatarRef = useRef();

    const handleSubmit = (evt) => {
        evt.preventDefault();
      
        onUpdateAvatar(avatarRef.current.value);
    }
      
    return(
        <PopupWithForm 
            title = 'Обновить аватар'
            name = 'avatar'
            isOpen = {isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            hasInvalid={hasInvalid}
            clickPopupOverlay={clickPopupOverlay}
            buttonTitle='Сохранить'
        >
            <fieldset className="form__input-container">
                <label htmlFor="avatar-input" className="form__field">
                    <input 
                        type="url"
                        name="avatarLink"
                        placeholder="Ссылка на аватар" 
                        id="avatar-input" 
                        className={`form__item form__item_content_place-name ${isValid.avatarLink ? '' : 'form__item_type_error'}`}
                        required
                        ref={avatarRef}
                        value={inputValue.avatarLink}
                        onChange={handleInput}
                    />
                    <span id="avatar-input-error"
                        className={`form__input-error ${isValid.userName ? '' : 'form__input-error_active'}`}
                    >
                        {validationMessage.avatarLink}
                    </span>
                </label>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup