import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { ContactInterface } from '../../infrastructure/interface/contact/contact.interface';
import Constants from '../../core/common/constants';
import '../../asset/css/admin/view.css';
import { StatusCommon } from '../../infrastructure/common/controls/Status';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import contactService from '../../infrastructure/repository/contact/contact.service';

type Props = {
    contact: ContactInterface | null,
    isOpen: boolean,
    onClose: Function,
    setLoading: Function,
    onSearch: Function,
}

const ContactDetailModal = (props: Props) => {
    const {
        contact,
        isOpen,
        onClose,
        setLoading,
        onSearch
    } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        setIsModalVisible(isOpen);
    }, [isOpen]);

    const handleClose = () => {
        setIsModalVisible(false);
        onClose();
    };

    if (!contact) return null;

    // Tìm thông tin trạng thái
    const statusResult = Constants.StatusConfig.List.find(item => item.value == contact.status)

    const updateStatus = async () => {
        if (contact) {
            try {
                await contactService.UpdateStatusAdmin(
                    contact.id ? contact.id : '',
                    {
                        status: !contact.status
                    },
                    () => {
                        onSearch();
                        onClose();
                    },
                    setLoading,
                )
            }
            catch (error) {
                console.error(error)
            }
        }

    }

    return (
        <Modal
            title={<div className="contact-modal-title">Chi tiết liên hệ</div>}
            open={isModalVisible}
            onCancel={handleClose}
            footer={[
                <ButtonCommon
                    key="close"
                    onClick={handleClose}
                    title={'Đóng'}
                    width={150}
                    variant={'ps-btn--gray'}
                />,
                <ButtonCommon
                    key="action"
                    onClick={updateStatus}
                    title={!contact.status ? "Chuyển thành đã xử lý" : "Chuyển thành chưa xử lý"}
                    width={300}
                    variant={!contact.status ? 'ps-btn--fullwidth' : 'ps-btn--reverse'}
                />
            ]}
            width={"70%"}
            className="contact-modal"
        >
            <div className="modal-content">
                <div className="contact-detail-section">
                    <div className="detail-row">
                        <div className="detail-label">
                            <span>Email</span>
                        </div>
                        <div className="detail-value">
                            <a href={`mailto:${contact.email}`} className="contact-link">
                                {contact.email}
                            </a>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">
                            <span>Số điện thoại</span>
                        </div>
                        <div className="detail-value">
                            <a href={`tel:${contact.phone_number}`} className="contact-link">
                                {contact.phone_number}
                            </a>
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">
                            <span>Ngày tạo</span>
                        </div>
                        <div className="detail-value">
                            {new Date(contact.created_at).toLocaleString('vi-VN')}
                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">
                            <span>Trạng thái</span>
                        </div>
                        <div className="detail-value">
                            {
                                statusResult
                                &&
                                <StatusCommon title={statusResult?.label} status={statusResult.value} />
                            }

                        </div>
                    </div>

                    <div className="detail-row">
                        <div className="detail-label">
                            <span>Nội dung</span>
                        </div>
                        <div className="detail-value">
                            {contact.message}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ContactDetailModal;