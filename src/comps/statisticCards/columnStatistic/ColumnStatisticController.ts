import {ThemeItemType} from "../../../designer/DesignerType";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import ObjectUtil from "../../../utils/ObjectUtil";
import { AntdBaseDesignerController } from "../../antd-common/AntdBaseDesignerController";
import ColumnStatisticComponent, { ColumnStatisticComponentProps } from "./ColumnStatisticComponent";

export class ColumnStatisticController extends AntdBaseDesignerController<any, ColumnStatisticComponentProps> {

    async create(container: HTMLElement, config: any): Promise<void> {
        await super.commonCreateByCustom(container, ColumnStatisticComponent, config);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): ColumnStatisticComponentProps | null {
        return this.config;
    }
    changeData(data: any) {
        const style = ObjectUtil.merge(this.config?.style, {data});
        this.instance?.setState(style);
    }

    update(config: ColumnStatisticComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.setState(this.config);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}