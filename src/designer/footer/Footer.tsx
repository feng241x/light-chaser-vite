import {useEffect, useState} from 'react';
import './Footer.less';
import {observer} from "mobx-react";
import designerStore from "../store/DesignerStore";
import Dialog from "../../ui/dialog/Dialog";
import HotKeyDes from "./HotKeyDes";
import footerStore from "./FooterStore";
import eventOperateStore from "../operate-provider/EventOperateStore";
import { Button, Divider, Modal, Result, Space, Typography } from 'antd';
import { AppstoreOutlined, AppstoreTwoTone, CameraTwoTone, ControlOutlined, ControlTwoTone, DashboardOutlined } from '@ant-design/icons';
import mainStore from '../../mainStore';
import { LocalConstant } from '../../framework/LocalConstant';
import { ImgUtil } from '../../utils/ImgUtil';
import localforage from 'localforage';
import { SaveType } from '../DesignerType';
import EditorDesignerLoader from '../loader/EditorDesignerLoader';

const { Text } = Typography;

const MyFooter: React.FC = () => {
    const [modal, contextHolder] = Modal.useModal();
    const {layerConfigs, projectConfig: {name, state} } = designerStore;
    const {hotKeyVisible, setHotKeyVisible} = footerStore;
    const { setLeftSiderWidth, leftSelectedKeys, rightSiderWidth, setRightSiderWidth } = mainStore;
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
        if (rightSiderWidth === 0) setAttributesSwitch(false);
    }, [rightSiderWidth])

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

    const updateScreenshot = () => {
        const projectData = designerStore.getData();
        const operator = EditorDesignerLoader.getInstance().abstractOperatorMap[SaveType.LOCAL];
        let imgDom: any = document.querySelector('.lc-drag-scale-provider');
        const screenShotId = LocalConstant.LOCAL_PROJECT_SCREENSHOT + projectData.id;
        projectData!.projectConfig!.screenshot = screenShotId; //截图
        ImgUtil.htmlToImgWithId(imgDom, screenShotId, {scale: 0.3}).then((result) => {
            modal[result ? 'success' : 'error']({
                okText: '确定',
                cancelText: '取消',
                title: '生成结果',
                content: (
                    result ? <Result
                        status="success"
                        title="更新工作区缩略图成功!"
                    /> : <Result
                            status="error"
                            title="更新工作区缩略图失败！"
                        />
                ),
              });
        });
        //更新项目列表信息
        operator.getProjectSimpleInfoList().then((simpleInfoList: any) => {
            let index = simpleInfoList.findIndex((project: any) => project.id === projectData.id);
            const {id, projectConfig} = projectData;
            const {name, des, state, updateTime, screenshot, saveType} = projectConfig!;
            simpleInfoList[index] = {id, name, des, state, updateTime, screenshot, saveType};
            localforage.setItem(LocalConstant.LOCAL_SIMPLE_PROJECT_LIST, simpleInfoList);
        });
    }

    return (
        <div className={'lc-designer-footer'}>
            <div className={'footer-left'} >
                <Space size='small'>
                    <Button onClick={componentSwitchClick} icon={componentSwitch ? <AppstoreTwoTone /> : <AppstoreOutlined />} type='text' title='组件控件'></Button>
                    <Button onClick={attributesSwitchClick} icon={attributesSwitch ? <ControlTwoTone /> : <ControlOutlined />} type='text' title='属性控件'></Button>
                    <Button onClick={() => updateScreenshot()} icon={<CameraTwoTone />} type='text' title='生成工作区缩略图'></Button>
                    <Button type='text' icon={<DashboardOutlined />} onClick={toggleHotKeyDes}>快捷键</Button>
                </Space>
            </div>
            <div className={'footer-right'} style={{opacity: 0.6}}>
                <Space split={<Divider type="vertical" />}>
                    <Text>缩放 : {(scale * 100).toFixed(0)}%</Text>
                    <Text>当前组件数 : {Object.keys(layerConfigs).length}</Text>
                    <Text>项目 : {name}</Text>
                    <Text>状态 : {stateStr}</Text>
                </Space>
            </div>
            <Dialog title={'快捷键说明'} visible={hotKeyVisible} width={500} onClose={toggleHotKeyDes}>
                <HotKeyDes/>
            </Dialog>
            {contextHolder}
        </div>
    );
}

export default observer(MyFooter);