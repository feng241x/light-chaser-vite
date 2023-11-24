import {Component} from 'react';
import './ThemeItem.less';
import {ThemeColors, ThemeItemType} from "../../../../designer/DesignerType";
import { Card, ColorPicker, Flex } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface ThemeItemProps extends ThemeColors {
    //用于标识。 该主题是否被选中被选中的主题边框颜色与其他主题不同。
    selected?: boolean;
    name?: string;
    colors: ThemeColors;
    id?: string;
    itemStyle?: React.CSSProperties;
    showOperator?: boolean;
    onDel?: (id: string) => void;
    onSelected?: (data: ThemeItemType) => void;
}

class ThemeItem extends Component<ThemeItemProps> {

    onSelected = () => {
        const {onSelected, id = '', name = '', colors} = this.props;
        onSelected && onSelected({id, name, colors});
    }

    render() {
        const {colors, selected = false, name, id, showOperator = false, onDel} = this.props;
        return (
            <Card
                className={`themeItem ${selected ? 'selected' : ''}`}
                type='inner'
                size='small'
                title={name} 
                bordered={false} 
                onClick={this.onSelected}
                extra={showOperator && <CloseOutlined title='删除' onClick={(event) => {
                    event.stopPropagation();
                    onDel && onDel(id || '')
                }} />}
            >
                <Flex style={{width: '100%', height: 40}} justify='space-around' align='center'>
                    {
                        Object.keys(this.props.colors).map((key, index) => {
                            return <ColorPicker style={{marginRight: 4}} disabled={true} key={index} value={(colors as any)[key]}/>
                        })
                    }
                </Flex>
            </Card>
            // <div id={id} className={`lc-theme-item ${selected ? 'lc-theme-item-active' : ''}`} style={itemStyle}
            //      onClick={this.onSelected}>
            //     <div className={'lc-theme-item-header'}>
            //         <div className={'lc-theme-item-title'}><Text>{name}</Text></div>
            //         {showOperator && <div className={'lc-theme-item-operators'}>
            //             <div className={'operator-item'} onClick={(event) => {
            //                 event.stopPropagation();
            //                 onDel && onDel(id || '')
            //             }}>
            //                 <img src={closeIcon} alt={'删除'}/>
            //             </div>
            //         </div>}
            //     </div>
            //     <div className={'lc-theme-item-body'}>
            //         {
            //             Object.keys(this.props.colors).map((key, index) => {
            //                 return <ColorPicker disabled={true} key={index} value={(colors as any)[key]}/>
            //             })
            //         }
            //     </div>
            // </div>
        );
    }
}

export default ThemeItem;