import {action, makeObservable, observable} from "mobx";
import eventOperateStore from "./designer/operate-provider/EventOperateStore";

type ThemeType = 'light' | 'dark';

class MainStore {
    constructor() {
        makeObservable(this, {
            // 主题模式
            themeVal: observable,
            updateTheme: action,
            // 侧边栏宽度 展开/收起
            leftSiderWidth: observable,
            // 左侧选中分类
            leftSelectedKeys: observable,
            setLeftSiderWidth: action,
            setLeftSelectedKeys: action,
            // 右侧面板宽度控制
            rightSiderWidth: observable,
            setRightSiderWidth: action
        })
    }
    themeVal: ThemeType = 'light'
    leftSiderWidth: number = 120
    leftSelectedKeys: string[] = []
    rightSiderWidth: number = 300
    updateTheme = (themeVal: ThemeType) => {
        this.themeVal = themeVal;
    }
    setLeftSiderWidth = (width: number) => {
        this.leftSiderWidth = width;
        // 修改侧边栏宽度后 需要重新渲染标尺
        const {scale, rulerRef} = eventOperateStore;
        setTimeout(() => {
            rulerRef?.ruleWheel(scale);
        }, 300);
    }
    setLeftSelectedKeys = (leftSelectedKeys: string[]) => {
        this.leftSelectedKeys = leftSelectedKeys;
    }
    setRightSiderWidth = (width: number) => {
        this.rightSiderWidth = width;
        // 修改侧边栏宽度后 需要重新渲染标尺
        const {scale, rulerRef} = eventOperateStore;
        setTimeout(() => {
            rulerRef?.ruleWheel(scale);
        }, 300);
    }
}

const mainStore = new MainStore();
export default mainStore;