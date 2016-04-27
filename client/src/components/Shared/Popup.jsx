import React from 'react';

const Popup = ({name,children}) => { 
    var popupId = "popup" + name; 
    var fadeId = "fade" + name; 
     var closePopup = function (){
        document.getElementById('popup'  + name).style.display='none';
        document.getElementById('fade' + name).style.display='none';
    };
  return (
      <div>
        <div id={popupId} className="popup">
            <a className="popupHeader" href="javascript:void(0)" onClick={closePopup}>
                <img src="https://cdn3.iconfinder.com/data/icons/faticons/32/remove-01-512.png" height="20px" width="20px"/>
            </a>
            <div className="popupContent">
            {children}
            </div>
        </div>
        <div id={fadeId} className="blackOverlay"></div>
      </div>
  )
};

export default Popup;
