import React from 'react';
import {Tab, Tabs} from 'react-toolbox';


class Anonymous extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 1
        }
    }

    onTabChange(selectedTab) {
        this.setState({selectedTab});
    }

    render() {
        return (
            <div>
            Hello World !!
            </div>
        )
    }
};

export default Anonymous;