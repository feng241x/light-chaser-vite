import {
    AbstractComponentDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractComponentDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseTableImg from './base-table.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseTable} from "./BaseTable";
import {BaseTableComponentProps} from "./BaseTableComponent";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import {BaseTableStyleConfig} from "./BaseTableConfig";
import { CategoryEnum, ChartTypeCNEnum, ChartTypeEnum } from "../../../const/index.const";

export default class BaseTableDefinition extends AbstractComponentDefinition<BaseTable, BaseTableComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础表格",
            compKey: "LcBaseTable",
            category: CategoryEnum.BASE,
            type: ChartTypeCNEnum.base,
            typeKey: ChartTypeEnum.BASE,
            desc: "标准提供的基础表格",
        };
    }

    getChartImg(): string | null {
        return baseTableImg;
    }

    getComponent(): ClazzTemplate<BaseTable> | null {
        return BaseTable;
    }

    getInitConfig(): BaseTableComponentProps {
        return {
            info: {
                id: "",
                name: '基础表格',
                type: 'LcBaseTable',
                desc: '标准提供的基础表格',
            },
            style: {},
            data: {
                dataSource: 'static',
                staticData: {
                    data: []
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
            style: BaseTableStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }
}