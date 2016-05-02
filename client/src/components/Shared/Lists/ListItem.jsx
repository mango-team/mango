import React from 'react';

import { Link } from 'react-router'

const ListItem = ({tile, tileType, isBare}) => {
    const height = "150px";
    const width = "100px";
    var imageHref = tile.detailPage + encodeURIComponent(tile.name);
  return (     
         <div className="listItem">
                <div className="listItemContentImg">
                    <Link to={imageHref}>
                        <img
                            src={tile.src}
                            alt={tile.name}
                            height={height}
                            width={width}
                            title={tile.name}
                        />
                    </Link>
                </div>
                <div className="listItemContentSideInfo"> 
                    <p>        
                        <Link to={imageHref}>                   
                            {tile.name}
                        </Link>
                    </p>
                    <p>
                    {tile.tags.map(function(element){                
                        return (
                        <strong key={element}>{element} {tile.tags[tile.tags.length - 1] == element ? "" : "-"} </strong>
                        ) 
                    })}
                    </p>
                    <p>Updated on the {tile.lastUpdate} </p>
                    <p>{tile.views} views, {tile.chapterCount} chapters </p>
                </div>
                <div className="listItemContentDescription">
                    {tile.description}
                </div>
         </div>  
  )
};

export default ListItem;
