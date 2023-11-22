import {useEffect, useState} from 'react';
import './Footer.less';
import {observer} from "mobx-react";
import designerStore from "../store/DesignerStore";
import Dialog from "../../ui/dialog/Dialog";
import HotKeyDes from "./HotKeyDes";
import footerStore from "./FooterStore";
import eventOperateStore from "../operate-provider/EventOperateStore";
import { Button, Divider, Space, Switch, Typography } from 'antd';
import { AppstoreOutlined, AppstoreTwoTone, DashboardOutlined, SettingOutlined, SettingTwoTone } from '@ant-design/icons';
import mainStore from '../../mainStore';

const { Text } = Typography;

const MyFooter: React.FC = () => {
    const {layoutConfigs, projectConfig: {name, state}} = designerStore;
    const {hotKeyVisible, setHotKeyVisible} = footerStore;
    const { setLeftSiderWidth, leftSelectedKeys, setRightSiderWidth } = mainStore;
    const [stateStr, setStateStr] = useState('');
    const {scale} = eventOperateStore;
    // 控制组件面板显示隐藏
    const [componentSwitch, setComponentSwitch] = useState(true);
    // 控制属性面板显示隐藏
    const [attributesSwitch, setAttributesSwitch] = useState(true);
    
    const toggleHotKeyDes = () => {
        setHotKeyVisible(!hotKeyVisible)
    }

    const componentSwitchClick = () => {
        setComponentSwitch(!componentSwitch);
        setLeftSiderWidth(!componentSwitch ? leftSelectedKeys.length ? 340 : 120 : 0)
    }

    const attributesSwitchClick = () => {
        setAttributesSwitch(!attributesSwitch);
        setRightSiderWidth(!attributesSwitch ? 300 : 0)
    }

    useEffect(() => {
        let _str = '';
        switch (state) {
            case '0':
                _str = '草稿';
                break;
            case '1':
                _str = '发布';
                break;
            case '2':
                _str = '封存';
                break;
        }
        setStateStr(_str)
    }, [state])
    
    return (
        <div className={'lc-designer-footer'}>
            <div className={'footer-left'} >
                <Space size='small'>
                    <Button onClick={componentSwitchClick} icon={componentSwitch ? <AppstoreTwoTone /> : <AppstoreOutlined />} type='text' title='组件控件'></Button>
                    <Button onClick={attributesSwitchClick} icon={attributesSwitch ? <SettingTwoTone /> : <SettingOutlined />} type='text' title='属性控件'></Button>
                    <Button type='text' icon={<DashboardOutlined />} onClick={toggleHotKeyDes}>快捷键</Button>
                </Space>
            </div>
            <div className={'footer-right'} style={{opacity: 0.6}}>
                <Space split={<Divider type="vertical" />}>
                    <Text>缩放 : {(scale * 100).toFixed(0)}%</Text>
                    <Text>当前组件数 : {Object.keys(layoutConfigs).length}</Text>
                    <Text>项目 : {name}</Text>
                    <Text>状态 : {stateStr}</Text>
                </Space>
            </div>
            <Dialog title={'快捷键说明'} visible={hotKeyVisible} width={500} onClose={toggleHotKeyDes}>
                <HotKeyDes/>
            </Dialog>
        </div>
    );
}

export default observer(MyFooter);