import React, { Component } from 'react';
import {ConfigType} from "../../../designer/right/ConfigContent";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import AntdCommonUtil from '../../antd-common/AntdCommonUtil';
import { ColumnOptions, LineOptions } from '@antv/g2plot';
import AntdCommonLineController from '../../antd-common/line/AntdCommonLineController';
import { AntdCartesianCoordinateSys } from '../../antd-common/config/AntdFragment';


class ColumnStatisticStyleConfig extends Component<ConfigType> {

    lineGraphicsChange = (config: LineOptions) => {
        const controller = this.props.controller as AntdCommonLineController;
        controller.update({style: config});
    }

    barGraphicsChange = (config: ColumnOptions) => {
        const controller= this.props.controller as AntdCommonLineController;
        controller.update({style: config});
    }

    barCoordinateSysChange = (config: ColumnOptions) => {
        const controller= this.props.controller as AntdCommonLineController;
        controller.update({style: config});
    }

    render() {
        const {controller} = this.props;
        const config: LineOptions = controller.getConfig().style;
        return (
            <>
                <ColumnStatisticGraphics onChange={this.lineGraphicsChange} config={config}/>
                <AntdCartesianCoordinateSys onChange={this.barCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {ColumnStatisticStyleConfig};

export interface ColumnStatisticGraphicsProps {
    config?: any;

    onChange(config: any): void;
}

export const ColumnStatisticGraphics: React.FC<ColumnStatisticGraphicsProps> = ({config, onChange}) => {

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        onChange(dataFragment);
    }

    const schema: Control = {
        type: 'accordion',
        label: '配置',
        children: [
            {
                type: 'item-panel',
                label: '卡片',
                children: [
                    {
                        key: 'title',
                        type: 'input',
                        label: '名称',
                        value: config?.title,
                        config: {
                            width: 80,
                            type: 'text'
                        }
                    },
                    {
                        key: 'hoverable',
                        type: 'switch',
                        label: '鼠标移过时浮起',
                        value: config?.hoverable,
                    },
                    {
                        key: 'bordered',
                        type: 'switch',
                        label: '是否有边框',
                        value: config?.bordered,
                    }
                ]
            },
            {
                type: 'item-panel',
                label: '主数值',
                children: [
                    {
                        key: 'description',
                        type: 'input',
                        label: '描述信息',
                        value: config?.description,
                        config: {
                            width: 80,
                            type: 'text'
                        }
                    },
                    {
                        key: 'tip',
                        type: 'input',
                        label: '提示信息',
                        value: config?.tip,
                        config: {
                            width: 80,
                            type: 'text'
                        }
                    },
                    {
                        key: 'fontSize',
                        type: 'input',
                        label: '字体大小',
                        value: config?.fontSize,
                        config: {
                            width: 80,
                            type: 'number',
                            min: 16,
                            max: 100
                        }
                    },
                    {
                        key: 'fontWeight',
                        type: 'input',
                        label: '字体粗细',
                        value: config?.fontWeight,
                        config: {
                            width: 80,
                            type: 'number',
                            min: 100,
                            max: 1000,
                            step: 100
                        }
                    },
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            {
                                key: 'prefix',
                                type: 'input',
                                label: '前缀',
                                value: config?.prefix,
                                config: {
                                    width: 80,
                                    type: 'text'
                                }
                            },
                            {
                                key: 'suffix',
                                type: 'input',
                                label: '后缀',
                                value: config?.suffix,
                                config: {
                                    width: 80,
                                    type: 'text'
                                }
                            }
                        ]
                    },
                    {
                        key: 'layout',
                        type: 'select',
                        label: '布局',
                        value: config?.layout,
                        config: {
                            options: [
                                {value: 'horizontal', label: 'horizontal'},
                                {value: 'vertical', label: 'vertical'},
                                {value: 'inline', label: 'inline'},
                            ]
                        }
                    },
                    {
                        key: 'CountUp',
                        type: 'switch',
                        label: '动画',
                        value: config?.CountUp,
                    },
                ]
            },
            {
                type: 'item-panel',
                label: '图形',
                children: [
                    {
                        type: 'grid',
                        config: {columns: 2},
                        children: [
                            
                            {
                                key: 'xAxis',
                                type: 'switch',
                                label: 'X轴',
                                value: config?.xAxis,
                            },
                            {
                                key: 'yAxis',
                                type: 'switch',
                                label: 'y轴',
                                value: config?.yAxis,
                            }
                        ]
                    }
                ]
            }
        ]
    }

    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

export const ColumnStatisticMapping: React.FC<ConfigType> = (props) => {
    const {controller} = props;
    const {xField, yField, countField} = controller.getConfig().style;
    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const schema: Control = {
        key: 'style',
        type: 'grid',
        config: {columns: 2},
        children: [
            {
                key: 'xField',
                type: 'select',
                label: 'X字段',
                value: xField,
                config: {
                    options,
                }
            },
            {
                key: 'yField',
                type: 'select',
                label: 'Y字段',
                value: yField,
                config: {
                    options,
                }
            },
            {
                key: 'countField',
                type: 'select',
                label: '主数值',
                value: countField,
                config: {
                    options,
                }
            },
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    return <LCGUI schema={schema} onFieldChange={onFieldChange}/>
}
