import React from 'react';
import MangaSelector from './MangaSelector';
import AnimeSelector from './AnimeSelector';
import LightNovelSelector from './LightNovelSelector';

export default class MediaSelectors extends React.Component {
  constructor(props) {
        super(props);
  }
    
  render() {
    return (
    <div>
        <MangaSelector />
        <AnimeSelector />
        <LightNovelSelector />
    </div>
    );
  }
};