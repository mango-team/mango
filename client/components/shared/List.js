import React from 'react';
import ListItem from './ListItem';

const List = (props) => {
    const {title, items, children} = props;
    return (
        <div>
            {title}
            {items && items.map((item, index) => <ListItem key={index} item={item} {...props} />)}
            {children}
        </div>
    )
};

export default List;