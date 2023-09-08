import {ThemeItemType} from "../../designer/DesignerType";
import AbstractComponent from "./AbstractComponent";

abstract class AbstractDesignerComponent<I = any, C = any> extends AbstractComponent<I, C> {

    /**
     * 设置组件数据
     * @param data
     */
    setData(data: Object): void {

    }

    /**
     * 获取组件数据
     */
    getData(): Object {
        return {};
    }

    /**
     * 更新本组件的主题样式方法，用于在全局切换主题时使用
     * @param newTheme 新主题
     */
    abstract updateTheme(newTheme: ThemeItemType): void;

}

export default AbstractDesignerComponent;
