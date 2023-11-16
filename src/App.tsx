import React, {Component, lazy, Suspense} from 'react';
import './App.less';
import {Route, Routes} from "react-router-dom";
import JsonSchemaDemo from "./test/JsonSchemaDemo";
import Loading from "./ui/loading/Loading";
import { ConfigProvider, theme } from 'antd';
import mainStore from './mainStore';
import { observer } from "mobx-react";

const LightChaserList = lazy(() => import('./list/LightChaserList'));
const Designer = lazy(() => import('./designer/Designer'));
const DesignerView = lazy(() => import('./designer/view/DesignerView'));

const App = () => {
    const { themeVal } = mainStore;
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgContainer: themeVal === 'light' ? '#fff' : 'rgb(20, 20, 20)'
                },
                components: {
                    Layout: {
                        headerBg: themeVal === 'light' ? '#fff' : 'rgb(20, 20, 20)',
                        footerBg: themeVal === 'light' ? '#fff' : 'rgb(20, 20, 20)',
                        
                        // bodyBg: themeVal === 'light' ? '#fff' : 'rgb(20, 20, 20)'
                    }
                },
                algorithm: themeVal === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm
            }}
        >
            <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path={'/designer'} element={<Designer />}/>
                    <Route path={'/view'} element={<DesignerView />}/>
                    <Route path={'/test'} element={<JsonSchemaDemo />}/>
                    <Route path={'/'} element={<LightChaserList />}/>
                </Routes>
            </Suspense>
        </ConfigProvider>
    )
}

export default observer(App);
