import React, {MouseEvent} from 'react';
import './LayerItem.less';
import { Card, Col, Row } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import layerListStore from "../LayerListStore";

export interface LayerItemDataProps {
    compId?: string;
    name?: string;
    lock?: boolean;
    hide?: boolean;
    selected?: boolean;
}

class LayerItem extends React.PureComponent<LayerItemDataProps> {

    state = {
        selected: false,
        lock: false,
        hide: false,
        compId: '',
        name: ''
    }

    constructor(props: LayerItemDataProps) {
        super(props);
        const {selected, lock, hide, compId, name} = props;
        this.state = {
            selected: selected || false,
            lock: lock || false,
            hide: hide || false,
            compId: compId || '',
            name: name || ''
        }
    }

    toggleLock = (event: MouseEvent) => {
        event.stopPropagation();
        const {lockChange} = layerListStore;
        lockChange && lockChange(this.state.compId, !this.state.lock);
    }

    toggleHide = (event: MouseEvent) => {
        event.stopPropagation();
        const {hideChange} = layerListStore;
        hideChange && hideChange(this.state.compId, !this.state.hide);
    }

    onSelected = (event: MouseEvent<HTMLDivElement>) => {
        const {hide, compId} = this.state;
        if (hide) return;
        event.stopPropagation();
        const {selectedChange} = layerListStore;
        selectedChange && selectedChange(compId!, event);
    }

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