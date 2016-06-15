const providers = [
    {
        id: '1',
        name: 'MangaFox',
        websiteUrl: 'http://mangafox.me/',
        mangas: [
            { 
                id: '1',
                name: 'Naruto',
                creators: [
                    {
                        id: '1'
                    }
                ],
                artists: [
                    { 
                        id: '1'
                    }
                ],
                status: 'completed',
                importDate: new Date(),
                releaseDate: new Date(),
                description: `Twelve years ago, the powerful Nine-Tailed Demon Fox attacked the ninja village of Konohagakure the village hidden in the leaves.
The demon was defeated and sealed into the infant Naruto Uzumaki, by the Fourth Hokage who sacrificed his life to protect the village. 
Now, Naruto is the number one most Unpredictable knuckleheaded ninja who's determined to become the next Hokage and be acknowledged by everyone who ever doubted him! From cool fights showing what it really means to be a ninja to fights for things they believe in to hairbrained fun and jokes naruto's adventures have got it all! 
With the will to never give up and a great left hook along with his ninja way: to never go back on his word, will Naruto the former outcast achieve his dream?`,
                tags: [ "action","aventure","shonen", "comedy" ],
                views: [
                    { userId: '1', date: new Date() },
                    { userId: '1', date: new Date() },
                    { userId: '1', date: new Date() },
                    { anonymous: true, date: new Date() }
                ],
                likes: [
                    { userId: '1', date: new Date() },
                    { userId: '1', date: new Date() },
                    { userId: '1', date: new Date() },
                ],
                ratings: [
                    { userId: '1', rating: 4 }
                ],
                chapters: [
                    {
                        id: '1',
                        title: 'Naruto Pilot Manga',
                        number: '0',
                        volume: '1',
                        releaseDate: new Date(),
                        scanlators: [
                            
                        ],
                        comments: [
                            {
                                userId: '1',
                                text: 'Looks interesting! Or not.',
                                date: new Date()
                            }
                        ],
                        pages: [
                            {
                                number: 1,
                                picture: '',
                                views: [
                                    { userId: '1', date: new Date() },
                                    { userId: '1', date: new Date() },
                                    { anonymous: true, date: new Date() }
                                ]
                            }
                        ]
                    }
                ],
                comments: [
                    {
                        userId: '1',
                        text: 'Best shonen ever! Or not.',
                        date: new Date()
                    }
                ]
            }
        ],
        comments: [
            {
                userId: '1',
                text: 'Best website ever! Or not.',
                date: new Date()
            }
        ]
    }
];

export default providers;