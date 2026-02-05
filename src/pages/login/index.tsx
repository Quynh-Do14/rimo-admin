import { useState } from 'react'
import authService from '../../infrastructure/repository/auth/auth.service';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import { Form, Input } from 'antd';
import styles from '../../asset/css/admin/login.module.css';

const LoginPage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const router = useNavigate()
    const handleLoginSubmit = async () => {
        try {
            const response = await authService.login(
                {
                    email: formData.email,
                    password: formData.password,
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
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý login logic
        console.log('Login submitted:', formData);
        handleLoginSubmit()
    };

    return (
        <div className={styles.loginPage}>
            {/* Decorative Elements */}
            <div className={styles.backgroundPattern}></div>
            <div className={styles.goldGlow}></div>

            <div className={styles.loginContainer}>
                {/* Left Panel - Branding */}
                <div className={styles.brandPanel}>
                    
                </div>

                {/* Right Panel - Login Form */}
                <div className={styles.formPanel}>
                    <div className={styles.formWrapper}>
                        {/* Form Header */}
                        <div className={styles.formHeader}>
                            <h2 className={styles.formTitle}>
                                Đăng nhập vào <span className={styles.highlight}>Hệ thống</span>
                            </h2>
                            <p className={styles.formSubtitle}>
                                Nhập thông tin đăng nhập của bạn để tiếp tục
                            </p>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className={styles.loginForm}>
                            {/* Email Field */}
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>
                                    <svg className={styles.labelIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M22 6L12 13L2 6"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Email</span>
                                </label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={styles.textInput}
                                        placeholder="your@email.com"
                                        required
                                    />
                                    <div className={styles.inputBorder}></div>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className={styles.inputGroup}>
                                <label className={styles.inputLabel}>
                                    <svg className={styles.labelIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M19.5 12C19.5 15.18 17.18 17.5 14 17.5C13.5 17.5 13 17.4 12.5 17.2M4.5 12C4.5 8.82 6.82 6.5 10 6.5C11.5 6.5 12.9 7.1 13.9 8.1"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span>Mật khẩu</span>
                                </label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className={styles.textInput}
                                        placeholder="••••••••"
                                        required
                                    />
                                    <div className={styles.inputBorder}></div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className={styles.passwordToggle}
                                        aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                    >
                                        {showPassword ? (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
                                                <circle cx="12" cy="12" r="3" />
                                                <path d="M18 6L6 18" />
                                            </svg>
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className={styles.submitButton}>
                                <span className={styles.buttonText}>Đăng nhập</span>
                                <span className={styles.buttonIcon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <div className={styles.buttonGlow}></div>
                            </button>

                        </form>
                    </div>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </div>
    )
}

export default LoginPage