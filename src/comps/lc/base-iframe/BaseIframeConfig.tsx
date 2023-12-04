import React from 'react';
import {ConfigType} from "../../../designer/right/ConfigContent";
import {BaseIframeController} from "./BaseIframeController";
import {FieldChangeData, LCGUI} from "../../../json-schema/LCGUI";
import {Control} from "../../../json-schema/SchemaTypes";

export const BaseIframeStyleConfig: React.FC<ConfigType<BaseIframeController>> = ({controller}) => {

    const {src} = (controller as BaseIframeController).getConfig()?.style!;

    const onFieldChange = (fieldChangeData: FieldChangeData) => {
        const {dataFragment} = fieldChangeData;
        controller.update(dataFragment);
    }

    const schema: Control = {
        key: 'style',
        type: 'grid',
        children: [
            {
                key: 'src',
                type: 'input',
                label: '地址',
                value: src,
            },
        ]
    }


    return (
        <LCGUI schema={schema} onFieldChange={onFieldChange}/>
    )
}

