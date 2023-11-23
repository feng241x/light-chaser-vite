import {Component} from 'react';
import {Spin} from "antd";

interface LoadingProps {
    width?: string | number;
    height?: string | number;
}

class Loading extends Component<LoadingProps> {
    render() {
        const {width = '100%', height = '100%'} = this.props;
        const style = {
            width,
            height,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '20px',
            fontWeight: '400',
        }
        return (
            <Spin tip="加载中..." size='large'>
                <div style={style}></div>
            </Spin>
        );
    }
}

export default Loading;