import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import "./Select.less";
import { Option } from './SelectType'
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";
import { Select } from "antd";

interface SelectProps extends UIContainerProps {
    // 选项列表（非受控）
    options: Option[];
    // 占位符（非受控）
    placeholder?: string;
    // 选中的值（受控）
    value?: string;
    // 默认选中的值（非受控）
    defaultValue?: string;
    // 选中值改变时的回调
    onChange?: (value: string) => void;
    disabled?: boolean;
}

const MySelect: React.FC<SelectProps> = (props) => {
    const {options, placeholder = "请选择", value, defaultValue, onChange, disabled = false, tip, label} = props;
    const dom: MutableRefObject<HTMLDivElement | null> = useRef(null);
    const handleOptionClick = (value: string, option: any): void => {
        onChange && onChange(option.value || '');
    };

    return (
        <UIContainer tip={tip} label={label}>
            <Select
                disabled={disabled}
                defaultValue={defaultValue}
                placeholder={placeholder}
                style={{width: dom?.current?.offsetWidth || 90}}
                onChange={handleOptionClick}
                options={options}
            />
            {/* <div className="lc-select" ref={dom}>
                <div className={`lc-select-header`} style={{cursor: `${disabled ? 'not-allowed' : 'pointer'}`}}
                     onClick={disabled ? undefined : toggleDropdown}>
                    {showContent}
                </div>
                <div style={{position: 'relative'}}>
                    {dropdownOpen && (
                        <ul className={"lc-select-options"} style={{width: dom?.current?.offsetWidth || 90}}>
                            {options.map((option: Option, index: number) => (
                                <li className={`lc-select-option`} key={index + ''}
                                    onClick={() => handleOptionClick(option)}>
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div> */}
        </UIContainer>
    );
};
export default MySelect;