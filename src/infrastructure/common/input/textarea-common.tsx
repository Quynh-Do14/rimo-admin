import React, { useEffect, useState } from 'react';
import { MessageError } from '../controls/MessageError';
import { validateFields } from '../../helper/helper';
import { validateCMND, validateEmail, validatePhoneNumber } from '../../helper/validate';
import styles from "../../../asset/css/common/input.module.css"

type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: (value: Record<string, any>) => void;
    dataAttribute: any,
    disabled: boolean,
    validate: any;
    setValidate: Function,
    submittedTime: any,
}

const TextAreaCommon = (props: Props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        disabled = false,
        validate,
        setValidate,
        submittedTime
    } = props;
    const [value, setValue] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value || "");
        setData({
            [attribute]: e.target.value || ''
        });
    };
    const labelLower = label?.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        let checkValidate
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
            // if (attribute.includes("username")) {
            //     checkValidate = validateName(value);
            //     validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập ${labelLower} với hơn 6 kí tự` : `Vui lòng nhập ${labelLower}` : "");
            // }
            if (attribute.includes("email")) {
                checkValidate = validateEmail(value);
                validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập đúng định dạng ${labelLower}` : `Vui lòng nhập ${labelLower}` : "");
            }
            if (attribute.includes("phone")) {
                checkValidate = validatePhoneNumber(value);
                validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập đúng định dạng ${labelLower}` : `Vui lòng nhập ${labelLower}` : "");
            }
            if (attribute.includes("cccd") || attribute.includes("long")) {
                checkValidate = validateCMND(value);
                validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `${label} bao gồm 12 số` : `Vui lòng nhập ${labelLower}` : "");
            }
        }
    };

    useEffect(() => {
        setValue(dataAttribute || '');

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
            <textarea
                id={`${attribute}-input`}
                value={value ? value : ""}
                onChange={onChange}
                onBlur={() => onBlur(false)}
                disabled={disabled}
                placeholder={`Nhập ${labelLower}`}
            />
            <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
        </div>
    );
};

export default TextAreaCommon;
