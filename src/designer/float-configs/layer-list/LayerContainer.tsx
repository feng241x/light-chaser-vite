import React, {Component} from 'react';
import LayerComponent from "./LayerComponent";
import layerListStore from "./LayerListStore";
import {LayerItemDataProps} from "./LayerItem";
import { Card, List } from 'antd';

export interface LayerContainerProps {
    item: LayerItemDataProps;
}

class LayerContainer extends Component<LayerContainerProps> {

    layerContainerRef: HTMLDivElement | null = null;

    componentDidMount() {
        const {layerInstanceMap} = layerListStore;
        const {item} = this.props as LayerContainerProps;
        new LayerComponent().create(this.layerContainerRef!, item).then(r => {
            layerInstanceMap[item.compId!] = r;
        });
    }

    render() {
        const {item} = this.props as LayerContainerProps;
        return (
            <Card 
                id={item.compId + ''}
                size='small'
                className={'layer-item-container'} 
                ref={ref => this.layerContainerRef = ref}
            >
            </Card>
            // <List
            //     id={item.compId + ''}
            //     className={'layer-item-container'}
            //     grid={{ gutter: 16, column: 4 }}
            //     // dataSource={data}
            //     ref={ref => this.layerContainerRef = ref}
            //     // renderItem={(item) => (
            //     //     <List.Item>
            //     //         <Card title={item.title}>Card content</Card>
            //     //     </List.Item>
            //     // )}
            // />
            // <div id={item.compId + ''} className={'layer-item-container'}
            //      ref={ref => this.layerContainerRef = ref}/>
        );
    }
}

export default LayerContainer;