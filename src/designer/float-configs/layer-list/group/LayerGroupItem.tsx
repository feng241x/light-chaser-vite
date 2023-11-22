import React, {MouseEvent} from "react";
import {DisconnectOutlined, EyeInvisibleOutlined, EyeOutlined, FolderFilled, FolderOpenFilled, LockOutlined, UnlockOutlined} from "@ant-design/icons";
import layerListStore from "../LayerListStore";
import './LayerGroupItem.less';
import { Collapse, Popconfirm } from "antd";
import { doUnGrouping } from "../../../operate-provider/hot-key/HotKeyImpl";


export interface GroupItemProps {
    compId?: string;
    name?: string;
    lock?: boolean;
    hide?: boolean;
    selected?: boolean;
    children?: React.ReactNode;
}

export default class LayerGroupItem extends React.Component<GroupItemProps> {

    state = {
        hide: false,
        lock: false,
        name: '',
        selected: false,
        showContent: false,
    }

    constructor(props: GroupItemProps) {
        super(props);
        const {hide, lock, name} = this.props;
        this.state = {
            hide: hide || false,
            lock: lock || false,
            name: name || '',
            selected: false,
            showContent: false,
        }
    }

    toggleLock = (event: MouseEvent) => {
        event.stopPropagation();
        const {lockChange} = layerListStore;
        lockChange && lockChange(this.props.compId!, !this.state.lock);
    }

    toggleHide = (event: MouseEvent) => {
        event.stopPropagation();
        const {hideChange} = layerListStore;
        hideChange && hideChange(this.props.compId!, !this.state.hide);
    }

    onSelected = () => {
        const {hide, compId} = this.props;
        if (hide) return;
        this.setState({showContent: true})
        const {selectedChange} = layerListStore;
        selectedChange && selectedChange(compId!);
    }
    render() {
        const {children} = this.props;
        const {hide, lock, showContent, name} = this.state;
        return (
            <Collapse
            accordion
                onChange={(activeKeys: string[]) => activeKeys.length ? this.onSelected() : this.setState({showContent: false})}
                bordered={showContent}
                size='small'
                expandIcon={({ isActive }) => isActive ?  <FolderOpenFilled /> : <FolderFilled /> }
                items={[{key: '1', label: name, children: children, extra: (
                    <div className={'layer-group-item'}>
                        <Popconfirm
                            placement="topRight"
                            title={'确认要取消当前分组吗?'}
                            onConfirm={() => {
                                doUnGrouping()
                            }}
                            okText="确定"
                            cancelText="取消"
                        >
                            <DisconnectOutlined style={{marginRight: 4}} />
                        </Popconfirm>
                        <span style={{marginRight: 4}} className={'layer-item-operator'}>
                            <span onClick={this.toggleHide}>
                                {hide ? <EyeInvisibleOutlined title='显示' /> : <EyeOutlined title='隐藏' />}
                            </span>
                        </span>
                        <span className={'layer-item-operator'}>
                            <span onClick={this.toggleLock}>
                                {lock ? <LockOutlined title='解锁' /> : <UnlockOutlined title='锁定' />}
                            </span>
                        </span>
                    </div>
                )}]}
            />
        );
    }
};