import React from 'react';
import './Home.less';
import homeStore from "./HomeStore";
import {homePageMap} from "./index";
import {observer} from "mobx-react";
import Loading from "../../ui/loading/Loading";
import { Layout, Typography, theme } from 'antd';
import { HomeMenus } from './menus/HomeMenus';


const { Header, Content, Sider } = Layout;
const { Text } = Typography;


const Home: React.FC = observer(() => {
    const {currentMenu} = homeStore;
    const MyContent = homePageMap[currentMenu];
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center', zIndex: 3, boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)' }}>
                <Text style={{fontSize: 22, fontWeight: 700}}>数据可视化设计器</Text>
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <HomeMenus/>
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
                        <React.Suspense fallback={<Loading/>}>
                            {MyContent && <MyContent/>}
                        </React.Suspense>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
})

export default Home;


