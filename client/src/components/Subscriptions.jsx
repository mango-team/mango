import React from 'react';

import Gallery from './Shared/Lists/Gallery';
import ListFilters from './Shared/Lists/ListFilters';

const Subscriptions = (props, context) => {  
  return (<div className="pageContent">
          <h4>Subscriptions</h4>          
          <ListFilters title="subscriptions"/>
          <Gallery imageList={context.imageList} isBare={true} tileType={context.tileType.Deletable} />
        </div>
        )
  };
  
  Subscriptions.contextTypes = {
   imageList: React.PropTypes.array,
   tileType: React.PropTypes.object
};

export default Subscriptions;