import React from 'react';

import NavigationTabs from './NavigationTabs';
import MediaSelectors from './MediaSelectors';

export default class TitleBar extends React.Component {
  constructor(props) {
        super(props);
  }
    
  render() {
    return (
    <div>
        <NavigationTabs navigationList={this.props.navigationList}/>
        <MediaSelectors />
    </div>
    );
  }
};