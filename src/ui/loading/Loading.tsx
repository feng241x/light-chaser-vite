import {Component} from 'react';
import {Skeleton} from "antd";

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
            fontWeight: '300'
        }
        return (
            <div style={style}>
                <Skeleton />
            </div>
        );
    }
}

export default Loading;