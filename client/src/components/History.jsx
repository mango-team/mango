import React from 'react';

import Gallery from './Shared/Lists/Gallery';

import ListFilters from './Shared/Lists/ListFilters';

const History = (props, context) => {  
  return (<div className="pageContent">
          <h4>History</h4>
          <center className="listButtons">
          <input type="submit" defaultValue="Clear history" title="Delete all your current history" onClick={""} />
          <input type="submit" defaultValue="Pause history" title="Stop tracking your browsing" onClick={""} />
          </center>
          <ListFilters title="history"/>
          <Gallery imageList={context.imageList} isBare={true} tileType={context.tileType.Deletable} />
        </div>
        )
  };
  
  History.contextTypes = {
   imageList: React.PropTypes.array,
   tileType: React.PropTypes.object
};

export default History;