import React from 'react';

import Gallery from './Shared/Lists/Gallery';
import ListFilters from './Shared/Lists/ListFilters';

const Search = (props, context) => {
  var resultNr = 32;
  var resultTime = 0.31;
  return (
        <div className="pageContent">
          <h4>Search</h4>
          <p>{resultNr} results in {resultTime} seconds</p>   
          <ListFilters isAdvanced="true"/>          
          <Gallery imageList={context.imageList} isBare={false} tileType={context.tileType.Addable}/>
        </div>
        )
  };
  
  Search.contextTypes = {
   imageList: React.PropTypes.array,
   tileType: React.PropTypes.object
};

export default Search;