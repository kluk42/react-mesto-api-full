import React, {useState, useEffect} from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function AddPlacePopup ({isOpen, onClose, onAddPlace, clickPopupOverlay}) {
    const [isLoading, setIsLoading] = useState(false);

    const [inputValue, setInputValue] = useState({
        placeName: '',
        imgLink: ''
    })
    const [isValid, setIsValid] = useState({
        placeName: false,
        imgLink: false
    })
    const [hasInvalid, setHasInvalid] = useState(true);
    const [validationMessage, setValidationMessage] = useState({
        placeName: '',
        imgLink: ''
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
        (isValid.placeName && isValid.imgLink) ? setHasInvalid(false) : setHasInvalid(true)
    }, [isValid])

    useEffect(() => {
        
        setInputValue({
            ...inputValue,
            placeName: '',
            imgLink: ''
        })

        setValidationMessage({
            ...validationMessage,
            placeName: '',
            imgLink: ''
        })

        setIsValid({
            ...isValid,
            placeName: false,
            imgLink: false
        })

      }, [isOpen]); 

    const handleSubmit = (evt) => {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        setIsLoading(true)
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
          link: inputValue.imgLink,
          name: inputValue.placeName
        });

        setIsLoading(false)
      }

    return (
        <PopupWithForm 
                title = 'Новое место'
                name = 'editor'
                isOpen = {isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}
                hasInvalid={hasInvalid}
                buttonTitle='Сохранить'
                isLoading={isLoading}
                clickPopupOverlay={clickPopupOverlay}
                >
                    <fieldset className="form__input-container">
                        <label htmlFor="place-input" className="form__field">
                            <input 
                                type="text"
                                name="placeName" 
                                placeholder="Название" 
                                id="place-input" 
                                className={`form__item form__item_content_place-name ${isValid.placeName ? '' : 'form__item_type_error'}`}
                                required 
                                minLength="1"
                                onChange={handleInput}
                                value={inputValue.placeName}
                            />
                            <span
                            id="place-input-error"
                            className={`form__input-error ${isValid.userName ? '' : 'form__input-error_active'}`}
                            >
                                {validationMessage.placeName}
                            </span>
                        </label>
                        <label htmlFor="link-input" className="form__field">
                            <input
                                type="url"
                                name="imgLink"
                                placeholder="Ссылка на картинку" 
                                id="link-input" 
                                className={`form__item form__item_content_place-name ${isValid.imgLink ? '' : 'form__item_type_error'}`}
                                required
                                onChange={handleInput}
                                value={inputValue.imgLink}
                            />
                            <span
                            id="link-input-error"
                            className={`form__input-error ${isValid.userName ? '' : 'form__input-error_active'}`}
                            >
                                {validationMessage.imgLink}
                            </span>
                        </label>
                    </fieldset>
                </PopupWithForm>
    )
}

export default AddPlacePopup