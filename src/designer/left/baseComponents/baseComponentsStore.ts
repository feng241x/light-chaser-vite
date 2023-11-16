import {makeAutoObservable} from "mobx";
import { BaseComponentsEnum } from "./baseComponentsType";

const getBaseComponents = () => {
    return [
        {
            name: "全部",
            key: BaseComponentsEnum.ALL,
        },
        {
            name: "基础",
            key: BaseComponentsEnum.BASE,
        },
        {
            name: "装饰",
            key: BaseComponentsEnum.ORNAMENTAL,
        },
    ]
}

/**
 * 左侧分类列表store
 */
class BaseComponentsStore {
    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 分类列表
     */
    baseComponents: Array<any> = getBaseComponents();
    /**
     * 分类搜索关键字
     */
    baseComponentsItemKey: string = 'all';

    /**
     * 清空store
     */
    doClear = () => {
        this.baseComponents = [];
    }

    setBaseComponentsItemKey = (key: string) => {
        this.baseComponentsItemKey = key;
    }
}

const baseComponentsStore = new BaseComponentsStore();
export default baseComponentsStore;