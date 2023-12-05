import { Divider, Input, Tabs, Typography } from 'antd';
import '../index.less';
import baseComponentsStore from "./baseComponentsStore";
import { useEffect, useState } from "react";
import CompList from '../../float-configs/comp-list/CompList';
import { observer } from 'mobx-react';
import compListStore from '../../float-configs/comp-list/CompListStore';
import { CategoryEnum } from '../../../const/index.const';
import IconAllSvg from './icon/iconAll';
import { BaseComponentsEnum } from './baseComponentsType';
import IconPieSvg from './icon/iconPie';
import IconOptimizeSvg from './icon/iconOptimize';
const { Text } = Typography;
const { Search } = Input;
// 获取图表类型icon
const getIconByKey = (key: string) => {
    switch (key) {
        case BaseComponentsEnum.ALL:
            return <IconAllSvg />
        case BaseComponentsEnum.BASE:
            return <IconPieSvg />
        case BaseComponentsEnum.ORNAMENTAL:
            return <IconOptimizeSvg />
        default:
            break;
    }
}

const BaseComponents = () => {
    let { setCompKey } = compListStore;
    const { baseComponents, setBaseComponentsItemKey } = baseComponentsStore;
    const [tabsList, setTabsList] = useState<any[]>([])

    const renderTabBar = (props: any, DefaultTabBar: React.ComponentClass) => {
        return (
            <DefaultTabBar {...props} />
        )
    }
    useEffect(() => {
        let templateArr = [];
        for (let i = 0; i < baseComponents.length; i++) {
            const { name, key } = baseComponents[i];
            templateArr.push({
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
                    <CompList category={CategoryEnum.BASE} />
                )
            })
        }
        setTabsList(templateArr)
    }, [])

    // 切换tab面板
    const onTabChange = (activeKey: string) => {
        setBaseComponentsItemKey(activeKey)
    }

    const onSearch = (searchText: string) => {
        setCompKey(searchText);
    }

    return (
        <>
            <div className="componentListTabName">
                <Divider>基础</Divider>
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

export default observer(BaseComponents);

