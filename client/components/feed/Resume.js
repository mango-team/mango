import React from 'react';
import List from '../shared/List';
import listFrom, { mangaChapterPageUrl } from '../helpers/listFrom';

const Resume = (props) => {
    return (
        <List items={listFrom(props, props.user.history, mangaChapterPageUrl)} />
    )
};

export default Resume;