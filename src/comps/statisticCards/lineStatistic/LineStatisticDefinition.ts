import {
    AbstractDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import LineStatisticImg from './LineStatistic.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import { CategoryEnum } from "../../../const/index.const";
import { LineStatisticController } from "./LineStatisticController";
import { LineStatisticComponentProps } from "./LineStatisticComponent";
import { LineStatisticStyleConfig, LineStatisticMapping } from "./LineStatisticConfig";
import { TemplateEnum } from "../../../designer/left/templateList/templateType";
import React from "react";

const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

export default class LineStatisticDefinition extends AbstractDefinition<LineStatisticController, LineStatisticComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "折线图指标卡",
            compKey: "LineStatistic",
            category: CategoryEnum.TEMPLATE,
            type: '折线图指标卡',
            typeKey: TemplateEnum.LINESTATISTICCARD,
        };
    }

    getChartImg(): string | null {
        return LineStatisticImg;
    }

    getController(): ClazzTemplate<LineStatisticController> | null {
        return LineStatisticController;
    }

    getInitConfig(): LineStatisticComponentProps {
        return {
            base: {
                id: "",
                name: '折线图指标卡',
                type: "LineStatistic",
            },
            style: {
                title: '折线图指标卡',
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
                smooth: false,
                point: {
                  size: 4,
                  style: {
                      fill: "#00ddffff"
                  }
                },
                line: {
                    size: 1
                }
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
            style: LineStatisticStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: LineStatisticMapping
        };
    }
}