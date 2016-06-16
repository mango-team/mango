import React from 'react';
import ListingItem from './ListingItem';

const Listing = ({title, items, children}) => {
    return (
        <div>
            {title}
            {items && items.map((item, index) => <ListingItem key={index} item={item} />)}
            {children}
        </div>
    )
};

export default Listing;