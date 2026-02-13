import React, { useState, useEffect } from 'react';
import { Image, Modal } from 'antd';
import Constants from '../../core/common/constants';
import '../../asset/css/admin/view.css';
import { StatusCommon } from '../../infrastructure/common/controls/Status';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import { DetailRowCommon, DetailRowComponent } from '../../infrastructure/common/text/detail-row';
import { configImageURL, convertDateShow } from '../../infrastructure/helper/helper';
import { BlogInterface } from '../../infrastructure/interface/blog/blog.interface';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import { ROUTE_PATH } from '../../core/common/appRouter';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import styles from '../../asset/css/admin/admin-component.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import blogService from '../../infrastructure/repository/blog/blog.service';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import { SloganInterface } from '../../infrastructure/interface/slogan/slogan.interface';
import sloganService from '../../infrastructure/repository/slogan/slogan.service';

const ViewSloganManagement = () => {
    const [detail, setDetail] = useState<SloganInterface>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useNavigate();
    const param = useParams();
    const onBack = () => {
        router(ROUTE_PATH.SLOGAN_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (param.id) {
            try {
                await sloganService.GetSloganById(
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
    if (!detail) return null;

    // Tìm thông tin trạng thái
    const statusResult = Constants.DisplayConfig.List.find(item => item.value == detail.active)

    return (
        <AdminLayout
            breadcrumb={"Quản lý hình ảnh trong trang chủ"}
            title={"Chi tiết hình ảnh trong trang chủ"}
            redirect={ROUTE_PATH.SLOGAN_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Chi tiết hình ảnh trong trang chủ</h2>
                    <div className={styles.btn_container}>
                        <ButtonCommon
                            key="close"
                            onClick={onBack}
                            title={'Đóng'}
                            width={150}
                            variant={'ps-btn--gray'}
                        />,
                        <ButtonHref
                            href={`${(ROUTE_PATH.EDIT_SLOGAN_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${detail.id}`}
                            title={'Cập nhật'}
                            width={150}
                            variant={'ps-btn--fullwidth'}
                        />
                    </div>
                </div>
                <div className={styles.table_container}>
                    <DetailRowComponent
                        label={'Ảnh'}
                        value={
                            <Image src={configImageURL(detail.image)} alt={detail.name} width={400} />
                        }
                    />
                    <DetailRowCommon
                        label={'Tiêu đề'}
                        value={detail.name}
                    />

                    <DetailRowComponent
                        label={'Trạng thái'}
                        value={
                            statusResult
                            &&
                            <StatusCommon title={statusResult?.label} status={statusResult.value} />
                        }
                    />
                    <DetailRowCommon
                        label={'Mô tả'}
                        value={detail.description}
                    />
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    );
};

export default ViewSloganManagement;