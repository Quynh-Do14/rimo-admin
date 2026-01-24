import React, { useEffect, useState } from 'react'
import styles from '../../asset/css/admin/admin-component.module.css';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import { Col, Row } from 'antd';
import UploadAvatar from '../../infrastructure/common/input/upload-image';
import InputTextCommon from '../../infrastructure/common/input/input-text-common';
import TextAreaCommon from '../../infrastructure/common/input/textarea-common';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import agencyService from '../../infrastructure/repository/agency/agency.service';
import districtService from '../../infrastructure/repository/district/district.service';
import InputSelectCommon from '../../infrastructure/common/input/select-common';
import InputSelectProvince from '../../infrastructure/common/input/select-province';
import ComboBoxCommon from '../../infrastructure/common/input/combo-box-common';
import { useRecoilValue } from 'recoil';
import { CategoryAgencyState } from '../../core/atoms/category/categoryState';
import InputNumberCommon from '../../infrastructure/common/input/input-number';


const AddAgencyManagement = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [_data, _setData] = useState<any>({});
    const dataRequest = _data;
    const [listProvince, setListProvince] = useState<Array<any>>([])
    const [listDistrict, setListDistrict] = useState<Array<any>>([])
    const categoryAgencyState = useRecoilValue(CategoryAgencyState).data;

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
        router(ROUTE_PATH.AGENCY_MANAGEMENT)
    }

    const onCreateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await agencyService.AddAgencyAdmin({
                    image: dataRequest.image,
                    name: dataRequest.name,
                    province: String(dataRequest.province),
                    district: dataRequest.district,
                    address: dataRequest.address,
                    long: dataRequest.long,
                    lat: dataRequest.lat,
                    phone_number: dataRequest.phone_number,
                    star_rate: dataRequest.star_rate,
                    agency_category_type: JSON.stringify(dataRequest.agency_category_type)
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
    }, [dataRequest]);

    return (
        <AdminLayout
            breadcrumb={"Quản lý đại lý"}
            title={"Thêm đại lý"}
            redirect={ROUTE_PATH.AGENCY_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Thêm đại lý</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.AGENCY_MANAGEMENT}
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
                                    attribute={"agency_category_type"}
                                    isRequired={true}
                                    dataAttribute={dataRequest.agency_category_type}
                                    setData={setDataRequest}
                                    disabled={false}
                                    validate={validate}
                                    setValidate={setValidate}
                                    submittedTime={submittedTime}
                                    listDataOfItem={categoryAgencyState}
                                    valueName='id'
                                    labelName='name'
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
                        </Row>
                    </Col>
                </Row>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout>
    )
}

export default AddAgencyManagement