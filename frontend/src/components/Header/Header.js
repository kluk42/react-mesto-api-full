import React, { useState } from 'react';
import headerLogoPath from '../../images/header-logo.svg';
import { Link } from 'react-router-dom';

function Header ({ link, email, handleLogoutBtn }) {
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);

    const onMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <header className={`header ${isMenuOpen ? 'header_content_open-menu': ''}`}>
            <img src={headerLogoPath} alt="Mesto-Russia" className={`header__logo ${isMenuOpen ? 'header__logo_state_open-menu': ''}`}/>
            {email && 
            <>
                <div className={`header__wrapper ${isMenuOpen ? 'header__wrapper_state_open-menu' : ''}`}>
                    <p className={`header__email ${isMenuOpen ? 'header__email_state_open-menu': ''}`}>{email}</p>
                    <button className="header__sign-out-btn" onClick={handleLogoutBtn}>{link.linkText}</button>
                </div>
                <button onClick={onMenuClick} className={`header__menu-btn ${isMenuOpen ? 'header__menu-btn_state_open-menu' : 0}`}></button>
            </>
            }
            {!email && <Link className="header__link" to={link.to}>{link.linkText}</Link>}

        </header> 
    )
}

export default Header;