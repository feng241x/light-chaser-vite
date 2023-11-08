import React, {Component, lazy, Suspense} from 'react';
import 'antd/dist/antd.min.css';
import './App.less';
import {Route, Routes} from "react-router-dom";
import JsonSchemaDemo from "./test/JsonSchemaDemo";
import Loading from "./ui/loading/Loading";

const LightChaserList = lazy(() => import('./list/LightChaserList'));
const Designer = lazy(() => import('./designer/Designer'));
const DesignerView = lazy(() => import('./designer/view/DesignerView'));

class App extends Component {
    render() {
        return (
            <>
                <Suspense fallback={<Loading/>}>
                    <Routes>
                        <Route path={'/designer'} element={<Designer />}/>
                        <Route path={'/view'} element={<DesignerView />}/>
                        <Route path={'/test'} element={<JsonSchemaDemo />}/>
                        <Route path={'/'} element={<LightChaserList />}/>
                    </Routes>
                </Suspense>
            </>
        );
    }
}

export default App;
