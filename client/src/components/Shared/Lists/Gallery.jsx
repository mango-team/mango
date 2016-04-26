import React from 'react';

import GalleryItem from './GalleryItem';

const Gallery = ({imageList, isBare, tileType}) => {  
  return (
      <div className="gallery">
        {imageList.map(function(element){                
                return (
                 <GalleryItem tile={element} isBare={isBare} tileType={tileType} key={element.name}/> 
                 ) 
            })}
      </div>
  )
};

export default Gallery;
