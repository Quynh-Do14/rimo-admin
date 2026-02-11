import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import Constants from '../../core/common/constants';
import '../../asset/css/admin/view.css';
import { StatusCommon } from '../../infrastructure/common/controls/Status';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import { DetailRowCommon, DetailRowComponent } from '../../infrastructure/common/text/detail-row';
import { convertDateShow } from '../../infrastructure/helper/helper';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import { ContactInterface } from '../../infrastructure/interface/contact/contact.interface';
import contactService from '../../infrastructure/repository/contact/contact.service';
import styles from '../../asset/css/admin/admin-component.module.css';

const ViewContactMangement = () => {
    const [detail, setDetail] = useState<ContactInterface | null>();
    const [loading, setLoading] = useState<boolean>(false);

    const router = useNavigate();
    const param = useParams();
    const onBack = () => {
        router(ROUTE_PATH.CONTACT_MANAGEMENT)
    }
    const onGetByIdAsync = async () => {
        if (param.id) {
            try {
                await contactService.GetContactById(
                    String(param.id),
                    setLoading
                ).then((res) => {
                    setDetail(res)
                })
            }
            catch (error) {
                console.error(error)
            }
        }

    }
    useEffect(() => {
        onGetByIdAsync().then(() => { })
    }, [param.id])



    const updateStatus = async () => {
        if (detail) {
            try {
                await contactService.UpdateStatusAdmin(
                    detail.id ? detail.id : '',
                    {
                        status: !detail.status
                    },
                    () => {
                        onGetByIdAsync().then(() => { })
                    },
                    setLoading,
                )
            }
            catch (error) {
                console.error(error)
            }
        }

    }
    if (!detail) return null;

    // Tìm thông tin trạng thái
    const statusResult = Constants.StatusConfig.List.find(item => item.value == detail.status)
    return (
        <AdminLayout
            breadcrumb={"Quản lý liên hệ"}
            title={"Chi tiết liên hệ"}
            redirect={ROUTE_PATH.PRODUCT_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Chi tiết liên hệ</h2>
                    <div className={styles.btn_container}>
                        <ButtonCommon
                            key="close"
                            onClick={onBack}
                            title={'Đóng'}
                            width={150}
                            variant={'ps-btn--gray'}
                        />,
                        <ButtonCommon
                            key="action"
                            onClick={updateStatus}
                            title={!detail.status ? "Chuyển thành đã xử lý" : "Chuyển thành chưa xử lý"}
                            width={300}
                            variant={!detail.status ? 'ps-btn--fullwidth' : 'ps-btn--reverse'}
                        />
                    </div>
                </div>
                <div className={styles.table_container}>

                    <DetailRowCommon
                        label={'Email'}
                        value={detail.email}
                    />
                    <DetailRowCommon
                        label={'Số điện thoại'}
                        value={detail.phone_number}
                    />
                    <DetailRowCommon
                        label={'Ngày tạo'}
                        value={convertDateShow(detail.created_at) || ""}
                    />
                    <DetailRowComponent
                        label={'Trạng thái'}
                        value={
                            statusResult
                            &&
                            <StatusCommon title={statusResult?.label} status={statusResult.value} />
                        } />
                    <DetailRowCommon
                        label={'Nội dung'}
                        value={detail.message}
                    />
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    );
};

export default ViewContactMangement;