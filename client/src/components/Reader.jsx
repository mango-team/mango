import React from 'react';

class Reader extends React.Component { 
       
     constructor(props) {
         super(props);         
         this.diplayedTiles = 5;
         this.maxTiles = 15;
         this.state = { 
             previous : "this.props.previous",
             next : "this.props.next",
             current : "http://i5.mangareader.net/one-piece/1/one-piece-1668161.jpg", //this.props.current
             isBright : true,
             isFullscreen : false
         };
         this.navNext.bind(this);
         this.navPrevious.bind(this);
         this.toggleFade.bind(this);
         this.toggleFullscreen.bind(this);
         this.zoomIn.bind(this);
         this.zoomOut.bind(this);
         this.zoomOff.bind(this);
         this.fullScreenIsClosing.bind(this);
     }  
     
     componentDidMount () {     
          // document.getElementById("readerImage").addEventListener('load', function() {
          //   console.log('My width is: ', this.naturalWidth);
          //   console.log('My height is: ', this.naturalHeight);
          //   document.getElementById("readerContent").height = this.naturalHeight;
          // });
          console.log(document.getElementById("readerContent").style.height);
          document.addEventListener("fullscreenchange",() => this.fullScreenIsClosing(), false);
          document.addEventListener("mozfullscreenchange",() => this.fullScreenIsClosing(), false);
          document.addEventListener("webkitfullscreenchange",() => this.fullScreenIsClosing(), false);
          document.addEventListener("msfullscreenchange",() => this.fullScreenIsClosing(), false);
     }
     
     // Change fullscreen state when closing the fullscreen mode
     fullScreenIsClosing() {
          var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
          if(!fullscreenElement)
            this.setState({isFullscreen: ! this.state.isFullscreen});
     }
     
     navNext() {
       
     }
     
     navPrevious(){
       
     }
     
     toggleFade(){   
       if(this.state.isBright)    
         document.getElementById('fadeReader').style.display='block';
       else
        document.getElementById('fadeReader').style.display='none';
        this.setState({isBright: ! this.state.isBright});
     }
     
     toggleFullscreen(){
       var elem = document.getElementById("reader");
       
       if(!this.state.isFullscreen)
       {
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
          } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
          } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
          }          
        this.setState({isFullscreen: ! this.state.isFullscreen});          
       }
       else
       {        
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
       }
     }
     
     zoomIn(){
       var elem = document.getElementById("readerImage");       
       elem.style.height = 110 * elem.height / 100 + "px";
     }
     
     zoomOut(){
       var elem = document.getElementById("readerImage");       
       elem.style.height = 90 * elem.height / 100 + "px";
     }
     
     zoomOff(){
       var elem = document.getElementById("readerImage");       
       elem.style.height = "100%";
     }
     
     
  render() {
        var {title} = this.props; 
  return <div className="pageContent">
            <h4>Reader</h4>
            <center>
              <h5>One Piece</h5> 
              <div id="fadeReader" className="blackOverlay"></div>
              <div className="pageContentCenter" id="reader">     
                <div className="listFilters aboveFade">
                  <table>
                  <tbody>
                    <tr>
                      <td>
                        <label>Chapter : </label>
                        <select>
                          <option value = "1">1</option>
                          <option value = "2">2</option>
                          <option value = "3">3</option>
                          <option value = "4">4</option>
                          <option value = "5">500</option>
                        </select>
                        <label>Page : </label>
                        <select>
                          <option value = "1">1</option>
                          <option value = "2">2</option>
                          <option value = "3">3</option>
                          <option value = "4">4</option>
                          <option value = "5">500</option>
                        </select>
                      </td>
                      <td>
                        <center>
                          <a href="javascript:void(0)" onClick={() => this.zoomOut()}>
                          <img alt="Zoom -" title="Zoom -" height="30px" width="30px" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698840-icon-113-search-minus-128.png"/>
                          </a>
                          <a href="javascript:void(0)" onClick={() => this.zoomIn()}>
                          <img alt="Zoom +" title="Zoom +" height="30px" width="30px" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698628-icon-112-search-plus-128.png"/>
                          </a>
                           <a href="javascript:void(0)" title="Zoom 100%" onClick={() => this.zoomOff()}>
                             100%
                          </a>
                        </center>
                      </td>
                      <td>
                       <a href="javascript:void(0)" onClick={() => this.toggleFullscreen()}>
                          {this.state.isFullscreen ? "Windowed" : "Fullscreen"}                          
                        </a>
                        <a href="javascript:void(0)" onClick={() => this.toggleFade()}>
                          {this.state.isBright ? "Turn dark" : "Turn bright"}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>  
                <div className="readerContent aboveFade" id="readerContent">
                  {this.state.previous == null ? <span></span> :<a href="javascript:void(0)" onClick={() => this.navPrevious()}>
                    <div id="readerRight"> 
                          <div className="readerNav" id="readerNavLeft">                        
                            <img alt="previous" src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-05-128.png"/>
                          </div>
                    </div>                
                  </a>}
                  <center>
                    <img id="readerImage" src={this.state.current}/>
                  </center>
                  {this.state.next == null ? <span></span> : <a href="javascript:void(0)" onClick={() => this.navNext()}>
                    <div id="readerLeft">
                          <div className="readerNav" id="readerNavRight">
                            <img alt="next" src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-06-128.png"/>
                          </div>
                    </div>
                  </a>}
                </div>
              </div>
            </center>
        </div>
  }
};

export default Reader;