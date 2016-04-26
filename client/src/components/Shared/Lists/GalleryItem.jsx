import React from 'react';

import TileHeader from './TileHeader';

const height = "300px";
const width = "200px";

const GalleryItem = ({tile, isBare, tileType}) => {
  return (
      <div className="galleryItem">        
          <TileHeader title={tile.name} tileType={tileType}/>
          <a href="#">
          <img  src={tile.src}
                alt={tile.name}
                height={height}
                width={width}
          />
        </a>
        {isBare ? "" : <p className="galleryItemContent">
          {tile.description}
        </p>}   
      </div>
  )
};

export default GalleryItem;
