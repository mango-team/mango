import React from 'react';
import List from '../shared/List';
import listFrom, { mangaDetailPageUrl } from '../helpers/listFrom';

const RecommendedByFriends = (props) => {
    return (
        <List items={listFrom(props, props.app.friendsRecommendations, mangaDetailPageUrl)} />
    )
}

export default RecommendedByFriends;