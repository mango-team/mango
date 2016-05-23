import React from 'react';

import TileHeader from './TileHeader';
import GridInfo from './GridInfo';
import Popup from '../Popup';
import Tooltip from '../Tooltip';
import { Link } from 'react-router'

const height = "300px";
const width = "200px";

class GridItem extends React.Component { 
  constructor(props) {
    super(props);  
  }
        
  render() {
    var {
          tile, 
          isBare, 
          isTooltip,
          tileType,
          route
    } = this.props;
    var popupName = tile.name;
    var openPopup = function (e){
        e.preventDefault();
        document.getElementById('popup' + popupName).style.display='block';
        document.getElementById('fade' + popupName).style.display='block';
    };
    
    var detailPage = tile.detailPage + encodeURIComponent(tile.name); 
    var to = isBare ? (isTooltip ? detailPage : "") : detailPage;
    var doOpenPopup = isBare ? (isTooltip ? function(){} : openPopup) : function(){};
    var tooltip = <Tooltip>
                    <TileHeader title={tile.name} tileType={tileType} showIcon={isBare} to={detailPage}/>
                    <GridInfo tile={tile}/>
                    <Link to={detailPage}>
                        <img className="tileImg"
                                src={tile.src}
                                alt={tile.name}
                                height={height}
                                width={width}
                                title={tile.name}
                        />
                    </Link>
                </Tooltip>;
                
     var popup = <Popup name={popupName}>
                    <TileHeader title={tile.name} tileType={tileType} showIcon={isBare} to={detailPage}/>
                    <GridInfo tile={tile}/>
                    <Link to={detailPage}>
                        <img className="tileImg"
                                src={tile.src}
                                alt={tile.name}
                                height={height}
                                width={width}
                                title={tile.name}
                        />
                    </Link>
                </Popup>;
    
  return (
      <div className="galleryItem tooltipContainer">        
          <TileHeader title={tile.name} tileType={tileType} to={to} doOpenPopup={doOpenPopup}/>
          <Link to={to} onClick={doOpenPopup}>
            <img  className="tileImg"
                    src={tile.src}
                    alt={tile.name}
                    height={height}
                    width={width}
                    title={tile.name}
            />
        </Link>
        {isBare ? (isTooltip ? tooltip : popup) : <GridInfo tile={tile}/>
          }
      </div>
  )
  }
};

export default GridItem;
