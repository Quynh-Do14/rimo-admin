import styles from "../../../../asset/css/admin/layout.module.css";
import { Tooltip } from "antd";
import Constants from "../../../../core/common/constants";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../asset/img/logo.png";
import { useState, useEffect } from "react";
import { AuthInterface } from "../../../interface/auth/auth.interface";

export default function Sidebar({ isOpen, profileState }: { isOpen: boolean, profileState: AuthInterface }) {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    // Kiểm tra xem menu item có active không
    const isActive = (url: string) => {
        return location.pathname.includes(url);
    };

    // Kiểm tra xem menu item con có active không
    const hasActiveChild = (children: any[]) => {
        return children?.some(child => isActive(child.url));
    };

    // Hàm xử lý mở/đóng menu
    const handleMenuToggle = (menuId: string) => {
        const idStr = menuId.toString();
        if (openKeys.includes(idStr)) {
            // Nếu đang mở thì đóng lại
            setOpenKeys(openKeys.filter(key => key !== idStr));
        } else {
            // Nếu đang đóng thì mở ra
            setOpenKeys([...openKeys, idStr]);
        }
    };

    // Tự động mở menu cha khi có menu con active
    useEffect(() => {
        // Duyệt qua tất cả menu items để tìm menu cha có con đang active
        const activeParentKeys: string[] = [];

        Constants.Menu.PrivateList.forEach((item) => {
            if (item.children && item.children.length > 0) {
                // Kiểm tra xem menu con có active không
                const hasActiveChildItem = item.children.some(child =>
                    child.role.includes(profileState.role_name) && isActive(child.url)
                );

                if (hasActiveChildItem) {
                    activeParentKeys.push(item.id.toString());
                }
            }
        });

        // Cập nhật state với các menu cha cần mở
        setOpenKeys(activeParentKeys);
    }, [location.pathname, profileState.role_name]);

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <h2 className={styles.logo}>
                <img src={logo} alt="rimo" height={80} />
            </h2>
            <nav>
                <ul className={styles.menu}>
                    {Constants.Menu.PrivateList.map((item, index) => {
                        if (item.role.includes(profileState.role_name)) {
                            // Nếu có children, hiển thị dạng dropdown
                            if (item.children && item.children.length > 0) {
                                const isActiveParent = hasActiveChild(item.children);
                                const isExpanded = openKeys.includes(item.id.toString());

                                return (
                                    <li
                                        className={`${styles.menuItem} ${isActiveParent ? styles.active : ''} ${styles.hasChildren}`}
                                        key={item.id}
                                    >
                                        <div
                                            className={styles.menuHeader}
                                            onClick={() => handleMenuToggle(item.id)}
                                        >
                                            <i className={item.icon}></i>
                                            <span className={styles.menuText}><span>{item.text}</span>
                                                <i className={`fas fa-chevron-down ${styles.chevronIcon} ${isExpanded ? styles.rotated : ''}`}></i>
                                            </span>

                                        </div>

                                        {isExpanded && (
                                            <ul className={styles.submenu}>
                                                {item.children.map((child) => {
                                                    if (child.role.includes(profileState.role_name)) {
                                                        const isChildActive = isActive(child.url);
                                                        return (
                                                            <li
                                                                key={child.id}
                                                                className={`${styles.submenuItem} ${isChildActive ? styles.active : ''}`}
                                                            >
                                                                <Link to={child.url}>
                                                                    <i className={child.icon}></i>
                                                                    <span>{child.text}</span>
                                                                </Link>
                                                            </li>
                                                        )
                                                    }
                                                    return null;
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                );
                            }

                            // Nếu không có children, hiển thị bình thường
                            const isItemActive = isActive(item.url);
                            return (
                                <li className={`${styles.menuItem} ${isItemActive ? styles.active : ''} text-truncate`} key={item.id}>
                                    <Link to={item.url}>
                                        <i className={item.icon}></i>
                                        <span className={styles.menuText}>{item.text}</span>
                                    </Link>
                                </li>
                            )
                        }
                        return null;
                    })}
                </ul>
            </nav>
        </aside>
    );
}