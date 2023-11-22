import {observer} from "mobx-react";
import designerStore from "../../../store/DesignerStore";
import headerStore from "../../HeaderStore";
import './CanvasHdConfigImpl.less';
import { ColorPicker, Form, InputNumber, Modal, Switch } from "antd";


const CanvasHdConfigImpl = () => {
    const {canvasVisible, setCanvasVisible} = headerStore;
    const {canvasConfig, updateCanvasConfig} = designerStore;
    const [form] = Form.useForm();
    const doSave = (values: any) => {
        updateCanvasConfig(values);
        setCanvasVisible(false);
    }
    const onClose = () => {
        setCanvasVisible(false);
    }
    return (
        <Modal 
            title={'画布设置'}
            open={canvasVisible}
            onCancel={onClose}
            okText={'确定'}
            cancelText={'取消'}
            onOk={() => {
                form
                  .validateFields()
                  .then((values) => {
                    form.resetFields();
                    if (typeof values.backgroundColor === 'object') {
                        values.backgroundColor = values.backgroundColor?.toHexString();
                    }
                    doSave(values);
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info);
                  });
            }}
        >
            <Form form={form} initialValues={canvasConfig} onFinish={doSave}>
                <Form.Item
                    label="宽度"
                    name="width"
                    rules={[{ required: true, message: '宽度必填，最小值不能低于500!' }]}
                    >
                    <InputNumber style={{ width: 280 }} min={500} max={3000} />
                </Form.Item>
                <Form.Item
                    label="高度"
                    name="height"
                    rules={[{ required: true, message: '高度必填，最小值不能低于300!' }]}
                    >
                    <InputNumber style={{ width: 280 }} min={300} max={10000} />
                </Form.Item>
                <Form.Item
                    label="栅格化"
                    name="rasterize"
                    >
                    <Switch defaultChecked={canvasConfig.rasterize} checkedChildren="开启" unCheckedChildren="关闭" />
                </Form.Item>
                <Form.Item
                    label="背景色"
                    name="backgroundColor"
                    >
                    <ColorPicker showText />
                </Form.Item>
                <Form.Item
                    label="拖拽步长"
                    name="dragStep"
                    >
                    <InputNumber style={{ width: 280 }} min={1} max={100}/>
                </Form.Item>
                <Form.Item
                    label="缩放步长"
                    name="resizeStep"
                    >
                    <InputNumber style={{ width: 280 }} min={1} max={100}/>
                </Form.Item>
                <p className={'canvas-config-desc'}>说明：修改画布设置，会对整体效果产生较大影响，建议先调试好画布设置后再进行大屏设计</p>
            </Form>
        </Modal>
    )
}

export default observer(CanvasHdConfigImpl);