import React from 'react';

class ViewSwitcher extends React.Component {     
  constructor(props) {
    super(props);  
    this.state = {
    isGridSelected: this.props.isGridSelected,
    };           
  } 
 
  render() {    
    var {
          isGridSelected
    } = this.state;
    var switchToGrid = (e) => {
        this.setState({isGridSelected: true});
    };
    var switchToList = (e) => {
        this.setState({isGridSelected: false});  
    };  
      
    var gridSwitcherClassName = "viewSwitcher " + (isGridSelected ?  "viewSwitcherSelected" : "") + " gridSwitcher";
    var listSwitcherClassName = "viewSwitcher " + (isGridSelected ?  "" : "viewSwitcherSelected") + " listSwitcher";    
  return (
      <center className="">
       <a href="javascript:void(0)" onClick={switchToGrid}><img className={gridSwitcherClassName} alt ="Gallery" src="https://image.freepik.com/free-icon/3x3-grid_318-26619.jpg" height="20px" width="20px"/></a>
       <a href="javascript:void(0)" onClick={switchToList}><img alt ="List" className={listSwitcherClassName} src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/menu-24-512.png" height="20px" width="20px"/></a>                
      </center>
  )
  }
};

export default ViewSwitcher;