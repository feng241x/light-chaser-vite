import React, {Component} from 'react';
import BaseStyleSet from "../../../lib/common-fragment/base-style/BaseStyleSet";
import {ConfigType} from "../../../designer/right/ConfigType";

class AntdWordCloudConfig extends Component<ConfigType> {

    render() {
        const {updateConfig, config} = this.props;
        return (
            <>
                <BaseStyleSet config={config.baseStyle} updateConfig={updateConfig}/>
                {/*<AntdGraphics config={config.chartStyle} updateConfig={updateConfig}/>*/}
                {/*<AntdCartesianCoordinateSys config={config.chartStyle} updateConfig={updateConfig}/>*/}
            </>
        );
    }
}

export {AntdWordCloudConfig};