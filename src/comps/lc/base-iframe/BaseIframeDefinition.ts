import {AbstractDefinition, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseIframeImg from './base-iframe.png';
import {BaseIframeController} from "./BaseIframeController";
import {BaseIframeComponentProps} from "./BaseIframeComponent";
import BaseInfo from "../../common-component/base-info/BaseInfo";
import {BaseIframeStyleConfig} from "./BaseIframeConfig";
import { CategoryEnum, ChartTypeCNEnum, ChartTypeEnum } from "../../../const/index.const";
import {AppstoreFilled, HighlightFilled} from "@ant-design/icons";

export default class BaseIframeDefinition extends AbstractDefinition<BaseIframeController, BaseIframeComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础iframe",
            compKey: "LcBaseIframe",
            category: CategoryEnum.BASE,
            type: ChartTypeCNEnum.base,
            typeKey: ChartTypeEnum.BASE,
        };
    }

    getChartImg(): string | null {
        return baseIframeImg;
    }

    getComponent(): ClazzTemplate<BaseIframeController> | null {
        return BaseIframeController;
    }

    getInitConfig(): BaseIframeComponentProps {
        return {
            base: {
                id: "",
                name: '基础iframe',
                type: 'LcBaseIframe',
            },
            style: {
                src: '',
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return [
            {
                icon: AppstoreFilled,
                name: '基础',
                key: 'base',
            },
            {
                icon: HighlightFilled,
                name: '样式',
                key: 'style',
            }
        ];
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            style: BaseIframeStyleConfig,
        };
    }
}