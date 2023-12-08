import {
    AbstractDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import ColumnStatisticImg from './ColumnStatistic.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import { CategoryEnum } from "../../../const/index.const";
import { ColumnStatisticController } from "./ColumnStatisticController";
import { ColumnStatisticComponentProps } from "./ColumnStatisticComponent";
import { ColumnStatisticStyleConfig, ColumnStatisticMapping } from "./ColumnStatisticConfig";
import { TemplateEnum } from "../../../designer/left/templateList/templateType";
import React from "react";

const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

export default class ColumnStatisticDefinition extends AbstractDefinition<ColumnStatisticController, ColumnStatisticComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "柱状图指标卡",
            compKey: "ColumnStatistic",
            category: CategoryEnum.TEMPLATE,
            type: '柱状图指标卡',
            typeKey: TemplateEnum.COLUMNSTATISTICCARD,
        };
    }

    getChartImg(): string | null {
        return ColumnStatisticImg;
    }

    getComponent(): ClazzTemplate<ColumnStatisticController> | null {
        return ColumnStatisticController;
    }

    getInitConfig(): ColumnStatisticComponentProps {
        return {
            base: {
                id: "",
                name: '柱状图指标卡',
                type: "ColumnStatistic",
            },
            style: {
                title: '柱状图指标卡',
                description: '',
                tip: '',
                fontSize: 24,
                fontWeight: 700,
                prefix: '',
                suffix: '',
                layout: 'vertical',
                CountUp: true,
                xAxis: false,
                yAxis: false,
                hoverable: false,
                bordered: false,
                xField: 'Date',
                yField: 'scales',
                countField: 'scales',
                color: "#ccc",
                smooth: false
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: [
                        {
                          "Date": "2010-01",
                          "scales": 722
                        },
                        {
                          "Date": "2010-02",
                          "scales": 1850
                        },
                        {
                          "Date": "2010-03",
                          "scales": 720
                        },
                        {
                          "Date": "2010-04",
                          "scales": 1818
                        },
                        {
                          "Date": "2010-05",
                          "scales": 920
                        },
                        {
                          "Date": "2010-06",
                          "scales": 1802
                        }
                      ]
                },
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: ColumnStatisticStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: ColumnStatisticMapping
        };
    }
}