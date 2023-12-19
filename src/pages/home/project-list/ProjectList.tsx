import React, {useEffect, useState} from 'react';
import './ProjectList.less';
import {Button, Form, Input, Space, message} from "antd";

import {PlusOutlined} from "@ant-design/icons";
import {IProjectInfo, SaveType} from "../../../designer/DesignerType";
import {INewProjectInfo} from "./AddNewProjectDialog";
import Dialog from "../../../ui/dialog/Dialog";
import operatorMap from "../../../framework/operate";
import {DesignerMode} from "../../../utils/URLUtil";
import ProjectItem from '../projectItem/ProjectItem';
import AddNewScreenDialog from './AddNewScreenDialog';

export interface ProjectListProps {
    saveType: SaveType;
}

export const ProjectList: React.FC<ProjectListProps> = (props) => {
    const [addDialog, setAddDialog] = React.useState(false);
    const [cloneDialog, setCloneDialog] = React.useState(false);
    const [data, setData] = React.useState<IProjectInfo[]>([]);
    const [selectId, setSelectId] = useState<string>('');
    useEffect(() => {
        getProjectList();
    }, []);

    const onOk = (data: INewProjectInfo) => {
        const {saveType} = props;
        const {name, des, width, height} = data;
        const project: IProjectInfo = {
            name: name,
            des: des,
            saveType: saveType,
            dataJson: JSON.stringify({canvasConfig: {width, height}}),
        }
        operatorMap[saveType].createProject(project).then((id) => {
            setAddDialog(false);
            window.open(`/designer?id=${id}&saveType=${saveType}&mode=${DesignerMode.EDIT}`, '_blank');
            getProjectList();
        });
    }

    const onCancel = () => setAddDialog(false);

    const confirmClone = (name: string) => {
        const {saveType} = props;
        operatorMap[saveType].copyProject(selectId).then((id) => {
            if (id) {
                setCloneDialog(false);
                getProjectList();
                message.success('克隆成功');
            }
        });
    }

    const cancelClone = () => setCloneDialog(false);

    const getProjectList = () => {
        const {saveType} = props;
        operatorMap[saveType].getProjectInfoList().then((data: IProjectInfo[]) => setData(data));
    }

    const confirmDel = () => {
        const {saveType} = props;
        operatorMap[saveType].deleteProject(selectId).then((res) => {
            if (res) {
                getProjectList();
            } else {
                message.error('删除失败');
            }
        });

    }

    return (
        <>
            <Space size={[8, 16]} wrap>
                <Button type='dashed' onClick={() => setAddDialog(!addDialog)} style={{height: 200, width: 300, display: 'inline-block'}} icon={<PlusOutlined style={{fontSize: 30}} />} />
                {data.map((item: any, index) => <ProjectItem saveType={props.saveType} key={index + item.id} confirmDel={confirmDel} setSelectId={setSelectId} setShowCloneDialog={setCloneDialog} item={item} />)}
            </Space>
            <AddNewScreenDialog onOk={onOk} onCancel={onCancel} visible={addDialog}/>
            <CloneDialog onOk={(name: string) => confirmClone(name)} onCancel={cancelClone}
                         visible={cloneDialog}/>
        </>
    );

}

export default ProjectList;

interface CloneDialogProps {
    onOk: (values: any) => void;
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