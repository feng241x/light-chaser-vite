import {AppstoreFilled, DatabaseFilled, InteractionFilled, MediumCircleFilled, SkinFilled} from "@ant-design/icons";
import {MenuInfo} from "./MenuType";

export const getDefaultMenuList = (): Array<MenuInfo> => {
    return [
        {
            icon: AppstoreFilled,
            key: 'base',
            name: '基  础'
        },
        {
            icon: MediumCircleFilled,
            key: 'style',
            name: '样  式'
        },
        {
            icon: DatabaseFilled,
            key: 'data',
            name: '数  据',
        },
        {
            icon: InteractionFilled,
            key: 'mapping',
            name: '映  射',
        },
        {
            icon: SkinFilled,
            name: '主题',
            key: 'theme',
        }
        // {
        //     icon: VideoCameraFilled,
        //     key: 'events',
        //     name: '交  互',
        // },
    ]
    // return [
    //     {
    //         icon: MediumCircleFilled,
    //         name: '信息',
    //         key: 'info',
    //     },
    //     {
    //         icon: HighlightFilled,
    //         name: '样式',
    //         key: 'style',
    //     },
    //     {
    //         icon: DatabaseFilled,
    //         name: '数据',
    //         key: 'data',
    //     },
    //     {
    //         icon: InteractionFilled,
    //         name: '映射',
    //         key: 'mapping',
    //     },
    //     // {
    //     //     icon: VideoCameraFilled,
    //     //     name: '动画',
    //     //     key: 'animation',
    //     // },
    //     {
    //         icon: SkinFilled,
    //         name: '主题',
    //         key: 'theme',
    //     }
    // ];
}