import React from 'react';

import TileHeader from './TileHeader';
import GridInfo from './GridInfo';
import Popup from '../Popup';
import { Link } from 'react-router'

const ListItem = ({tile, tileType, isBare}) => {
    var popupName = tile.name;
    var openPopup = function (e) {
        e.preventDefault();
        document.getElementById('popup' + popupName).style.display = 'block';
        document.getElementById('fade' + popupName).style.display = 'block';
    };
    const height = "150px";
    const width = "100px";
    var to = tile.detailPage + encodeURIComponent(tile.name);
    return (
        <div className="listItem">
            {
                isBare ?
                    <div className="listBareItem">
                        <TileHeader title={tile.name} tileType={tileType} showIcon={isBare} to="" doOpenPopup={openPopup}/>
                        <Popup name={popupName}>
                            <TileHeader title={tile.name} tileType={tileType} showIcon="false" to={to}/>
                            <GridInfo tile={tile}/>
                            <Link to={to}>
                                <img  className="tileImg"
                                    src={tile.src}
                                    alt={tile.name}
                                    height="300px"
                                    width="200px"
                                    title={tile.name}
                                    />
                            </Link>
                        </Popup>
                    </div>
                    :
                    <div className="listDetailedItem">
                        <div className="listItemContentImg">
                            <Link to={to}>
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
                                <Link to={to}>
                                    {tile.name}
                                </Link>
                            </p>
                            <p>
                                {tile.tags.map(function (element) {
                                    return (
                                        <strong key={element}>{element} {tile.tags[tile.tags.length - 1] == element ? "" : "-"} </strong>
                                    )
                                }) }
                            </p>
                            <p>Updated on the {tile.lastUpdate} </p>
                            <p>{tile.views} views, {tile.chapterCount} chapters </p>
                        </div>
                        <div className="listItemContentDescription">
                            {tile.description}
                        </div>
                    </div>
            }
        </div>
    )
};

export default ListItem;
