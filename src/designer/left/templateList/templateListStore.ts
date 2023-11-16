import {makeAutoObservable} from "mobx";
import { TemplateEnum } from "./templateType";

const getTemplateList = () => {
    return [
        {
            name: "全部",
            key: TemplateEnum.ALL,
        },
        {
            name: "指标卡",
            key: TemplateEnum.STATISTICCARD,
        },
    ]
}

/**
 * 左侧分类列表store
 */
class TemplateListStore {
    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 分类列表
     */
    templateList: Array<any> = getTemplateList();
    /**
     * 分类搜索关键字
     */
    templateItemKey: string = 'all';

    /**
     * 清空store
     */
    doClear = () => {
        this.templateList = [];
    }

    setTemplateItemKey = (key: string) => {
        this.templateItemKey = key;
    }
}

const templateListStore = new TemplateListStore();
export default templateListStore;