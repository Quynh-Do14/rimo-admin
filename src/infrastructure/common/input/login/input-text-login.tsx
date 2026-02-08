import React, { useEffect, useState } from 'react'
import { validateFields } from '../../../helper/helper';
import { validateEmail } from '../../../helper/validate';
import styles from '../../../../asset/css/admin/login.module.css';
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
const InputTextLogin = (props: Props) => {
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
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M22 6L12 13L2 6"
                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Email</span>
                </label>
                <div className={styles.inputWrapper}>
                    <input
                        type="email"
                        name="email"
                        id={`${attribute}-input`}
                        value={value ? value : ""}
                        onChange={onChange}
                        onBlur={() => onBlur(false)}
                        className={styles.textInput}
                        placeholder="your@email.com"
                        required
                    />
                    <div className={styles.inputBorder}></div>
                </div>
            </div>
            <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
        </div>
    )
}

export default InputTextLogin