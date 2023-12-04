import {useEffect} from "react";
import './BPLeft.less';
import {
    ApartmentOutlined,
    BlockOutlined,
    BranchesOutlined,
    CodeSandboxOutlined,
    FunctionOutlined
} from "@ant-design/icons";
import bpStore from "../store/BPStore";
import bpLeftStore from "./BPLeftStore";
import {observer} from "mobx-react";
import designerStore from "../../designer/store/DesignerStore";
import IdGenerate from "../../utils/IdGenerate";
import { Button, Divider, List, Tabs } from "antd";

export const BPLeft: React.FC = () => {
    const nodeSortList = [
        {
            icon: <CodeSandboxOutlined/>,
            label: '图层节点',
            key: 'layer',
            children: <BPNodeList/>
        },
        {
            icon: <ApartmentOutlined/>,
            label: '逻辑节点',
            key: 'logical',
            children: <BPNodeList/>
        },
        // {
        //     icon: <GatewayOutlined/>,
        //     label: '全局变量',
        //     key: 'global'
        // },
        // {
        //     icon: <FilterOutlined/>,
        //     label: '过滤器',
        //     key: 'filter'
        // }
    ]
    return (
        <Tabs
            style={{height: '100%'}}
            tabPosition='left'
            items={nodeSortList}
            onChange={(activeKey: string) => {
                bpLeftStore.setActiveMenu(activeKey)
            }}
        />
    )
}

//拖拽开始
const dragStart = (event: any, element: Element) => {
    // 设置拖拽数据
    (event as any).dataTransfer.setData('nodeId', element.getAttribute('data-id'));
    (event as any).dataTransfer.setData('type', element.getAttribute('data-type'));
}
//拖拽覆盖
const dragover = (event: any) => {
    event.preventDefault(); // 阻止默认行为以允许拖放
}
//释放拖拽元素
const drop = (event: DragEvent) => {
    event.preventDefault();
    let nodeId = (event as any).dataTransfer.getData('nodeId');
    const type = (event as any).dataTransfer.getData('type');
    const {bpDragContentRef, canvasScale} = bpStore;
    const contentPos = bpDragContentRef?.getBoundingClientRect();
    //获取鼠标位置
    const position = {
        x: (event.clientX - (contentPos?.x || 0)) / canvasScale,
        y: (event.clientY - (contentPos?.y || 0)) / canvasScale
    };
    if (type === 'layer-node') {
        const {setUsedLayerNodes} = bpLeftStore;
        setUsedLayerNodes(nodeId, true);
    } else {
        //非图层节点，需要单独生成一个唯一节点id
        nodeId = IdGenerate.generateId();
    }
    const {addBPNodeLayout} = bpStore;
    addBPNodeLayout({id: nodeId, type, position});
}

export const BPNodeList = observer(() => {
    const {activeMenu} = bpLeftStore;
    const NodeList = nodeListMapping[activeMenu];

    useEffect(() => {
        const dropContainer = document.getElementById("bp-ds-container");
        const dragElements = document.getElementsByClassName("bp-node-list-item");
        Array.from(dragElements).forEach((element) => {
            element.removeEventListener('dragstart', (event) => dragStart(event, element));
            element.addEventListener('dragstart', (event) => dragStart(event, element));
        });
        dropContainer && dropContainer.removeEventListener('dragover', dragover);
        dropContainer && dropContainer.addEventListener('dragover', dragover);
        dropContainer && dropContainer.removeEventListener('drop', drop);
        dropContainer && dropContainer.addEventListener('drop', drop);
    }, [activeMenu])
    return (
        <div style={{height: '100%', overflow: 'auto'}}>
            <Divider orientation="left">{activeMenu === 'layer' ? '图层节点' : '逻辑节点'}</Divider>
            <NodeList/>
        </div>
    )
})

export const BPLayerNodeList = observer(() => {
    const {layerConfigs} = designerStore;
    const {usedLayerNodes} = bpLeftStore;
    return (
        <List
            grid={{ column: 1 }}
        >
            {
                layerConfigs && Object.keys(layerConfigs).map((key, index) => {
                    const item = layerConfigs[key];
                    const used = usedLayerNodes[key];
                    return (
                        <List.Item className={`bp-node-list-item ${used ? 'bp-node-list-item-used' : ''}`} data-type='layer-node' data-id={item.id} draggable={!used} key={index} >
                            <Button disabled={used} icon={<BlockOutlined/>} block>{item.name}</Button>
                        </List.Item>
                    )
                })
            }
        </List>
    )
})

export const BPLogicalNodeList = () => {

    const logicalNodeList = [
        {name: '条件判断', icon: BranchesOutlined, type: 'condition-node'},
        {name: '逻辑处理', icon: FunctionOutlined, type: 'logical-process-node'},
    ]

    return (
        <List
            grid={{ column: 1 }}
            dataSource={logicalNodeList}
            renderItem={(item: any, index) => {
                return (
                    <List.Item className={'bp-node-list-item'} data-type={item.type} data-id={item.id} draggable={true} key={index} >
                        <Button icon={<item.icon/>} block>{item.name}</Button>
                    </List.Item>
                )
            }}
        >
        </List>
    )
}

export const BPGlobalVariablesNodeList = () => {
    return (
        <div>全局变量</div>
    )

}

export const BPFilterNodeList = () => {
    return (
        <div>过滤器</div>
    )

}

export const nodeListMapping: { [key: string]: React.FC } = {
    'layer': BPLayerNodeList,
    'logical': BPLogicalNodeList,
    'global': BPGlobalVariablesNodeList,
    'filter': BPFilterNodeList
}