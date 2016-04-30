import React from 'react';

import ViewSwitcher from './ViewSwitcher';

const ListFilters = ({title = "", isAdvanced = false}) => {
 var searchPlaceHolder = "Search " + title;
 var searchFilter = <div>
                        <input type="search" placeholder={searchPlaceHolder}/>
                        <input type="image" width="30px" height="30px" onClick="" src="https://cdn2.iconfinder.com/data/icons/media-and-navigation-buttons-square/512/Button_15-512.png" alt="Search" title="Search"/>
                    </div>;
 var viewSwitcher = <ViewSwitcher isGridSelected="true" />;
 var detailSwitcher = <center>
                        <a href="#">Detailed</a>
                        <a href="#">Bare</a>
                      </center>;
  return (
          <div className="listFilters">
            <table>
              <tr>
                <td>
                  <label>Filter by : </label>
                  <select>
                    <option value = "1">Alphabetical</option>
                    <option value = "2">Genre</option>
                    <option value = "3">Newest</option>
                    <option value = "4">Popularity</option>
                    <option value = "5">Update</option>
                  </select>
                </td>
                <td>
                {isAdvanced ? detailSwitcher : viewSwitcher}
                </td>
                <td>
                {isAdvanced ? viewSwitcher : searchFilter}
                </td>
              </tr>
             </table>
          </div>
  )
};

export default ListFilters;