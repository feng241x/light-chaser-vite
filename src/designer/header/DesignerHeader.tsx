import React, {ReactElement, Suspense} from 'react';
import './DesignerHeader.less';
import headerStore from "./HeaderStore";
import {observer} from "mobx-react";
import {BluePrintHdImpl} from "./items/blue-print/BluePrintHdImpl";
import Loading from "../../ui/loading/Loading";
import DesignerLoaderFactory from "../loader/DesignerLoaderFactory";
import { Button, Space, Switch, Tooltip, Typography } from 'antd';
import Icon from '@ant-design/icons';
import mainStore from '../../mainStore';

const { Text } = Typography;
const ProjectHdItemImpl = React.lazy(() => import('./items/project/ProjectHdItemImpl'));
const CanvasHdConfigImpl = React.lazy(() => import('./items/canvas/CanvasHdConfigImpl'));
const ThemeHdItemImpl = React.lazy(() => import('./items/theme/ThemeHdItemImpl'));
const LightIcon = () => (
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3273" width="16" height="16"><path d="M519.539208 791.717679c-155.639756 0-282.253432-126.608559-282.253432-282.233989 0-155.627477 126.613676-282.240129 282.253432-282.240129 155.639756 0 282.253432 126.613676 282.253432 282.240129C801.792641 665.10912 675.178965 791.717679 519.539208 791.717679zM519.539208 280.58135c-126.222773 0-228.915643 102.679567-228.915643 228.90234s102.69287 228.895177 228.915643 228.895177c126.223796 0 228.915643-102.672404 228.915643-228.895177S645.763005 280.58135 519.539208 280.58135z" fill="#ffffff" p-id="3274"></path><path d="M373.274984 424.943248c-2.317789 0-4.662183-0.598634-6.797823-1.861394-6.329149-3.76372-8.4126-11.94096-4.662183-18.283412 27.606755-46.515407 78.341253-75.410504 132.395356-75.410504 7.369851 0 13.33368 5.963829 13.33368 13.334703s-5.963829 13.334703-13.33368 13.334703c-44.691875 0-86.636173 23.896246-109.450784 62.362326C382.260635 422.61318 377.832789 424.943248 373.274984 424.943248z" fill="#ffffff" p-id="3275"></path><path d="M353.651041 491.721141c-7.370875 0-13.334703-5.963829-13.334703-13.334703 0-12.43624 1.458211-19.259646 4.050246-30.263258 1.680269-7.175423 8.972349-11.576663 16.031115-9.93528 7.175423 1.692548 11.615549 8.867972 9.93528 16.030092-2.317789 9.870812-3.347235 14.624069-3.347235 24.169469C366.985744 485.757313 361.021915 491.721141 353.651041 491.721141z" fill="#ffffff" p-id="3276"></path><path d="M530.268574 958.712041c-14.728446 0-26.669406-11.954263-26.669406-26.669406l0-80.008218c0-14.740726 11.94096-26.669406 26.669406-26.669406s26.669406 11.927657 26.669406 26.669406l0 80.008218C556.939003 946.758802 544.99702 958.712041 530.268574 958.712041z" fill="#ffffff" p-id="3277"></path><path d="M530.268574 198.632943c-14.728446 0-26.669406-11.94096-26.669406-26.669406L503.599168 91.956342c0-14.728446 11.94096-26.669406 26.669406-26.669406s26.669406 11.94096 26.669406 26.669406l0 80.007195C556.939003 186.691983 544.99702 198.632943 530.268574 198.632943z" fill="#ffffff" p-id="3278"></path><path d="M221.658867 833.153394c-6.823406 0-13.646811-2.604314-18.856463-7.812943-10.417257-10.41828-10.417257-27.294646 0-37.712927l56.568367-56.567343c10.417257-10.41828 27.294646-10.41828 37.711903 0 10.417257 10.417257 10.417257 27.293623 0 37.712927l-56.568367 56.567343C235.306702 830.54908 228.482273 833.153394 221.658867 833.153394z" fill="#ffffff" p-id="3279"></path><path d="M759.105423 295.712979c-6.823406 0-13.646811-2.604314-18.85544-7.812943-10.41828-10.41828-10.41828-27.294646 0-37.711903l56.567343-56.568367c10.41828-10.417257 27.294646-10.417257 37.712927 0 10.417257 10.41828 10.417257 27.294646 0 37.711903l-56.567343 56.568367C772.753257 293.108664 765.929852 295.712979 759.105423 295.712979z" fill="#ffffff" p-id="3280"></path><path d="M278.227234 295.712979c-6.823406 0-13.646811-2.604314-18.85544-7.812943l-56.568367-56.568367c-10.417257-10.417257-10.417257-27.293623 0-37.711903 10.41828-10.417257 27.294646-10.417257 37.711903 0l56.568367 56.568367c10.417257 10.417257 10.417257 27.293623 0 37.711903C291.874045 293.108664 285.05064 295.712979 278.227234 295.712979z" fill="#ffffff" p-id="3281"></path><path d="M815.674812 833.178977c-6.824429 0-13.647835-2.604314-18.856463-7.812943l-56.567343-56.593949c-10.41828-10.419304-10.41828-27.29567 0-37.712927 10.417257-10.41828 27.293623-10.41828 37.712927 0l56.567343 56.593949c10.417257 10.41828 10.417257 27.294646 0 37.712927C829.322647 830.574662 822.498218 833.178977 815.674812 833.178977z" fill="#ffffff" p-id="3282"></path><path d="M171.967118 545.332153l-80.008218 0c-14.728446 0-26.669406-11.94096-26.669406-26.669406s11.94096-26.669406 26.669406-26.669406l80.008218 0c14.728446 0 26.669406 11.94096 26.669406 26.669406S186.694541 545.332153 171.967118 545.332153z" fill="#ffffff" p-id="3283"></path><path d="M932.039054 545.332153l-80.008218 0c-14.728446 0-26.669406-11.94096-26.669406-26.669406s11.94096-26.669406 26.669406-26.669406l80.008218 0c14.728446 0 26.669406 11.94096 26.669406 26.669406S946.7675 545.332153 932.039054 545.332153z" fill="#ffffff" p-id="3284"></path></svg>
)
const DarkIcon = () => (
    <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3082" width="16" height="16"><path d="M557.250088 959.028243c-247.490697 0-448.826192-199.306278-448.826192-446.783673 0-244.284679 198.73118-446.636317 443.002556-446.636317 0.119727 0 0.226151 0 0.346901 0 10.354835 0 19.840884 3.807722 24.477484 13.094226 4.688789 9.379625 3.593851 19.61371-2.805906 27.92398-53.604872 69.477374-81.928964 152.101163-81.928964 239.895719 0 217.308281 176.792519 393.82553 394.1008 393.82553l5.051039-0.239454c9.927093-0.134053 20.175505 5.638417 24.864294 15.043624 4.704139 9.379625 3.621481 20.603247-2.804882 28.91454C826.947554 895.269104 697.373453 959.028243 557.250088 959.028243zM497.340627 120.789017c-188.636265 29.113061-334.191338 193.506179-334.191338 389.410987 0 217.294978 176.792519 394.1008 394.1008 394.1008 104.550171 0 202.412013-40.456411 275.696086-112.540146-222.772736-26.1598-396.157645-216.07929-396.157645-445.747063C436.787506 265.754666 457.578018 188.916651 497.340627 120.789017z" fill="#f4ea2a" p-id="3083"></path><path d="M577.719282 865.501126c-179.75806 0-332.640006-128.359436-363.490641-305.211307-1.296529-7.441483 3.687996-14.536065 11.129478-15.833617 7.54893-1.2689 14.537088 3.687996 15.832594 11.130502 28.55229 163.705456 170.09191 282.536888 336.52857 282.536888 7.563256 0 13.682627 6.119371 13.682627 13.681604C591.40191 859.381755 585.281515 865.501126 577.719282 865.501126z" fill="#f4ea2a" p-id="3084"></path><path d="M222.886835 530.788925c-7.255241 0-13.307074-6.734378-13.654998-14.055111-0.306992-6.333242-0.467651-13.267165-0.467651-19.694551 0-7.562233 6.118348-13.935384 13.681604-13.935384s13.681604 5.998621 13.681604 13.560854c0 5.998621 0.160659 12.920264 0.441045 18.839067 0.361227 7.54893-5.464455 15.285125-13.013385 15.285125C223.326856 530.788925 223.112985 530.788925 222.886835 530.788925z" fill="#f4ea2a" p-id="3085"></path><path d="M642.680806 310.140573c4.300956 12.746302-2.566452 26.587542-15.311731 30.890544-12.747325 4.288676-26.588565-2.565429-30.891568-15.325034-4.275373-12.746302 2.565429-26.575262 15.311731-30.877241C624.56317 290.525839 638.377804 297.394271 642.680806 310.140573z" fill="#f4ea2a" p-id="3086"></path><path d="M801.146934 193.09788c4.275373 12.746302-2.565429 26.588565-15.337313 30.890544-12.747325 4.275373-26.561959-2.565429-30.864962-15.325034-4.300956-12.746302 2.566452-26.574239 15.311731-30.877241C783.003715 173.48417 796.844955 180.351578 801.146934 193.09788z" fill="#f4ea2a" p-id="3087"></path><path d="M748.131487 411.503145c4.301979 12.759605-2.565429 26.588565-15.311731 30.890544-12.746302 4.288676-26.587542-2.565429-30.891568-15.311731-4.300956-12.746302 2.566452-26.587542 15.311731-30.890544C729.987245 391.889435 743.829508 398.756843 748.131487 411.503145z" fill="#f4ea2a" p-id="3088"></path></svg>
)
const buildHeaderList = (): Array<ReactElement> => {
    let items: Array<ReactElement> = [];
    const {headerItemInstances} = DesignerLoaderFactory.getLoader();
    for (let i = 0; i < headerItemInstances.length; i++) {
        const {icon: Icon, name, onClick} = headerItemInstances[i];
        items.push(
            <Tooltip title={name} key={i + ''}>
                <Button icon={<Icon />} type='text' onClick={onClick} />
            </Tooltip>
            // <Button
            //     size='middle'
            //     key={i + ''}
            //     type='primary'
            //     icon={<Icon/>}
            //     onClick={onClick}
            // >
            //     {name}
            // </Button>
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
                <Text>高层视图</Text>
            </div>
            <div className={'header-right'}>
                <Space.Compact block>
                    {items}
                </Space.Compact>
                <Switch
                    style={{width: 70,marginTop: 4, marginLeft: 10}}
                    checkedChildren={<Icon style={{margin: '2px 6px 0px 0px'}} component={DarkIcon} />}
                    unCheckedChildren={<Icon style={{margin: '2px 6px 0px 0px'}} component={LightIcon} />}
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

export default observer(Header);
