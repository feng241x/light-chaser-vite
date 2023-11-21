import React, {MouseEvent} from "react";
import previewClose from "../icon/preview-close.svg";
import previewOpen from "../icon/preview-open.svg";
import lockImg from "../icon/lock.svg";
import unlockImg from "../icon/unlock.svg";
import {EyeInvisibleOutlined, EyeOutlined, FolderFilled, FolderOpenFilled, LockOutlined, UnlockOutlined} from "@ant-design/icons";
import layerListStore from "../LayerListStore";
import './LayerGroupItem.less';
import { Collapse } from "antd";


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
        this.setState({showContent: true})
        const {selectedChange} = layerListStore;
        selectedChange && selectedChange(this.props.compId!);
    }
    render() {
        const {children} = this.props;
        const {hide, lock, showContent, name} = this.state;
        return (
            <Collapse
                onChange={(activeKeys: string[]) => activeKeys.length ? this.onSelected() : this.setState({showContent: false})}
                bordered={showContent}
                size='small'
                expandIcon={({ isActive }) => isActive ?  <FolderOpenFilled /> : <FolderFilled /> }
                items={[{key: '1', label: name, children: children, extra: (
                    <div className={'layer-group-item'}>
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
            // <div className={'layer-group-item'} onClick={this.onSelected}>
            //     <div
            //         className={`layer-group-header ${selected
            //             ? "layer-group-header-selected" : hide
            //                 ? "layer-group-header-hide" : lock
            //                     ? "layer-group-header-lock" : ""}`}
            //         onClick={() => {
            //             this.setState({showContent: !showContent})
            //         }}>
            //         <div className={'layer-group-left'}>
            //             <div className={'layer-group-icon'}><FolderOpenFilled/></div>
            //             <div className={'layer-group-name'}>{name}</div>
            //         </div>
            //         <div className={'layer-group-operators'}>
            //             <div className={'layer-group-operator'}>
            //             <span onClick={this.toggleHide}>
            //                 <img src={hide ? previewClose : previewOpen} alt={hide ? '显示' : '隐藏'}/>
            //             </span>
            //             </div>
            //             <div className={'layer-group-operator'}>
            //             <span onClick={this.toggleLock}>
            //                 <img src={lock ? lockImg : unlockImg} alt={lock ? '锁定' : '解锁'}/>
            //             </span>
            //             </div>
            //         </div>
            //     </div>
            //     {showContent && <div className={'layer-group-content'}>
            //         {children}
            //     </div>}
            // </div>
        );
    }
};