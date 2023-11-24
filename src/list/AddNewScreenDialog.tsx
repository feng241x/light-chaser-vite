import './style/AddNewScreenDialog.less';
import { Form, Input, Modal, Select } from 'antd';

export interface NewProjectInfoType {
    name: string;
    description?: string;
    width: number;
    height: number;
}

interface AddNewScreenDialogProps {
    onOk?: (data: NewProjectInfoType) => void;
    onCancel?: () => void;
    visible?: boolean;
}

const AddNewScreenDialog = (props: AddNewScreenDialogProps) => {
    const {visible = false, onOk, onCancel} = props;
    const [form] = Form.useForm();
    return (
        <Modal 
            title={'新建大屏'} 
            open={visible} 
            onCancel={onCancel}
            okText='确定'
            cancelText='取消'
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onOk && onOk(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                style={{padding: 20}}
                initialValues={{}}
            >
                <Form.Item
                    label="名称"
                    name="name"
                    rules={[{ required: true, message: '请填写必填项' }]}
                >
                    <Input style={{ width: 300 }} />
                </Form.Item>
                <Form.Item
                    label="描述"
                    name="description"
                    >
                    <Input style={{ width: 300 }} />
                </Form.Item>
                <Form.Item
                    label="宽度"
                    name="width"
                    rules={[{ required: true, message: '宽度必填，最小值不能低于500!' }]}
                    >
                    <Input style={{ width: 300 }} min={500} max={10000} />
                </Form.Item>
                <Form.Item
                    label="高度"
                    name="height"
                    rules={[{ required: true, message: '高度必填，最小值不能低于300!' }]}
                    >
                    <Input style={{ width: 300 }} min={300} max={10000} />
                </Form.Item>
                <Form.Item
                    label="存储"
                    name="saveType"
                >
                    <Select style={{width: 310}} options={[{value: '1', label: '本地存储'}]} defaultValue={'1'}/>
                </Form.Item>
                <div className={'add-new-screen-explain'}>
                    <p>说明：</p>
                    <p>1、名称不超过20字，描述不超过60字</p>
                    <p>2、宽度必须&ge;500，高度必须&ge;300</p>
                </div>
            </Form>
        </Modal>
    );
}

export default AddNewScreenDialog;