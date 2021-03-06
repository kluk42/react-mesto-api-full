export const baseUrl = 'http://api.kluk.students.nomoredomains.rocks';

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
        return Promise.reject(response);
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
        console.log(`Ошибка: ${response.status}`)
        return Promise.reject(response)
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