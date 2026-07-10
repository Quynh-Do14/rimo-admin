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
    const isUserEditingRef = useRef<boolean>(false);
    const prevDataAttributeRef = useRef<any>(dataAttribute);
    const isInitializedRef = useRef<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value || "";
        setValue(newValue);
        setData({
            [attribute]: newValue
        });
        isUserEditingRef.current = true;
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

    // Effect để khởi tạo giá trị ban đầu
    useEffect(() => {
        if (!isInitializedRef.current) {
            if (isUpdate && dataAttribute) {
                // Khi update, giữ nguyên giá trị dataAttribute (đã có dấu -)
                setValue(dataAttribute);
                setData({
                    [attribute]: dataAttribute
                });
            } else if (titleValue) {
                // Khi tạo mới, tạo slug từ title
                const slugValue = convertSlug(titleValue) || '';
                setValue(slugValue);
                setData({
                    [attribute]: slugValue
                });
            }
            isInitializedRef.current = true;
            prevTitleValueRef.current = titleValue;
            prevDataAttributeRef.current = dataAttribute;
        }
    }, []);

    // Effect để cập nhật slug khi titleValue thay đổi (chỉ khi user không đang chỉnh sửa)
    useEffect(() => {
        // Nếu user đang chỉnh sửa, không tự động cập nhật
        if (isUserEditingRef.current) {
            return;
        }

        // Chỉ cập nhật khi titleValue thay đổi và có giá trị
        if (titleValue && titleValue !== prevTitleValueRef.current) {
            const slugValue = convertSlug(titleValue) || '';
            setValue(slugValue);
            setData({
                [attribute]: slugValue
            });
        }
        prevTitleValueRef.current = titleValue;
    }, [titleValue]);

    // Effect để reset trạng thái user editing khi dataAttribute thay đổi từ bên ngoài
    useEffect(() => {
        if (!isInitializedRef.current) return;

        if (isUpdate && dataAttribute !== undefined && dataAttribute !== prevDataAttributeRef.current) {
            // Khi update, giữ nguyên giá trị dataAttribute
            setValue(dataAttribute);
            setData({
                [attribute]: dataAttribute
            });
            isUserEditingRef.current = false;
            prevDataAttributeRef.current = dataAttribute;
        } else if (!isUpdate && dataAttribute !== undefined && dataAttribute !== prevDataAttributeRef.current) {
            // Khi tạo mới và dataAttribute thay đổi (ví dụ reset form)
            setValue(dataAttribute || '');
            setData({
                [attribute]: dataAttribute || ''
            });
            isUserEditingRef.current = false;
            prevDataAttributeRef.current = dataAttribute;
        }
    }, [dataAttribute, isUpdate]);

    // Effect để xử lý khi submit
    useEffect(() => {
        if (submittedTime != null) {
            onBlur(true);
            // Khi submit, nếu slug rỗng thì tạo từ titleValue
            if (titleValue && !value) {
                const slugValue = convertSlug(titleValue) || '';
                setValue(slugValue);
                setData({
                    [attribute]: slugValue
                });
            }
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