import React from 'react';

import GalleryItem from './GalleryItem';
import { Link } from 'react-router'
import ReactDOM from 'react-dom';

const Slider = ({imageList, isBare, tileType, itemLimit, name, title, linkTo}) => { 
    var slider = [];
    var sliderNavSize = "65px";
    var currentImage = 0;
    var sliderContentId = "sliderContent"+ name;
    var maxTiles = 15;
    
   for(currentImage; currentImage < itemLimit; currentImage++)
   {
       var element = imageList[currentImage];
       slider.push(<GalleryItem tile={element} isBare={isBare} tileType={tileType} key={element.name}/>);
   }
   var navNext;
   var navPrevious;
// Attempt at sliding 
//     var navNext = function () { 
//     var higherLimit =  currentImage*1 + itemLimit*1;
//     if(higherLimit <= maxTiles)
//     {   
//         slider = [];
//         for(currentImage; currentImage < higherLimit && currentImage < imageList.length; currentImage++)
//         {  
//             var element = imageList[currentImage];            
//             slider.push(<GalleryItem tile={element} isBare={isBare} tileType={tileType} key={element.name}/>);
//             console.log("next slider : " + slider + " currentImage : " + currentImage);
//         }
        
//         var oldSliderContendId = document.getElementById(sliderContentId);
//         var newSliderContendId = 
//             <div>       
//                 {slider}
//             </div>;
//         console.log("next newSlider : " + newSliderContendId);
//         //oldSliderContendId.parentNode.replaceChild(newSliderContendId, oldSliderContendId);
//         ReactDOM.render(newSliderContendId, oldSliderContendId);
//     }
//     else
//     {
//        console.log("higherLimit > maxLimit : " + higherLimit);
//     }
//    }; 
   
//    var navPrevious = function () {  
//      currentImage = imageList.length - 1;
//      var lowerLimit = currentImage*1 - itemLimit*1;
     
//      if(lowerLimit > 0)
//      {
//          console.log("prev lowerLimit : " + lowerLimit + " currentImage : " + currentImage);
//         for(currentImage; currentImage <= lowerLimit && currentImage <= 0; currentImage--)
//         {
//             var element = imageList[currentImage];            
//             console.log("prev slider : " + slider + " currentImage : " + currentImage);
//             ReactDOM.renderComponent(<GalleryItem tile={element} isBare={isBare} tileType={tileType} key={element.name}/>, document.getElementById(sliderContentId));
//         }
//     }
//     else
//     {
//        console.log("lowerLimit <= 0");
//     }
//    };  
  
  return (
      <div className="slider" id={"slider"+ name}>
        <h5><Link to={linkTo}>{title}</Link></h5>
        <br/>
        <a className="sliderNav" href="javascript:void(0)" onClick={navPrevious}>
            <img alt="previous" width={sliderNavSize} height={sliderNavSize} src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-05-128.png"/>
        </a>
        <div id={sliderContentId}>       
            {slider}
        </div>
        <a className="sliderNav" href="javascript:void(0)" onClick={navNext}>
            <img alt="next" width={sliderNavSize} height={sliderNavSize} src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-06-128.png"/>
        </a>
      </div>
  )
};

export default Slider;
