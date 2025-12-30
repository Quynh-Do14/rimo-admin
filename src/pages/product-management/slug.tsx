import React, { useEffect, useState } from 'react'
import styles from '../../asset/css/admin/admin-component.module.css';
import { Col, Row } from 'antd';
import { useRecoilValue } from 'recoil';
import { BrandState } from '../../core/atoms/brand/brandState';
import { CategoryProductState } from '../../core/atoms/category/categoryState';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import productService from '../../infrastructure/repository/product/product.service';
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
import TextEditorCommon from '../../infrastructure/common/input/text-editor-common';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import { WarningMessage } from '../../infrastructure/common/toast/message';


const SlugProductManagement = () => {
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
    const brandState = useRecoilValue(BrandState).data;
    const categoryProductState = useRecoilValue(CategoryProductState).data;

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

    useEffect(() => {
        if (detail) {
            const fullImage = configImageURL(detail.image);
            setOriginalImage(fullImage);
            const arrImgConvert = detail?.images?.map((url: string) => configImageURL(url));
            setDataRequest({
                image: configImageURL(detail.image),
                name: detail.name,
                category_id: detail.category_id,
                brand_id: detail.brand_id,
                price: detail.price,
                percent_sale: detail.percent_sale,
                warranty: detail.warranty,
                year: detail.year,
                short_description: detail.short_description,
                more_infomation: detail.more_infomation,
                description: detail.description,
                imagesCode: arrImgConvert, // ảnh cũ giữ nguyên
                remainImg: detail.images,
                images: [] // ảnh mới chưa có
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
            const listImage: any[] = dataRequest.images; // ảnh mới (chưa upload)
            const imageOldCodes: any[] = dataRequest.imagesCode; // ảnh cũ giữ lại

            const formData = new FormData();

            // Append ảnh phụ mới
            listImage?.forEach((file) => {
                if (file?.originFileObj) {
                    formData.append('images', file.originFileObj);
                }
            });

            // ❗ Thêm ảnh chính nếu có thay đổi
            if (dataRequest.image !== originalImage) {
                formData.append('image', dataRequest.image);
            }

            // Append các trường thông tin
            formData.append('name', dataRequest.name);
            formData.append('category_id', dataRequest.category_id);
            formData.append('brand_id', dataRequest.brand_id);
            formData.append('price', dataRequest.price);
            formData.append('percent_sale', dataRequest.percent_sale);
            formData.append('warranty', dataRequest.warranty);
            formData.append('year', dataRequest.year);
            formData.append('short_description', dataRequest.short_description);
            formData.append('more_infomation', dataRequest.more_infomation);
            formData.append('description', dataRequest.description);
            formData.append('productFigure', JSON.stringify(figureList));

            // ✅ Truyền danh sách ảnh giữ lại để BE biết ảnh nào cần xóa
            formData.append('remainingImages', JSON.stringify(dataRequest.remainImg));

            try {
                await productService.UpdateProductAdmin(
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
            breadcrumb={"Quản lý sản phẩm"}
            title={"Cập nhật sản phẩm"}
            redirect={ROUTE_PATH.PRODUCT_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Cập nhật sản phẩm</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.PRODUCT_MANAGEMENT}
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
                                        label={"Tên sản phẩm"}
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
                                {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectCommon
                                        label={"Danh mục"}
                                        attribute={"category_id"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.category_id}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={categoryProductState}
                                    />
                                </Col> */}
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectCommon
                                        label={"Thương hiệu"}
                                        attribute={"brand_id"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.brand_id}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={brandState}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <InputNumberCommon
                                        label={"Giá"}
                                        attribute={"price"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.price}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <InputNumberCommon
                                        label={"Giá đã giảm"}
                                        attribute={"percent_sale"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.percent_sale}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                {/* <Col xs={24} sm={24} md={12}>
                                    <InputTextCommon
                                        label={"Bảo hành"}
                                        attribute={"warranty"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.warranty}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <InputTextCommon
                                        label={"Năm bảo hành"}
                                        attribute={"year"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.year}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col> */}
                                <Col span={24}>
                                    <UploadListImage
                                        label={"Hình ảnh"}
                                        attribute={"images"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.imagesCode}
                                        dataAttributeImageFiles={dataRequest.images}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        isUpdate={true}
                                    />
                                </Col>
                                <Col span={24}>
                                    <TextAreaCommon
                                        label={"Mô tả ngắn"}
                                        attribute={"short_description"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.short_description}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    <div className={styles.figureContainer}>
                                        <div className={styles.figureHeader} onClick={onAddFigure}>
                                            <span>Ưu điểm nổi bật</span>
                                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                        </div>

                                        {figureList && figureList.length && figureList.map((item, index) => (
                                            <div key={index} className={styles.figureBox}>
                                                <div className={styles.figureIndex}>
                                                    <span>Ưu điểm {index + 1}</span>
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

                                {/* <Col span={24}>
                                    <TextEditorCommon
                                        label={"Thông tin thêm"}
                                        attribute={"more_infomation"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.more_infomation}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col> */}
                                {/* <Col span={24}>
                                    <TextEditorCommon
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
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    )
}

export default SlugProductManagement