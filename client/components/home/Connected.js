import React from 'react';
import {Tab, Tabs} from 'react-toolbox';


class Connected extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 0
        }
    }

    onTabChange(selectedTab) {
        this.setState({selectedTab});
    }

    render() {
        return (
            <div>
                <Tabs index={this.state.selectedTab} onChange={(index) => this.onTabChange(index)}>
                    <Tab label="Home"></Tab>
                    <Tab label="Playlists"></Tab>
                    <Tab label="Subscriptions"></Tab>
                    <Tab label="History"></Tab>
                    <Tab label="Discussion"></Tab>
                    <Tab label="Settings"></Tab>
                </Tabs>
            </div>
        )
    }
};

export default Connected;