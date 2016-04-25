import React from 'react';

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
                return (<a href={element.name} 
                 className={element.isActive ? "mdl-tabs__tab is-active" : "mdl-tabs__tab"} 
                 key={element.name}>
                 {element.name}
                 </a>) 
            })}
          </div>
      )
  }
};