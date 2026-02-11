import React, { useState, useEffect } from 'react';
import { Col, Image, Modal, Row } from 'antd';
import Constants from '../../core/common/constants';
import styles from '../../asset/css/admin/admin-component.module.css';
import { StatusCommon } from '../../infrastructure/common/controls/Status';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import { DetailRowCommon, DetailRowComponent } from '../../infrastructure/common/text/detail-row';
import { configImageURL, convertDateShow, formatCurrency } from '../../infrastructure/helper/helper';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { ProductInterface } from '../../infrastructure/interface/product/product.interface';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import productService from '../../infrastructure/repository/product/product.service';


const ViewProductManagement = () => {
    const [detail, setDetail] = useState<ProductInterface | null>();
    const [loading, setLoading] = useState<boolean>(false);

    const router = useNavigate();
    const param = useParams();
    const onBack = () => {
        router(ROUTE_PATH.PRODUCT_MANAGEMENT)
    }
    const onGetByIdAsync = async () => {
        if (param.id) {
            try {
                await productService.GetProductById(
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
    const statusResult = detail && Constants.DisplayConfig.List.find(item => item.value == detail.active)
    if (detail) {
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
                                href={`${(ROUTE_PATH.EDIT_PRODUCT_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${detail.id}`}
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
                        <DetailRowCommon
                            label={'Danh mục'}
                            value={detail.category_name}
                        />
                        <DetailRowCommon
                            label={'Giá'}
                            value={formatCurrency(detail.price)}
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
                            label={'Ngày tạo'}
                            value={convertDateShow(detail.created_at) || ""}
                        />
                        <DetailRowCommon
                            label={'Mô tả ngắn'}
                            value={detail.short_description}
                        />
                        <DetailRowComponent
                            label={'Danh sách ảnh'}
                            value={
                                <Row>
                                    {detail.images && detail.images?.map((it, index) => (
                                        <Col xs={12} sm={12} lg={12} xl={8} xxl={6} key={index}>
                                            <div className={"main-image"}>
                                                <img
                                                    src={configImageURL(it)}
                                                    security=''
                                                    alt={`Image`}
                                                />
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            }
                        />
                        {
                            detail.productFigure && detail.productFigure.length
                                ?
                                <DetailRowComponent
                                    label={'Thông số kĩ thuật'}
                                    value={
                                        <div>
                                            {detail.productFigure && detail.productFigure.length ? detail.productFigure.map((item, index) => (
                                                <DetailRowCommon
                                                    key={index}
                                                    label={item.key}
                                                    value={item.value}
                                                />
                                            ))
                                                : null
                                            }
                                        </div>
                                    }
                                />
                                :
                                null
                        }


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
    }
    return (
        <div></div>
    )
};

export default ViewProductManagement;