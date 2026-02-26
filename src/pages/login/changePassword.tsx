'use client'
import { Col, Modal, Row } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../infrastructure/repository/auth/auth.service'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { WarningMessage } from '../../infrastructure/common/toast/message'
import InputPasswordCommon from '../../infrastructure/common/input/input-password'
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon'

type Props = {
    // handleOk: Function,
    handleCancel: () => void,
    visible: boolean,
}
const ChangePasswordModal = (props: Props) => {
    const { handleCancel, visible } = props;
    const [validate, setValidate] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [submittedTime, setSubmittedTime] = useState<any>();

    const router = useNavigate();

    const [_data, _setData] = useState<any>({});
    const changePassword = _data;

    const setchangePassword = (data: any) => {
        Object.assign(changePassword, { ...data });
        _setData({ ...changePassword });
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

    const onUpdateProfile = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await authService.changePassword(
                {
                    currentPassword: changePassword.currentPassword,
                    newPassword: changePassword.newPassword,
                    confirmPassword: changePassword.confirmPassword
                },
                async () => {
                    handleCancel();
                    await authService.logout(
                        setLoading

                    ).then(() => {
                        router(ROUTE_PATH.LOGIN);
                    });
                },
                setLoading,
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <Modal
            key={"f-0"}
            centered
            open={visible}
            closable={true}
            footer={false}
            onCancel={() => handleCancel()}
            className='custom-modal'
            closeIcon={<i className="fa fa-times text-[20px]" aria-hidden="true"></i>}
        >
            <div className='flex flex-col gap-4'>
                <div className="">
                    <h2 className="password-change-title">Thay đổi mật khẩu</h2>
                </div>
                <Row gutter={[10, 10]}>
                    <Col span={24}>
                        <InputPasswordCommon
                            label={"Mật khẩu hiện tại"}
                            attribute={"currentPassword"}
                            isRequired={true}
                            dataAttribute={changePassword.currentPassword}
                            setData={setchangePassword}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                    <Col span={24}>
                        <InputPasswordCommon
                            label={"Mật khẩu mới"}
                            attribute={"newPassword"}
                            isRequired={true}
                            dataAttribute={changePassword.newPassword}
                            setData={setchangePassword}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                    <Col span={24}>
                        <InputPasswordCommon
                            label={"Xác nhận mật khẩu"}
                            attribute={"confirmPassword"}
                            isRequired={true}
                            dataAttribute={changePassword.confirmPassword}
                            setData={setchangePassword}
                            disabled={false}
                            validate={validate}
                            setValidate={setValidate}
                            submittedTime={submittedTime}
                        />
                    </Col>
                </Row>
                <div className='flex gap-2 justify-center'>
                    <ButtonCommon
                        onClick={handleCancel}
                        variant="ps-btn--gray"
                        width={120}
                        title={'Quay lại'}
                    />
                    <ButtonCommon
                        onClick={onUpdateProfile}
                        variant="ps-btn--fullwidth"
                        width={120}
                        title={'Cập nhật'}
                    />
                </div>
            </div>

        </Modal>
    )
}

export default ChangePasswordModal