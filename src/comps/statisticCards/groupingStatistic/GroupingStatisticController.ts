import {ThemeItemType} from "../../../designer/DesignerType";
import {UpdateType, UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import ObjectUtil from "../../../utils/ObjectUtil";
import GroupingStatisticComponent, { GroupingStatisticComponentProps } from "./GroupingStatisticComponent";

export class GroupingStatisticController extends AbstractDesignerController {

    async create(container: HTMLElement, config: any): Promise<this> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender(container, GroupingStatisticComponent, config);
        return this;
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): GroupingStatisticComponentProps | null {
        return this.config;
    }

    update(config: GroupingStatisticComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true, updateType: UpdateType.OPTIONS};
        if (upOp.reRender)
            this.instance?.setState(this.config);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}