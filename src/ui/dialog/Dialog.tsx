import {Component} from 'react';
import './Dialog.less';
import { Modal } from 'antd';

interface DialogProps {
    title: string;
    visible: boolean;
    onClose?: () => void;
    width?: number;
    height?: number;
    className?: string;
    children: any;
}

class Dialog extends Component<DialogProps> {

    onClose = () => {
        const {onClose} = this.props;
        onClose && onClose();
    }

    render() {
        const {title = '设置', visible = false, children, width = 400, className} = this.props;
        if (!visible)
            return null;
        return (
            <Modal onCancel={this.onClose} className={className} width={width} footer={false} centered maskClosable title={title} open={visible} >
                {children}
            </Modal>
        )
    }
}

export default Dialog;