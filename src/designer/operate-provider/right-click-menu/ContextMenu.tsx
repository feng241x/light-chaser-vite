import {observer} from "mobx-react";
import './OperateMenu.less';
import {
    CopyOutlined,
    DeleteOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    MergeCellsOutlined,
    SplitCellsOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignTopOutlined
} from "@ant-design/icons";
import {doCopy, doDelete, doGrouping, doHide, doLock, doUnGrouping, doUnLock, toBottom, toTop} from "../hot-key/HotKeyImpl";
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { ContextMenuType } from './ContextMenu.type';

const items: MenuProps['items'] = [
    {
      label: '锁定',
      icon: <LockOutlined />,
      key: ContextMenuType.DO_LOCK,
    },
    {
      label: '解锁',
      icon: <LockOutlined />,
      key: ContextMenuType.DO_UNLOCK,
    },
    {
      label: '隐藏',
      icon: <EyeInvisibleOutlined />,
      key: ContextMenuType.DO_HIDE,
    },
    {
        label: '复制',
        icon: <CopyOutlined />,
        key: ContextMenuType.DO_COPY,
    },
    {
        label: '置顶',
        icon: <VerticalAlignTopOutlined />,
        key: ContextMenuType.TO_TOP,
    },
    {
        label: '置底',
        icon: <VerticalAlignBottomOutlined />,
        key: ContextMenuType.TO_BOTTOM,
    },
    {
        label: '删除',
        icon: <DeleteOutlined />,
        key: ContextMenuType.DO_DELETE,
    },
    {
        label: '编组',
        icon: <MergeCellsOutlined />,
        key: ContextMenuType.DO_GROUPING,
    },
    {
        label: '解除分组',
        icon: <SplitCellsOutlined />,
        key: ContextMenuType.DO_UNGROUPING,
    },
];

const ContextMenu : React.FC = (props: any) => {
    const onClick: MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case ContextMenuType.DO_LOCK:
                doLock()
                break;
            case ContextMenuType.DO_UNLOCK:
                doUnLock()
                break;
            case ContextMenuType.DO_HIDE:
                doHide();
                break;
            case ContextMenuType.TO_TOP:
                toTop();
                break;
            case ContextMenuType.TO_BOTTOM:
                toBottom();
                break;
            case ContextMenuType.DO_COPY:
                doCopy();
                break;
            case ContextMenuType.DO_DELETE:
                doDelete();
                break;
            case ContextMenuType.DO_GROUPING:
                doGrouping();
                break;
            case ContextMenuType.DO_UNGROUPING:
                doUnGrouping();
                break;
            default:
                break;
        }
    }
    return (
        <Dropdown menu={{ items, onClick: onClick }} trigger={['contextMenu']}>
            {props.children}
        </Dropdown>
    );
}

export default observer(ContextMenu);