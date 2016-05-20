import React from 'react';

import Gallery from './Shared/Lists/Gallery';

import ListFilters from './Shared/Lists/ListFilters';

class History extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isBareView: true,
      isListView: false
    }
  }

  onViewChanged(newView) {
    this.setState({ isListView: newView == 'list' });
  };

  onInfoChanged(newInfo) {
    this.setState({ isBareView: newInfo == 'bare' });
  };

  render() {
    const options = {
      viewSwitcherOptions: {
        initialView: "list",
        initialInfo: "detailed",
        onViewChanged: (newView) => this.onViewChanged(newView),
        onInfoChanged: (newInfo) => this.onInfoChanged(newInfo)
      }
    };
    return (
      <div className="pageContent">
        <h4>History</h4>
        <center className="listButtons">
          <input type="submit" defaultValue="Clear history" title="Delete all your current history" onClick={""} />
          <input type="submit" defaultValue="Pause history" title="Stop tracking your browsing" onClick={""} />
        </center>
        <div className="pageContentCenter">
          <ListFilters title="history" {...options}/>
          <Gallery imageList={this.context.imageList} isBare={this.state.isBareView} tileType={this.context.tileType.Deletable} isList={this.state.isListView} />
        </div>
      </div>
    )
  }
};

History.contextTypes = {
  imageList: React.PropTypes.array,
  tileType: React.PropTypes.object
};

export default History;