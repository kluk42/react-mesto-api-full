import React, {useState, useContext, useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import {CurrentUserContext} from '../Contexts/CurrentUserContext';

function EditProfilePopup ({isOpen, onClose, onUpdateUser, clickPopupOverlay}) {
    const [isLoading, setIsLoading] = useState(false);

    const [inputValue, setInputValue] = useState({
        userName: '',
        userDescription: ''
    })
    const [isValid, setIsValid] = useState({
        userName: true,
        userDescription: true
    })
    const [hasInvalid, setHasInvalid] = useState(false);
    const [validationMessage, setValidationMessage] = useState({
        userName: '',
        userDescription: ''
    });

    const currentUser = useContext(CurrentUserContext);
    
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
        (isValid.userName && isValid.userDescription) ? setHasInvalid(false) : setHasInvalid(true)
    }, [inputValue, isValid, hasInvalid])

    useEffect(() => {
        setInputValue({
            ...inputValue,
            userName: currentUser.name || '',
            userDescription: currentUser.about || ''
        })

        setIsValid({
            ...isValid,
            userName: true,
            userDescription: true
        })
    }, [isOpen, currentUser]); /* Стэйт имени и описания меняется при загрузке данных о пользователе с сервера. 
      При закрытии попапа значения в строках формы снова сбрасываются на те, которые находятся на сервере.
      Форма в данном случае валидна по дефолту, т.к. обе строки заполнены, значениями, которые прошли валидацию
      и были отправлены на сервер */

    const handleSubmit = (evt) => {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        setIsLoading(true)
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            newName: inputValue.userName,
            about: inputValue.userDescription,
        });

        setIsLoading(false)
    }

    return(
        <PopupWithForm 
            title = 'Редактировать профиль'
            name = 'profile'
            isOpen = {isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            hasInvalid={hasInvalid}
            isLoading={isLoading}
            buttonTitle='Сохранить'
            clickPopupOverlay={clickPopupOverlay}
        >
            <fieldset className="form__input-container">
                <label htmlFor="name-input" className="form__field">
                    <input
                        type="text"
                        name="userName"
                        placeholder="Имя пользователя"
                        id="name-input" 
                        className="form__item form__item_content_name" 
                        required
                        minLength="2" 
                        maxLength="40"
                        onChange={handleInput}
                        value={inputValue.userName}
                    />
                    <span id="name-input-error"
                        className={`form__input-error ${isValid.userName ? '' : 'form__input-error_active'}`}>
                        {validationMessage.userName}
                    </span>
                </label>
                <label htmlFor="description-input" className="form__field">
                    <input 
                        type="text"
                        name="userDescription"
                        placeholder="Род деятельности" 
                        id="description-input" 
                        className="form__item form__item_content_description" 
                        required
                        minLength="2" 
                        maxLength="200"
                        onChange={handleInput}
                        value={inputValue.userDescription}
                    />
                    <span id="description-input-error"
                        className={`form__input-error ${isValid.userDescription ? '' : 'form__input-error_active'}`}>
                        {validationMessage.userDescription}
                    </span>
                </label>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup