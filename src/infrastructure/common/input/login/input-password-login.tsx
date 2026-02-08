import React, { useEffect, useState } from 'react'
import styles from '../../../../asset/css/admin/login.module.css';
import { validateFields } from '../../../helper/helper';
import { MessageError } from '../../controls/MessageError';
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

export const InputPasswordLogin = (props: Props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value || "");
        setData({
            [attribute]: e.target.value || ''
        });
    };
    const labelLower = label?.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
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
        <div>
            <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>
                    <svg className={styles.labelIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19.5 12C19.5 15.18 17.18 17.5 14 17.5C13.5 17.5 13 17.4 12.5 17.2M4.5 12C4.5 8.82 6.82 6.5 10 6.5C11.5 6.5 12.9 7.1 13.9 8.1"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Mật khẩu</span>
                </label>
                <div className={styles.inputWrapper}>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id={`${attribute}-input`}
                        value={value ? value : ""}
                        onChange={onChange}
                        onBlur={() => onBlur(false)}
                        className={styles.textInput}
                        placeholder="••••••••"
                        required
                    />
                    <div className={styles.inputBorder}></div>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={styles.passwordToggle}
                        aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                        {showPassword ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
                                <circle cx="12" cy="12" r="3" />
                                <path d="M18 6L6 18" />
                            </svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
        </div>

    )
}
