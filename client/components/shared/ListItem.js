import React from 'react';
import { Link } from 'react-router';

const ListItem = (props) => {
    const { item } = props;
    const ratings = () => {
        let rating = 4;
        return (
            <span>{rating}/10</span>
        )
    }
    const likes = () => {
        const likes = typeof item.likes == 'undefined' ? 0 : item.likes.length;
        return (
            <span>{likes}</span>
        )
    }

    return (
        <div className="listing-item">
            <div className="header">
                {ratings()}
                <span> </span>
                {likes()}
            </div>
            <div className="content">
                <Link to={item.url} title={item.description}>
                    <img src={item.coverPictureUrl} />
                </Link>
            </div>
            <div className="footer">
                <Link to={item.url}>
                    {item.name}
                </Link>
            </div>
        </div>
    )
}

export default ListItem;