import React from 'react'
import { Link } from 'react-router'
import { Navigation } from 'react-toolbox'
import childrenWithProps from './helpers/childrenWithProps'

const Manga = (props) => {
  const { mangas, params } = props
  const manga = mangas.find(manga => manga.id === params.id)
  return (
    <div>
        <div className='header'>
            <Navigation type='horizontal'>
              <Link to={`/manga/${manga.id}/${manga.name}/`} data-react-toolbox='link'>About</Link>
              <Link to={`/manga/${manga.id}/${manga.name}/reviews`} data-react-toolbox='link'>Reviews</Link>
              <Link to={`/manga/${manga.id}/${manga.name}/discussion`} data-react-toolbox='link'>Discussion</Link>
            </Navigation>
        </div>
        { childrenWithProps(props, { manga }) }
    </div>
  )
}

export default Manga
