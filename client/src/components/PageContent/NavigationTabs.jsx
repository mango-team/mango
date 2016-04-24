import React from 'react';

export default class NavigationTabs extends React.Component {
  constructor(props) {
        super(props);
  }
    
  render() {   
      var navigationList = this.props.navigationList; 
    return (
    <div>
        <ul>
        {
           navigationList.map(function(element) {
                return <li>
                   <a href="#">{element}</a>
                </li>
            }, this)
        }
        </ul>
    </div>
    );
  }
};