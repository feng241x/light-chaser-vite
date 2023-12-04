import {Component} from 'react';
import {ConfigType} from "../../../designer/right/ConfigContent";
import {Line, LineOptions} from "@antv/g2plot";
import AntdCommonLineController, {AntdLineProps} from "../../antd-common/line/AntdCommonLineController";
import {AntdCartesianCoordinateSys} from "../../antd-common/config/AntdFragment";
import AbstractController from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";
import AntdCommonUtil from "../../antd-common/AntdCommonUtil";
import {AntdLineCommonGraphics} from "../../antd-common/line/AntdLineCommonConfig";

class AntdBaseLineStyleConfig extends Component<ConfigType> {

    lineCoordinateSysChange = (config: LineOptions) => {
        const controller = this.props.controller as AntdCommonLineController;
        controller.update({style: config});
    }

    lineGraphicsChange = (config: LineOptions) => {
        const controller: AbstractController<Line, AntdLineProps> = this.props.controller as AntdCommonLineController;
        controller.update({style: config});
    }

    render() {
        const {controller} = this.props;
        const config: LineOptions = controller.getConfig().style;
        return (
            <>
                <AntdLineCommonGraphics onChange={this.lineGraphicsChange} config={config}/>
                <AntdCartesianCoordinateSys onChange={this.lineCoordinateSysChange} config={config}/>
            </>
        );
    }
}

export {AntdBaseLineStyleConfig};

export const AntdBaseLineFieldMapping: React.FC<ConfigType<AntdBaseDesignerController>> = ({controller}) => {
    const options = AntdCommonUtil.getDataFieldOptions(controller);
    const schema: Control = {
        type: 'grid',
        config: {
            columns: 2,
        },
        children: [
            {
                type: 'select',
                label: 'X字段',
                config: {
                    options,
                }
            },
            {
                type: 'select',
                label: 'Y字段',
                config: {
                    options,
                }
            },
        ]
    }

    const onFieldChange = (fieldChangeData: FieldChangeData) => {

    }

    return <LCGUI schema={schema} onFieldChange={onFieldChange}/>
}