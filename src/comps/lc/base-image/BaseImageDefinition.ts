import {
    AbstractComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractComponentDefinition";
import BaseImageController, {BaseImageComponentProps} from "./BaseImageController";
import {BaseInfoType} from "../../../designer/DesignerType";
import baseImage from './baseImage.png';
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import {BaseImageStyleConfig} from "./BaseImageConfig";
import { CategoryEnum, ChartTypeCNEnum, ChartTypeEnum } from "../../../const/index.const";

export default class BaseImageDefinition extends AbstractComponentDefinition<BaseImageController, BaseImageComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础图片",
            compKey: "LcBaseImage",
            category: CategoryEnum.BASE,
            type: ChartTypeCNEnum.base,
            typeKey: ChartTypeEnum.BASE,
            desc: "标准提供的基础图片",
        };
    }

    getChartImg(): string | null {
        return baseImage;
    }

    getComponent(): ClazzTemplate<BaseImageController> | null {
        return BaseImageController;
    }

    getInitConfig(): BaseImageComponentProps {
        return {
            info: {
                id: "",
                name: '基础图片',
                type: 'LcBaseImage',
                desc: '标准提供的基础图片',
            },
            style: {
                type: 'online',
                localUrl: '',
                onLineUrl: '',
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'data' && item.key !== 'mapping'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            info: BaseInfo,
            style: BaseImageStyleConfig,
        };
    }


}