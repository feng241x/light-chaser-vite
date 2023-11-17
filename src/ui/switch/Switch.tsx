import React, {Component} from "react";
import { Switch } from 'antd';
import "./Switch.less";
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

interface SwitchProps extends UIContainerProps {
    onChange?: (data: boolean) => void;
    // 开关状态值（受控）
    value?: boolean;
    // 开关状态值（非受控）
    defaultValue?: boolean;
    disabled?: boolean;
}

class MySwitch extends Component<SwitchProps> {

    valueControl: boolean = true;

    state: any = {
        value: false,
    }

    constructor(props: SwitchProps) {
        super(props);
        const {value, defaultValue} = this.props;
        if (defaultValue !== undefined && value === undefined)
            this.valueControl = false;
        this.state = {value: value || defaultValue || false};
    }

    handleChange = (checked: boolean) => {
        const {onChange} = this.props;
        onChange && onChange(checked);
        if (!this.valueControl)
            this.setState({value: checked});
    };

    render() {
        const {disabled = false, tip, label} = this.props;
        return (
            <UIContainer tip={tip} label={label} className={'lc-switch'}>
                <Switch
                    style={{marginLeft: 6}}
                    size="small"
                    disabled={disabled}
                    checked={this.valueControl ? this.props.value || false : this.state.value || false}
                    onChange={this.handleChange} 
                />
                {/* <div style={{display: 'flex'}}>
                    <label className="lc-switch-body">
                        <input disabled={disabled}
                               checked={this.valueControl ? this.props.value || false : this.state.value || false}
                               onChange={this.handleChange} type="checkbox"/>
                        <span/>
                    </label>
                </div> */}
            </UIContainer>
        );
    }
}

export default MySwitch;