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
    } else {return Promise.reject({status: response.status})}
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
    } else {return Promise.reject({status: response.status})} 
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