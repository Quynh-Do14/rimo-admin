import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../asset/css/common/breadcumb.module.css'
interface BreadCrumb {
    text: string,
    url?: string,
}
type Props = {
    breadcrumb: BreadCrumb[],
}
const BreadCrumb = (props: Props) => {
    const { breadcrumb } = props;

    return (
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
            <ol className={styles.breadcrumbList}>
                {breadcrumb.map((item, index) => {
                    const isLastItem = index === breadcrumb.length - 1;

                    return (
                        <li key={index} className={styles.breadcrumbItem}>
                            {!item.url || isLastItem ? (
                                <span
                                    className={`${styles.breadcrumbText} ${isLastItem ? styles.active : ''}`}
                                    aria-current={isLastItem ? "page" : undefined}
                                >
                                    {item.text}
                                </span>
                            ) : (
                                <>
                                    <Link to={item.url} className={styles.breadcrumbLink}>
                                        {item.text}
                                    </Link>
                                    {!isLastItem && (
                                        <span className={styles.separator}>›</span>
                                    )}
                                </>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default BreadCrumb;
