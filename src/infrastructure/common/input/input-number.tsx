import React, { useEffect, useState } from 'react';
import { MessageError } from '../controls/MessageError';
import { validateFields } from '../../helper/helper';
import styles from "../../../asset/css/common/input.module.css"

type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute: any,
    disabled: boolean,
    validate: any,
    setValidate: Function,
    submittedTime: any,
    min?: number,
    max?: number,
}
const InputNumberCommon = (props: Props) => {
    const {
        label,
        attribute,
        setData,
        submittedTime,
        validate,
        setValidate,
        isRequired,
        dataAttribute,
        disabled = false,
        min,
        max,
    } = props;

    const [value, setValue] = useState<string>("");

    const formatNumber = (val: string | number): string => {
        const num = typeof val === "string" ? val.replace(/\D/g, "") : val.toString();
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const parseNumber = (val: string): number | null => {
        const parsed = val.replace(/,/g, '');
        return parsed ? parseInt(parsed) : null;
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        const numericValue = rawValue.replace(/[^0-9]/g, ''); // Only digits
        const formatted = formatNumber(numericValue);
        setValue(formatted);
        setData({
            [attribute]: parseNumber(formatted)
        });
    };
    const labelLower = label?.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        const parsedValue = parseNumber(value);
        let errorMessage = "";

        if (isRequired && (parsedValue === null || parsedValue === undefined)) {
            errorMessage = `Vui lòng nhập ${label.toLowerCase()}`;
        } else {
            if (min !== undefined && parsedValue !== null && parsedValue < min) {
                errorMessage = `${label} không được nhỏ hơn ${min}`;
            }
            if (max !== undefined && parsedValue !== null && parsedValue > max) {
                errorMessage = `${label} không được lớn hơn ${max}`;
            }
        }

        const isError = !!errorMessage;
        validateFields(isImplicitChange, attribute, isError, setValidate, validate, errorMessage);
    };


    useEffect(() => {
        const formatted = formatNumber(dataAttribute || '');
        setValue(formatted);
    }, [dataAttribute]);

    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);

    return (
        <div className={styles.inputCommon}>
            <label htmlFor={`${attribute}-input`}>
                <span>
                    {label} {isRequired && <span className="required">*</span>}
                </span>
            </label>
            <input
                id={`${attribute}-input`}
                value={value ? value : ""}
                onChange={onChange}
                onBlur={() => onBlur(false)}
                disabled={disabled}
                placeholder={`Nhập ${labelLower}`}
                type='text'
                inputMode='numeric'
            />
            <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
        </div>
    );
};

export default InputNumberCommon;
