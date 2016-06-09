import React from 'react';

const Tooltip = ({children, title}) => {
    var titleElement = title == undefined ? "" :
        <center>
            <h5 className="tooltipTitle">
                {title}
            </h5>
        </center>;
    return (
        <span className="tooltip">                
                {titleElement}
                <div className="tooltipContent">
                    {children}
                </div>
        </span>
    )
};

export default Tooltip;
