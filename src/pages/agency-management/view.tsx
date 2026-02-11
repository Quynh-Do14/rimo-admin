import React, { useState, useEffect } from 'react';
import { Image, Modal } from 'antd';
import Constants from '../../core/common/constants';
import '../../asset/css/admin/view.css';
import { StatusCommon } from '../../infrastructure/common/controls/Status';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import { DetailRowCommon, DetailRowComponent } from '../../infrastructure/common/text/detail-row';
import { configImageURL, convertDateShow } from '../../infrastructure/helper/helper';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import { ROUTE_PATH } from '../../core/common/appRouter';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import styles from '../../asset/css/admin/admin-component.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import blogService from '../../infrastructure/repository/blog/blog.service';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import agencyService from '../../infrastructure/repository/agency/agency.service';
import { AgencyInterface } from '../../infrastructure/interface/agency/agency.interface';
import GoogleMapView from '../../infrastructure/common/map/ggmap';

const ViewAgencyManagement = () => {
    const [detail, setDetail] = useState<AgencyInterface>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useNavigate();
    const param = useParams();
    const onBack = () => {
        router(ROUTE_PATH.AGENCY_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (param.id) {
            try {
                await agencyService.GetAgencyById(
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
            breadcrumb={"Quản lý đại lý"}
            title={"Chi tiết đại lý"}
            redirect={ROUTE_PATH.PRODUCT_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Chi tiết đại lý</h2>
                    <div className={styles.btn_container}>
                        <ButtonCommon
                            key="close"
                            onClick={onBack}
                            title={'Đóng'}
                            width={150}
                            variant={'ps-btn--gray'}
                        />,
                        <ButtonHref
                            href={`${(ROUTE_PATH.EDIT_AGENCY_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${detail.id}`}
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
                            <Image src={configImageURL(detail.image)} alt={detail.name} width={300} />
                        }
                    />
                    <DetailRowCommon
                        label={'Tên đại lý'}
                        value={detail.name}
                    />
                    <DetailRowCommon
                        label={'Tỉnh/TP'}
                        value={detail.province.split('-')[1]}
                    />
                    <DetailRowCommon
                        label={'Huyện'}
                        value={detail.district}
                    />
                    <DetailRowComponent
                        label={'Tọa độ'}
                        value={
                            <div>
                                <DetailRowCommon
                                    label={'Kinh độ'}
                                    value={detail.long}
                                />
                                <DetailRowCommon
                                    label={'Vĩ độ'}
                                    value={detail.lat}
                                />
                            </div>
                        }
                    />
                    <DetailRowComponent
                        label='Bản đồ'
                        value={
                            <GoogleMapView selectedAgency={detail} />

                        }
                    />
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    );
};

export default ViewAgencyManagement;