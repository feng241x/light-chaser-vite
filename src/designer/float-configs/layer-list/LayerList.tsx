import {Component} from 'react';
import './LayerList.less';
import layerListStore from "./LayerListStore";
import designerStore from "../../store/DesignerStore";
import {observer} from "mobx-react";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import layerBuilder from "./LayerBuilder";
import {MovableItemType} from "../../operate-provider/movable/types";
import LayerUtil from "./util/LayerUtil";
import LayerItem from './item/LayerItem';
import { List } from 'antd';
import LayerGroupItem from './item/LayerGroupItem';

class LayerList extends Component {
    floatPanelRef: any = null;
    layerItemsContainerRef: HTMLDivElement | null = null;
    componentDidMount() {
        this.floatPanelRef?.panelRef?.addEventListener("click", this.cancelSelected);
    }

    componentWillUnmount() {
        this.floatPanelRef?.panelRef?.removeEventListener("click", this.cancelSelected);
    }

    cancelSelected = (e: any) => {
        if (!this.floatPanelRef) return;
        const {panelRef} = this.floatPanelRef;
        if (!panelRef) return;
        if (panelRef.contains(e.target as Node)
            && !this.layerItemsContainerRef?.contains(e.target as Node)) {
            const {setTargetIds, targetIds} = eventOperateStore;
            if (targetIds.length > 0)
                setTargetIds([]);
        }
    }

    onClose = () => {
        const {setVisible} = layerListStore;
        setVisible && setVisible(false);
    }

    searchLayer = (data: string | number) => {
        const {setContent} = layerListStore;
        setContent && setContent(data as string);
    }


    buildLayerList = () :any[] => {
        const {layerConfigs} = designerStore;
        const {searchContent} = layerListStore;
        if (!searchContent || searchContent === '')
            return layerBuilder.buildLayerList(layerConfigs);
        let filterLayer: Record<string, any> = {};
        if (searchContent === ':hide') {
            //仅过展示隐藏的图层
            Object.values(layerConfigs).forEach((item: MovableItemType) => {
                if (item.hide && item.type !== 'group')
                    filterLayer[item.id!] = item;
            });
        } else if (searchContent === ':lock') {
            //仅过展示锁定的图层
            Object.values(layerConfigs).forEach((item: MovableItemType) => {
                if (item.lock && item.type !== 'group')
                    filterLayer[item.id!] = item;
            });
        } else {
            Object.values(layerConfigs).forEach((item: MovableItemType) => {
                if (item.name?.includes(searchContent) && item.type !== 'group')
                    filterLayer[item.id!] = item;
            });
        }
        //补充分组图层
        const groupLayerId = LayerUtil.findPathGroupLayer(Object.keys(filterLayer));
        groupLayerId.forEach((id: string) => {
            filterLayer[id] = layerConfigs[id];
        });
        return layerBuilder.buildLayerList(filterLayer);
    }

    render() {
        const {layerInstances} = layerListStore;
        return (
            <div 
                ref={ref => this.floatPanelRef = ref}
                className='layer-list'
            >
                <div ref={ref => this.layerItemsContainerRef = ref}>
                    <List
                        grid={{ column: 1 }}
                        dataSource={this.buildLayerList()}
                        renderItem={(item: any) => (
                            <List.Item>
                                {
                                    (item.children && item.children.length) ? (
                                        <LayerGroupItem childrenData={item.children} {...item} ref={ref => layerInstances[item.compId!] = ref!}></LayerGroupItem>
                                    ) : (
                                        <LayerItem {...item} ref={ref => layerInstances[item.compId!] = ref!}/>
                                    )
                                }
                                {/* <Card size='small'>
                                    <div ref={ref => this.layerItemsContainerRef = ref}>
                                        {this.buildLayerList()}
                                    </div>
                                    <LayerContainer key={item.compId} item={item}/>
                                </Card> */}
                            </List.Item>
                        )}
                    />  
                </div>
                
            </div>
            
        );
    }
}

export default observer(LayerList);