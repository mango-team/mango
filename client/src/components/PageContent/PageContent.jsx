import React from 'react';

import TitleBar from './TitleBar';

const PageContent = ({children, navigationList}) => {
  return (
    <main className="mdl-layout__content">
      <div className="page-content">
        <TitleBar navigationList={navigationList}/>
        <div>{children}</div>
      </div>
    </main>
  )
};

export default PageContent;
