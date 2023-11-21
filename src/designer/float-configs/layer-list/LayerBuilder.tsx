import {MovableItemType} from "../../operate-provider/movable/types";
import {ReactElement} from "react";
import LayerItem from "./item/LayerItem";
import LayerGroupItem from "./group/LayerGroupItem";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {cloneDeep} from "lodash";
import layerListStore from "./LayerListStore";
import ComponentContainer from "../../../framework/core/ComponentContainer";

export enum RenderOrder {
    ASC,
    DESC,
}

class LayerBuilder {

    /**
     * 解析函数
     */
    public parser = (layerMap: Record<string, MovableItemType>, order: RenderOrder = RenderOrder.DESC): MovableItemType[] => {
        layerMap = cloneDeep(layerMap);
        let sourceLayerArr;
        if (order === RenderOrder.DESC)
            sourceLayerArr = Object.values(layerMap).sort((a, b) => b.order! - a.order!);
        else
            sourceLayerArr = Object.values(layerMap).sort((a, b) => a.order! - b.order!);
        // 构建树结构
        const resData: MovableItemType[] = [];
        for (const layerItem of sourceLayerArr) {
            if (!layerItem?.pid) {
                // 根节点
                resData.push(layerItem);
            } else {
                // 非根节点，将其加入父节点的 children 中
                const parent = layerMap[layerItem.pid];
                if (parent) {
                    parent.children = parent.children || [];
                    parent.children.push(layerItem);
                }
            }
        }
        return resData;
    };


    /**
     * 构建图层组件
     */
    public buildLayerList = (layerMap: Record<string, MovableItemType>): ReactElement[] => {
        const res: ReactElement[] = [];
        this.parser(layerMap, RenderOrder.DESC).forEach((item: MovableItemType) => {
            res.push(this.buildLayer(item));
        });
        return res;
    }


    private buildLayer = (layer: MovableItemType): any => {
        const {type, children} = layer;
        const {targetIds} = eventOperateStore;
        const {layerInstances} = layerListStore;
        let _props = {
            key: layer.id,
            name: layer.name,
            lock: layer.lock,
            hide: layer.hide,
            compId: layer.id,
            type: layer.type,
            children: children?.map(item => this.buildLayer(item)),
            selected: targetIds.includes(layer.id!)
        }
        return _props;
        if (type === 'group') {
            //先生成子元素再包裹groupItem
            const childDomArr: ReactElement[] = [];
            children?.forEach((item: MovableItemType) => {
                childDomArr.push(this.buildLayer(item));
            });
            return <LayerGroupItem {..._props} ref={ref => layerInstances[layer.id!] = ref!}>
                {childDomArr}
            </LayerGroupItem>;
        } else {
            //直接生成layerItem
            return <LayerItem {..._props} ref={ref => layerInstances[layer.id!] = ref!}/>;
        }
    }

    /**
     * 构建设计器主画布组件
     * @param layerMap
     */
    public buildCanvasComponents = (layerMap: Record<string, MovableItemType>): ReactElement[] => {
        const res: ReactElement[] = [];
        this.parser(layerMap, RenderOrder.ASC).forEach((item: MovableItemType) => {
            res.push(this.buildComponents(item));
        });
        return res;
    }

    private buildComponents = (layer: MovableItemType): ReactElement => {
        const {type, children} = layer;
        if (type === 'group') {
            //先生成子元素再包裹groupItem
            const childDomArr: ReactElement[] = [];
            children?.forEach((item: MovableItemType) => {
                childDomArr.push(this.buildComponents(item));
            });
            return <div key={layer.id} className={'component-group'}
                        style={{position: 'absolute'}}>{childDomArr}</div>;
        } else {
            return <ComponentContainer layout={layer} key={layer.id}/>;
        }
    }

}

const layerBuilder = new LayerBuilder();
export default layerBuilder;