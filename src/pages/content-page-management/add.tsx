import React, { useState } from 'react'
import styles from '../../asset/css/admin/admin-component.module.css';
import { Col, Row } from 'antd';

import { useRecoilValue } from 'recoil';
import blogService from '../../infrastructure/repository/blog/blog.service';
import { CategoryBlogState } from '../../core/atoms/category/categoryState';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import UploadAvatar from '../../infrastructure/common/input/upload-image';
import InputTextCommon from '../../infrastructure/common/input/input-text-common';
import InputSelectCommon from '../../infrastructure/common/input/select-common';
import TextAreaCommon from '../../infrastructure/common/input/textarea-common';
import TextEditorCommon from '../../infrastructure/common/input/text-editor-common';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import InputSelectStatus from '../../infrastructure/common/input/select-status';
import Constants from '../../core/common/constants';
import RichTextEditor from '../../infrastructure/common/input/richTextEditor';
import contentPageService from '../../infrastructure/repository/contentPage/contentPage.service';

const AddContentPageManagement = () => {
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
    const categoryBlog = useRecoilValue(CategoryBlogState).data;
    const router = useNavigate();
    const onBack = () => {
        router(ROUTE_PATH.CONTENT_PAGE_MANAGEMENT)
    }
    const onCreateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await contentPageService.AddContentPageAdmin({
                    type: dataRequest.type,
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
            breadcrumb={"Quản lý nội dung trang"}
            title={"Thêm nội dung trang"}
            redirect={ROUTE_PATH.CONTENT_PAGE_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Thêm nội dung trang</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.CONTENT_PAGE_MANAGEMENT}
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
                                        label={"Loại trang"}
                                        attribute={"type"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.type}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={Constants.ContentPage.ListType}
                                        valueName='value'
                                        labelName='label'
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
        </AdminLayout>
    )
}

export default AddContentPageManagement