import React from 'react'

const About = ({ manga }) => {
  return (
    <div>
        <div>About {manga.name}</div>
        <img src={manga.coverPictureUrl} alt={manga.name} />
        <div>
            <dl>
                <dt>Released</dt>
                <dd>{new Date(manga.releaseDate).toTimeString()}</dd>
                <dt>Views</dt>
                <dd></dd>
                <dt>Author(s)</dt>
                <dd></dd>
                <dt>Artist(s)</dt>
                <dd></dd>
                <dt>Publication</dt>
                <dd>{manga.publication}</dd>
                <dt>Ratings</dt>
                <dd></dd>
                <dt>Subscriptions</dt>
                <dd></dd>
                <dt>Genre(s)</dt>
                <dd></dd>
                <dt>Description</dt>
                <dd>{manga.description}</dd>
                <dt>Tags</dt>
                <dd>{manga.tags.join(', ')}</dd>
            </dl>
        </div>
    </div>
  )
}

export default About
