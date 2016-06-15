const users = [
    {
        username: 'oalidou',
        firstName: 'Alidou',
        lastName: 'Ouedraogo',
        subscriptions: [
            { 
                type: 'manga',
                date: new Date(),
                providerId: '1',
                manga: 'Naruto',
                lastChapter: {
                    id: '1',
                    readOn: new Date(),
                }
            }
        ]
    }
];

export default users;