import React from 'react';

import TileHeader from './TileHeader';
import GridInfo from './GridInfo';
import Popup from '../Popup';
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
    var to = isBare ? "" : detailPage;
    var doOpenPopup = isBare ? openPopup : function(){};
    
  return (
      <div className="galleryItem">        
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
        {isBare ? <Popup name={popupName}>
                    <TileHeader title={tile.name} tileType={tileType} showIcon={isBare} to={detailPage}/>
                    <GridInfo tile={tile}/>
                    <Link to={detailPage}>
                        <img  className="tileImg"
                                src={tile.src}
                                alt={tile.name}
                                height={height}
                                width={width}
                                title={tile.name}
                        />
                    </Link>
                </Popup> : <GridInfo tile={tile}/>
          }
      </div>
  )
  }
};

export default GridItem;
