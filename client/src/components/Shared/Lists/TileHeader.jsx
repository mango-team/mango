import React from 'react';

const TileHeader = ({title, tileType, isBare}) => {
    var deletable = 
    <img src="https://cdn3.iconfinder.com/data/icons/faticons/32/remove-01-512.png" height="20px" width="20px"/>;
    
    var addable = 
    <img src="http://www.public-domain-photos.com/free-cliparts-4/computer/actions/add.png" height="20px" width="20px"/>;

  return (
      <div className="tileHeader">
        <h5 className="titleTileHeader" title={title}>{title}</h5>
        {isBare ? "" : <a href="#" className="iconTileHeader">{tileType == "Deletable" ? deletable : addable }</a>}
      </div>
  )
};

export default TileHeader;
