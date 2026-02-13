import { useEffect, useState } from 'react';
import styles from '../../asset/css/admin/admin-component.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import categoryProductService from '../../infrastructure/repository/category/categoryProduct.service';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import UploadAvatar from '../../infrastructure/common/input/upload-image';
import { Col, Row, Table } from 'antd';
import InputTextCommon from '../../infrastructure/common/input/input-text-common';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import { TitleTableCommon } from '../../infrastructure/common/text/title-table-common';
import Constants from '../../core/common/constants';
import { StatusCommon } from '../../infrastructure/common/controls/Status';
import { SloganInterface } from '../../infrastructure/interface/slogan/slogan.interface';
import sloganService from '../../infrastructure/repository/slogan/slogan.service';
import { configImageURL } from '../../infrastructure/helper/helper';
import TextAreaCommon from '../../infrastructure/common/input/textarea-common';
import InputSelectStatus from '../../infrastructure/common/input/select-status';
import InputNumberCommon from '../../infrastructure/common/input/input-number';

const SlugSloganManagement = () => {
    const [detail, setDetail] = useState<SloganInterface>();
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
        router(ROUTE_PATH.SLOGAN_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (param.id) {
            try {
                await sloganService.GetSloganById(
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
                description: detail.description,
                index: detail.index,
                active: detail.active,
            });
        };
    }, [detail]);

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());

        if (isValidData()) {
            try {
                const payload: any = {
                    name: dataRequest.name,
                    description: dataRequest.description,
                    index: dataRequest.index,
                    active: dataRequest.active,
                };

                if (dataRequest.image !== originalImage) {
                    payload.image = dataRequest.image;
                }

                await sloganService.UpdateSloganAdmin(
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

    return (
        <AdminLayout
            breadcrumb={"Quản lý hình ảnh trong trang chủ"}
            title={"Cập nhật hình ảnh trong trang chủ"}
            redirect={ROUTE_PATH.SLOGAN_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Cập nhật hình ảnh trong trang chủ</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.SLOGAN_MANAGEMENT}
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
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <InputNumberCommon
                                        label={"Số thứ tự"}
                                        attribute={"index"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.index}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
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
                                <Col span={24}>
                                    <TextAreaCommon
                                        label={"Nội dung"}
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
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    )
}

export default SlugSloganManagement