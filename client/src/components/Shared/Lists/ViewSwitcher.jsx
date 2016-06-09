import React from 'react';

class ViewSwitcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: this.props.initialView || 'grid'
        };
        this.toogleView.bind(this);
    }

    toogleView() {
        var view = "list";
        if (this.state.view == "list") {
            view = "grid";
        }
        this.setState({ view: view });
        if (typeof (this.props.onViewChanged) == 'function') {
            this.props.onViewChanged(this.state.view);
        }
    }

    render() {
        var isGridSelected = this.state.view == "grid";
        var gridSwitcherClassName = "viewSwitcher gridSwitcher" + (isGridSelected ? " viewSwitcherSelected" : "");
        var listSwitcherClassName = "viewSwitcher listSwitcher" + (isGridSelected ? "" : " viewSwitcherSelected");

        return (
            <center>
                <a href="javascript:void(0)" onClick={() => this.toogleView() }>
                    <img className={gridSwitcherClassName} alt ="Grid" src="https://image.freepik.com/free-icon/3x3-grid_318-26619.jpg" height="20px" width="20px"/>
                </a>
                <a href="javascript:void(0)" onClick={() => this.toogleView() }>
                    <img alt ="List" className={listSwitcherClassName} src="https://cdn2.iconfinder.com/data/icons/flat-ui-icons-24-px/24/menu-24-512.png" height="20px" width="20px"/>
                </a>
            </center>
        )
    }
}

export default ViewSwitcher;