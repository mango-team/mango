import React from 'react';

import Gallery from './Shared/Lists/Gallery';

const History = (props, context) => {  
  return (<div>
          <h4>History</h4>
          <input type="submit" defaultValue="Clear history" title="Delete all your current history" onClick={""} />
          <input type="submit" defaultValue="Pause history" title="Stop tracking your browsing" onClick={""} />
          <p>
            <div>
              <label>Filter by : </label>
              <select id = "historyFilter">
                <option value = "1">Alphabetical</option>
                <option value = "2">Genre</option>
                <option value = "3">Newest</option>
                <option value = "4">Popularity</option>
                <option value = "5">Update</option>
              </select>
             </div>
             <div>
              <a><u><img alt ="Gallery" src="https://image.freepik.com/free-icon/3x3-grid_318-26619.jpg" height="20px" width="20px"/></u></a>
              <a><img alt ="List" src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/menu-24-512.png" height="20px" width="20px"/></a>
             </div>
             <div>
              <input id="historySearch" type="search" placeholder="Search"  />
              <input type="submit" defaultValue="Search history" onClick="" />
             </div>
          </p>
          <Gallery imageList={context.imageList} isBare={true} tileType={context.tileType.Deletable} />
        </div>
        )
  };
  
  History.contextTypes = {
   imageList: React.PropTypes.array,
   tileType: React.PropTypes.object
};

export default History;