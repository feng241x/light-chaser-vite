import headerStore from "../../HeaderStore";
import './ProjectHdItemImpl.less';
import designerStore from "../../../store/DesignerStore";
import {ProjectState, SaveType} from "../../../DesignerType";
import { Form, Input, Modal, Radio, Select } from 'antd';

const ProjectHdItemImpl = () => {
    const {projectConfig, updateProjectConfig} = designerStore;
    const {projectVisible, setProjectVisible} = headerStore;
    const [form] = Form.useForm();
    const doSave = (values: any) => {
        debugger;
        updateProjectConfig(values);
        setProjectVisible(false);
    }
    const onClose = () => {
        setProjectVisible(false);
    }
    return (
        <Modal 
            title={'项目设置'} 
            open={projectVisible} 
            onCancel={onClose}
            okText='确定'
            cancelText='取消'
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        doSave(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form form={form} initialValues={projectConfig}>
                <Form.Item
                    label="项目名称"
                    name="name"
                    rules={[{ required: true, message: '宽度必填，最小值不能低于500!' }]}
                    >
                    <Input style={{ width: 280 }} />
                </Form.Item>
                <Form.Item
                    label="项目描述"
                    name="des"
                    rules={[{ required: true, message: '高度必填，最小值不能低于300!' }]}
                    >
                    <Input style={{ width: 280 }} />
                </Form.Item>
                <Form.Item
                    label="项目状态"
                    name="state"
                    >
                    <Radio.Group
                        buttonStyle="solid"
                        optionType="button"
                        options={[
                            {label: '草稿', value: ProjectState.DRAFT},
                            {label: '发布', value: ProjectState.PUBLISH},
                            {label: '封存', value: ProjectState.SEALED}
                    ]}/>
                </Form.Item>
                <Form.Item
                    label="存储类型"
                    name="saveType"
                    >
                    <Select defaultValue={projectConfig.saveType} options={[{value: SaveType.LOCAL, label: '本地存储'},{value: SaveType.SERVER, label: '服务器存储'}]} />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default ProjectHdItemImpl;