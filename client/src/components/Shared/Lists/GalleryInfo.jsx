import React from 'react';

const height = "300px";
const width = "200px";

const GalleryInfo = ({tile}) => {
  return (     
         <div className="galleryItemContent">                        
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
       </div>  
  )
};

export default GalleryInfo;
