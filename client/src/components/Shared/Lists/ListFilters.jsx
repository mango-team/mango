import React from 'react';

import ViewSwitcher from './ViewSwitcher';
import InfoSwitcher from './InfoSwitcher';

const ListFilters = ({title = "", isAdvanced = false, viewSwitcherOptions}) => {
  var searchPlaceHolder = "Search " + title;
  var searchFilter = <div>
    <input type="search" placeholder={searchPlaceHolder}/>
    <input type="image" width="30px" height="30px" onClick="" src="https://cdn2.iconfinder.com/data/icons/media-and-navigation-buttons-square/512/Button_15-512.png" alt="Search" title="Search"/>
  </div>;
  var viewSwitcher = <ViewSwitcher {...viewSwitcherOptions} />;
  var detailSwitcher = <InfoSwitcher {...viewSwitcherOptions}/>;
  return (
    <div className="listFilters">
      <table>
        <tbody>
          <tr>
            <td>
              <label>Filter by: </label>
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
        </tbody>
      </table>
    </div>
  )
};

export default ListFilters;