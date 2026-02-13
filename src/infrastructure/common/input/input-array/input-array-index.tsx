import React, { useEffect, useState } from 'react';
import { MessageError } from '../../controls/MessageError';
import { validateFields } from '../../../helper/helper';
import { validateCMND, validateEmail, validatePhoneNumber } from '../../../helper/validate';
import styles from "../../../../asset/css/common/input.module.css"

type Props = {
    label: string,
    attribute: string,
    isRequired: boolean,
    setData: Function,
    dataAttribute: any,
    disabled: boolean,
    validate: any;
    setValidate: Function,
    submittedTime: any,
    setValidateAllItems?: Function,
    index: number
    data: any[],
    idKey: string
}

const InputArrayIndex = (props: Props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        disabled = false,
        validate,
        setValidate,
        submittedTime,
        setValidateAllItems,
        index,
        data,
        idKey
    } = props;
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


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prev: any) => {
            prev[index] = {
                ...prev[index],
                id: idKey,
                [attribute]: e.target.value || '',
            }
            return prev;
        });
        setValue(e.target.value || "");
    };
    const labelLower = label?.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        }
    };

    useEffect(() => {
        if (dataAttribute) {
            setValue(dataAttribute)
        }
        else if (data[index]) {
            setValue(data[index][attribute]);
        }
    }, [index, data, attribute, dataAttribute]);

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
                type="text"
            />
            <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
        </div>
    );
};

export default InputArrayIndex
