import { useEffect, useState } from 'react';
import styles from '../../asset/css/admin/admin-component.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { configImageURL } from '../../infrastructure/helper/helper';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import UploadAvatar from '../../infrastructure/common/input/upload-image';
import { Col, Row } from 'antd';
import InputTextCommon from '../../infrastructure/common/input/input-text-common';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import InputSelectProvince from '../../infrastructure/common/input/select-province';
import InputSelectCommon from '../../infrastructure/common/input/select-common';
import districtService from '../../infrastructure/repository/district/district.service';
import agencyService from '../../infrastructure/repository/agency/agency.service';
import ComboBoxCommon from '../../infrastructure/common/input/combo-box-common';
import { useRecoilValue } from 'recoil';
import { CategoryAgencyState, CategoryProductState } from '../../core/atoms/category/categoryState';
import { AgencyInterface } from '../../infrastructure/interface/agency/agency.interface';
import InputSelectStatus from '../../infrastructure/common/input/select-status';
import Constants from '../../core/common/constants';
import InputNumberCommon from '../../infrastructure/common/input/input-number';

const SlugAgencyManagement = () => {
    const [detail, setDetail] = useState<AgencyInterface>();
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [_data, _setData] = useState<any>({});
    const dataRequest = _data;
    const [listProvince, setListProvince] = useState<Array<any>>([])
    const [listDistrict, setListDistrict] = useState<Array<any>>([])
    const categoryProduct = useRecoilValue(CategoryProductState).data;

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
        router(ROUTE_PATH.AGENCY_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (param.id) {
            try {
                await agencyService.GetAgencyById(
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
                province: detail.province,
                district: detail.district,
                address: detail.address,
                long: detail.long,
                lat: detail.lat,
                phone_number: detail.phone_number,
                star_rate: detail.star_rate,
                active: detail.active,
                agency_categories_type: detail.agency_categories_type.map((item) => item.category_id)

            });
        };
    }, [detail]);

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());

        if (isValidData()) {
            try {
                const payload: any = {
                    name: dataRequest.name,
                    province: String(dataRequest.province),
                    district: dataRequest.district,
                    address: dataRequest.address,
                    long: dataRequest.long,
                    lat: dataRequest.lat,
                    phone_number: dataRequest.phone_number,
                    active: dataRequest.active,
                    star_rate: dataRequest.star_rate,
                    agency_categories_type: JSON.stringify(dataRequest.agency_categories_type)
                };

                if (dataRequest.image !== originalImage) {
                    payload.image = dataRequest.image;
                }

                await agencyService.UpdateAgencyAdmin(
                    String(param.id),
                    payload,
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

    const onGetListProvinceAsync = async () => {
        const param = {

        }
        try {
            await districtService.getAll(
                param,
                setLoading
            ).then((res) => {
                setListProvince(res);
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    const onGetListDistrictAsync = async () => {
        if (dataRequest.province) {
            try {
                await districtService.getDetail(
                    String(dataRequest.province).split('-')[0],
                    setLoading
                ).then((res) => {
                    setListDistrict(res.districts);
                })
            }
            catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        onGetListProvinceAsync().then(_ => { });
    }, []);

    useEffect(() => {
        onGetListDistrictAsync().then(_ => { });
    }, [dataRequest.province]);

    return (
        <AdminLayout
            breadcrumb={"Quản lý đại lý"}
            title={"Thêm đại lý"}
            redirect={ROUTE_PATH.AGENCY_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Cập nhật đại lý</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.AGENCY_MANAGEMENT}
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
                                        label={"Tên đại lý"}
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
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Địa chỉ"}
                                        attribute={"address"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.address}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Số điện thoại"}
                                        attribute={"phone_number"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.phone_number}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectProvince
                                        label={"Tỉnh"}
                                        attribute={"province"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.province}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={listProvince}
                                        valueName='code'
                                        labelName='name'
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputSelectCommon
                                        label={"Huyện"}
                                        attribute={"district"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.district}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={listDistrict}
                                        valueName='name'
                                        labelName='name'
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <ComboBoxCommon
                                        label={"Dòng sản phầm"}
                                        attribute={"agency_categories_type"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.agency_categories_type}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={categoryProduct}
                                        valueName='id'
                                        labelName='name'
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <InputSelectStatus
                                        label={"Trạng thái"}
                                        attribute={"active"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.active}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={Constants.DisplayConfig.List}
                                        valueName='value'
                                        labelName='label'
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Kinh độ trên bản đồ"}
                                        attribute={"long"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.long}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputTextCommon
                                        label={"Vĩ độ trên bản đồ"}
                                        attribute={"lat"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.lat}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputNumberCommon
                                        label={"Đánh giá sao"}
                                        attribute={"star_rate"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.star_rate}
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

export default SlugAgencyManagement