import React from "react";
import './BPFooter.less';
import bpStore from "../store/BPStore";
import {observer} from "mobx-react";
import { Typography } from 'antd';

const { Text } = Typography

export const BPFooter: React.FC = observer(() => {
    const {canvasScale} = bpStore;
    return (
        <Text>缩放:{(canvasScale * 100).toFixed(0)}%</Text>
        // <div className={'bp-footer'}>
        //     <div className={'bp-footer-item'}>
        //         <Text>缩放:{(canvasScale * 100).toFixed(0)}%</Text>
        //     </div>
        // </div>
    )
})
