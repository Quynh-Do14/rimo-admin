import React, { useEffect, useState } from 'react'
import styles from '../../asset/css/admin/admin-component.module.css';
import { Col, Row, Table } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import categoryBlogService from '../../infrastructure/repository/category/categoryBlog.service';
import { configImageURL } from '../../infrastructure/helper/helper';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import InputTextCommon from '../../infrastructure/common/input/input-text-common';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import { CategoryBlogInterface } from '../../infrastructure/interface/category/categoryBlog.interface';
import { TitleTableCommon } from '../../infrastructure/common/text/title-table-common';
import Constants from '../../core/common/constants';
import { StatusCommon } from '../../infrastructure/common/controls/Status';

const SlugCategoryBlogManagement = () => {
    const [detail, setDetail] = useState<CategoryBlogInterface>();
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
            title={"Cập nhật danh mục tin tức"}
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
                <div className={styles.table_container}>
                    <Row align="top">
                        <Col span={24} className={styles.form_container}>
                            <Row gutter={[16, 16]}>
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
                        </Col>
                    </Row>
                    <h2>Tin tức thuộc danh mục</h2>
                    <Table
                        dataSource={detail?.blog}
                        loading={loading}
                        rowKey="id"
                        pagination={false}
                        className='table-common'
                    >
                        <Table.Column
                            title={"STT"}
                            dataIndex="stt"
                            key="stt"
                            width={"5%"}
                            render={(val, record, index) => (
                                <div style={{ textAlign: "center" }}>
                                    {index + 1}
                                </div>
                            )}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Tiêu đề"
                                    width={'150px'}
                                />
                            }
                            key={"title"}
                            dataIndex={"title"}
                            render={(val, record) => {
                                return (
                                    <Link to={`${(ROUTE_PATH.VIEW_BLOG_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${record.id}`}>
                                        {val}
                                    </Link>
                                )
                            }}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Trạng thái"
                                    width={'100px'}
                                />
                            }
                            key={"active"}
                            dataIndex={"active"}
                            render={(val) => {
                                const result = Constants.DisplayConfig.List.find(item => item.value == val)
                                if (result) {
                                    return <StatusCommon title={result.label} status={result.value} />
                                }
                                return
                            }}
                        />
                    </Table>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    )
}

export default SlugCategoryBlogManagement