import styles from "../../../../asset/css/admin/layout.module.css";
import BreadCrumb from "../../breadcrumb/BreadCrumb";
import avatar from "../../../../asset/img/avatar.png";

type Props = {
    breadcrumb: string
    title: string
    redirect: string
    onToggleSidebar: () => void
}
export default function Header(props: Props) {
    const { breadcrumb, title, redirect, onToggleSidebar } = props
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

    return (
        <header className={styles.header}>
            <div className={styles.headerLeft}>
                <button onClick={onToggleSidebar} className={styles.toggleBtn}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </button>
                <BreadCrumb breadcrumb={breadCrumb} />
            </div>

            <div className={styles.headerRight}>
                <img src={avatar} alt="avatar" width={50} height={50} />
            </div>
        </header>
    );
}