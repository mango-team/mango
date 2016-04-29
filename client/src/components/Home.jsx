import React from 'react';

import Gallery from './Shared/Lists/Gallery';

const Home = (props, context) => {
  return (<div>
          <h4>Welcome Home!</h4>
          <Gallery imageList={context.imageList} isBare={true} tileType={context.tileType.Addable} />
        </div>
        )
  };
  
  Home.contextTypes = {
   imageList: React.PropTypes.array,
   tileType: React.PropTypes.object
};

export default Home;