import {
    AbstractDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseTextImg from './base-area.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import { CategoryEnum } from "../../../const/index.const";
import { GroupingStatisticController } from "./GroupingStatisticController";
import { GroupingStatisticComponentProps } from "./GroupingStatisticComponent";
import { GroupingStatisticConfig } from "./GroupingStatisticConfig";
import { TemplateEnum } from "../../../designer/left/templateList/templateType";

export default class GroupingStatisticDefinition extends AbstractDefinition<GroupingStatisticController, GroupingStatisticComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "指标卡",
            compKey: "GroupingStatistic",
            category: CategoryEnum.TEMPLATE,
            type: '指标卡',
            typeKey: TemplateEnum.STATISTICCARD,
        };
    }

    getChartImg(): string | null {
        return baseTextImg;
    }

    getComponent(): ClazzTemplate<GroupingStatisticController> | null {
        return GroupingStatisticController;
    }

    getInitConfig(): GroupingStatisticComponentProps {
        return {
            base: {
                id: "",
                name: '基础文本',
                type: 'LcBaseText',
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
            base: BaseInfo,
            style: GroupingStatisticConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}