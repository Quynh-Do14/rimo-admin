import React, { useEffect, useState, useRef } from 'react';
import { MessageError } from '../controls/MessageError';
import { convertSlug, validateFields } from '../../helper/helper';
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
    titleValue: string
    isUpdate?: boolean
}

const InputSlugCommon = (props: Props) => {
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
        titleValue,
        isUpdate = false
    } = props;
    const [value, setValue] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const prevTitleValueRef = useRef<string>(titleValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value || "";
        setValue(newValue);
        setData({
            [attribute]: newValue
        });
    };

    const labelLower = label?.toLowerCase();

    const onBlur = (isImplicitChange = false) => {
        setIsFocused(false);
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    useEffect(() => {
        if (isUpdate) {
            const slugValue = convertSlug(dataAttribute) || '';
            setValue(slugValue);
            setData({
                [attribute]: slugValue
            });
        }
        else if (titleValue) {
            const slugValue = convertSlug(titleValue) || '';
            setValue(slugValue);
            setData({
                [attribute]: slugValue
            });
        }
    }, []);

    useEffect(() => {
        if (!isFocused && titleValue && titleValue !== prevTitleValueRef.current) {
            const slugValue = convertSlug(titleValue) || '';
            setValue(slugValue);
            setData({
                [attribute]: slugValue
            });
        }
        prevTitleValueRef.current = titleValue;
    }, [titleValue, isFocused]);

    useEffect(() => {
        if (dataAttribute !== undefined && dataAttribute !== value) {
            setValue(dataAttribute || '');
        }
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
                    {label} {isRequired && <span className={styles.required}>*</span>}
                </span>
            </label>
            <input
                id={`${attribute}-input`}
                value={value || ""}
                onChange={onChange}
                onBlur={() => onBlur(false)}
                onFocus={handleFocus}
                disabled={disabled}
                placeholder={`Nhập ${labelLower}`}
                type="text"
            />
            <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
        </div>
    );
};

export default InputSlugCommon;