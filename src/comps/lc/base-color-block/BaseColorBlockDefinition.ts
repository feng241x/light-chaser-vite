import {
    AbstractComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractComponentDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseColorBlockImg from './base-color-block.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseColorBlock} from "./BaseColorBlock";
import {BaseColorBlockComponentProps} from "./BaseColorBlockComponent";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import {BaseColorBlockConfig} from "./BaseColorBlockConfig";
import { CategoryEnum, ChartTypeCNEnum, ChartTypeEnum } from "../../../const/index.const";

export default class BaseColorBlockDefinition extends AbstractComponentDefinition<BaseColorBlock, BaseColorBlockComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础色块",
            compKey: "LcBaseColorBlock",
            category: CategoryEnum.BASE,
            type: ChartTypeCNEnum.base,
            typeKey: ChartTypeEnum.BASE,
            desc: "标准提供的基础色块",
        };
    }

    getChartImg(): string | null {
        return baseColorBlockImg;
    }

    getComponent(): ClazzTemplate<BaseColorBlock> | null {
        return BaseColorBlock;
    }

    getInitConfig(): BaseColorBlockComponentProps {
        return {
            info: {
                id: "",
                name: '基础色块',
                type: 'LcBaseColorBlock',
                desc: '标准提供的基础色块',
            },
            style: {
                background: '#009DFF33',
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'data' && item.key !== 'mapping'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            info: BaseInfo,
            style: BaseColorBlockConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}