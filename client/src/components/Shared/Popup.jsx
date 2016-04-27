import React from 'react';

const Popup = ({children}) => {  
  return (
      <div>
        <div id="popup" className="popup">
            {children}
        </div>
        <div id="fade" className="blackOverlay"></div>
      </div>
  )
};

export default Popup;
