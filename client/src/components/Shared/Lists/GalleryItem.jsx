import React from 'react';

import TileHeader from './TileHeader';

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
        {isBare ? "" : <div className="galleryItemContent">
                        
                        <p>
                            {tile.tags.map(function(element){                
                                return (
                                <strong key={element}>{element} {tile.tags[tile.tags.length - 1] == element ? "" : "-"} </strong>
                                ) 
                            })}
                        </p>
                        <p>
                            Last update on the {tile.lastUpdate}
                        </p>
                        <p>
                            {tile.views} views, {tile.chapterCount} chapters
                        </p>
                        <p>
                            {tile.description}
                        </p>
                        </div>}   
      </div>
  )
};

export default GalleryItem;
