import React, { useEffect, useState, Suspense, lazy } from 'react';
import 'react-quill/dist/quill.snow.css';
import { MessageError } from '../controls/MessageError';
import { validateFields } from '../../helper/helper';
import styles from "../../../asset/css/common/input.module.css"

// Sử dụng lazy loading cho ReactQuill
const ReactQuill = lazy(() => import('react-quill'));

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
}

// Định nghĩa modules toolbar bên ngoài để tránh re-render không cần thiết
const modules = {
    toolbar: {
        container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }], // Chú ý: size có thể không hoạt động với tất cả font
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean']
        ],
        handlers: {
            // Có thể thêm custom handlers ở đây nếu cần
        }
    },
    clipboard: {
        matchVisual: false,
    }
};

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'script',
    'indent',
    'direction',
    'color',
    'background',
    'align',
    'link',
    'image',
    'video'
];

const TextEditorCommon = (props: Props) => {
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
    } = props;

    const [editorValue, setEditorValue] = useState<string>('');
    const [isMounted, setIsMounted] = useState<boolean>(false);

    // Đảm bảo component đã mount trước khi sử dụng
    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    const onChange = (value: string) => {
        setEditorValue(value);
        setData({
            [attribute]: value || ''
        });
    };

    useEffect(() => {
        if (dataAttribute !== undefined && dataAttribute !== null) {
            setEditorValue(dataAttribute);
        }
    }, [dataAttribute]);

    const labelLower = label?.toLowerCase();

    // Validation effect
    useEffect(() => {
        if (submittedTime != null) {
            // Chỉ validate nếu editorValue là empty string hoặc null/undefined
            const isEmpty = !editorValue || editorValue === '<p><br></p>' || editorValue === '<p></p>';
            validateFields(
                true,
                attribute,
                isRequired && isEmpty,
                setValidate,
                validate,
                isRequired && isEmpty ? `Vui lòng nhập ${labelLower}` : ""
            );
        }
    }, [submittedTime, editorValue]);

    // Fallback component khi đang loading
    const EditorFallback = () => (
        <div
            className="quill-editor-fallback"
            style={{
                height: 700,
                marginBottom: 80,
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px',
                backgroundColor: '#f9f9f9'
            }}
        >
            Đang tải trình soạn thảo...
        </div>
    );

    return (
        <div className={styles.inputCommon}>
            <label htmlFor={`${attribute}-input`}>
                <span>
                    {label} {isRequired && <span className="required">*</span>}
                </span>
            </label>

            <MessageError
                isError={validate[attribute]?.isError || false}
                message={validate[attribute]?.message || ""}
            />

            {isMounted ? (
                <Suspense fallback={<EditorFallback />}>
                    <div className="quill-editor-wrapper" style={{ position: 'relative' }}>
                        <ReactQuill
                            theme="snow"
                            value={editorValue}
                            onChange={onChange}
                            modules={modules}
                            formats={formats}
                            style={{
                                height: "80vh", // Giảm chiều cao để dễ sử dụng
                                marginBottom: 100,
                                fontFamily: 'Arial, sans-serif'
                            }}
                            readOnly={disabled}
                            placeholder={`Nhập nội dung ${labelLower}...`}
                        />
                    </div>
                </Suspense>
            ) : (
                <EditorFallback />
            )}
        </div>
    );
};

export default TextEditorCommon;