import {action, makeObservable, observable} from "mobx";

type ThemeType = 'light' | 'dark';

class MainStore {
    constructor() {
        makeObservable(this, {
            // 主题模式
            themeVal: observable,
            updateTheme: action,
            // 侧边栏宽度 展开/收起
            leftSiderWidth: observable,
            setLeftSiderWidth: action
        })
    }
    themeVal: ThemeType = 'light'
    leftSiderWidth: number = 120
    updateTheme = (themeVal: ThemeType) => {
        this.themeVal = themeVal;
    }
    setLeftSiderWidth = (width: number) => {
        this.leftSiderWidth = width;
    }
}

const mainStore = new MainStore();
export default mainStore;