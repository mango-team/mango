import React from 'react';
import List from '../shared/List';
import listFrom, { mangaChapterPageUrl } from '../helpers/listFrom';

const Updates = (props) => {
    return (
        <List items={listFrom(props, props.app.updates, mangaChapterPageUrl)} />
    )
};

export default Updates;