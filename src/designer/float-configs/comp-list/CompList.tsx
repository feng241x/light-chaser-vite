import { Component } from 'react';
import compListStore from "./CompListStore";
import './CompList.less';
import {observer} from "mobx-react";
import designerStore from "../../store/DesignerStore";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {BaseInfoType, ILayerItem} from "../../DesignerType";
import DesignerLoaderFactory from "../../loader/DesignerLoaderFactory";
import { Card, notification } from 'antd';
import antdChartListStore from '../../left/antdChartList/antdChartListStore';
import { Category } from '../../../const/index.const';
import baseComponentsStore from '../../left/baseComponents/baseComponentsStore';
import IdGenerate from "../../../utils/IdGenerate";
import EditorDesignerLoader from "../../loader/EditorDesignerLoader";

class CompList extends Component<any, { twoCategories: string }> {
    private category: Category = 'chart';
    constructor(props: { category: Category }) {
        super(props);
        this.category = props.category;
        const {doInit} = compListStore;
        doInit && doInit();
        this.state = {
            twoCategories: 'all'
        }
    }

    componentDidMount() {
        //处理拖拽元素到画布中
        const dragContainer = document.getElementById("designer-ds-content");
        const dragElements = document.getElementById("component-drag-container");
        dragElements && dragElements.addEventListener('dragstart', this.dragStart);
        dragContainer && dragContainer.addEventListener('dragover', this.dragover);
        dragContainer && dragContainer.addEventListener('drop', this.drop);
        switch (this.category) {
            case 'chart':
                const { antdChartItemKey } = antdChartListStore;
                this.setState({
                    twoCategories: antdChartItemKey
                })
                break;
            case 'base':
                const { baseComponentsItemKey } = baseComponentsStore;
                this.setState({
                    twoCategories: baseComponentsItemKey
                })
                break;
            default:
                break;
        }
    }

    componentWillUnmount() {
        const dragContainer = document.getElementById("designer-ds-content");
        const dragElements = document.getElementById("component-drag-container");
        dragElements && dragElements.removeEventListener('dragstart', this.dragStart);
        dragContainer && dragContainer.removeEventListener('dragover', this.dragover);
        dragContainer && dragContainer.removeEventListener('drop', this.drop);
    }

    //拖拽开始
    dragStart = (event: any) => {
        // 设置拖拽数据
        if (event.target.classList.contains('droppable-element')) {
            const element = event.target;
            (event as any).dataTransfer.setData('type', element.getAttribute('data-type'));
        }
    }
    //拖拽覆盖
    dragover = (event: any) => {
        event.preventDefault(); // 阻止默认行为以允许拖放
    }
    //释放拖拽元素
    drop = (event: any) => {
        event.preventDefault();
        const type = (event as any).dataTransfer.getData('type');
        if (!type) {
            notification.error({
                message: '创建组件失败',
                description: '当前操作出现异常,请重新尝试',
                key: 'dropError'
            })
            return;
        }
        //获取鼠标位置,添加元素
        const {scale, dsContentRef} = eventOperateStore;
        const contentPos = dsContentRef?.getBoundingClientRect();
        const x = (event.clientX - (contentPos?.x || 0)) / scale;
        const y = (event.clientY - (contentPos?.y || 0)) / scale;
        this.addItem(type, [x, y]);
    }

    addItem = (compKey: string, position?: [number, number]) => {
        const {addItem} = designerStore;
        let {maxLevel, setMaxLevel, setAddRecordCompId} = eventOperateStore;
        const {definitionMap} = EditorDesignerLoader.getInstance();
        const {compName, width = 320, height = 200} = definitionMap[compKey].getBaseInfo();
        let movableItem: ILayerItem = {
            name: compName,
            type: compKey,
            x: position![0],
            y: position![1],
            id: IdGenerate.generateId(),
            lock: false,
            hide: false,
            order: ++maxLevel,
            width,
            height,
        }
        setAddRecordCompId(movableItem.id!)
        setMaxLevel && setMaxLevel(maxLevel);
        addItem && addItem(movableItem);
    }

    getChartDom = () => {
        let chartDom = [];
        let { twoCategories } = this.state
        let {compInfoArr, compKey} = compListStore;
        if (this.category) {
            compInfoArr = compInfoArr.filter((item: BaseInfoType) => {
                return item.category === this.category;
            })
        }
        if (twoCategories !== 'all') {
            compInfoArr = compInfoArr.filter((item: BaseInfoType) => {
                return item.typeKey === twoCategories;
            })
        }
        if (compKey !== '') {
            compInfoArr = compInfoArr.filter((item: BaseInfoType) => {
                return item.compName.indexOf(compKey) >= 0;
            })
        }
        for (let i = 0; i < compInfoArr.length; i++) {
            let compInfo: any = compInfoArr[i];
            const {compName, compKey} = compInfo;
            let lcCompInit: any = DesignerLoaderFactory.getLoader().definitionMap[compKey];
            let chartImg = lcCompInit.getChartImg();
            chartDom.push(
                <Card 
                    key={i + ''}
                    className={'list-item droppable-element'}
                    draggable={true}
                    onDoubleClick={() => this.addItem(compKey)}
                    data-type={compKey}
                    data-name={compName}
                    type="inner"
                    title={compName}
                    size='small'
                    style={{marginBottom: 4}}
                >
                    <div style={{pointerEvents: 'none'}}>
                        <div className={'item-content'}>
                            <img style={{width: 150, height: 80}} src={chartImg} alt={'组件预览图'}/>
                        </div>
                    </div>
                </Card>
            )
        }
        return chartDom;
    }

    onClose = () => {
        const {setVisible} = compListStore;
        setVisible && setVisible(false);
    }

    searchChart = (data: string | number) => {
        const {setCompKey} = compListStore;
        setCompKey && setCompKey(data as string);
    }

    render() {
        return (
            <div className={'list-items'} id={'component-drag-container'}>
                {this.getChartDom()}
            </div>
        );
    }
}

export default observer(CompList);