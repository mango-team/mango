import React from 'react';
import { Link } from 'react-router'

export default class NavigationTabs extends React.Component {
  constructor(props) {
        super(props);
  }  
  // Not working I don't know why :'(
  //style={element.isDisabled ? "pointer-events: none; cursor: default;" : ""}
  render() {    
      return (
          <div className="mdl-tabs__tab-bar">
            {this.props.navigationList.map(function(element){                
                return (<Link to={element.name.toLowerCase()}
                 className={element.isActive ? "mdl-tabs__tab is-active" : "mdl-tabs__tab"} 
                 key={element.name}>
                 {element.name}
                 </Link>) 
            })}
          </div>
      )
  }
};