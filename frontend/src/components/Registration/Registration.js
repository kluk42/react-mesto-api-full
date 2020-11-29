import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Form from '../Form/Form';
import InfoToolTip from '../InfoToolTip/InfoToolTip';

const Registration = ({ headerLinkSetter, onRegister }) => {
    const [ formValues, setFormValues ] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        const link= {
            to: '/sign-in',
            linkText: 'Войти'
        }
        headerLinkSetter(link);
    }, []);

    const onChange = (evt) => {
        const {name, value} = evt.target;
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    const onSubmit = (evt) => {
        onRegister(evt, formValues);
        setFormValues({
            ...formValues,
            email: '',
            password: '',
        })
    }

    return(
        <>
            <Form header='Регистрация' btnText="Зарегистрироваться" name="registration" onSubmit={onSubmit}>
                <fieldset className="logging-form__input-container">
                    <label htmlFor="name-input" className="logging-form__field">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            id="email-input" 
                            className="logging-form__input logging-form__input_content_email"
                            onChange={onChange}
                            value={formValues.email}
                            required
                        />
                        <span id="email-input-error"
                            className={`logging-form__input-error`}>
                        </span>
                    </label>
                    <label htmlFor="name-input" className="logging-form__field">
                        <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            id="password-input" 
                            className="logging-form__input logging-form__input_content_password"
                            onChange={onChange}
                            value={formValues.password}
                            required
                        />
                        <span id="password-input-error"
                            className={`logging-form__input-error`}>
                        </span>
                    </label>
                </fieldset>
            </Form>
        </>
    )
}

export default Registration;