import React from 'react';

import TileHeader from './TileHeader';
import GalleryInfo from './GalleryInfo';

const height = "300px";
const width = "200px";

const GalleryItem = ({tile, isBare, tileType}) => {
  return (
      <div className="galleryItem">        
          <TileHeader title={tile.name} tileType={tileType}/>
          <a href="#">
          <img  className="tileImg"
                src={tile.src}
                alt={tile.name}
                height={height}
                width={width}
          />
        </a>
        {isBare ? "" : <GalleryInfo tile={tile} isBare={isBare}/>}
      </div>
  )
};

export default GalleryItem;
