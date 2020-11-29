import React from 'react';
import { Link } from 'react-router-dom';

const Form = (props) => {
    const { header, children, btnText, name, onSubmit } = props;
    return (
        <div className="logging-form">
            <h2 className="logging-form__header">{header}</h2>
            <form className="logging-form__form" name={name} noValidate onSubmit={onSubmit}>
                {children}
                <button type="submit" className="logging-form__submit-btn">{btnText}</button>
            </form>
            {name === "registration" ? <Link className="logging-form__suggestion" to='/sign-in'>Уже зарегистрированы? Войти</Link> : ''}
        </div> 
    )
}

export default Form;