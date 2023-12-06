import {
    AbstractDefinition,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import GroupingStatisticImg from './GroupingStatistic.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import AnimationConfig from "../../common-component/animation-config/AnimationConfig";
import ThemeConfig from "../../common-component/theme-config/ThemeConfig";
import { CategoryEnum } from "../../../const/index.const";
import { GroupingStatisticController } from "./GroupingStatisticController";
import { GroupingStatisticComponentProps } from "./GroupingStatisticComponent";
import { GroupingStatisticStyleConfig, GroupingStatisticMapping } from "./GroupingStatisticConfig";
import { TemplateEnum } from "../../../designer/left/templateList/templateType";
import React from "react";

const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));

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
        return GroupingStatisticImg;
    }

    getComponent(): ClazzTemplate<GroupingStatisticController> | null {
        return GroupingStatisticController;
    }

    getInitConfig(): GroupingStatisticComponentProps {
        return {
            base: {
                id: "",
                name: '指标卡',
                type: "GroupingStatistic",
            },
            style: {
                title: '指标卡',
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
                chart: 'Column',
                xField: 'Date',
                yField: 'scales',
                countField: 'scales'
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: [
                        {
                          "Date": "2010-01",
                          "scales": 18
                        },
                        {
                          "Date": "2010-02",
                          "scales": 1850
                        },
                        {
                          "Date": "2010-03",
                          "scales": 1720
                        },
                        {
                          "Date": "2010-04",
                          "scales": 1818
                        },
                        {
                          "Date": "2010-05",
                          "scales": 1920
                        },
                        {
                          "Date": "2010-06",
                          "scales": 1802
                        },
                        {
                          "Date": "2010-07",
                          "scales": 1945
                        },
                        {
                          "Date": "2010-08",
                          "scales": 1856
                        },
                        {
                          "Date": "2010-09",
                          "scales": 2107
                        },
                        {
                          "Date": "2010-10",
                          "scales": 2140
                        },
                        {
                          "Date": "2010-11",
                          "scales": 2311
                        },
                        {
                          "Date": "2010-12",
                          "scales": 1972
                        },
                        {
                          "Date": "2011-01",
                          "scales": 1760
                        },
                        {
                          "Date": "2011-02",
                          "scales": 1824
                        },
                        {
                          "Date": "2011-03",
                          "scales": 1801
                        },
                        {
                          "Date": "2011-04",
                          "scales": 2001
                        },
                        {
                          "Date": "2011-05",
                          "scales": 1640
                        },
                        {
                          "Date": "2011-06",
                          "scales": 1502
                        },
                        {
                          "Date": "2011-07",
                          "scales": 1621
                        },
                        {
                          "Date": "2011-08",
                          "scales": 1480
                        },
                        {
                          "Date": "2011-09",
                          "scales": 1549
                        },
                        {
                          "Date": "2011-10",
                          "scales": 1390
                        },
                        {
                          "Date": "2011-11",
                          "scales": 1325
                        },
                        {
                          "Date": "2011-12",
                          "scales": 1250
                        },
                        {
                          "Date": "2012-01",
                          "scales": 1394
                        },
                        {
                          "Date": "2012-02",
                          "scales": 1406
                        },
                        {
                          "Date": "2012-03",
                          "scales": 1578
                        },
                        {
                          "Date": "2012-04",
                          "scales": 1465
                        },
                        {
                          "Date": "2012-05",
                          "scales": 1689
                        },
                        {
                          "Date": "2012-06",
                          "scales": 1755
                        },
                        {
                          "Date": "2012-07",
                          "scales": 1495
                        },
                        {
                          "Date": "2012-08",
                          "scales": 1508
                        },
                        {
                          "Date": "2012-09",
                          "scales": 1433
                        },
                        {
                          "Date": "2012-10",
                          "scales": 1344
                        },
                        {
                          "Date": "2012-11",
                          "scales": 1201
                        },
                        {
                          "Date": "2012-12",
                          "scales": 1065
                        },
                        {
                          "Date": "2013-01",
                          "scales": 1255
                        },
                        {
                          "Date": "2013-02",
                          "scales": 1429
                        },
                        {
                          "Date": "2013-03",
                          "scales": 1398
                        },
                        {
                          "Date": "2013-04",
                          "scales": 1678
                        },
                        {
                          "Date": "2013-05",
                          "scales": 1524
                        },
                        {
                          "Date": "2013-06",
                          "scales": 1688
                        },
                        {
                          "Date": "2013-07",
                          "scales": 1500
                        },
                        {
                          "Date": "2013-08",
                          "scales": 1670
                        },
                        {
                          "Date": "2013-09",
                          "scales": 1734
                        },
                        {
                          "Date": "2013-10",
                          "scales": 1699
                        },
                        {
                          "Date": "2013-11",
                          "scales": 1508
                        },
                        {
                          "Date": "2013-12",
                          "scales": 1680
                        },
                        {
                          "Date": "2014-01",
                          "scales": 1750
                        },
                        {
                          "Date": "2014-02",
                          "scales": 1602
                        },
                        {
                          "Date": "2014-03",
                          "scales": 1834
                        },
                        {
                          "Date": "2014-04",
                          "scales": 1722
                        },
                        {
                          "Date": "2014-05",
                          "scales": 1430
                        },
                        {
                          "Date": "2014-06",
                          "scales": 1280
                        },
                        {
                          "Date": "2014-07",
                          "scales": 1367
                        },
                        {
                          "Date": "2014-08",
                          "scales": 1155
                        },
                        {
                          "Date": "2014-09",
                          "scales": 1289
                        },
                        {
                          "Date": "2014-10",
                          "scales": 1104
                        },
                        {
                          "Date": "2014-11",
                          "scales": 1246
                        },
                        {
                          "Date": "2014-12",
                          "scales": 1098
                        },
                        {
                          "Date": "2015-01",
                          "scales": 1189
                        },
                        {
                          "Date": "2015-02",
                          "scales": 1276
                        },
                        {
                          "Date": "2015-03",
                          "scales": 1033
                        },
                        {
                          "Date": "2015-04",
                          "scales": 956
                        },
                        {
                          "Date": "2015-05",
                          "scales": 845
                        },
                        {
                          "Date": "2015-06",
                          "scales": 1089
                        },
                        {
                          "Date": "2015-07",
                          "scales": 944
                        },
                        {
                          "Date": "2015-08",
                          "scales": 1043
                        },
                        {
                          "Date": "2015-09",
                          "scales": 893
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
            style: GroupingStatisticStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: GroupingStatisticMapping
        };
    }
}