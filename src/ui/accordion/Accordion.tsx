import {useEffect, useState} from 'react';
import './Accordion.less';
import {CaretRightOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Collapse, Switch, Tooltip} from "antd";
import IdGenerate from '../../utils/IdGenerate';

interface AccordionProps {
    // 标题（非受控）
    label?: string;
    // 是否显示开关（非受控）
    showSwitch?: boolean;
    // 开关变化回调
    onChange?: (data: boolean) => void;
    // 开关状态值（受控）
    value?: boolean;
    // 开关状态值（非受控）
    defaultValue?: boolean;
    tip?: string;
    children?: any;
}

const MyAccordion = (props: AccordionProps) => {
    // switch开关
    const [value, setValue] = useState<boolean>(true);
    // 折叠面板开关
    const [activeKey, setActiveKey] = useState<string | string[]>([]);
    const [randomGuid, setRandomGuid] = useState<string>('');
    let { label, showSwitch, defaultValue, tip } : any = props;
    useEffect(() => {
        setRandomGuid(IdGenerate.generateId());
        defaultValue !== undefined && setValue(defaultValue)
        props.value !== undefined && setValue(props.value)
    }, [])
    useEffect(() => {
        props.value !== undefined && setValue(props.value)
    }, [props.value])
    /**
     * 手风琴标题开关变化
     */
    const switchChange = (value: boolean) => {
        const {onChange} = props;
        onChange && onChange(value);
        setValue(value);
        setActiveKey(value ? [randomGuid] : [])
    }
    // 切换面板的回调
    const onChange = (key: string | string[]) => {
        setActiveKey(key)
    }
    const getItems = () => ([
        {
            key: randomGuid,
            label: (
            <div className={'title-content'}>{label} &nbsp;
                {tip && <Tooltip title={tip}><QuestionCircleOutlined/>&nbsp;&nbsp;</Tooltip>}
            </div>
            ),
            children: props.children,
            style: {
                marginBottom: 24,
                border: 'none',
            },
            extra: showSwitch ? (
            <Switch
                size='small'
                checked={ value }
                onChange={switchChange}
            />) : ''
        }
    ]);
    return (
        <Collapse
            accordion={true}
            bordered={false}
            size='small'
            onChange={onChange}
            activeKey={activeKey}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            items={getItems()}
        />
    )
}

export default MyAccordion;