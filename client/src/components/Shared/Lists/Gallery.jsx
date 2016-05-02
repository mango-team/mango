import React from 'react';

import GridItem from './GridItem';
import ListItem from './ListItem';

class Gallery extends React.Component {     
  constructor(props) {
    super(props);  
    this.state = {
    isList: this.props.isList,
    };           
  } 
  
  render () {   
    var {
          imageList,
          isBare,
          tileType
    } = this.props;
    
    var {
        isList
    } = this.state
    
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
