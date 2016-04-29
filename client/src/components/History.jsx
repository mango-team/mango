import React from 'react';

import Gallery from './Shared/Lists/Gallery';

const History = (props, context) => {  
  return (<div>
          <h4>History</h4>
          <Gallery imageList={context.imageList} isBare={true} tileType={context.tileType.Deletable} />
        </div>
        )
  };
  
  History.contextTypes = {
   imageList: React.PropTypes.array,
   tileType: React.PropTypes.object
};

export default History;