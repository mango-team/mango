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
                date: new Date(),
                providerId: '1',
                manga: 'Naruto',
                notifyOnNewChapter: true,
                lastChapter: {
                    id: '1',
                    readOn: new Date(),
                }
            }
        ],
        settings: {

        }
    }
];

export default users;