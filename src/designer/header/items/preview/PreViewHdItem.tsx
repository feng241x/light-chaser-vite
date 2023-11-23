import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {EyeOutlined} from "@ant-design/icons";
import designerStore from "../../../store/DesignerStore";

/**
 * header-预览
 */
export default class PreViewHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        return {
            icon: EyeOutlined,
            name: '预览',
            order: 4,
            onClick: () => window.open(`/view?id=${designerStore.id}&saveType=${designerStore.projectConfig.saveType}&action=view`)
        };
    }
}
