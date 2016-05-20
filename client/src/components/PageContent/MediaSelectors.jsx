import React from 'react';

var MediaEnum = Object.freeze ({ Manga: "Manga", Anime: "Anime", LightNovel: "Light novel"});

export default class MediaSelectors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: MediaEnum.Manga
    };
    this.changeMediaSelected.bind(this);
  }
  changeMediaSelected(mediaSelected) {
    if (mediaSelected != null) {
      this.setState({ selected: mediaSelected });
    }
    else {
      console.log("Error : Media selected not recognized. " + mediaSelected)
    }
  }
  // <MangaSelector />
  // <AnimeSelector />
  // <LightNovelSelector />
  render() {
    return (
      <div className="mediaSelector">
        <a className={this.state.selected == MediaEnum.Manga ? "mediaSelected" : "mediaNotSelected"} href="javascript:void(0)" onClick={() => this.changeMediaSelected(MediaEnum.Manga) }>
          {MediaEnum.Manga}
        </a>
        <a className={this.state.selected == MediaEnum.Anime ? "mediaSelected" : "mediaNotSelected"} href="javascript:void(0)" onClick={() => this.changeMediaSelected(MediaEnum.Anime) }>
          {MediaEnum.Anime}
        </a>
        <a className={this.state.selected == MediaEnum.LightNovel ? "mediaSelected" : "mediaNotSelected"} href="javascript:void(0)" onClick={() => this.changeMediaSelected(MediaEnum.LightNovel) }>
          {MediaEnum.LightNovel}
        </a>
      </div>
    );
  }
};