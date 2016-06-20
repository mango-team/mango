let id = 0
const mangas = [
  {
    id: ++id,
    name: 'Naruto',
    type: 'manga',
    providerId: '1',
    creators: [ '1' ],
    artists: [ '1' ],
    status: 'completed',
    importDate: Date.now(),
    releaseDate: new Date(1999),
    publication: 'weekly',
    coverPictureUrl: 'http://s3.mangareader.net/cover/naruto/naruto-l0.jpg',
    description: `Twelve years ago, the powerful Nine-Tailed Demon Fox attacked the ninja village of Konohagakure the village hidden in the leaves.
The demon was defeated and sealed into the infant Naruto Uzumaki, by the Fourth Hokage who sacrificed his life to protect the village. 
Now, Naruto is the number one most Unpredictable knuckleheaded ninja who's determined to become the next Hokage and be acknowledged by everyone who ever doubted him! From cool fights showing what it really means to be a ninja to fights for things they believe in to hairbrained fun and jokes naruto's adventures have got it all!
With the will to never give up and a great left hook along with his ninja way: to never go back on his word, will Naruto the former outcast achieve his dream?`,
    tags: [ 'action', 'aventure', 'shonen', 'comedy' ]
  },
  {
    id: ++id,
    name: 'One Piece',
    type: 'manga',
    providerId: '1',
    creators: [ '2' ],
    artists: [ '2' ],
    status: 'ongoing',
    importDate: Date.now(),
    releaseDate: new Date(1997),
    publication: 'weekly',
    coverPictureUrl: 'http://s3.mangareader.net/cover/one-piece/one-piece-l1.jpg',
    description: `Gol D. Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the location of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece (which promises an unlimited amount of riches and fame), and quite possibly the most coveted of titles for the person who found it, the title of the Pirate King.

Enter Monkey D. Luffy, a 17-year-old boy who defies the standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate who ransacks villages for fun, Luffy’s reason for being a pirate is one of pure wonder; the thought of an exciting adventure and meeting new and intriguing people, along with finding One Piece. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach One Piece.`,
    tags: [ 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Martial Arts', 'Mystery', 'Shounen', 'Supernatural' ]
  }
]

export default mangas
