import React from 'react';

const TileHeader = ({title, tileType}) => {
    var deletable = 
    <img src="https://cdn3.iconfinder.com/data/icons/faticons/32/remove-01-512.png" height="20px" width="20px"/>;
    
    var addable = 
    <img src="http://www.public-domain-photos.com/free-cliparts-4/computer/actions/add.png" height="20px" width="20px"/>;
    
    
  return (
      <div className="tileHeader">
        <h5 iconTileHeader>{title}</h5>
        <span className="iconTileHeader"><a href="#">{tileType == "Deletable" ? deletable : addable}</a></span>
      </div>
  )
};

export default TileHeader;
