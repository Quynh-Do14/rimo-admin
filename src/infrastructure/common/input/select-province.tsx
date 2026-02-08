import React, { useEffect, useState } from 'react';
import { MessageError } from '../controls/MessageError';
import { validateFields } from '../../helper/helper';
import "../../../asset/css/common/input-custom.css"
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

const InputSelectProvince = ({
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
    const [value, setValue] = useState<string>("");

    const labelLower = label.toLowerCase();

    const validateBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        }
    };

    const onChange = (e: string) => {
        const selectedValue = e;
        setValue(selectedValue);
        setData({ [attribute]: selectedValue });
    };

    useEffect(() => {
        if (dataAttribute !== undefined && dataAttribute !== null) {
            setValue(String(dataAttribute));
        } else {
            setValue('');
        }
    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            validateBlur(true);
        }
    }, [submittedTime]);

    return (
        <div className='input-custom'>
            <label htmlFor={`${attribute}-input`}>
                <span>
                    {label} {isRequired && <span className="required">*</span>}
                </span>
            </label>

            <Select
                id={`${attribute}-input`}
                showSearch={true}
                value={value}
                onChange={onChange}
                onBlur={() => validateBlur(false)}
                disabled={disabled}
            >
                <Select.Option value="">-- Chọn {labelLower} --</Select.Option>
                {listDataOfItem?.map((item, index) => (
                    <Select.Option
                        key={index}
                        value={`${item[valueName]}-${item[labelName]}`}
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

export default InputSelectProvince;
