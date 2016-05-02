import React from 'react';

import GridItem from './GridItem';
import { Link } from 'react-router'
import ReactDOM from 'react-dom';

class Slider extends React.Component {
     constructor(props) {
         super(props);         
         this.diplayedTiles = 5;
         this.maxTiles = 15;
         this.state = { 
             range: [0,this.diplayedTiles], 
             imageList : this.props.imageList
         };
         this.navNext.bind(this);
         this.navPrevious.bind(this);
     }
     
     navNext () { 
        var lowerRange = this.state.range[0]*1;
        lowerRange += this.diplayedTiles*1;
        var higherRange = this.state.range[1]*1;
        higherRange += this.diplayedTiles*1;
        if(higherRange <= this.maxTiles)
        {
            this.setState({range : [lowerRange, higherRange]});
        }
     }; 
   
     navPrevious() {  
         var lowerRange = this.state.range[0]*1;
        lowerRange -= this.diplayedTiles*1;
        var higherRange = this.state.range[1]*1;
        higherRange -= this.diplayedTiles*1;
        if(lowerRange => 0)
        {   
            this.setState({range : [lowerRange, higherRange]});
        }
     };  
      
     render() {
        var {isBare, tileType, name, title, linkTo} = this.props;
        var slider = [];
        var currentImage = 0;
        var sliderContentId = "sliderContent"+ name;
        
        for(currentImage = this.state.range[0]; currentImage < this.state.range[1] && currentImage < this.state.imageList.length ; currentImage++)
        {
            var element = this.state.imageList[currentImage];
            slider.push(<GridItem tile={element} isBare={isBare} tileType={tileType} key={element.name}/>);
        }   
        
  return (
      <div className="slider" id={"slider"+ name}>
        <h5><Link to={linkTo}>{title}</Link></h5>
        <br/>
        {this.state.range[0] <= 0 ? <span className="sliderNav"></span> :<a href="javascript:void(0)" onClick={() => this.navPrevious()}>
            <img alt="previous" className="sliderNav" src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-05-128.png"/>
        </a>}
        <div id={sliderContentId}>       
            {slider}
        </div>
        {this.state.range[1] >= this.maxTiles ? <span className="sliderNav"></span> : <a href="javascript:void(0)" onClick={() => this.navNext()}>
            <img alt="next" className="sliderNav" src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-06-128.png"/>
        </a>}
      </div>
  )
     }
};

export default Slider;
