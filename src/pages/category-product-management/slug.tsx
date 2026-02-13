import { useEffect, useState } from 'react';
import styles from '../../asset/css/admin/admin-component.module.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import categoryProductService from '../../infrastructure/repository/category/categoryProduct.service';
import { configImageURL } from '../../infrastructure/helper/helper';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import UploadAvatar from '../../infrastructure/common/input/upload-image';
import { Col, Row, Table } from 'antd';
import InputTextCommon from '../../infrastructure/common/input/input-text-common';
import TextAreaCommon from '../../infrastructure/common/input/textarea-common';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import { CategoryProductInterface } from '../../infrastructure/interface/category/categoryProduct.interface';
import { TitleTableCommon } from '../../infrastructure/common/text/title-table-common';
import Constants from '../../core/common/constants';
import { StatusCommon } from '../../infrastructure/common/controls/Status';

const SlugProductCategoryManagement = () => {
    const [detail, setDetail] = useState<CategoryProductInterface>();
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
        router(ROUTE_PATH.CATEGORY_PRODUCT_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (param.id) {
            try {
                await categoryProductService.GetCategoryById(
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
            // const fullImage = configImageURL(detail.image);
            // setOriginalImage(fullImage);
            setDataRequest({
                // image: configImageURL(detail.image),
                name: detail.name,
                // description: detail.description,

            });
        };
    }, [detail]);

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());

        if (isValidData()) {
            try {
                // const payload: any = {
                //     name: dataRequest.name,
                //     description: dataRequest.description,
                // };

                // if (dataRequest.image !== originalImage) {
                //     payload.image = dataRequest.image;
                // }

                await categoryProductService.UpdateCategoryAdmin(
                    String(param.id),
                    {
                        image: "",
                        name: dataRequest.name,
                        description: "",
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
            breadcrumb={"Quản lý danh mục sản phẩm"}
            title={"Cập nhật danh mục sản phẩm"}
            redirect={ROUTE_PATH.CATEGORY_PRODUCT_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Cập nhật danh mục sản phẩm</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.CATEGORY_PRODUCT_MANAGEMENT}
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
                        {/* <Col xs={24} sm={24} md={10} lg={8} xl={6} xxl={5} className={styles.form_container}>
                        <UploadAvatar
                            dataAttribute={dataRequest.image}
                            setData={setDataRequest}
                            attribute={'image'}
                            label={'Ảnh'}
                        />
                    </Col> */}
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
                                {/* <Col span={24}>
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
                            </Col> */}
                            </Row>
                        </Col>
                    </Row>
                    <h2>Sản phẩm thuộc danh mục</h2>
                    <Table
                        dataSource={detail?.products}
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
                                    title="Tên sản phẩm"
                                    width={'300px'}
                                />
                            }
                            width={"80%"}
                            key={"name"}
                            dataIndex={"name"}
                            render={(val, record) => {
                                return (
                                    <Link to={`${(ROUTE_PATH.VIEW_PRODUCT_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${record.id}`}>
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
                            width={"20%"}
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

export default SlugProductCategoryManagement