import React from 'react';

import Gallery from './Shared/Lists/Gallery';
import ListFilters from './Shared/Lists/ListFilters';

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isBareView: false,
      isListView: false
    }
  }

  onViewChanged(newView) {
    this.setState({ isListView: newView == 'grid' });
  };

  onInfoChanged(newInfo) {
    this.setState({ isBareView: newInfo == 'detailed' });
  };

  render() {
    const options = {
      viewSwitcherOptions: {
        initialView: "grid",
        initialInfo: "detailed",
        onViewChanged: (newView) => this.onViewChanged(newView),
        onInfoChanged: (newInfo) => this.onInfoChanged(newInfo)
      }
    };
    var resultNr = 32;
    var resultTime = 0.31;
    return (
      <div className="pageContent">
        <h4>Search</h4>
        <p>{resultNr} results in {resultTime} seconds</p>
        <div className="pageContentCenter">
          <ListFilters isAdvanced="true" {...options}/>
          <Gallery imageList={this.context.imageList} isBare={this.state.isBareView} tileType={this.context.tileType.Deletable} isList={this.state.isListView} />
        </div>
      </div>
    )
  }
};

Search.contextTypes = {
  imageList: React.PropTypes.array,
  tileType: React.PropTypes.object
};

export default Search;