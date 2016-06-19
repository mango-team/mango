import React from 'react'
import { Link } from 'react-router'
import { FontIcon } from 'react-toolbox'

const ListItem = (props) => {
  const { item, user } = props
  const ratings = () => {
    let rating = 4
    return (
        <span>{rating}/10</span>
    )
  }
  const likes = () => {
    const { likes } = props
    const itemLikes = (likes || []).filter((like) => like.itemType === item.type && like.itemId === item.id)
    return (
        <span>{itemLikes.length} <FontIcon value='favorite' onClick={() => props.like(item.type, item.id, user.id, Date.now()) } /></span>
    )
  }

  return (
    <div className='listing-item'>
        <div className='header'>
            {ratings()}
            <span> </span>
            {likes()}
        </div>
        <div className='content'>
            <Link to={item.url} title={item.description}>
                <img src={item.coverPictureUrl} />
            </Link>
        </div>
        <div className='footer'>
            <Link to={item.url}>
                {item.name}
            </Link>
        </div>
    </div>
  )
}

export default ListItem
