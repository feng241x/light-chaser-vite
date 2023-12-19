import {HeaderItemProps} from "../../HeaderTypes";
import {SettingOutlined} from "@ant-design/icons";
import headerStore from "../../HeaderStore";

/**
 * header-项目设置
 */
export default class ProjectHdItem /*extends AbstractHeaderItem*/ {
    getHeaderItemInfo(): HeaderItemProps {
        const {setProjectVisible} = headerStore;
        return {
            icon: SettingOutlined,
            name: '项目设置',
            order: 0,
            onClick: () => {
                setProjectVisible(true);
            }
        };
    }
}
