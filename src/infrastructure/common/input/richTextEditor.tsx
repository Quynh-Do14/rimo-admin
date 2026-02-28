import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useState } from 'react';
import { validateFields } from '../../helper/helper';
import uploadService from '../../repository/upload/upload.service';

interface RichTextEditorProps {
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

const RichTextEditor = (props: RichTextEditorProps) => {
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
    const [isUploading, setIsUploading] = useState(false);

    // Xử lý upload ảnh
    const handleImageUpload = async (blobInfo: any): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            setIsUploading(true);

            const formData = new FormData();
            formData.append('image', blobInfo.blob(), blobInfo.filename());
            await uploadService.UploadSingle(
                formData,
                setIsUploading,
            ).then(result => {
                console.log('result', result);
                if (result.success) {
                    // Trả về URL của ảnh đã upload
                    setIsUploading(false);
                    resolve(result.data.path);
                } else {
                    setIsUploading(false);
                    reject('Upload thất bại');
                }
            })
                .catch(error => {
                    setIsUploading(false);
                    reject('Lỗi upload: ' + error.message);
                });
        });
    };

    // Xử lý upload ảnh bằng Base64 (không cần server)
    const handleImageUploadBase64 = (blobInfo: any): Promise<string> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blobInfo.blob());
            reader.onloadend = () => {
                resolve(reader.result as string);
            };
        });
    };

    const handleEditorChange = (value: string) => {
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

    return (
        <div style={{ position: 'relative' }}>
            {isUploading && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    zIndex: 1000
                }}>
                    Đang upload ảnh...
                </div>
            )}

            <Editor
                apiKey={process.env.REACT_APP_TINY_EDITOR_KEY}
                value={editorValue}
                onEditorChange={handleEditorChange}
                init={{
                    height: '80vh',
                    menubar: true,
                    placeholder: `Nhập nội dung ${labelLower}...`,
                    language: 'vi',

                    // QUAN TRỌNG: Cấu hình upload ảnh
                    automatic_uploads: true,
                    file_picker_types: 'file image media',

                    // Sử dụng Base64 (không cần server)
                    // images_upload_handler: handleImageUploadBase64,

                    // Hoặc dùng upload qua server (khuyên dùng)
                    images_upload_handler: handleImageUpload,

                    // Cho phép upload nhiều ảnh cùng lúc
                    images_upload_credentials: true,

                    // Kích thước tối đa của ảnh (10MB)
                    max_file_size: 104857600,

                    // Các định dạng ảnh cho phép
                    images_upload_url: '/api/upload-image', // URL upload ảnh

                    // Tùy chọn file picker
                    file_picker_callback: (callback: any, value: any, meta: any) => {
                        // Nếu là file ảnh
                        if (meta.filetype === 'image') {
                            const input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'image/*');

                            input.onchange = function () {
                                const file = input.files?.[0];
                                if (file) {
                                    // Kiểm tra kích thước file
                                    if (file.size > 104857600) {
                                        alert('File quá lớn. Vui lòng chọn file dưới 10MB');
                                        return;
                                    }

                                    const reader = new FileReader();
                                    reader.onload = function (e) {
                                        const result = e.target?.result;
                                        if (typeof result === 'string') {
                                            callback(result, { title: file.name });
                                        }
                                    };
                                    reader.readAsDataURL(file);
                                }
                            };

                            input.click();
                        }

                        // Nếu là media (video)
                        if (meta.filetype === 'media') {
                            const input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'video/*');

                            input.onchange = function () {
                                const file = input.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = function (e) {
                                        const result = e.target?.result;
                                        if (typeof result === 'string') {
                                            callback(result, { title: file.name });
                                        }
                                    };
                                    reader.readAsDataURL(file);
                                }
                            };

                            input.click();
                        }

                        // Nếu là file
                        if (meta.filetype === 'file') {
                            const input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', '.pdf,.doc,.docx,.xls,.xlsx');

                            input.onchange = function () {
                                const file = input.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = function (e) {
                                        const result = e.target?.result;
                                        if (typeof result === 'string') {
                                            callback(result, {
                                                title: file.name,
                                                text: file.name
                                            });
                                        }
                                    };
                                    reader.readAsDataURL(file);
                                }
                            };

                            input.click();
                        }
                    },

                    // Toolbar đầy đủ
                    toolbar: [
                        'undo redo | formatselect | fontselect fontsizeselect | forecolor backcolor',
                        'bold italic underline strikethrough | superscript subscript | alignleft aligncenter alignright alignjustify',
                        'bullist numlist outdent indent | blockquote | removeformat',
                        'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
                        'link image media | code | fullscreen preview print',
                        'hr | pagebreak | anchor | charmap | emoticons | insertdatetime'
                    ].join(' | '),

                    // Plugins
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'help', 'wordcount', 'pagebreak',
                        'emoticons', 'hr', 'directionality', 'print'
                    ],

                    // Cấu hình table
                    table_default_attributes: {
                        border: '1'
                    },
                    table_default_styles: {
                        'border-collapse': 'collapse',
                        'width': '100%'
                    },

                    // Cấu hình image
                    image_advtab: true,
                    image_caption: true,
                    image_title: true,

                    // Content CSS
                    content_style: `
            body { 
              font-family: Work Sans, sans-serif; 
              font-optical-sizing: auto;
              font-size: 14px; 
              margin: 15px;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            td, th {
              border: 1px solid #bcbcbc;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
            img {
              max-width: 100%;
              height: auto;
            }
          `,

                    branding: false,
                }}
            />
        </div>
    );
};

export default RichTextEditor;