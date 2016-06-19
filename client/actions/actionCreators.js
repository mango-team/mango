export function like(itemType, mangaId, userId, date) {
    return {
        type: 'LIKE',
        itemType,
        mangaId,
        userId, 
        date
    }
}