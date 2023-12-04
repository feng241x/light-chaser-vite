import {ChangeEvent, Component, InputHTMLAttributes} from 'react';
import './Input.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import { Input } from 'antd';

export interface InputProps extends Pick<InputHTMLAttributes<HTMLInputElement>,
    "minLength" | "maxLength" | "required" | "value" | "defaultValue"
    | "disabled" | "type" | "min" | "max" | "placeholder">, UIContainerProps {
    onChange?: (data: string | number) => void;
    prefix?: string;
    suffix?: string;
}

/**
 * 下滑线输入框
 */
class MyInput extends Component<InputProps> {

    onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        if (!event.target.checkValidity()) {
            event.target.reportValidity()
            return;
        }
        const {onChange, type} = this.props;
        onChange && onChange(type === 'number' ? Number(event.target.value) : event.target.value);
    }

    render() {
        const {onChange, label, prefix, suffix, tip, gridColumn, ...rest} = this.props;
        return (
            <UIContainer label={label} tip={tip} gridColumn={gridColumn}>
                <Input {...rest} onChange={this.onChange} suffix={suffix} prefix={prefix} size='small' />
            </UIContainer>
        );
    }
}

export default MyInput;