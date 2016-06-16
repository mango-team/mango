import React from 'react';
import { Link } from 'react-router';

class ListingItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    ratings() {
        let rating = 4;
        return (
            <span>{rating}/10</span>
        )
    }

    likes() {
        let likes = 0;
        return (
            <span>{likes}</span>
        )
    }

    render() {
        const { item, itemUrl } = this.props;
        return (
            <div className="listing-item">
                <div className="header">
                    {this.ratings()}
                    <span> </span>
                    {this.likes()}
                </div>
                <div className="content">
                    <Link to={item.url}>
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
}   


export default ListingItem;