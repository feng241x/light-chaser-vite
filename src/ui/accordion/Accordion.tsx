import {CSSProperties, Component} from 'react';
import './Accordion.less';
import {CaretRightOutlined, QuestionCircleOutlined, RightOutlined} from "@ant-design/icons";
import {Collapse, CollapseProps, Switch, Tooltip, theme} from "antd";
import { v4 as uuidv4 } from 'uuid';
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
}

/**
 * 手风琴组件
 * 说明:该组件的。 Title属性show switch属性。 都是非受控的属性。 也就是说只能在创建这个组件的时候就确定这两个属性的值，
 * 后续是无法改变的。 除非销毁这个组件之后重新创建组件。 Value属性和defaultValue属性。 两者任选其一。 如果你使用value属性。
 * 则这个组件的值是受控的。 可以通过外部控制来更新这个组件的状态值。 如果你使用的是defaultValue属性，则这个组件的值是非受控的。
 * 操作这个组件的时候。 组件值，由本组件自身维护，不受外部控制。
 */
class Accordion extends Component<AccordionProps> {

    accordionBodyRef: HTMLDivElement | null = null;
    headerRef: HTMLDivElement | null = null;
    valueControl: boolean = true;
    pendingTimer: NodeJS.Timer | null = null;

    state: {
        value: boolean;
        label: string;
        showSwitch: boolean;
        randomGuid: string;
    } = {
        value: false,
        label: '',
        showSwitch: false,
        randomGuid: ''
    }

    constructor(props: AccordionProps) {
        super(props);
        let {value, label, showSwitch, defaultValue} : any = this.props;
        if (defaultValue !== undefined && value === undefined)
            this.valueControl = false;
        value = !!(value || defaultValue);
        const randomGuid = uuidv4();
        this.state = {value, label, showSwitch, randomGuid};
    }

    componentDidMount() {
        const {showSwitch = false} = this.state;
        if (!showSwitch) {
            //普通模式
            this.headerRef!.addEventListener("click", this.titleClickMode);
        }
    }

    componentWillUnmount() {
        this.headerRef?.removeEventListener("click", this.titleClickMode);
    }

    calculateFold = (value: boolean) => {
        const {showSwitch} = this.state;
        if (!this.headerRef || !this.accordionBodyRef) return;
        if (!showSwitch)
            this.headerRef!.classList.toggle("accordion-active");
    }


    /**
     * 标题点击模式，点击标题，展开内容
     */
    titleClickMode = () => {
        const value = !this.state.value;
        this.setState({value});
        this.calculateFold(value);
    }

    /**
     * 手风琴标题开关变化
     */
    switchChange = (value: boolean) => {
        this.calculateFold(value);
        const {onChange} = this.props;
        onChange && onChange(value);
        if (!this.valueControl)
            this.setState({value});
    }

    render() {
        const { label, showSwitch, randomGuid } = this.state;
        const {tip} = this.props;
        const panelStyle: React.CSSProperties = {
            marginBottom: 24,
            border: 'none',
        };
        const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
            {
              key: randomGuid,
              label: (
                <div className={'title-content'}>{label} &nbsp;
                    {tip && <Tooltip title={tip}><QuestionCircleOutlined/>&nbsp;&nbsp;</Tooltip>}
                </div>
              ),
              children: this.props.children,
              style: panelStyle,
              extra: showSwitch ? (
                <Switch
                    size='small'
                    checked={this.valueControl ? this.props.value : this.state.value}
                    onChange={this.switchChange}
                />) : ''
            }
        ];
          
        return (
            <Collapse
                accordion={true}
                ref={ref => this.headerRef = ref}
                bordered={false}
                size='small'
                defaultActiveKey={showSwitch && this.state.value ? [randomGuid] : []}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                items={getItems(panelStyle)}
            />
            // <div className={'lc-accordion'}>
            //     <div className="accordion-header" ref={ref => this.headerRef = ref}>
            //         <div className={'title-content'}>{label} &nbsp;
            //             {tip && <Tooltip title={tip}><QuestionCircleOutlined/>&nbsp;&nbsp;</Tooltip>}</div>
            //         <div className={'title-switch'}>{showSwitch ?
            //             <Switch
            //                 value={this.valueControl ? this.props.value : this.state.value}
            //                 onChange={this.switchChange}/> :
            //             <RightOutlined className={'accordion-icon'}/>}</div>
            //     </div>
            //     <div className="lc-accordion-body" ref={ref => this.accordionBodyRef = ref}>
            //         {this.props.children}
            //     </div>
            // </div>
        );
    }
}

export default Accordion;