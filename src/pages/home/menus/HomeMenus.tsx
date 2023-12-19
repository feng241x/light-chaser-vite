import React from "react";
import './HomeMenus.less';
import {DatabaseFilled, HomeFilled} from "@ant-design/icons";
import homeStore from "../HomeStore";
import { Menu, MenuProps } from "antd";

export interface IHomeMenu {
    key: string;
    icon: React.ReactNode;
    text: string;
}

const menus: MenuProps['items'] = [
    {
        key: 'local',
        icon: <HomeFilled/>,
        label: '本地大屏'
    },
    {
        key: 'server',
        icon: <DatabaseFilled/>,
        label: '在线大屏'
    },
    // {
    //     key: 'datasource',
    //     icon: <CodeSandboxSquareFilled/>,
    //     text: '数据源管理'
    // },
    // {
    //     key: 'template',
    //     icon: <ShopFilled/>,
    //     text: '模板市场'
    // }
]

export const HomeMenus: React.FC = () => {

    const changeMenu = (items: any) => {
        const {setCurrentMenu} = homeStore;
        setCurrentMenu(items.key);
    }

    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={changeMenu}
            style={{ height: '100%', borderRight: 0 }}
            items={menus}
        />
    );
}