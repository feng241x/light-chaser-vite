import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Collapse, List } from "antd"
import EventConfigAddFormPop from "./EventConfigAddFormPop"
import { useState } from "react";



export const EventConfig: React.FC<any> = ({ config, onChange}) => {
    const [openDrawer, setOpenDrawer] = useState(false);

    const showDrawer = () => {
        setOpenDrawer(true)
    }

    const onOpenChange = (open: boolean) => {
        setOpenDrawer(open)
    }

    const items = [
        {
            key: '1',
            label: '事件',
            children: (
                <>
                    <Button size='middle' onClick={showDrawer} icon={<PlusOutlined />}>新建</Button>
                    <List
                        style={{marginTop: 10}}
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        bordered
                        dataSource={[
                            {
                                name: '123'
                            },
                            {
                                name: '456'
                            }
                        ]}
                        renderItem={(item) => (
                            <List.Item
                                actions={[<a key="list-edit">编辑</a>, <a key="list-remove">删除</a>]}
                            >
                                {item.name}
                            </List.Item>
                        )}
                        />
                </>
            )
        }
    ]
    return (
        <>
            <Collapse
                accordion={true}
                bordered={false}
                size='small'
                defaultActiveKey='1'
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                items={items}
            />
            <EventConfigAddFormPop open={openDrawer} onOpenChange={onOpenChange} />
        </>
    )
}