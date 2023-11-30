import {useEffect, useState} from 'react';
import './style/LightChaserList.less';
import AddNewScreenDialog, {NewProjectInfoType} from "./AddNewScreenDialog";
import {ImgUtil} from "../utils/ImgUtil";
import {SaveType} from "../designer/DesignerType";
import designerStore from "../designer/store/DesignerStore";
import EditorDesignerLoader from "../designer/loader/EditorDesignerLoader";
import Dialog from "../ui/dialog/Dialog";
import {Button, Form, Input, Layout, Menu, MenuProps, Space, Typography, message, theme} from "antd";
import URLUtil from "../utils/URLUtil";
import { PlusOutlined, ProfileOutlined } from '@ant-design/icons';
import ProjectItem from './ProjectItem';

const { Header, Content, Sider } = Layout;
const { Text } = Typography;

const LightChaserList = () => {
    const [imageIdToUrl, setImageIdToUrl] = useState<any>({});
    const [projectDataList, setProjectDataList] = useState<any[]>([]);
    const [showCloneDialog, setShowCloneDialog] = useState(false);
    const [addNewScreen, setAddNewScreen] = useState(false);
    const [selectId, setSelectId] = useState<string>('');
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    const projectMenus: MenuProps['items'] = [{
        key: '1',
        label: '项目列表',
        icon: <ProfileOutlined />
      }];
    const onOk = (data: NewProjectInfoType) => {
        let urlParams = URLUtil.buildUrlParams({...data, ...{action: 'create'}});
        setAddNewScreen(false);
        window.open(`/designer?${urlParams}`, '_blank');
    }
    const onCancel = () => {
        setAddNewScreen(false);
    }
    const confirmDel = () => {
        EditorDesignerLoader.getInstance().abstractOperatorMap[SaveType.LOCAL].deleteProject(selectId);
        setProjectDataList(projectDataList.filter((item: any) => item.id !== selectId));
    }
    const confirmClone = (name: string) => {
        const operator = EditorDesignerLoader.getInstance().abstractOperatorMap[SaveType.LOCAL];
        operator.copyProject(selectId, name).then((copyProject) => {
            //重新加载项目列表
            operator.getProjectSimpleInfoList().then((simpleInfoList: any) => {
                const newSimpleInfo = simpleInfoList.filter((item: any) => item.id === copyProject.data);
                ImgUtil.getImageFromLocalWithKey(newSimpleInfo[0].screenshot).then((obj: any) => {
                    message.success('克隆成功');
                    setProjectDataList([...projectDataList, ...newSimpleInfo])
                    setImageIdToUrl({...imageIdToUrl, ...obj});
                    setShowCloneDialog(false);
                })
            })
        });
    }
    const cancelClone = () => {
        setShowCloneDialog(false);
    }
    useEffect(() => {
        EditorDesignerLoader.getInstance().scannerProjectOperators();
        const {projectConfig: {saveType = SaveType.LOCAL}} = designerStore;
        EditorDesignerLoader.getInstance().abstractOperatorMap[saveType]?.getProjectSimpleInfoList().then((data: any) => {
            if (data && data.length > 0) {
                setProjectDataList(data);
                let imageIds: any = [];
                data.forEach((item: any) => {
                    let imageId = item.screenshot;
                    if (imageId && imageId !== '')
                        imageIds.push(imageId);
                });
                const promise = imageIds.map((imageId: any) => ImgUtil.getImageFromLocalWithKey(imageId));
                let imageIdToUrl: any = {};
                Promise.all(promise).then((res: any) => {
                    res.forEach((item: any) => {
                        
                        const key = Object.keys(item)[0];
                        imageIdToUrl[key] = item[key];
                    });
                    setImageIdToUrl(imageIdToUrl);
                });
            }
        })
    }, [])
    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center', zIndex: 3, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)' }}>
                <Text style={{fontSize: 22, fontWeight: 700}}>数据可视化设计器</Text>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={projectMenus}
                    />
                </Sider>
                <Layout style={{ padding: 24 }}>
                    <Content
                        style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                        background: colorBgContainer,
                        }}
                    >
                        <Space size={[8, 16]} wrap>
                            <Button type='dashed' onClick={() => setAddNewScreen(!addNewScreen)} style={{height: 200, width: 300, display: 'inline-block'}} icon={<PlusOutlined style={{fontSize: 30}} />} />
                            {projectDataList.map((item: any) => <ProjectItem confirmDel={confirmDel} setSelectId={setSelectId} setShowCloneDialog={setShowCloneDialog} item={item} imageIdToUrl={imageIdToUrl} />)}
                        </Space>
                    </Content>
                </Layout>
            </Layout>
            <AddNewScreenDialog onOk={onOk} onCancel={onCancel} visible={addNewScreen}/>
            <CloneDialog onOk={(name: string) => confirmClone(name)} onCancel={cancelClone}
                         visible={showCloneDialog}/>
        </Layout>
    )
}

export default LightChaserList;

interface CloneDialogProps {
    onOk: (cloneName: string) => void;
    onCancel: () => void;
    visible: boolean;
}

const CloneDialog = (props: CloneDialogProps) => {

    const {onOk, onCancel, visible} = props;

    const onSubmit = (values: any) => {
        onOk(values.cloneName)
    }

    return (
        <Dialog title={'克隆项目'} visible={visible} onClose={onCancel}>
            <Form 
                onFinish={onSubmit}
            >
                <Form.Item
                    label='项目名称'
                    required={true}
                    name='cloneName'
                >
                    <Input />
                </Form.Item>
                
                <div className={'del-pro-confirm'} style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}>
                    <Button onClick={onCancel}>取消</Button>
                    <Button style={{marginLeft: 10}} htmlType='submit' type='primary'>确认</Button>
                </div>
            </Form>
        </Dialog>
    )
}