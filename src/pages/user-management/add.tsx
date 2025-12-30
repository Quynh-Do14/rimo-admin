import React, { use, useState } from 'react'
import styles from '../../asset/css/admin/admin-component.module.css';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import userService from '../../infrastructure/repository/user/user.service';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import InputTextCommon from '../../infrastructure/common/input/input-text-common';
import InputPasswordCommon from '../../infrastructure/common/input/input-password';
import InputSelectCommon from '../../infrastructure/common/input/select-common';
import Constants from '../../core/common/constants';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';


const AddUserManagement = () => {
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
        router(ROUTE_PATH.USER_MANAGEMENT)
    }
    const onCreateAsync = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                await userService.CreateUser({
                    name: dataRequest.name,
                    email: dataRequest.email,
                    password: dataRequest.password,
                    role_id: dataRequest.role_id,
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
            breadcrumb={"Quản lý người dùng"}
            title={"Thêm người dùng"}
            redirect={ROUTE_PATH.USER_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Thêm người dùng</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.USER_MANAGEMENT}
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
                <Row gutter={[20, 20]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <InputTextCommon
                            label={"Tên người dùng"}
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
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <InputTextCommon
                            label={"Email"}
                            attribute={"email"}
                            isRequired={true}
                            dataAttribute={dataRequest.email}
                            setData={setDataRequest}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <InputPasswordCommon
                            label={"Mật khẩu"}
                            attribute={"password"}
                            isRequired={true}
                            dataAttribute={dataRequest.password}
                            setData={setDataRequest}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <InputSelectCommon
                            label={"Phân quyền"}
                            attribute={"role_id"}
                            isRequired={true}
                            dataAttribute={dataRequest.role_id}
                            setData={setDataRequest}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                            listDataOfItem={Constants.Roles.List}
                            valueName='value'
                            labelName='label'
                        />
                    </Col>
                </Row>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout>
    )
}

export default AddUserManagement