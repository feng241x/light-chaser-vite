import React from "react";
import ReactDOM from "react-dom";
import {BluePrint} from "../../../../blueprint/BluePrint";

export const BluePrintHdImpl: React.FC = () => {
    return ReactDOM.createPortal(<div style={{position: 'relative', height: '100%', top: -window.innerHeight, zIndex: 2}}>
        <BluePrint/>
    </div>, document.body)
}
