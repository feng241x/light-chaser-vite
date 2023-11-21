import React, {ReactElement, Suspense} from 'react';
import './DesignerHeader.less';
import headerStore from "./HeaderStore";
import {observer} from "mobx-react";
import {BluePrintHdImpl} from "./items/blue-print/BluePrintHdImpl";
import Loading from "../../ui/loading/Loading";
import DesignerLoaderFactory from "../loader/DesignerLoaderFactory";
import { Button, Switch } from 'antd';
import { AlertFilled, GitlabFilled } from '@ant-design/icons';
import mainStore from '../../mainStore';

const ProjectHdItemImpl = React.lazy(() => import('./items/project/ProjectHdItemImpl'));
const CanvasHdConfigImpl = React.lazy(() => import('./items/canvas/CanvasHdConfigImpl'));
const ThemeHdItemImpl = React.lazy(() => import('./items/theme/ThemeHdItemImpl'));

const buildHeaderList = (): Array<ReactElement> => {
    let items: Array<ReactElement> = [];
    const {headerItemInstances} = DesignerLoaderFactory.getLoader();
    for (let i = 0; i < headerItemInstances.length; i++) {
        const {icon: Icon, name, onClick} = headerItemInstances[i];
        items.push(
            <Button
                key={i + ''}
                type="text"
                onClick={onClick}
            >
                <span className={'item-span'}><Icon/>&nbsp;{name}</span>
            </Button>
            // <div key={i + ''} className={'right-item'} onClick={onClick}>
            //     <span className={'item-span'}><Icon/>&nbsp;{name}</span>
            // </div>
        );
    }
    return items;
}

const Header = () => {
    const { themeVal, updateTheme } = mainStore;
    const {canvasVisible, projectVisible, themeVisible, bluePrintVisible} = headerStore;
    const items = buildHeaderList();
    const onChangeHandle = (val: boolean) => {
        updateTheme(val ? 'dark' : 'light')
    }
    return (
        <div className={'designer-header'}>
            <div className={'header-left'}>
                {/* <div className={'header-title'}>L C</div> */}
            </div>
            <div className={'header-right'}>
                {items}
                <Switch
                    style={{lineHeight: 30, marginTop: 6, marginLeft: 4}}
                    checkedChildren={<AlertFilled/>}
                    unCheckedChildren={<GitlabFilled />}
                    defaultChecked={themeVal === 'dark'}
                    onChange={onChangeHandle}
                />
            </div>
            {/*todo 想办法让这两个组件不要在这里写死*/}
            {canvasVisible && <Suspense fallback={<Loading/>}><CanvasHdConfigImpl/></Suspense>}
            {projectVisible && <Suspense fallback={<Loading/>}><ProjectHdItemImpl/></Suspense>}
            {themeVisible && <Suspense fallback={<Loading/>}><ThemeHdItemImpl/></Suspense>}
            {bluePrintVisible && <Suspense fallback={<Loading/>}><BluePrintHdImpl/></Suspense>}
        </div>
    )
}

// class Header extends Component<any> {
//     buildHeaderList = (): Array<ReactElement> => {
//         let items: Array<ReactElement> = [];
//         const {headerItemInstances} = DesignerLoaderFactory.getLoader();
//         for (let i = 0; i < headerItemInstances.length; i++) {
//             const {icon: Icon, name, onClick} = headerItemInstances[i];
//             items.push(
//                 <div key={i + ''} className={'right-item'} onClick={onClick}>
//                     <span className={'item-span'}><Icon/>&nbsp;{name}</span>
//                 </div>
//             );
//         }
//         return items;
//     }
//     render() {
//         const {canvasVisible, projectVisible, themeVisible, bluePrintVisible} = headerStore;
//         const items = this.buildHeaderList();
//         return (
//             <div className={'designer-header'}>
//                 <div className={'header-left'}>
//                     {/* <div className={'header-title'}>L C</div> */}
//                 </div>
//                 <div className={'header-right'}>
//                     {items}
//                     <Switch 
//                         checkedChildren={<AlertFilled/>}
//                         unCheckedChildren={<GitlabFilled />}
//                         defaultChecked
//                         onChange={this.onChangeHandle}
//                     />
//                 </div>
//                 {/*todo 想办法让这两个组件不要在这里写死*/}
//                 {canvasVisible && <Suspense fallback={<Loading/>}><CanvasHdConfigImpl/></Suspense>}
//                 {projectVisible && <Suspense fallback={<Loading/>}><ProjectHdItemImpl/></Suspense>}
//                 {themeVisible && <Suspense fallback={<Loading/>}><ThemeHdItemImpl/></Suspense>}
//                 {bluePrintVisible && <Suspense fallback={<Loading/>}><BluePrintHdImpl/></Suspense>}
//             </div>
//         );
//     }
// }

export default observer(Header);
