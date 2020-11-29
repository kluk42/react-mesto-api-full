import React, { useEffect, useState } from 'react';

import Form from '../Form/Form';

const Login = ({ headerLinkSetter, onLogin }) => {
    const [ formValues, setFormValues ] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        const link = {
            to: '/sign-up',
            linkText: 'Регистрация'
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
        onLogin(evt, formValues);
        setFormValues({
            ...formValues,
            email: '',
            password: '',
        });
    }

    return (
        <>
            <Form header="Вход" btnText="Войти" name="authorization" onSubmit={onSubmit}>
                <fieldset className="logging-form__input-container">
                    <label htmlFor="name-input" className="logging-form__field">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            id="email-input" 
                            className="logging-form__input logging-form__input_content_email"
                            value={formValues.email}
                            onChange={onChange}
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
                            value={formValues.password}
                            onChange={onChange}
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

export default Login;