import React from 'react';

import TitleBar from './TitleBar';

class PageContent extends React.Component { 
  constructor(props) {
    super(props);  
  }
        
  render() {
    var {
          children, 
          navigationList, 
          navigationActive
    } = this.props;
    return (    
      <main className="mdl-layout__content">
        <div className="mdl-tabs mdl-js-tabs is-upgraded">
          <TitleBar navigationList={navigationList} navigationActive={navigationActive}/>
          <div>{children}</div>
        </div>
      </main>
    )
  }
};

export default PageContent;
