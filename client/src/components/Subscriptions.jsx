import React from 'react';

import Gallery from './Shared/Lists/Gallery';
import ListFilters from './Shared/Lists/ListFilters';

class Subscriptions extends React.Component {
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
        initialView: "grid",
        initialInfo: "detailed",
        onViewChanged: (newView) => this.onViewChanged(newView),
        onInfoChanged: (newInfo) => this.onInfoChanged(newInfo)
      }
    };
    return (
      <div className="pageContent">
        <h4>Subscriptions</h4>
        <div className="pageContentCenter">
          <ListFilters title="subscriptions" {...options}/>
          <Gallery imageList={this.context.imageList} isBare={this.state.isBareView} tileType={this.context.tileType.Deletable} isList={this.state.isListView} />
        </div>
      </div>
    )
  };
}

Subscriptions.contextTypes = {
  imageList: React.PropTypes.array,
  tileType: React.PropTypes.object
};

export default Subscriptions;