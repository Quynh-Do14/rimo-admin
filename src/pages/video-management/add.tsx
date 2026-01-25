import React, { useState } from 'react'
import styles from '../../asset/css/admin/admin-component.module.css';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import categoryBlogService from '../../infrastructure/repository/category/categoryBlog.service';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import InputTextCommon from '../../infrastructure/common/input/input-text-common';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import videoService from '../../infrastructure/repository/video/video.service';
import TextAreaCommon from '../../infrastructure/common/input/textarea-common';

const AddVideoManagement = () => {
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
    const onBack = () => {
        router(ROUTE_PATH.VIDEO_MANAGEMENT)
    }
    const onCreateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await videoService.AddVideoAdmin({
                    name: dataRequest.name,
                    link_url: dataRequest.link_url,
                    description: dataRequest.description,
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
            breadcrumb={"Quản lý video"}
            title={"Thêm video"}
            redirect={ROUTE_PATH.VIDEO_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Thêm video</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.VIDEO_MANAGEMENT}
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
                <Row align="top">
                    <Col span={24} className={styles.form_container}>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <InputTextCommon
                                    label={"Tiêu đề"}
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
                            <Col span={24}>
                                <InputTextCommon
                                    label={"URL"}
                                    attribute={"link_url"}
                                    isRequired={true}
                                    dataAttribute={dataRequest.link_url}
                                    setData={setDataRequest}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                />
                            </Col>
                            <Col span={24}>
                                <TextAreaCommon
                                    label={"Mô tả"}
                                    attribute={"description"}
                                    isRequired={true}
                                    dataAttribute={dataRequest.description}
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
            <FullPageLoading isLoading={loading} />
        </AdminLayout>
    )
}

export default AddVideoManagement