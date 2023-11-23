import {Component} from 'react';
import {ColorPicker} from 'antd';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import ColorUtil from "../../utils/ColorUtil";

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

    onChangeComplete = (value: any, hex: string) => {
        const {onChange} = this.props;
        if (hex.indexOf('gradient') === -1 && hex.indexOf('rgba') !== -1)
            hex = ColorUtil.rgbaToHex(hex);
        onChange && onChange(hex);
        if (!this.control) {
            this.setState({value: hex});
        }
    };

    render() {
        const color = this.control ? this.props.value : this.state.value;
        const {disabled, tip, label, showText} = this.props;
        return (
            <UIContainer tip={tip} label={label} className={'lc-color-pick'}>
                <ColorPicker disabled={disabled} size='small' showText={showText} value={color} onChange={this.onChangeComplete} />
            </UIContainer>
        );
    }
}

export default MyColorPicker;