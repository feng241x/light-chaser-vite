import { Divider, Input, Tabs, Typography } from 'antd';
import '../index.less';
import templateListStore from "./templateListStore";
import { useEffect, useState } from "react";
import CompList from '../../float-configs/comp-list/CompList';
import { observer } from 'mobx-react';
import antdChartListStore from '../antdChartList/antdChartListStore';
import compListStore from '../../float-configs/comp-list/CompListStore';
import { TemplateEnum } from './templateType';
import IconAllSvg from './icon/iconAll';
import { FundProjectionScreenOutlined } from '@ant-design/icons';
const { Text } = Typography;
const { Search } = Input;
// 获取图表类型icon
const getIconByKey = (key: string) => {
    switch (key) {
        case TemplateEnum.ALL:
            return <IconAllSvg />
        case TemplateEnum.STATISTICCARD:
            return <FundProjectionScreenOutlined style={{fontSize: 22}} />
        default:
            break;
    }
}

const TemplateList = () => {
    const { setAntdChartItemKey } = antdChartListStore;
    let { setCompKey } = compListStore;
    const { templateList } = templateListStore;
    const [tabsList, setTabsList] = useState<any[]>([])

    const renderTabBar = (props: any, DefaultTabBar: React.ComponentClass) => {
        return (
            <DefaultTabBar {...props} />
        )
    }
    useEffect(() => {
        let templateArr = [];
        for (let i = 0; i < templateList.length; i++) {
            const { name, key } = templateList[i];
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
                    <CompList category={'template'}/>
                )
            })
        }
        setTabsList(templateArr)
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
                <Divider>模板</Divider>
                <Search placeholder="关键字检索" onSearch={onSearch} enterButton />
            </div>
            <Tabs
                size={'small'}
                tabPosition={'left'}
                items={tabsList}
                style={{height: 'calc(100% - 110px)'}}
                className="componentListTabLabel"
                onChange={onTabChange}
            />
        </>
    )
}

export default observer(TemplateList);

