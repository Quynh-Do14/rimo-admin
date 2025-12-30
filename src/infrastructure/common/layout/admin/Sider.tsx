import styles from "../../../../asset/css/admin/layout.module.css";
import { Tooltip, Collapse } from "antd";
import Constants from "../../../../core/common/constants";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../asset/img/logo.png";
import { useState } from "react";

const { Panel } = Collapse;

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);

    // Kiểm tra xem menu item có active không
    const isActive = (url: string) => {
        return location.pathname === url;
    };

    // Kiểm tra xem menu item con có active không
    const hasActiveChild = (children: any[]) => {
        return children?.some(child => isActive(child.url));
    };

    const handlePanelChange = (keys: string | string[]) => {
        setOpenKeys(typeof keys === 'string' ? [keys] : keys);
    };

    return (
        <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
            <h2 className={styles.logo}>
                <img src={logo} alt="rimo" height={80} />
            </h2>
            <nav>
                <ul className={styles.menu}>
                    {Constants.Menu.PrivateList.map((item, index) => {
                        // Nếu có children, hiển thị dạng dropdown
                        if (item.children && item.children.length > 0) {
                            const isActiveParent = hasActiveChild(item.children);

                            return (
                                <Tooltip title={item.text} key={item.id}>
                                    <li className={`${styles.menuItem} ${isActiveParent ? styles.active : ''}`}>
                                        <Collapse
                                            bordered={false}
                                            expandIconPosition="end"
                                            onChange={handlePanelChange}
                                            activeKey={openKeys}
                                            className={styles.collapseMenu}
                                        >
                                            <Panel
                                                header={
                                                    <div className={styles.panelHeader}>
                                                        <i className={item.icon}></i>
                                                        <span className={styles.menuText}>{item.text}</span>
                                                        <i className={`fas fa-chevron-down ${styles.chevronIcon}`}></i>
                                                    </div>
                                                }
                                                key={item.id.toString()}
                                                showArrow={false}
                                                className={styles.customPanel}
                                            >
                                                <ul className={styles.submenu}>
                                                    {item.children.map((child) => (
                                                        <li
                                                            key={child.id}
                                                            className={`${styles.submenuItem} ${isActive(child.url) ? styles.active : ''}`}
                                                        >
                                                            <Link to={child.url}>
                                                                <i className={child.icon}></i>
                                                                <span>{child.text}</span>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Panel>
                                        </Collapse>
                                    </li>
                                </Tooltip>
                            );
                        }

                        // Nếu không có children, hiển thị bình thường
                        return (
                            <Tooltip title={item.text} key={item.id}>
                                <li className={`${styles.menuItem} ${isActive(item.url) ? styles.active : ''} text-truncate`}>
                                    <Link to={item.url}>
                                        <i className={item.icon}></i>
                                        <span className={styles.menuText}>{item.text}</span>
                                    </Link>
                                </li>
                            </Tooltip>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
}