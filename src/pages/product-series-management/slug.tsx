import React, { useEffect, useState } from 'react'
import styles from '../../asset/css/admin/admin-component.module.css';
import { Col, Row } from 'antd';
import { useRecoilValue } from 'recoil';
import { BrandState } from '../../core/atoms/brand/brandState';
import { CategoryProductState } from '../../core/atoms/category/categoryState';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { configImageURL } from '../../infrastructure/helper/helper';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import UploadAvatar from '../../infrastructure/common/input/upload-image';
import InputTextCommon from '../../infrastructure/common/input/input-text-common';
import InputSelectCommon from '../../infrastructure/common/input/select-common';
import InputNumberCommon from '../../infrastructure/common/input/input-number';
import UploadListImage from '../../infrastructure/common/input/upload-list-image';
import InputArrayTextCommon from '../../infrastructure/common/input/input-array/input-array-text-common';
import TextAreaCommon from '../../infrastructure/common/input/textarea-common';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import productSeriesService from '../../infrastructure/repository/product-series/product-series.service';
import { ProductState } from '../../core/atoms/product/productState';
import { SeriesState } from '../../core/atoms/series/series';


const SlugProductSeriesManagement = () => {
    const [figureList, setFigureList] = useState<any[]>([
        {
            index: 0,
            key: "",
            value: 0
        },
    ])
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
    const productState = useRecoilValue(ProductState).data;
    const seriesState = useRecoilValue(SeriesState).data;

    const router = useNavigate();
    const param = useParams();
    const onBack = () => {
        router(ROUTE_PATH.PRODUCT_SERIES_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (param.id) {
            try {
                await productSeriesService.GetProductById(
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
                image: configImageURL(detail.image),
                name: detail.name,
                product_id: detail.product_id,
                series_id: detail.series_id,
            });
            const figures = detail.productFigure?.map((item: any, index: number) => {
                const result = {
                    index: index,
                    key: item.key,
                    value: item.value
                }
                return result
            })
            setFigureList(figures)
        };
    }, [detail]);

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());

        if (isValidData()) {
            const formData = new FormData();
            if (dataRequest.image !== originalImage) {
                formData.append('image', dataRequest.image);
            }
            // Append các trường thông tin
            formData.append('name', dataRequest.name);
            formData.append('product_id', dataRequest.product_id);
            formData.append('series_id', dataRequest.series_id);
            formData.append('productFigure', JSON.stringify(figureList));

            try {
                await productSeriesService.UpdateProductAdmin(
                    String(param.id),
                    formData,
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

    const onAddFigure = () => {
        setFigureList([
            ...figureList,
            {
                index: Number(figureList.length - 1) + 1,
                key: "",
                value: ""
            },
        ])
    }
    const onDeleteOption = (index: number) => {
        if (index > 0) {
            const spliceOption = [...figureList];
            spliceOption.splice(index, 1)
            setFigureList(spliceOption)
        }
    }
    return (
        <AdminLayout
            breadcrumb={"Quản lý thông số"}
            title={"Cập nhật thông số"}
            redirect={ROUTE_PATH.PRODUCT_SERIES_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Cập nhật thông số</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.PRODUCT_SERIES_MANAGEMENT}
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
                        <Col xs={24} sm={24} md={10} lg={8} xl={6} xxl={5} className={styles.form_container}>
                            <UploadAvatar
                                dataAttribute={dataRequest.image}
                                setData={setDataRequest}
                                attribute={'image'}
                                label={'Ảnh'}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={14} lg={16} xl={18} xxl={19} className={styles.form_container}>
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Tên thông số"}
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
                                    <InputSelectCommon
                                        label={"Thuộc sản phẩm"}
                                        attribute={"product_id"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.product_id}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={productState}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputSelectCommon
                                        label={"Dòng sản phẩm"}
                                        attribute={"series_id"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.series_id}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={seriesState}
                                    />
                                </Col>
                                <Col span={24}>
                                    <div className={styles.figureContainer}>
                                        <div className={styles.figureHeader} onClick={onAddFigure}>
                                            <span>Thông số kĩ thuật</span>
                                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                        </div>

                                        {figureList && figureList.length && figureList.map((item, index) => (
                                            <div key={index} className={styles.figureBox}>
                                                <div className={styles.figureIndex}>
                                                    <span>Thêm mới thông số {index + 1}</span>
                                                    <div onClick={() => onDeleteOption(index)}>
                                                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                                <Row gutter={[16, 16]}>
                                                    <Col xs={24} sm={24} md={12}>
                                                        <InputArrayTextCommon
                                                            label={"Tên thông số"}
                                                            attribute={"key"}
                                                            isRequired={true}
                                                            dataAttribute={item.key}
                                                            setData={setFigureList}
                                                            disabled={false}
                                                            validate={validate}
                                                            setValidate={() => { }}
                                                            submittedTime={submittedTime}
                                                            index={index}
                                                            data={figureList}
                                                        />
                                                    </Col>
                                                    <Col xs={24} sm={24} md={12}>
                                                        <InputArrayTextCommon
                                                            label={"Giá trị"}
                                                            attribute={"value"}
                                                            isRequired={true}
                                                            dataAttribute={item.value}
                                                            setData={setFigureList}
                                                            disabled={false}
                                                            validate={validate}
                                                            setValidate={() => { }}
                                                            submittedTime={submittedTime}
                                                            index={index}
                                                            data={figureList}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))}
                                    </div>
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

export default SlugProductSeriesManagement