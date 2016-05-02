import React from 'react';

class InfoSwitcher extends React.Component {
     constructor(props) {
         super(props);
         this.state = { 
             info: this.props.initialInfo|| 'bare'
         };
         this.toogleInfo.bind(this);
     }
     
     toogleInfo() {
         var info = "bare";
         if (this.state.info == "bare") {
             info = "detailed";
         }
         this.setState({info: info});
         if(typeof(this.props.onInfoChanged) == 'function') {
             this.props.onInfoChanged(this.state.info);
         }
     }
     
     render() {
        var isBareSelected = this.state.info == "bare";
        var defaultSwitcherClassName = "viewSwitcher gridSwitcher" + (isBareSelected ?  " viewSwitcherSelected" : "");
        var otherSwitcherClassName = "viewSwitcher listSwitcher" + (isBareSelected ?  "" : " viewSwitcherSelected");
        
        return (
            <center>                
                <a href="javascript:void(0)" onClick={() => this.toogleInfo()}>
                    <img alt ="Bare" className={defaultSwitcherClassName} src="https://image.freepik.com/free-icon/empty-set-mathematical-symbol_318-59301.jpg" height="20px" width="20px"/>
                </a>
                <a href="javascript:void(0)" onClick={() => this.toogleInfo()}>
                    <img className={otherSwitcherClassName} alt ="Detailed" src="https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/256/View_Details.png" height="20px" width="20px"/>
                </a>                
            </center>
        )
    }
}

export default InfoSwitcher;