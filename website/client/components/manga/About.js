import React from 'react'
import { Link } from 'react-router'

const About = ({ manga, views, chapters }) => {
  const mangaViews = views.filter(view => view.itemType === 'manga' && view.itemId == manga.id)
  const mangaChapters = chapters.filter(chapter => chapter.mangaId == manga.id)
  return (
    <div>
        <div>About {manga.name}</div>
        <img src={manga.coverPictureUrl} alt={manga.name} />
        <div>
            <dl>
                <dt>Released</dt>
                <dd>{new Date(manga.releaseDate).toTimeString()}</dd>
                <dt>Views</dt>
                <dd>{mangaViews.length}</dd>
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
        <table>
            <caption>Chapters</caption>
            <thead>
                <tr>
                    <th>Chapter Name</th>
                    <th>Date Added</th>
                </tr>
            </thead>
            <tbody>
                {mangaChapters.map(chapter =>
                    <tr key={chapter.id}>
                        <td><Link to={`/view/manga/${manga.id}/${manga.name}/${chapter.number}/1`}>{chapter.title}</Link></td>
                        <td>{chapter.importDate}</td>
                    </tr>)}
            </tbody>
        </table>
    </div>
  )
}

export default About
