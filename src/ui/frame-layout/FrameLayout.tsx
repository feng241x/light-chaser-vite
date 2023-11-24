import {ReactNode} from "react";
import './FrameLayout.less';
import { Layout } from "antd";
const { Header, Sider, Content, Footer } = Layout;
export interface FrameLayoutProps {
    header?: ReactNode;
    footer?: ReactNode;
    left?: ReactNode;
    right?: ReactNode;
    content?: ReactNode;
}

export const FrameLayout: React.FC<FrameLayoutProps> = (props) => {
    const {header, footer, left, right, content} = props;
    return (
        <Layout style={{overflow: 'hidden'}}>
            <Header style={{height: 64, borderBottom: '1px solid rgba(5, 5, 5, 0.06)'}}>{header}</Header>
            <Layout>
                <Sider theme='light' width={300} style={{overflow: 'hidden'}}>{left}</Sider>
                <Content>{content}</Content>
                <Sider theme='light' width={300} >{right}</Sider>
            </Layout>
            <Footer>{footer}</Footer>
        </Layout>
    )
}
