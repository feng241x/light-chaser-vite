import { useState } from 'react';
import ClassifyList from "./classify-list/ClassifyList";
import {observer} from "mobx-react";
import { Layout, Menu, MenuProps, Tabs } from 'antd';
import { AppstoreOutlined, ContainerOutlined, CopyOutlined, DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import mainStore from '../../mainStore';
import AntdChartList from './antdChartList/antdChartList';
import TemplateList from './templateList/templateList';
import { CategoryEnum } from '../../const/index.const';
import BaseComponents from './baseComponents/baseComponents';
import LayerList from '../float-configs/layer-list/LayerList';

// class DesignerLeft extends Component {

//     render() {
//         return (
//             <ClassifyList/>
//         );
//     }
// }

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    title: label
  } as MenuItem;
}

const items: MenuItem[] = [
    getItem('图表', CategoryEnum.CHART, <PieChartOutlined style={{fontSize: 18}} />),
    getItem('基础', CategoryEnum.BASE, <AppstoreOutlined style={{fontSize: 18}} />),
    getItem('模板', CategoryEnum.TEMPLATE, <DesktopOutlined style={{fontSize: 18}} />),
    getItem('定制', CategoryEnum.CUSTOMIZATION, <ContainerOutlined style={{fontSize: 18}} />),
    getItem('图层', CategoryEnum.COVERAGE, <CopyOutlined style={{fontSize: 18}} />)
];
const { Content, Sider } = Layout;
const DesignerLeft = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { setLeftSiderWidth } = mainStore;
    // 当前菜单内容区域显示状态
    const [siderCollapsed, setSiderCollapsed] = useState(true);
    // 当前菜单选中项
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    // 选中菜单事件
    const onSelect = ({ selectedKeys }: { selectedKeys: string[] }) => {
        setSelectedKeys(selectedKeys);
        setSiderCollapsed(selectedKeys.length === 0);
        setLeftSiderWidth(340);
        setCollapsed(false);
    }
    // 点击菜单事件
    const onClick = ({ key }: { key: string }) => {
        if (selectedKeys.includes(key)) {
            setSelectedKeys([]);
            setSiderCollapsed(true);
            setLeftSiderWidth(120);
            setCollapsed(true);
        }
    }
    // 选中菜单状态下 展示对应内容
    const getSiderPanel = (selectKey: string) => {
        // const selectKey = selectedKeys[0];
        switch (selectKey) {
            case CategoryEnum.CHART:
                return <AntdChartList />
            case CategoryEnum.BASE:
                return <BaseComponents />
            case CategoryEnum.TEMPLATE:
                return <TemplateList />
            case CategoryEnum.COVERAGE:
                return <LayerList/>
            default:
                return <>sss</>
                break;
        }
    }
    return (
        <Layout>
            <Content >
                <Menu
                    style={{height: '100%'}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"
                    selectedKeys={selectedKeys}
                    inlineCollapsed={collapsed}
                    items={items}
                    onSelect={onSelect}
                    onClick={onClick}
                />
            </Content>
            <Sider
                width={270}
                collapsed={siderCollapsed}
                collapsedWidth={0}
                defaultCollapsed={true}
                theme="light"
            >
                { 
                    getSiderPanel(selectedKeys[0])
                }
                
            </Sider>
        </Layout>
    )
}

export default observer(DesignerLeft);