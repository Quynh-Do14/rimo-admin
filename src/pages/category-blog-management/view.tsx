import React, { useEffect, useState } from 'react'
import styles from '../../asset/css/admin/admin-component.module.css';
import { Col, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import categoryBlogService from '../../infrastructure/repository/category/categoryBlog.service';
import { configImageURL } from '../../infrastructure/helper/helper';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import InputTextCommon from '../../infrastructure/common/input/input-text-common';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';

const SlugCategoryBlogManagement = () => {
    const [detail, setDetail] = useState<any>({});
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [_data, _setData] = useState<any>({});
    const dataRequest = _data;

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
    const param = useParams();
    const onBack = () => {
        router(ROUTE_PATH.CATEGORY_BLOG_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (param.id) {
            try {
                await categoryBlogService.GetBlogCategoryById(
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

    useEffect(() => {
        if (detail) {
            const fullImage = configImageURL(detail.image);
            setOriginalImage(fullImage);
            setDataRequest({
                name: detail.name,

            });
        };
    }, [detail]);

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await categoryBlogService.UpdateBlogCategoryAdmin(
                    String(param.id),
                    {
                        name: dataRequest.name,
                    },
                    onBack,
                    setLoading
                );
            } catch (error) {
                console.error(error);
            }
        } else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin");
        }
    };

    return (
        <AdminLayout
            breadcrumb={"Quản lý danh mục tin tức"}
            title={"Thêm danh mục tin tức"}
            redirect={ROUTE_PATH.CATEGORY_BLOG_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Cập nhật danh mục tin tức</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.CATEGORY_BLOG_MANAGEMENT}
                            title={'Quay lại'}
                            width={150}
                            variant={'ps-btn--gray'}
                        />
                        <ButtonCommon
                            onClick={onUpdateAsync}
                            title={'Cập nhật'}
                            width={150}
                            variant={'ps-btn--fullwidth'}
                        />
                    </div>
                </div>
                <Row gutter={[16, 16]} className={styles.form_container}>
                    <Col span={24}>
                        <InputTextCommon
                            label={"Tên danh mục"}
                            attribute={"name"}
                            isRequired={true}
                            dataAttribute={dataRequest.name}
                            setData={setDataRequest}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                </Row>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    )
}

export default SlugCategoryBlogManagement