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
};

const InputMultiCommon = ({
    dataAttribute,
    setData,
    attribute,
    disabled,
    setValidate,
    validate,
    submittedTime,
    isRequired,
    label,
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
        console.log('selectedValue', selectedValue);

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
        <div className='input-custom'>
            <label htmlFor={`${attribute}-input`}>
                <span>
                    {label} {isRequired && <span className="required">*</span>}
                </span>
            </label>

            <Select
                mode="tags"
                allowClear
                showSearch={true}
                style={{ width: '100%' }}
                placeholder={`Chọn ${labelLower}`}
                onChange={onChange}
                onBlur={() => validateBlur(false)}
                value={value}
            />

            <MessageError
                isError={validate[attribute]?.isError || false}
                message={validate[attribute]?.message || ''}
            />
        </div>
    );
};

export default InputMultiCommon;
