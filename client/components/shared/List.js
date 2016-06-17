import React from 'react';
import ListItem from './ListItem';

const List = ({title, items, children}) => {
    return (
        <div>
            {title}
            {items && items.map((item, index) => <ListItem key={index} item={item} />)}
            {children}
        </div>
    )
};

export default List;