import React from 'react';

import { Link } from 'react-router'

const TileHeader = ({title, tileType, isBare, detailHref, doOpenPopup=function(){} }) => {
    var deletable = 
    <img src="https://cdn3.iconfinder.com/data/icons/faticons/32/remove-01-512.png" height="20px" width="20px"/>;
    
    var addable = 
    <img src="http://www.public-domain-photos.com/free-cliparts-4/computer/actions/add.png" height="20px" width="20px"/>;

  return (
      <div className="tileHeader">
        <Link to={detailHref} onClick={doOpenPopup}>
          <h5 className="titleTileHeader" title={title}>{title}</h5>
        </Link>
        {isBare ? "" : <a href="#" className="iconTileHeader">{tileType == "Deletable" ? deletable : addable }</a>}
      </div>
  )
};

export default TileHeader;
