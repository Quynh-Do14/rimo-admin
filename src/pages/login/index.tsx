import { useState } from 'react'
import authService from '../../infrastructure/repository/auth/auth.service';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import styles from '../../asset/css/admin/login.module.css';
import InputTextLogin from '../../infrastructure/common/input/login/input-text-login';
import { InputPasswordLogin } from '../../infrastructure/common/input/login/input-password-login';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import logo from "../../asset/img/logo.png"
const LoginPage = () => {
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

    const handleLoginSubmit = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            try {
                const response = await authService.login(
                    {
                        email: dataRequest.email,
                        password: dataRequest.password,
                    },
                    () => { },
                    setLoading
                );

                if (response) {
                    router(ROUTE_PATH.MAIN_LAYOUT);
                }
            } catch (error) {
                console.error('Login error:', error);
            }
        } else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin");
        }
    };
    return (
        <div className={styles.loginPage}>
            {/* Decorative Elements */}
            <div className={styles.backgroundPattern}></div>
            <div className={styles.goldGlow}></div>

            <div className={styles.loginContainer}>
                {/* Left Panel - Branding */}
                <div className={styles.brandPanel}>
                    <img src={logo} alt='RIMO' width={300}/>
                </div>

                {/* Right Panel - Login Form */}
                <div className={styles.formPanel}>
                    <div className={styles.formWrapper}>
                        <div className={styles.formHeader}>
                            <h2 className={styles.formTitle}>
                                Đăng nhập vào <span className={styles.highlight}>RIMO</span>
                            </h2>
                            <p className={styles.formSubtitle}>
                                Nhập thông tin đăng nhập của bạn để tiếp tục
                            </p>
                        </div>
                        <InputTextLogin
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
                        <InputPasswordLogin
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
                        <button onClick={handleLoginSubmit} className={styles.submitButton}>
                            <span className={styles.buttonText}>Đăng nhập</span>
                            <span className={styles.buttonIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </span>
                            <div className={styles.buttonGlow}></div>
                        </button>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </div>
    )
}

export default LoginPage