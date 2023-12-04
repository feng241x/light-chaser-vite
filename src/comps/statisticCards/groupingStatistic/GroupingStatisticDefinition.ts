import {
    AbstractComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractComponentDefinition";
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

export default class GroupingStatisticDefinition extends AbstractComponentDefinition<GroupingStatisticController, GroupingStatisticComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "指标卡",
            compKey: "GroupingStatistic",
            category: CategoryEnum.TEMPLATE,
            type: '指标卡',
            typeKey: TemplateEnum.STATISTICCARD,
            desc: "标准提供的基础文本",
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
            style: GroupingStatisticConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}