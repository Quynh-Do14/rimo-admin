import React, { useEffect, useState } from 'react';
import "../../../../asset/css/common/input-custom.css"
import { Select } from 'antd';
import { validateFields } from '../../../helper/helper';
import { MessageError } from '../../controls/MessageError';
type Props = {
    label: string;
    attribute: string;
    isRequired: boolean;
    setData: Function,
    dataAttribute: any;
    disabled: boolean;
    validate: any;
    setValidate: Function;
    submittedTime: any;
    listDataOfItem: Array<any>;
    valueName?: string;
    labelName?: string;
    setValidateAllItems?: Function,
    index: number
    data: any[],
    idKey: string
};

const SelectArrayIndex = (props: Props) => {
    const {
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
        labelName = 'name',
        setValidateAllItems,
        index,
        data,
        idKey
    } = props
    const [value, setValue] = useState<string>("");

    if (setValidateAllItems) {
        setValidateAllItems([index], () => {
            if (disabled) {
                return {
                    index: index,
                    check: true
                };
            }
            let check = true;
            if (!value) {
                check = false;
            }
            return {
                index: index,
                check: check
            };;
        });
    }

    const labelLower = label.toLowerCase();

    const validateBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        }
    };

    const onChange = (e: string) => {
        const selectedValue = e;
        setValue(selectedValue);
        setData((prev: any) => {
            prev[index] = {
                ...prev[index],
                id: idKey,
                [attribute]: selectedValue,
            }
            return prev;
        });
    };

    useEffect(() => {
        if (dataAttribute !== undefined && dataAttribute !== null) {
            setValue(String(dataAttribute));
        } else if (data[index]) {
            setValue(data[index][attribute]);
        }
    }, [index, data, attribute, dataAttribute]);

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
                style={{ width: '100%' }}
                onChange={onChange}
                onBlur={() => validateBlur(false)}
                disabled={disabled}

            >
                <Select.Option value="">-- Chọn {labelLower} --</Select.Option>
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

export default SelectArrayIndex;
