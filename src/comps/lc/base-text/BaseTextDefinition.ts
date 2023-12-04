import {
    AbstractDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
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

export default class BaseTextDefinition extends AbstractDefinition<BaseTextController, BaseTextComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础文本",
            compKey: "LcBaseText",
            category: CategoryEnum.BASE,
            type: ChartTypeCNEnum.base,
            typeKey: ChartTypeEnum.BASE,
            width: 100,
            height: 30,
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
            base: {
                id: "",
                name: '基础文本',
                type: 'LcBaseText',
            },
            style: {
                color: '#a7a7a7',
                fontSize: 16,
                alignItems: 'left',
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
            base: BaseInfo,
            style: BaseTextStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}