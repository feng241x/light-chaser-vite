import { Divider, Input, Tabs, Typography } from 'antd';
import '../index.less';
import antdChartListStore from "./antdChartListStore";
import { useEffect, useState } from "react";
import IconAllSvg from './icon/iconAll';
import { AntdChartEnum } from './antdChartType';
import IconBarSvg from './icon/iconBar';
import IconAreaSvg from './icon/iconArea';
import IconPieSvg from './icon/iconPie';
import IconColumnSvg from './icon/iconColumn';
import IconLineSvg from './icon/iconLine';
import IconLoadingSvg from './icon/iconLoading';
import IconScatterSvg from './icon/iconScatter';
import IconFlowersSvg from './icon/iconFlowers';
import CompList from '../../float-configs/comp-list/CompList';
import { observer } from 'mobx-react';
import compListStore from '../../float-configs/comp-list/CompListStore';
const { Text } = Typography;
const { Search } = Input;
// 获取图表类型icon
const getIconByKey = (key: string) => {
    switch (key) {
        case AntdChartEnum.ALL:
            return <IconAllSvg />
        case AntdChartEnum.BAR:
            return <IconBarSvg />
        case AntdChartEnum.AREA:
            return <IconAreaSvg />
        case AntdChartEnum.COLUMN:
            return <IconColumnSvg />
        case AntdChartEnum.LINE:
            return <IconLineSvg />
        case AntdChartEnum.PIE:
            return <IconPieSvg />
        case AntdChartEnum.PROGRESS:
            return <IconLoadingSvg />
        case AntdChartEnum.SCATTER:
            return <IconScatterSvg />
        case AntdChartEnum.ROSE:
            return <IconFlowersSvg />
        default:
            break;
    }
}

const AntdChartList = () => {
    const { antdChartList, setAntdChartItemKey } = antdChartListStore;
    let { setCompKey } = compListStore;
    const [tabsList, setTabsList] = useState<any[]>([])
    const renderTabBar = (props: any, DefaultTabBar: React.ComponentClass) => {
        return (
            <DefaultTabBar {...props} />
        )
    }
    useEffect(() => {
        let antdChartArr = [];
        for (let i = 0; i < antdChartList.length; i++) {
            const { name, key } = antdChartList[i];
            antdChartArr.push({
                label: (
                    <>
                        {getIconByKey(key)}
                        <div style={{width: 45}}>
                            <Text>{name}</Text>
                        </div>
                    </>
                ),
                key,
                renderTabBar,
                children: (
                    <CompList category='chart' twoCategories={key} />
                )
            })
        }
        setTabsList(antdChartArr)
    }, [])

    // 切换tab面板
    const onTabChange = (activeKey: string) => {
        setAntdChartItemKey(activeKey)
    }

    const onSearch = (searchText: string) => {
        setCompKey(searchText);
    }

    return (
        <>
            <div className="componentListTabName">
                <Divider>图表</Divider>
                <Search placeholder="关键字检索" onSearch={onSearch} enterButton />
            </div>
            <Tabs
                size={'small'}
                destroyInactiveTabPane
                tabPosition={'left'}
                items={tabsList}
                style={{height: 'calc(100% - 110px)'}}
                className="componentListTabLabel"
                onChange={onTabChange}
            />
        </>
    )
}

export default observer(AntdChartList);