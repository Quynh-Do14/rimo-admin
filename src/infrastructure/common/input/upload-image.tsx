import React, { useEffect, useRef, useState } from "react";
import styles from "../../..//asset/css/components/input.module.css";

type Props = {
    label: string
    dataAttribute: any
    attribute: string
    setData: Function;
};

const UploadAvatar = (props: Props) => {
    const { label, dataAttribute, attribute, setData } = props;
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
            setData({
                [attribute]: file || ''
            })
        }
    };

    useEffect(() => {
        if (previewUrl) {
            setPreviewUrl(previewUrl)
        } else if (dataAttribute) {
            setPreviewUrl(dataAttribute)
        }
    }, [previewUrl, dataAttribute])

    return (
        <div className={styles.inputCommon}>
            <div className={styles.avatarWrapper} onClick={() => fileInputRef.current?.click()}>
                <img src={previewUrl} alt="" width={200} height={200} className={styles.avatarImage} />
                <div className={styles.overlay}>Thay ảnh</div>
            </div>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                hidden
                onChange={handleFileChange}
            />
        </div>
    );
};
    
export default UploadAvatar;
