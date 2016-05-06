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
             isBright : true
         };
         this.navNext.bind(this);
         this.navPrevious.bind(this);
         this.toggleFade.bind(this);
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
     
     
  render() {
    function fullscreen(){
      function e(){
        var doc=document.documentElement,
        requestFullScreen=doc.requestFullScreen||doc.webkitRequestFullScreen||doc.mozRequestFullScreen||doc.msRequestFullscreen;
        "undefined"!=typeof requestFullScreen&&requestFullScreen&&(requestFullScreen.call(doc),
        document.getElementById("readerContent").height()<=window.screen.height&&document.getElementById("readerContent").height(window.screen.height))
      }
      function a(){
        var e=document,
        a=e.cancelFullScreen||e.webkitCancelFullScreen||e.mozCancelFullScreen||e.msExitFullscreen;
        "undefined"!=typeof a&&a&&a.call(e)}
        var i=navigator.userAgent.toLowerCase();
        if(i.indexOf("msie")>-1||i.indexOf("rv:11")>-1)
          return document.getElementById("fullScreen").hide(), $(".light").css("margin-right","21px"), !1;
        var t=["fullScreen","fullScreen-back"], n=0;
        document.getElementById("fullScreen").bind("click",function(){
          return n=model.getIndexOfArr($(this).attr("class"),t),$(this).addClass(t[1-n]).removeClass(t[n]),0==n?e():a(),!1
          })
    }
        var {title} = this.props;
  return <div className="pageContent">
            <h4>Reader</h4>
            <center>
              <h5>One Piece</h5> 
              <div id="fadeReader" className="blackOverlay"></div>
              <div className="pageContentCenter">     
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
                          <a href="">
                          <img alt="Zoom -" title="Zoom +" height="30px" width="30px" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698840-icon-113-search-minus-128.png"/>
                          </a>
                          <a href="">
                          <img alt="Zoom +" title="Zoom -" height="30px" width="30px" src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698628-icon-112-search-plus-128.png"/>
                          </a>
                        </center>
                      </td>
                      <td>
                        <a href="javascript:void(0)" onClick={() => this.toggleFade()}>
                          {this.state.isBright ? "Turn dark" : "Turn bright"}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>  
                <div className="readerContent aboveFade">
                  {this.state.previous == null ? <span></span> :<a href="javascript:void(0)" onClick={() => this.navPrevious()}>
                    <div id="readerRight"> 
                          <div className="readerNav" id="readerNavLeft">                        
                            <img alt="previous" src="https://cdn0.iconfinder.com/data/icons/slim-square-icons-basics/100/basics-05-128.png"/>
                          </div>
                    </div>                
                  </a>}
                  <center id="readerImage">
                    <img src={this.state.current}/>
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