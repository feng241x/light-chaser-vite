import './LayerItem.less';
import { Card, Col, Input, Row } from 'antd';
import { EditFilled, EyeInvisibleOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import {BaseLayer} from "./BaseLayer";

class LayerItem extends BaseLayer {

    render() {
        const {name, lock, hide, selected = false, inputMode} = this.state || {};
        const itemClass = `layer-item ${selected ? "layer-item-selected" : hide ? "layer-item-hide" : lock ? "layer-item-lock" : ""}`;
        return (
            <Card size='small'>
                <Row 
                    className={itemClass}
                    onClick={this.onSelected}
                >
                    <Col className={'layer-item-name'} flex={'auto'}>{inputMode ? <Input defaultValue={name} autoFocus onChange={(e) => {
                    this.changeLayerName(e.target.value)
                }} onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                        this.closeInput();
                    }}
                } onBlur={this.closeInput} /> : name}</Col>
                    <Col className={'layer-item-operators'} flex={'70px'}>
                        <span className={'layer-item-operator'}>
                            <span onClick={this.openInput}>
                                <EditFilled title="编辑分组名称" />
                            </span>
                        </span>
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