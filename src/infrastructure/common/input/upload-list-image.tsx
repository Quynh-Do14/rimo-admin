import { Col, Row, Tooltip, Upload, UploadProps } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from "../../..//asset/css/components/input.module.css";
import type { RcFile } from 'antd/es/upload/interface';

type Props = {
    label: string;
    attribute: string;
    isRequired: boolean;
    setData: Function;
    dataAttribute: Array<string>;
    dataAttributeImageFiles?: Array<any>;
    disabled: boolean;
    validate: any;
    setValidate: Function;
    submittedTime: any;
    isUpdate?: boolean
};

// Helper to convert images to Base64 using Promises
const getBase64 = (img: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(img);
    });

function UploadListImage(props: Props) {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        dataAttributeImageFiles,
        disabled = false,
        validate,
        setValidate,
        submittedTime,
        isUpdate = false,
    } = props;

    const inputRef = useRef<HTMLDivElement>(null);
    const [listImg, setListImg] = useState<Array<any>>([]);
    const [hasUpdated, setHasUpdated] = useState<boolean>(false);

    const handleChange: UploadProps['onChange'] = async (info) => {
        const files = info.fileList.map((file) => file.originFileObj as RcFile);
        const updateArray: any[] = [];

        try {
            const base64List: any[] = await Promise.all(files.map((file) => getBase64(file)));

            if (isUpdate) {
                const concatArray: any[] = base64List.concat(listImg);
                const uniqueArray = Array.from(new Set(concatArray));
                setListImg(uniqueArray);
                setData({ [attribute]: info.fileList });
            }
            else {
                setListImg(base64List);
                setData({ [attribute]: info.fileList });
            }
        } catch (error) {
            console.error(error);
        }

    };

    useEffect(() => {
        if (isUpdate && !hasUpdated && dataAttribute) {
            setHasUpdated(true);
            setListImg(dataAttribute);
        }
    }, [isUpdate, dataAttribute, hasUpdated]);

    const onDeleteImage = (index: number) => {
        setListImg((prev) => prev.filter((_item, indexF) => indexF !== index));
        const filterArrayImageFileCodes = dataAttribute?.filter((_item, indexF) => indexF !== index);
        const filterArrayImageFiles = dataAttributeImageFiles?.filter((_item, indexF) => indexF !== index);
        setData({ [attribute]: filterArrayImageFiles });

        if (isUpdate) {
            setData({ ["imagesCode"]: filterArrayImageFileCodes });
        }
    }

    return (
        <div className={styles.upload_common}>
            <label htmlFor={`${attribute}-input`}>
                <span>
                    {label} {isRequired && <span className="required">*</span>}
                </span>
            </label>
            <Row gutter={[10, 10]}>
                <Col span={24} className="p-1">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className={styles.card}
                        showUploadList={false}
                        beforeUpload={() => false} // Prevent upload to server
                        onChange={handleChange}
                        multiple
                        id="upload"
                        accept="image/png, image/jpeg"
                    >
                        <div className={styles.upload_btn} ref={inputRef}>
                            <i className="fa fa-upload" aria-hidden="true"></i>
                            <p>
                                Chọn hình ảnh từ thiết bị
                            </p>
                        </div>
                    </Upload>
                </Col>

                {listImg && listImg?.map((it, index) => (
                    <Col xs={12} sm={12} lg={12} xl={8} xxl={6} key={index}>
                        <div className={styles.main_image}>
                            <Tooltip title={"Xóa ảnh"}>
                                <div
                                    onClick={() => onDeleteImage(index)}
                                    className={styles.close_btn}>
                                    <i className="fa fa-times-circle" aria-hidden="true"></i>
                                </div>
                            </Tooltip>

                            <img
                                src={it}
                                security=''
                                alt={`Image`}
                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </div >
    );
}

export default UploadListImage;
