import {makeAutoObservable} from "mobx";
import { AntdChartEnum } from "./antdChartType";

const getAntdChartList = () => {
    return [
        {
            name: "全部",
            key: AntdChartEnum.ALL,
        },
        {
            name: "条形图",
            key: AntdChartEnum.BAR,
        },
        {
            name: "柱状图",
            key: AntdChartEnum.COLUMN,
        },
        {
            name: "折线图",
            key: AntdChartEnum.LINE,
        },
        {
            name: "面积图",
            key: AntdChartEnum.AREA,
        },
        {
            name: "饼图",
            key: AntdChartEnum.PIE,
        },
        {
            name: "进度图",
            key: AntdChartEnum.PROGRESS,
        },
        {
            name: "散点图",
            key: AntdChartEnum.SCATTER,
        },
        {
            name: "玫瑰图",
            key: AntdChartEnum.ROSE,
        }
    ]
}

/**
 * 左侧分类列表store
 */
class AntdChartListStore {
    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 分类列表
     */
    antdChartList: Array<any> = getAntdChartList();
    /**
     * 分类搜索关键字
     */
    antdChartItemKey: string = 'all';

    /**
     * 清空store
     */
    doClear = () => {
        this.antdChartList = [];
    }

    setAntdChartItemKey = (key: string) => {
        this.antdChartItemKey = key;
    }
}

const antdChartListStore = new AntdChartListStore();
export default antdChartListStore;