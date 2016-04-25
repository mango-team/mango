import React from 'react';

export default class NavigationTabs extends React.Component {
  constructor(props) {
        super(props);
  }
    
  render() {
      return (
          <ul>
          {this.props.navigationList.map(function(element){
              return (<li key={element}>{element}</li>)
          })}
          </ul>
      )
  }
};