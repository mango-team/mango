import React from 'react';

import Gallery from './Shared/Lists/Gallery';

const Browse = (props, context) => {
  return <div className="pageContent">
    <h4>Browse</h4>
    <h5>Comming soon !</h5>
    <Gallery imageList={context.imageList} isBare={true} tileType={context.tileType.Addable} />
  </div>
};

Browse.contextTypes = {
  imageList: React.PropTypes.array,
  tileType: React.PropTypes.object
};

export default Browse;