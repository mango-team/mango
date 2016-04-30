import React from 'react';

const ViewSwitcher = ({isGridSelected}) => {
 var switchToGrid = "";
 var switchToList = ""
 var gridSwitcherClassName = "viewSwitcher " + (isGridSelected ?  "viewSwitcherSelected" : "") + " gridSwitcher";
 var listSwitcherClassName = "viewSwitcher " + (isGridSelected ?  "" : "viewSwitcherSelected") + " listSwitcher";
 
  return (
      <center className="">
       <a href="javascript:void(0)" onclick={switchToGrid}><img className={gridSwitcherClassName} alt ="Gallery" src="https://image.freepik.com/free-icon/3x3-grid_318-26619.jpg" height="20px" width="20px"/></a>
       <a href="javascript:void(0)" onclick={switchToList}><img alt ="List" className={listSwitcherClassName} src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/menu-24-512.png" height="20px" width="20px"/></a>                
      </center>
  )
};

export default ViewSwitcher;