import React, { useState, useEffect } from 'react';
import { Modal, Button, Image } from 'antd';
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
import { VideoInterface } from '../../infrastructure/interface/video/video.interface';
import videoService from '../../infrastructure/repository/video/video.service';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import YouTubeThumbnail from '../../infrastructure/common/thumbnailYoutube/thumbnailYoutube';
import YoutubeVideo from '../../infrastructure/common/thumbnailYoutube/youtube';

const ViewVideoManagement = () => {
    const [detail, setDetail] = useState<VideoInterface | null>();
    const [loading, setLoading] = useState<boolean>(false);

    const router = useNavigate();
    const param = useParams();
    const onBack = () => {
        router(ROUTE_PATH.CONTACT_MANAGEMENT)
    }
    const onGetByIdAsync = async () => {
        if (param.id) {
            try {
                await videoService.GetVideoById(
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
    const statusResult = Constants.StatusConfig.List.find(item => item.value == detail.active)
    const videoId = detail.link_url.split('v=')[1];
    return (
        <AdminLayout
            breadcrumb={"Quản lý video"}
            title={"Chi tiết video"}
            redirect={ROUTE_PATH.PRODUCT_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Chi tiết video</h2>
                    <div className={styles.btn_container}>
                        <ButtonCommon
                            key="close"
                            onClick={onBack}
                            title={'Đóng'}
                            width={150}
                            variant={'ps-btn--gray'}
                        />
                        <ButtonHref
                            href={`${(ROUTE_PATH.EDIT_VIDEO_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${detail.id}`}
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
                            <YouTubeThumbnail name={detail.name} url={detail.link_url} />
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
                    <DetailRowComponent
                        label={'Video'}
                        value={
                            <YoutubeVideo
                                videoId={videoId}
                            />
                        }
                    />
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    );
};

export default ViewVideoManagement;