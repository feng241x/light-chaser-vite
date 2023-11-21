import {Component} from 'react';
import DesignerLeft from "./left";
import Right from "./right";
import MyFooter from "./footer/Footer";
import contextMenuStore from "./operate-provider/right-click-menu/ContextMenuStore";
import eventOperateStore from "./operate-provider/EventOperateStore";
import designerStore from "./store/DesignerStore";
import DesignerHeader from "./header/DesignerHeader";
import DesignerCanvas from "./canvas/DesignerCanvas";
import {observer} from "mobx-react";
import Loading from "../ui/loading/Loading";
import DesignerLoaderFactory from "./loader/DesignerLoaderFactory";
import { Layout, MenuProps } from 'antd';
import mainStore from '../mainStore';
import { PieChartOutlined, DesktopOutlined, ContainerOutlined } from '@ant-design/icons';
import './Designer.less';
const { Header, Footer, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
    getItem('', '1', <PieChartOutlined />),
    getItem('', '2', <DesktopOutlined />),
    getItem('', '3', <ContainerOutlined />)
];

class Designer extends Component {

    componentDidMount() {
        //加载设计器
        DesignerLoaderFactory.getLoader().load();
        //绑定事件到dom元素
        bindEventToDom();
    }

    componentWillUnmount() {
        //卸载dom元素上的事件
        unbindEventToDom();
    }

    render() {
        const {loaded} = designerStore;
        const { leftSiderWidth } = mainStore;
        if (!loaded)
            return <Loading/>;
        return (
            <Layout>
                <Header style={{height: 50, borderBottom: '1px solid rgba(5, 5, 5, 0.06)'}}>
                    <DesignerHeader/>
                </Header>
                <Layout>
                    <Sider style={{borderRight: '2px solid rgba(5, 5, 5, 0.06)'}} theme='light' width={leftSiderWidth}>
                        <DesignerLeft/>
                    </Sider>
                    <Content>
                        <DesignerCanvas/>
                    </Content>
                    <Sider theme="light" width={300}>
                        <Right/>
                    </Sider>
                </Layout>
                <Footer>
                    <MyFooter />
                </Footer>
            </Layout>
        );
    }
}

export default observer(Designer);

/**
 * 绑定事件到dom元素
 */
function bindEventToDom() {
    document.addEventListener("click", clickHandler);
    document.addEventListener("contextmenu", contextMenuHandler);
    document.addEventListener("pointerdown", pointerDownHandler);
    document.addEventListener("pointerup", pointerUpHandler);
}

/**
 * 卸载dom元素上的事件
 */
function unbindEventToDom() {
    document.removeEventListener("click", clickHandler);
    document.removeEventListener("contextmenu", contextMenuHandler);
    document.removeEventListener("pointerdown", pointerDownHandler);
    document.removeEventListener("pointerup", pointerUpHandler);
}

/*****************事件处理*****************/
const clickHandler = (event: any) => {
    const {visible, updateVisible} = contextMenuStore;
    if (visible && event.button === 0) {
        //这里添加异步处理的原因：必须要在操作菜单执行点击事件执行之后才能卸载dom元素，不然操作菜单的点击事件会失效。
        setTimeout(() => {
            updateVisible(false);
        });
    }
}

const contextMenuHandler = (event: any) => {
    event.preventDefault();
    const {mouseDownTime, mouseUpTime, setPosition, updateVisible} = contextMenuStore;
    let targetArr = ['lc-comp-item', 'moveable-area'];
    if (targetArr.some((item: string) => event.target.classList.contains(item)) && mouseUpTime - mouseDownTime < 200) {
        updateVisible && updateVisible(true);
        setPosition([event.clientX, event.clientY]);
    } else {
        updateVisible && updateVisible(false);
    }
}

const pointerDownHandler = () => {
    const {setMouseDownTime} = contextMenuStore;
    setMouseDownTime(Date.now());
}

const pointerUpHandler = (event: any) => {
    const {setMouseUpTime} = contextMenuStore;
    setMouseUpTime(Date.now());
    const {setPointerTarget} = eventOperateStore;
    setPointerTarget(event.target);
}