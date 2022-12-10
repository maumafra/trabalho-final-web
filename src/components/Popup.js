import React from "react";

export default function Popup (props) {
    const className = props.config.error? 'popup-inner-error' : 'popup-inner-success';
    return(props.trigger) ? (
        <div className="popup">
            <div className={className}>
                <p className="close-popup" onClick={() => props.closeDialog(true)}>X</p>
                {props.config.innerHTML}
            </div>
        </div>
    ) : "";
}