import React from 'react';

import Gallery from './Shared/Lists/Gallery';

const Search = (props, context) => {
  return (<div>
          <h4>Search</h4>
          <p>32 results in 0.31 seconds</p>
          
          <a><u>Detailed</u>
          </a><a>Bare</a>
          
          <a><u><img alt ="Gallery" src="https://image.freepik.com/free-icon/3x3-grid_318-26619.jpg" height="20px" width="20px"/></u></a>
          <a><img alt ="List" src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/menu-24-512.png" height="20px" width="20px"/></a>
          
          <Gallery imageList={context.imageList} isBare={false} tileType={context.tileType.Deletable}/>
        </div>
        )
  };
  
  Search.contextTypes = {
   imageList: React.PropTypes.array,
   tileType: React.PropTypes.object
};

export default Search;