import React from 'react';

import GalleryItem from './GalleryItem';
import { Link } from 'react-router'

const Slider = ({imageList, isBare, tileType, itemLimit, name, title, linkTo}) => { 
    var slider = [];
   
   for(var i=0; i<itemLimit; i++)
   {
       var element = imageList[i];
       slider.push(<GalleryItem tile={element} isBare={isBare} tileType={tileType} key={element.name}/>);
   }  
  
  return (
      <div className="slider" id={"slider"+ name}>
        <p>
            <h5><Link to={linkTo}>{title}</Link></h5>
        </p>
        <a className="sliderNav" href="#"><h3>&lt;</h3></a>
        {slider}
        <a className="sliderNav" href="#"><h3>&gt;</h3></a>
      </div>
  )
};

export default Slider;
