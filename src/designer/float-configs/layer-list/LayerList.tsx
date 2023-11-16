import React, {Component} from 'react';
import './LayerList.less';
import layerListStore from "./LayerListStore";
import designerStore from "../../store/DesignerStore";
import {LayerItemDataProps} from "./LayerItem";
import {observer} from "mobx-react";
import FloatPanel from "../common/FloatPanel";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import eventManager from "../../operate-provider/core/EventManager";
import LayerContainer from "./LayerContainer";
import {MovableItemType} from "../../operate-provider/movable/types";
import Input from "../../../ui/input/Input";
import { Card, List } from 'antd';

class LayerList extends Component {

    componentDidMount() {
        eventManager.register("click", this.cancelSelected);
    }

    componentWillUnmount() {
        eventManager.unregister("click", this.cancelSelected);
    }

    //todo: 想想怎么优化
    cancelSelected = (e: PointerEvent) => {
        const layerListDom = document.querySelector(".layer-list");
        if (!layerListDom || !e.target) return;
        if (layerListDom.contains(e.target as Node) && !(e.target as HTMLElement).classList.contains("layer-item")) {
            const {setTargets} = eventOperateStore;
            setTargets([]);
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
        const {layoutConfigs} = designerStore;
        const {targetIds} = eventOperateStore;
        let {searchContent} = layerListStore;
        //判断是否是命令模式
        const commandMode = searchContent.startsWith(":");
        if (commandMode) searchContent = searchContent.substring(1);
        return Object.values(layoutConfigs)
            .filter((item: MovableItemType) => {
                if (commandMode) {
                    //使用命令模式过滤
                    if (searchContent.trim() === "hide")
                        return item.hide;
                    else if (searchContent.trim() === "lock")
                        return item.lock;
                } else
                    return item.name?.includes(searchContent);
                return false;
            })
            .sort((a: MovableItemType, b: MovableItemType) => b.order! - a.order!)
            .map((item: MovableItemType) => {
                let _props: LayerItemDataProps = {
                    name: item.name,
                    lock: item.lock,
                    hide: item.hide,
                    compId: item.id,
                    selected: targetIds.includes(item.id!)
                }
                return _props;
                // return <LayerContainer key={item.id} item={_props}/>
            });
    }

    render() {
        return (
            <List
                grid={{ column: 1 }}
                style={{height: 30}}
                dataSource={this.buildLayerList()}
                renderItem={(item: LayerItemDataProps) => (
                    <List.Item>
                        <Card size='small'>
                            <LayerContainer key={item.compId} item={item}/>
                        </Card>
                    </List.Item>
                )}
            />
        );
    }
}

export default observer(LayerList);