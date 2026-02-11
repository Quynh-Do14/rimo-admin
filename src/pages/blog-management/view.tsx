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

const ViewBlogManagement = () => {
    const [detail, setDetail] = useState<BlogInterface>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useNavigate();
    const param = useParams();
    const onBack = () => {
        router(ROUTE_PATH.BLOG_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (param.id) {
            try {
                await blogService.GetBlogById(
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
            breadcrumb={"Quản lý sản phẩm"}
            title={"Chi tiết sản phẩm"}
            redirect={ROUTE_PATH.PRODUCT_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Chi tiết sản phẩm</h2>
                    <div className={styles.btn_container}>
                        <ButtonCommon
                            key="close"
                            onClick={onBack}
                            title={'Đóng'}
                            width={150}
                            variant={'ps-btn--gray'}
                        />,
                        <ButtonHref
                            href={`${(ROUTE_PATH.EDIT_BLOG_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${detail.id}`}
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
                            <Image src={configImageURL(detail.image)} alt={detail.title} width={400} />
                        }
                    />
                    <DetailRowCommon
                        label={'Tiêu đề'}
                        value={detail.title}
                    />
                    <DetailRowCommon
                        label={'Danh mục'}
                        value={detail.category_name}
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
                        label={'Mô tả ngắn'}
                        value={detail.short_description}
                    />
                    <DetailRowCommon
                        label={'Ngày tạo'}
                        value={convertDateShow(detail.created_at) || ""}
                    />
                    <DetailRowComponent
                        label={'Mô tả'}
                        value={
                            <article
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: detail.description }}
                            />
                        }
                    />
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    );
};

export default ViewBlogManagement;