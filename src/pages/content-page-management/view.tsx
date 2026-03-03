import { useState, useEffect } from 'react';
import Constants from '../../core/common/constants';
import '../../asset/css/admin/view.css';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import { DetailRowCommon, DetailRowComponent } from '../../infrastructure/common/text/detail-row';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import { ROUTE_PATH } from '../../core/common/appRouter';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import styles from '../../asset/css/admin/admin-component.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import { ContentPageInterface } from '../../infrastructure/interface/contentPage/contentPage.interface';
import contentPageService from '../../infrastructure/repository/contentPage/contentPage.service';

const ViewContentPageManagement = () => {
    const [detail, setDetail] = useState<ContentPageInterface>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useNavigate();
    const param = useParams();
    const onBack = () => {
        router(ROUTE_PATH.CONTENT_PAGE_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (param.id) {
            try {
                await contentPageService.GetContentPageById(
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
    const typeResult = Constants.ContentPage.ListType.find(item => item.value == detail.type)

    return (
        <AdminLayout
            breadcrumb={"Quản lý nội dung trang"}
            title={"Chi tiết nội dung trang"}
            redirect={ROUTE_PATH.PRODUCT_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Chi tiết nội dung trang</h2>
                    <div className={styles.btn_container}>
                        <ButtonCommon
                            key="close"
                            onClick={onBack}
                            title={'Đóng'}
                            width={150}
                            variant={'ps-btn--gray'}
                        />,
                        <ButtonHref
                            href={`${(ROUTE_PATH.EDIT_CONTENT_PAGE_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${detail.id}`}
                            title={'Cập nhật'}
                            width={150}
                            variant={'ps-btn--fullwidth'}
                        />
                    </div>
                </div>
                <div className={styles.table_container}>
                    <DetailRowCommon
                        label={'Loại trang'}
                        value={typeResult?.label || ""}
                    />
                    <DetailRowComponent
                        label={'Mô tả'}
                        value={
                            <article
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: detail.content }}
                            />
                        }
                    />
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    );
};

export default ViewContentPageManagement;