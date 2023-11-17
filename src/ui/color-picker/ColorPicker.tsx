import {Component} from 'react';
import {ColorPicker} from 'antd';
import {colorConversion, rgbaToHex} from '../../utils/ColorUtil';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

interface ColorPickerProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    width?: number | string;
    height?: number | string;
    radius?: number;
    showBorder?: boolean;
    hideControls?: boolean;
    //是否显示色值文本（非受控）
    showText?: boolean;
    disabled?: boolean;
    onChange?: (color: string, id?: string) => void;
}

class MyColorPicker extends Component<ColorPickerProps> {

    control: boolean = true;

    state = {
        value: ''
    }

    constructor(props: ColorPickerProps) {
        super(props);
        const {value, defaultValue} = props;
        this.control = !defaultValue && !!value;
        this.state = {value: defaultValue || value || '#00e9ff'};
    }

    onChangeComplete = (value: Color, hex: string) => {
        const {onChange} = this.props;
        if (hex.indexOf('gradient') === -1 && hex.indexOf('rgba') !== -1)
            hex = rgbaToHex(hex);
        onChange && onChange(hex);
        if (!this.control) {
            this.setState({value: hex});
        }
    };

    render() {
        const color = this.control ? this.props.value : this.state.value;
        const {disabled, tip, label, showText, width, height, radius, showBorder, hideControls} = this.props;
        let hex = null;
        if (showText && color?.indexOf('gradient') === -1 && color?.indexOf('rgba') !== -1) {
            hex = colorConversion(color).hex;
        } else if (showText && color?.indexOf('#') !== -1) {
            hex = color;
        }
        return (
            <UIContainer tip={tip} label={label} className={'lc-color-pick'}>
                <ColorPicker size='small' showText={showText} value={color} onChange={this.onChangeComplete} />
                {/* <Popover content={(disabled ? null :
                    <div style={{padding: 4}}>
                        <GradientColorPicker value={color} onChange={this.onChangeComplete}
                                             hideControls={hideControls}/>
                    </div>)} trigger={'click'}>
                    <div className={`${showBorder && 'color-picker-border'}`} style={{..._style}}>
                        <div style={{background: `${color}`, ..._style}}
                             className={'color-area'}>
                            {showText ? <span>{hex}</span> : null}
                        </div>
                    </div>
                </Popover> */}
            </UIContainer>
        );
    }
}

export default MyColorPicker;