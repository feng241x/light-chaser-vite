import ConfigContent from "./ConfigContent";
import rightStore from "./RightStore";
import {observer} from "mobx-react";
import { Tabs } from 'antd';
import './index.less'
import { useEffect, useState } from "react";
import { MenuInfo } from "./MenuType";
import mainStore from "../../mainStore";

const Right = () => {
    const { setActiveMenu, menus, visible, setContentVisible } = rightStore;
    const { setRightSiderWidth } = mainStore;
    const [tabsList, setTabsList] = useState<any[]>([]);
    const onChange = (key: string) => {
        setActiveMenu(key);
        setContentVisible && setContentVisible(true);
      };
    useEffect(() => {
      debugger;
      setTabsList(menus.map((item: MenuInfo) => ({
        key: item.key,
        label: item.name,
        children: visible && <ConfigContent />,
      })))
      if (menus.length === 0) setRightSiderWidth(0)
    }, [menus, visible])
    return (
      <Tabs style={{height: '100%'}} rootClassName='rightTabsContentPanel' defaultActiveKey="1" indicatorSize={40} tabBarGutter={42} items={tabsList} onChange={onChange} tabBarStyle={{paddingLeft: 30 }} />
    )
}

export default observer(Right);