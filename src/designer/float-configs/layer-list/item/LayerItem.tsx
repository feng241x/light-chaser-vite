import './LayerItem.less';
import { Card, Col, Row } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import {BaseLayer} from "./BaseLayer";

class LayerItem extends BaseLayer {

    render() {
        const {name, lock, hide, selected = false} = this.state || {};
        const itemClass = `layer-item ${selected ? "layer-item-selected" : hide ? "layer-item-hide" : lock ? "layer-item-lock" : ""}`;
        return (
            <Card size='small'>
                <Row 
                    className={itemClass}
                    onClick={this.onSelected}
                >
                    <Col className={'layer-item-name'} flex={'auto'}>{name}</Col>
                    <Col className={'layer-item-operators'} flex={'60px'}>
                        <span className={'layer-item-operator'}>
                            <span onClick={this.toggleHide}>
                                {hide ? <EyeInvisibleOutlined title='显示' /> : <EyeOutlined title='隐藏' />}
                            </span>
                        </span>
                        <span className={'layer-item-operator'}>
                            <span onClick={this.toggleLock}>
                                {lock ? <LockOutlined title='解锁' /> : <UnlockOutlined title='锁定' />}
                            </span>
                        </span>
                    </Col>
                </Row>
            </Card>
            
        );
    }
}

export default LayerItem;