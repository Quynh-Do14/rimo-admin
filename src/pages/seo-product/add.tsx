import React, { useState } from 'react'
import styles from '../../asset/css/admin/admin-component.module.css';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import seoProductService from '../../infrastructure/repository/seo-product/SEOProduct.service';
import RichTextEditor from '../../infrastructure/common/input/richTextEditor';
import InputSelectStatus from '../../infrastructure/common/input/select-status';
import { useRecoilValue } from 'recoil';
import { CategoryProductState } from '../../core/atoms/category/categoryState';
import InputTextCommon from '../../infrastructure/common/input/input-text-common';

const AddSEOProductListManagement = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [_data, _setData] = useState<any>({});
    const dataRequest = _data;
    const categoryProductState = useRecoilValue(CategoryProductState).data;
    const newItem = {
        id: 0,
        index: 1000,
        name: "Sản phẩm RIMO",
        slug: "san-pham",
        description: "",
        image: "",
        products: []
    };
    const categoryProductStateNew = [newItem, ...categoryProductState];

    const setDataRequest = (data: any) => {
        Object.assign(dataRequest, { ...data });
        _setData({ ...dataRequest });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };
    const router = useNavigate();
    const onBack = () => {
        router(ROUTE_PATH.SEO_PRODUCT_MANAGEMENT)
    }
    const onCreateAsync = async () => {
        const result = categoryProductStateNew.find(item => item.slug == dataRequest.slug)
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await seoProductService.AddSEOProductAdmin(
                    {
                        title: result?.name || "",
                        category_id: result?.id ? result.id : 0,
                        slug: dataRequest.slug,
                        content: dataRequest.content,
                    },
                    onBack,
                    setLoading
                )
            }
            catch (error) {
                console.error(error)
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };

    };

    return (
        <AdminLayout
            breadcrumb={"Quản lý bài viết SEO cho sản phẩm"}
            title={"Thêm bài viết"}
            redirect={ROUTE_PATH.SEO_PRODUCT_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Thêm bài viết</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.SEO_PRODUCT_MANAGEMENT}
                            title={'Quay lại'}
                            width={150}
                            variant={'ps-btn--gray'}
                        />
                        <ButtonCommon
                            onClick={onCreateAsync}
                            title={'Thêm mới'}
                            width={150}
                            variant={'ps-btn--fullwidth'}
                        />
                    </div>
                </div>
                <div className={styles.table_container}>
                    <Row align="top">
                        <Col span={24} className={styles.form_container}>
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <InputSelectStatus
                                        label={"Danh mục"}
                                        attribute={"slug"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.slug}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={categoryProductStateNew}
                                        valueName='slug'
                                        labelName='name'
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Đường dẫn"}
                                        attribute={"slug"}
                                        isRequired={false}
                                        dataAttribute={dataRequest.slug}
                                        setData={setDataRequest}
                                        disabled={true}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <RichTextEditor
                                        label={"Mô tả"}
                                        attribute={"content"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.content}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    )
}

export default AddSEOProductListManagement