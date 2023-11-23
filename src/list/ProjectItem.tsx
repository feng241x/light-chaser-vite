import { useEffect, useState } from 'react';
import { SendOutlined, CloseOutlined, CopyOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Empty, Popconfirm, Tag } from 'antd';
import { ProjectState } from '../designer/DesignerType';
import URLUtil from '../utils/URLUtil';

const { Meta } = Card;

const ProjectItem: any = ({imageIdToUrl, item, setShowCloneDialog, confirmDel, setSelectId}: any) => {
    const [bgImgUrl, setBgImgUrl] = useState('');
    const [stateText, setStateText] = useState<string>();
    const [stateColor, setStateColor] = useState<string>();
    const operateHandler = (type: string) => {
        const { id, savetype, } = item;
        if (!type) return;
        switch (type) {
            case 'edit':
                let params = URLUtil.buildUrlParams({
                    id: id,
                    action: 'edit'
                });
                window.open(`/designer?${params}`, '_blank');
                break;
            case 'show':
                window.open(`/view?id=${id}&saveType=${savetype}&action=view`, '_blank');
                break;
            case 'del':
                setSelectId(item.id)
                break;
            case 'clone':
                setSelectId(item.id)
                setShowCloneDialog(true);
                break;
            default:
                break;

        }
    }
    useEffect(() => {
        setBgImgUrl(imageIdToUrl[item?.screenshot]);
        if (item.state === ProjectState.DRAFT) {
            setStateText('草稿');
            setStateColor('#FFB800');
        } else if (item.state === ProjectState.PUBLISH) {
            setStateText('已发布');
            setStateColor('#00CC66');
        }
    }, [imageIdToUrl, item])
    console.log(bgImgUrl)
    return (
        <Card
            style={{width: 300}}
            bodyStyle={{padding: 8, position: 'absolute', bottom: 50, width: '100%', color: '#fff'}}
            cover={
                bgImgUrl ?
                <img
                    style={{height: 150}}
                    alt="example"
                    src={bgImgUrl}
                /> : 
                <Empty 
                    style={{height: 150, padding: 0, margin: 0, backgroundColor: '#ccc'}} 
                    imageStyle={{width: 100, height: 100, margin: 'auto', paddingTop: 10}}  
                    description='缩略图未生成' 
                />
            }
            actions={[
                <EditOutlined onClick={() => operateHandler('edit')} key="edit" title='编辑' />,
                <SendOutlined onClick={() => operateHandler('show')} key="show" title='展示' />,
                <CopyOutlined onClick={() => operateHandler('clone')} key="clone" title='克隆' />,
                <Popconfirm
                    onConfirm={confirmDel}
                    title={'警告!'}
                    okType='danger'
                    okText='确定'
                    cancelText='取消'
                    description='确定要删除这个项目吗?'
                >
                    <CloseOutlined onClick={() => operateHandler('del')} key="del" title='删除' />
                </Popconfirm>
                ,
            ]}
        >
            
            <Meta
                style={{lineHeight: '12px', width: '100%', display:'block'}}
                title={<Tag color='rgb(22, 119, 255)'>{'项目名称：' + item?.name}</Tag>}
                description={
                (<>
                    <Tag bordered={false} color="processing">
                        {'项目描述：' + item?.des}
                    </Tag>
                    <Tag style={{float: 'right'}} color={stateColor}>
                        {stateText}
                    </Tag>
                </>)
                }
            />
        </Card>
    )
}

export default ProjectItem;