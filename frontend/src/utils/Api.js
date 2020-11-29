class Api {
    constructor({ baseUrl, token}) {
        this._baseUrl = baseUrl;
        this._token = token;
    }

    _resultsProcessing (res) {
        if (res.ok) {
            return res.json()
        } else {return Promise.reject(`Ошибка: ${res.status}.`)}
    }

    getInitialCards () {
        return fetch(`${this._baseUrl}cards`, {
            headers: {
                authorization: `Bearer ${this._token}`,
                'content-type': 'application/json'
            }
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
    }

    getUserInfo () {
        return fetch(`${this._baseUrl}users/me`, {
            headers: {
                authorization: `Bearer ${this._token}`,
                'content-type': 'application/json'
            }
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
    }

    sendUserInfo(data) {
        return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json'
        },
            body: JSON.stringify({
            name: data.newName,
            about: data.about
  })
})
        .then(res => {
            return this._resultsProcessing(res)
        })
    }

    deleteCard (id) {
        return fetch(`${this._baseUrl}cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
                'content-type': 'application/json'
            },
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
    }

    likeCard (id) {
        return fetch(`${this._baseUrl}cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
    }

    dislikeCard (id) {
        console.log(id)
        return fetch(`${this._baseUrl}cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
    }

    uploadCard (card) {
        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
    }

    uploadAvatar (avatarLink) {
        return fetch(`${this._baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${this._token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
        .then(res => {
            return this._resultsProcessing(res)
        })
    }
}

export default Api;