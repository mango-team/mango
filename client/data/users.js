const users = [
    {
        id: '1',
        username: 'oalidou',
        firstName: 'Alidou',
        lastName: 'Ouedraogo',
        avatarUrl: 'http://enzosakay.com/images/Profilelogo.png',
        coverUrl: 'http://yt3.ggpht.com/-6sFSluVE_eg/U1AwXf_lXaI/AAAAAAAAAAY/TLvrBD1eRQQ/w2120-fcrop64=1,00005a57ffffa5a8-nd-c0xffffffff-rj-k-no/channels4_banner.jpg',
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