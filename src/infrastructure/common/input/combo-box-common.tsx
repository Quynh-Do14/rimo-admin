import React, { useEffect, useState } from 'react';
import { MessageError } from '../controls/MessageError';
import { validateFields } from '../../helper/helper';
import styles from "../../../asset/css/common/input.module.css"
import { Select } from 'antd';
type Props = {
    label: string;
    attribute: string;
    isRequired: boolean;
    setData: (value: Record<string, any>) => void;
    dataAttribute: any;
    disabled: boolean;
    validate: any;
    setValidate: Function;
    submittedTime: any;
    listDataOfItem: Array<any>;
    valueName?: string;
    labelName?: string;
};

const ComboBoxCommon = ({
    dataAttribute,
    setData,
    attribute,
    disabled,
    listDataOfItem,
    setValidate,
    validate,
    submittedTime,
    isRequired,
    label,
    valueName = 'id',
    labelName = 'name'
}: Props) => {
    const [value, setValue] = useState<string[]>([]);

    const labelLower = label.toLowerCase();

    const validateBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        }
    };

    const onChange = (value: string[]) => {
        const selectedValue = value;
        setValue(selectedValue);
        setData({ [attribute]: selectedValue });
    };

    useEffect(() => {
        if (dataAttribute !== undefined && dataAttribute !== null) {
            setValue(dataAttribute);
        } else {
            setValue([]);
        }
    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            validateBlur(true);
        }
    }, [submittedTime]);

    return (
        <div className={styles.inputCommon}>
            <label htmlFor={`${attribute}-input`}>
                <span>
                    {label} {isRequired && <span className="required">*</span>}
                </span>
            </label>

            {/* <Select
                id={`${attribute}-input`}
                value={value}
                onChange={onChange}
                onBlur={() => validateBlur(false)}
                disabled={disabled}
            >
                <option value="">-- Chọn {labelLower} --</option>
                {listDataOfItem?.map((item, index) => (
                    <option
                        key={index}
                        value={item[valueName]}
                        title={item[labelName]}
                    >
                        {item[labelName]}
                    </option>
                ))}
            </select> */}

            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={onChange}
            >
                {listDataOfItem?.map((item, index) => (
                    <Select.Option
                        key={index}
                        value={item[valueName]}
                        title={item[labelName]}
                    >
                        {item[labelName]}
                    </Select.Option>
                ))}
            </Select>

            <MessageError
                isError={validate[attribute]?.isError || false}
                message={validate[attribute]?.message || ''}
            />
        </div>
    );
};

export default ComboBoxCommon;
