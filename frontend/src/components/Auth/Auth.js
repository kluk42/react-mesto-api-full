export const baseUrl = 'http://localhost:5000';

export const register = async ({ email, password }) => {
    const response = await fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            password: password,
            email: email
        })
    })
    if (response.ok) {
        return response
    } else {
        const errParsed = await response.json();
        console.log(errParsed)
        return Promise.reject({
            status: response.status,
            message: errParsed.message !== 'celebrate request validation failed' ? errParsed.message : 'Длинна пароля не менее 8 символов, в поле email должен быть верный адрес электронной почты',
            status: response.status,
        })
    }
};

export const authorize = async ({ email, password }) => {
    const response = await fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            password: password,
            email: email
        })
    })
    if (response.ok) {
        return response
    } else {
        const err = await response.json();
        console.log(err)
        console.log(`Ошибка: ${response.status}`)
        return Promise.reject({status: response.status})
    } 
};

export const authorization = async (token) => {
    const response = await fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    })
    if (response.ok) {
        return response
    } else {return Promise.reject(response)}
};