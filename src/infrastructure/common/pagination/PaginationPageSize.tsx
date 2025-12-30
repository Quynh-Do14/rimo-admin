import { Pagination, Select } from "antd";
import styles from "../../../asset/css/components/pagination.module.css";
import Constants from "../../../core/common/constants";

type Props = {
    total: number,
    currentPage: number,
    onChangePage: any,
    pageSize: number,
    onChangeSize: any,
    disabled: boolean,
}

export const PaginationCommon = (props: Props) => {
    const {
        total,
        currentPage = 1,
        onChangePage,
        pageSize,
        onChangeSize,
        disabled = false,
    } = props;

    const dataPagination: any[] = Constants.PaginationConfigs.PageSizeList;

    return (
        <div className={styles.containerPagination}>
            <Pagination
                current={currentPage}
                total={total}
                showSizeChanger={false}
                pageSize={pageSize}
                onChange={onChangePage}
            />
            <div className={styles.containerPageSize}>
                <div className={styles.showTitle}>Số bản ghi mỗi trang</div>
                <div className={styles.selectPageSize}>
                    <Select
                        value={pageSize}
                        showSearch
                        className="w-full"
                        onChange={onChangeSize}
                        disabled={disabled}
                        getPopupContainer={(trigger) => trigger.parentNode}
                    >
                        {dataPagination.length > 0 && dataPagination.map((item, index) => (
                            <Select.Option
                                key={index}
                                value={item.value}
                                title={item.label}
                            >
                                {item.label}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </div>
        </div>
    );
};
