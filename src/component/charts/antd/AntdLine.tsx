import React, {Component} from 'react';
import {Line} from "@ant-design/charts";
import EditTools from "../../edit-tool";

interface AntdLineProps {
    chartConfig?: any;
    updateActive?: (data: { elemId: number, type: string }) => void; //打开右侧配置项回调
    elemId?: string;
}

/**
 * 基础柱状图
 */
export default class AntdLine extends Component<AntdLineProps> {

    render() {
        const {chartConfig, elemId} = this.props;
        const {chartProps, baseStyle} = chartConfig;
        return (
            <div style={{width: '100%', height: '100%', position: 'absolute', ...baseStyle}}>
                <EditTools {...this.props} elemId={elemId}/>
                <Line supportCSSTransform={true} className={'grid-chart-item'} {...chartProps}/>
            </div>
        );
    }
}
