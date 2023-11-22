import ConfigContent from "./ConfigContent";
import rightStore from "./RightStore";
import {observer} from "mobx-react";
import { Tabs, TabsProps } from 'antd';
import './index.less'

const Right = () => {
    const { setActiveMenu } = rightStore;
    const onChange = (key: string) => {
        setActiveMenu(key);
      };
      
      const items: TabsProps['items'] = [
        {
          key: 'style',
          label: '基  础',
          children: <ConfigContent />,
        },
        {
          key: 'data',
          label: '数  据',
          children: <ConfigContent />,
        },
        {
          key: 'events',
          label: '交  互',
          children: <ConfigContent />,
        },
      ];
    return (
      <Tabs style={{height: '100%'}} rootClassName='rightTabsContentPanel' defaultActiveKey="1" indicatorSize={40} tabBarGutter={42} items={items} onChange={onChange} tabBarStyle={{paddingLeft: 30 }} />
    )
}

export default observer(Right);