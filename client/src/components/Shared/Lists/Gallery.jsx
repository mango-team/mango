import React from 'react';

import GridItem from './GridItem';
import ListItem from './ListItem';

class Gallery extends React.Component {     
  constructor(props) {
    super(props);  
  } 
  
  render () {   
    var {
          imageList,
          isBare,
          tileType,
          isList
    } = this.props;
    
    return (
        <div className="gallery">
          {imageList.map(function(element){                
                  return (
                  isList ? <ListItem tile={element} isBare={isBare} tileType={tileType} key={element.name}/>
                  : <GridItem tile={element} isBare={isBare} tileType={tileType} key={element.name}/>
                  )
              })}
        </div>
    )
   }
};

export default Gallery;
