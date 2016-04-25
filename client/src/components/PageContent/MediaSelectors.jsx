import React from 'react';
import MangaSelector from './MangaSelector';
import AnimeSelector from './AnimeSelector';
import LightNovelSelector from './LightNovelSelector';

export default class MediaSelectors extends React.Component {
  constructor(props) {
        super(props);
  }
    // <MangaSelector />
    // <AnimeSelector />
    // <LightNovelSelector />
  render() {
    return (
    <div>        
        <a href="Manga" className="mdl-button mdl-button--colored" key="Manga">Manga</a>
        <a href="Anime" className="mdl-button mdl-button--colored" key="Anime">Anime</a>
        <a href="Light" className="mdl-button mdl-button--colored" key="LightNovel">Light Novel</a>
    </div>
    );
  }
};