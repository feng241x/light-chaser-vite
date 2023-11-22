import {Component} from 'react';
import './DesignerView.less';
import designerStore from "../store/DesignerStore";
import {observer} from "mobx-react";
import Loading from "../../ui/loading/Loading";
import DesignerLoaderFactory from "../loader/DesignerLoaderFactory";
import layerBuilder from "../float-configs/layer-list/LayerBuilder";

class DesignerView extends Component {

    constructor(props: any) {
        super(props);
        DesignerLoaderFactory.getLoader().load();
    }

    render() {
        let {loaded, canvasConfig: {width, height, backgroundColor}, layoutConfigs} = designerStore!;
        if (!loaded)
            return <Loading/>;
        return (
            <div style={{width, height, background: backgroundColor, overflow: 'hidden', position: "relative"}}>
                {layerBuilder.buildCanvasComponents(layoutConfigs)}
            </div>
        );
    }
}

export default observer(DesignerView);