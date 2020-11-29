const cardsFromServerReprocessor = (card, user) => {
    return {
        imgLink: card.link,
        name: card.name,
        likes: card.likes,
        likesNumber: Object.keys(card.likes).length,
        isLiked: card.likes.some(id => id === user._id),
        cardOwnerId: card.owner,
        cardId: card._id
    }
}

export {cardsFromServerReprocessor}