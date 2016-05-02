import React from 'react';

import TileHeader from './TileHeader';
import GalleryInfo from './GalleryInfo';
import Popup from '../Popup';
import { Link } from 'react-router'

const height = "300px";
const width = "200px";

class GalleryItem extends React.Component { 
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
    var imageHref = isBare ? "" : detailPage;
    var imageOnClick = isBare ? openPopup : "";
    
  return (
      <div className="galleryItem">        
          <TileHeader title={tile.name} tileType={tileType}/>
          <Link to={imageHref} onClick={imageOnClick}>
            <img  className="tileImg"
                    src={tile.src}
                    alt={tile.name}
                    height={height}
                    width={width}
                    title={tile.name}
            />
        </Link>
        {isBare ? <Popup name={popupName}>
                    <TileHeader title={tile.name} tileType={tileType} isBare={isBare}/>
                    <GalleryInfo tile={tile}/>
                    <Link to={detailPage}>
                        <img  className="tileImg"
                                src={tile.src}
                                alt={tile.name}
                                height={height}
                                width={width}
                                title={tile.name}
                        />
                    </Link>
                </Popup> : <GalleryInfo tile={tile}/>}
      </div>
  )
  }
};

export default GalleryItem;
