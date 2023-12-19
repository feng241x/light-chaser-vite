import {AbstractHeaderItem, HeaderItemProps} from "../../HeaderTypes";
import {EyeOutlined} from "@ant-design/icons";
import URLUtil, {DesignerMode} from "../../../../utils/URLUtil";
/**
 * header-预览
 */
export default class PreViewHdItem extends AbstractHeaderItem {
    getHeaderItemInfo(): HeaderItemProps {
        return {
            icon: EyeOutlined,
            name: '预览',
            order: 4,
            onClick: () => {
                const {saveType, id} = URLUtil.parseUrlParams();
                window.open(`/view?id=${id}&saveType=${saveType}&mode=${DesignerMode.VIEW}`, '_blank');
            }
        };
    }
}
