import React from 'react';
import styles from '../../../asset/css/common/status.module.css'
type StatusProps = {
    title: string;
    status: boolean;
};
export const StatusCommon = ({ title, status }: StatusProps) => {
    // Kết hợp class tĩnh và class động theo điều kiện
    const containerClass = `${styles.statusContainer} ${status ? styles.statusActive : styles.statusInactive
        }`;

    return (
        <div className={containerClass}>
            <span className={styles.statusDot}></span>
            <span className={styles.whiteSpaceNowrap}>{title}</span>
        </div>
    );
};

type RoleProps = {
    title: string;
    roleId: number;
};

export const RoleCommon = ({ title, roleId }: RoleProps) => {
    // Bản đồ ánh xạ giá trị sang class tương ứng
    const roleMap: Record<number, string> = {
        1: styles.statusAdmin,
        2: styles.statusSeller,
        3: styles.statusEditor,
    };

    // Lấy class dựa trên roleId, nếu không có thì để trống
    const activeClass = roleMap[roleId] || "";

    return (
        <div className={`${styles.badgeContainer} ${activeClass}`}>
            <span className={styles.indicatorDot}></span>
            <span className={styles.textTruncate}>{title}</span>
        </div>
    );
};