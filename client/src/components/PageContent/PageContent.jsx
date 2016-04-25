import React from 'react';

import TitleBar from './TitleBar';

const PageContent = ({children, navigationList, navigationActive}) => {
  return (
    <main className="mdl-layout__content">
      <div className="mdl-tabs mdl-js-tabs is-upgraded">
        <TitleBar navigationList={navigationList} navigationActive={navigationActive}/>
        <div>{children}</div>
      </div>
    </main>
  )
};

export default PageContent;
