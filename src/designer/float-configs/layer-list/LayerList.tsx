import React, {ChangeEvent, Component} from 'react';
import './LayerList.less';
import layerListStore from "./LayerListStore";
import designerStore from "../../store/DesignerStore";
import {LayerItemDataProps} from "./LayerItem";
import {observer} from "mobx-react";
import FloatPanel from "../common/FloatPanel";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import eventManager from "../../operate-provider/core/EventManager";
import LayerContainer from "./LayerContainer";
import {MovableItemType} from "../../../lib/lc-movable/types";
import UnderLineInput from "../../../lib/lc-input/UnderLineInput";

//todo 该组件的重新渲染逻辑要重点优化
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

    searchLayer = (e: ChangeEvent<HTMLInputElement>) => {
        const {setContent} = layerListStore;
        const content = (e.target as HTMLInputElement).value;
        setContent && setContent(content);
    }


    buildLayerList = () => {
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
                        return item.locked;
                } else
                    return item.name?.includes(searchContent);
            })
            .sort((a: MovableItemType, b: MovableItemType) => b.order! - a.order!)
            .map((item: MovableItemType) => {
                let _props: LayerItemDataProps = {
                    name: item.name,
                    lock: item.locked,
                    hide: item.hide,
                    compId: item.id,
                    selected: targetIds.includes(item.id!)
                }
                return <LayerContainer key={item.id} item={_props}/>
            });
    }

    render() {
        return (
            <FloatPanel title={'图层'} onClose={this.onClose} initPosition={{x: 250, y: -window.innerHeight + 50}}
                        className={'layer-list'}>
                <div className={'list-search'}>
                    <UnderLineInput placeholder="搜索图层" onChange={this.searchLayer} containStyle={{height: 40}}
                                    inputStyle={{height: 40, padding: '0 10px'}}/>
                </div>
                <div className={'layer-items'}>
                    {this.buildLayerList()}
                </div>
            </FloatPanel>
        );
    }
}

export default observer(LayerList);