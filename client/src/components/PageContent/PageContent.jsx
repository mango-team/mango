import React from 'react';

import TitleBar from './TitleBar';
import MainContent from './MainContent';

export default class PageContent extends React.Component {
  constructor(props) {
        super(props);
  }
    
  render() {
    return (
    <div className="pageContent">
      <TitleBar navigationList={this.props.navigationList}/>
      <MainContent />
    </div>
    );
  }
};