import { useState, useRef, useEffect } from "react";
import styles from "../../../../asset/css/admin/layout.module.css";
import BreadCrumb from "../../breadcrumb/BreadCrumb";
import avatar from "../../../../asset/img/avatar.png";
import authService from "../../../repository/auth/auth.service";
import { ROUTE_PATH } from "../../../../core/common/appRouter";
import { AuthInterface } from "../../../interface/auth/auth.interface";

type Props = {
    breadcrumb: string
    title: string
    redirect: string
    onToggleSidebar: () => void
    onLogout?: () => void
    profileState: AuthInterface
}

export default function Header(props: Props) {
    const { breadcrumb, title, redirect, onToggleSidebar, onLogout, profileState } = props
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const breadCrumb = [
        {
            text: 'Trang chủ',
            url: '/',
        },
        {
            text: breadcrumb,
            url: redirect,
        },
        {
            text: title
        },
    ];

    // Xử lý đăng xuất
    const handleLogout = async () => {
        try {
            await authService.logout(() => { })
                .then(() => {
                    window.location.href = ROUTE_PATH.LOGIN;
                })
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <button onClick={onToggleSidebar} className={styles.toggleBtn}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </button>
                <BreadCrumb breadcrumb={breadCrumb} />
            </div>

            <div className={styles.headerRight}>
                <div className={styles.avatarContainer} ref={dropdownRef}>
                    <button
                        className={styles.avatarBtn}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <img
                            src={avatar}
                            alt="avatar"
                            width={50}
                            height={50}
                            className={styles.avatar}
                        />
                        <i className={`fa fa-chevron-down ${styles.chevron}`} aria-hidden="true"></i>
                    </button>

                    {showDropdown && (
                        <div className={styles.dropdown}>
                            <div className={styles.dropdownHeader}>
                                <img
                                    src={avatar}
                                    alt="avatar"
                                    width={40}
                                    height={40}
                                    className={styles.dropdownAvatar}
                                />
                                <div className={styles.userInfo}>
                                    <p className={styles.userName}>{profileState.name}</p>
                                    <p className={styles.userEmail}>{profileState.role_name}</p>
                                </div>
                            </div>

                            <div className={styles.dropdownDivider}></div>

                            {/* <a href="/admin/profile" className={styles.dropdownItem}>
                                <i className="fa fa-user" aria-hidden="true"></i>
                                <span>Thông tin tài khoản</span>
                            </a>

                            <a href="/admin/settings" className={styles.dropdownItem}>
                                <i className="fa fa-cog" aria-hidden="true"></i>
                                <span>Cài đặt</span>
                            </a> */}

                            <div className={styles.dropdownDivider}></div>

                            <button
                                className={styles.logoutBtn}
                                onClick={handleLogout}
                            >
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}