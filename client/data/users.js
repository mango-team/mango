const users = [
    {
        id: '1',
        username: 'oalidou',
        firstName: 'Alidou',
        lastName: 'Ouedraogo',
        profilePictureUrl: 'http://enzosakay.com/images/Profilelogo.png',
        subscriptions: [
            { 
                type: 'manga',
                date: Date.now(),
                providerId: '1',
                manga: 'Naruto',
                notifyOnNewChapter: true,
                lastChapter: {
                    id: '1',
                    readOn: Date.now(),
                }
            }
        ],
        settings: {

        },
        history: [
            { 
                type: 'manga',
                id: '1',
                date: Date.now(),
                chapter: '1',
                page: 1
            }
        ]
    }
];

export default users;