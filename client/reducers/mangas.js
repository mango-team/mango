function likeManga(state = [], action) {
    const { type, itemType, mangaId, userId, date } = action;

    const manga = state.find((manga) => manga.id == mangaId);
    const index = state.indexOf(manga);
    
    const newState = [ ...state ];

    newState[index]= {
        ...manga,
        likes: [
            ...manga.likes,
            {
                userId, 
                date
            }
        ]
    };
    
    return newState;
}

function mangas(state = [], action) {
    const { type, itemType,mangaId, userId, date } = action;
    switch (type) {
        case 'LIKE':
            if(itemType == 'manga')
                return likeManga(state, action);
        default:
            return state;
    }
}

export default mangas;