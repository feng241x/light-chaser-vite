import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {SkinOutlined} from "@ant-design/icons";
import headerStore from "../../HeaderStore";

/**
 * header-主题设置
 */
export default class ThemeHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        const {setThemeVisible} = headerStore;
        return {
            icon: SkinOutlined,
            name: '主题设置',
            order: 2,
            onClick: () => {
                setThemeVisible(true);
            }
        };
    }
}
