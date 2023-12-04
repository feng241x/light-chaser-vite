import {DisconnectOutlined, EditFilled, EyeInvisibleOutlined, EyeOutlined, FolderFilled, FolderOpenFilled, LockOutlined, UnlockOutlined} from "@ant-design/icons";
import {BaseLayer} from "./BaseLayer";
import { Collapse, Input, Popconfirm } from "antd";
import { doUnGrouping } from "../../../operate-provider/hot-key/HotKeyImpl";
import LayerItem from "./LayerItem";
import layerListStore from "../LayerListStore";

export default class LayerGroupItem extends BaseLayer {
    render() {
        const { childrenData } = this.props;
        const {layerInstances} = layerListStore;
        const {hide, lock, showContent, name, inputMode} = this.state;
        return (
            <Collapse
                accordion
                onChange={(activeKeys: string | string[]) => activeKeys.length ? this.onSelected() : this.setState({showContent: false})}
                bordered={showContent}
                size='small'
                expandIcon={({ isActive }) => isActive ?  <FolderOpenFilled /> : <FolderFilled /> }
                items={[{key: '1', label: inputMode ? <Input width={30} defaultValue={name} autoFocus onChange={(e) => {
                    this.changeLayerName(e.target.value)
                }} onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                        this.closeInput();
                    }}
                } onBlur={this.closeInput} /> : name, children: (
                    childrenData.map((i: any) => (
                        (i.children && i.children.length) ? (
                            <LayerGroupItem childrenData={i.children} {...i} ref={ref => layerInstances[i.compId!] = ref!}></LayerGroupItem>
                        ) : (
                            <LayerItem {...i} ref={ref => layerInstances[i.compId!] = ref!}/>
                        )
                    ))
                ), extra: (
                    <div className={'layer-group-item'}>
                        <span style={{marginRight: 4}} className={'layer-item-operator'}>
                            <span onClick={this.openInput}>
                                <EditFilled title="编辑分组名称" />
                            </span>
                        </span>
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