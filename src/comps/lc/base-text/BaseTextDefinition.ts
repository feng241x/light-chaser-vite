import {
    AbstractComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractComponentDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseTextImg from './base-text.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseTextController} from "./BaseTextController";
import {BaseTextComponentProps} from "./BaseTextComponent";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import {BaseTextStyleConfig} from "./BaseTextConfig";
import { CategoryEnum, ChartTypeCNEnum, ChartTypeEnum } from "../../../const/index.const";

export default class BaseTextDefinition extends AbstractComponentDefinition<BaseTextController, BaseTextComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础文本",
            compKey: "LcBaseText",
            category: CategoryEnum.BASE,
            type: ChartTypeCNEnum.base,
            typeKey: ChartTypeEnum.BASE,
            desc: "标准提供的基础文本",
        };
    }

    getChartImg(): string | null {
        return baseTextImg;
    }

    getComponent(): ClazzTemplate<BaseTextController> | null {
        return BaseTextController;
    }

    getInitConfig(): BaseTextComponentProps {
        return {
            info: {
                id: "",
                name: '基础文本',
                type: 'LcBaseText',
                desc: '标准提供的基础文本',
            },
            style: {
                color: '#a7a7a7',
                fontSize: 16,
                alignItems: 'center',
                justifyContent: 'space-around',
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: "基础文本"
                },
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => item.key !== 'theme' && item.key !== 'mapping' && item.key !== 'data');
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            info: BaseInfo,
            style: BaseTextStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}