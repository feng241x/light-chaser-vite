import React, {Component} from 'react';
import './Button.less';
import { Button } from 'antd';

export interface ButtonProps {
    onChange?: (e?: any) => void;
    onClick?: (e?: any) => void;
    children: any;
}

class MyButton extends Component<ButtonProps> {

    onChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const {onChange, onClick} = this.props;
        onChange && onChange();
        onClick && onClick(e);
    }

    render() {
        return (
            <Button {...this.props} onClick={this.onChange}>{this.props.children}</Button>
        );
    }
}

export default MyButton;