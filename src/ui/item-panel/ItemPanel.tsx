import React from "react";
import "./ItemPanel.less";
import { Card, Tooltip } from "antd";
export interface ItemPanelProps {
    label: string;
    tip?: string;
    labelStyle?: React.CSSProperties;
    children: React.ReactNode;
}

export const ItemPanel: React.FC<ItemPanelProps> = (props) => {
    const {label, children, tip, labelStyle} = props;
    return (
        <Card type="inner" bordered={false} title={tip ? (
            <Tooltip title={label}>{label}</Tooltip>
        ) : label} size='small' style={Object.assign({marginTop: 6}, labelStyle)}>
            <div className={"item-panel-content"}>{children}</div>
        </Card>
        // <div className={"item-panel"}>
        //     <div className={"item-panel-label"} style={labelStyle}>
        //         <Divider orientation="left" style={{fontSize: 14}}>{label}</Divider>
        //         {tip && <Tooltip title={tip}>&nbsp;<QuestionCircleOutlined/>&nbsp;</Tooltip>}
        //     </div>
        //     <div className={"item-panel-content"}>{children}</div>
        // </div>
    )
}
