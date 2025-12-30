import { Modal } from 'antd';
import ButtonCommon from '../button/ButtonCommon';
import styles from '../../../asset/css/components/modal.module.css'
type Props = {
    title: string,
    message: string,
    titleCancel: string,
    titleOk: string,
    handleOk: Function,
    handleCancel: Function,
    visible: boolean,
    isLoading?: boolean,
}

const DialogConfirmCommon = ({
    title,
    message,
    titleCancel,
    titleOk,
    handleOk,
    handleCancel,
    visible,
    isLoading = false,
}: Props) => {
    return (
        <div>
            <Modal
                key="f-0"
                centered
                open={visible}
                closable={true}
                footer={false}
                onCancel={() => handleCancel()}
                closeIcon={<i className="fa fa-times" aria-hidden="true"></i>}
            >
                <div className={styles.modalCommon}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.message}>{message}</div>
                    <div className={styles.buttonGroup}>
                        <ButtonCommon
                            onClick={() => handleCancel()}
                            title={titleCancel}
                            width={150}
                            variant="ps-btn--gray"
                        />

                        <ButtonCommon
                            disabled={isLoading}
                            onClick={() => handleOk()}
                            title={titleOk}
                            width={150}
                            variant="ps-btn--fullwidth"
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DialogConfirmCommon;
