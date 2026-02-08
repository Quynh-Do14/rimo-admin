import React, { useEffect, useState } from 'react';
import { Table, Input, Pagination, Space, Button, Row, Col } from 'antd';
import styles from '../../asset/css/admin/admin-component.module.css';
import { useNavigate } from 'react-router-dom';
import productService from '../../infrastructure/repository/product/product.service';
import Constants from '../../core/common/constants';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import { ROUTE_PATH } from '../../core/common/appRouter';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import { TitleTableCommon } from '../../infrastructure/common/text/title-table-common';
import { ActionCommon } from '../../infrastructure/common/action/action-common';
import { PaginationCommon } from '../../infrastructure/common/pagination/PaginationPageSize';
import DialogConfirmCommon from '../../infrastructure/common/modal/dialogConfirm';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import SelectSearchCommon from '../../infrastructure/common/input/select-search-common';
import { useRecoilValue } from 'recoil';
import { BrandState } from '../../core/atoms/brand/brandState';
import { CategoryProductState } from '../../core/atoms/category/categoryState';
import { StatusCommon } from '../../infrastructure/common/controls/Status';
import { ProductInterface } from '../../infrastructure/interface/product/product.interface';

let timeout: any
const ProductListPage = () => {
    const [listResponse, setListResponse] = useState<Array<ProductInterface>>([])
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");
    const [brandId, setBrandId] = useState<string>("");
    const [active, setActive] = useState<string>("");

    const [idSelected, setIdSelected] = useState<string>("");

    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const router = useNavigate();
    const brandState = useRecoilValue(BrandState).data;
    const categoryProductState = useRecoilValue(CategoryProductState).data;
    const onGetListAsync = async ({ search = "", category_id = "", brand_id = "", active = "", size = pageSize, page = currentPage }) => {
        const param = {
            page: page,
            limit: size,
            search: search,
            category_id: category_id,
            brand_id: brand_id,
            active: active
        }
        try {
            await productService.GetProduct(
                param,
                setLoading
            ).then((res) => {
                setListResponse(res.data)
                setTotal(res.total)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    const onSearch = async (search = "", category_id = "", brand_id = "", active = "", size = pageSize, page = 1) => {
        await onGetListAsync({ search: search, category_id: category_id, brand_id: brand_id, active: active, size: size, page: page });
    };

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, categoryId, brandId, active, pageSize, currentPage,).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, []);

    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, categoryId, brandId, active, pageSize, value).then(_ => { });
    };

    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, categoryId, brandId, active, value, 1).then(_ => { });
    };

    const onChangeCategory = async (value: any) => {
        setCategoryId(value)
        await onSearch(searchText, value, brandId, active, pageSize, currentPage).then(_ => { });
    };

    const onChangeActive = async (value: any) => {
        setActive(value)
        await onSearch(searchText, categoryId, brandId, value, pageSize, currentPage).then(_ => { });
    };
    // Xóa bài
    const onOpenModalDelete = (id: any) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };

    const onDeleteAsync = async () => {
        try {
            await productService.DeleteProductAdmin(
                idSelected,
                setLoading
            ).then((res) => {
                if (res) {
                    setIsDeleteModal(false);
                    onSearch().then(() => { });
                }
            })
        }
        catch (error) {
            console.error(error)
        }
    };

    const onNavigate = (id: any) => {
        router(`${(ROUTE_PATH.VIEW_PRODUCT_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }

    return (
        <AdminLayout
            breadcrumb={"Quản lý sản phẩm"}
            title={"Quản lý sản phẩm"}
            redirect={ROUTE_PATH.PRODUCT_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <h2>Quản lý sản phẩm</h2>
                <Row gutter={[15, 15]}>
                    <Col xs={24} md={7}>
                        <Input
                            className="form-control"
                            placeholder="Tìm kiếm theo tên"
                            value={searchText}
                            onChange={onChangeSearchText}
                        />
                    </Col>
                    <Col xs={24} md={7}>
                        <SelectSearchCommon
                            listDataOfItem={categoryProductState}
                            onChange={onChangeCategory}
                            value={categoryId}
                            label={'Danh mục'}
                        />
                    </Col>
                    <Col xs={24} md={7}>
                        <SelectSearchCommon
                            listDataOfItem={Constants.DisplayConfig.List}
                            onChange={onChangeActive}
                            value={active}
                            label={'Trạng thái'}
                            labelName='label'
                            valueName='value'
                        />
                    </Col>
                    <Col xs={24} md={3}>
                        <ButtonHref
                            href={ROUTE_PATH.ADD_PRODUCT_MANAGEMENT}
                            title={'Thêm mới'}
                            variant={'ps-btn--fullwidth'}
                        />
                    </Col>
                </Row>
                <div className={styles.table_container}>
                    <Table
                        dataSource={listResponse}
                        loading={loading}
                        rowKey="id"
                        pagination={false}
                        className='table-common'
                    >
                        <Table.Column
                            title={"STT"}
                            dataIndex="stt"
                            key="stt"
                            width={"5%"}
                            render={(val, record, index) => (
                                <div style={{ textAlign: "center" }}>
                                    {index + 1 + pageSize * (currentPage - 1)}
                                </div>
                            )}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Tên sản phẩm"
                                    width={'150px'}
                                />
                            }
                            key={"name"}
                            dataIndex={"name"}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Danh mục"
                                    width={'150px'}
                                />
                            }
                            key={"category_name"}
                            dataIndex={"category_name"}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Mô tả ngắn"
                                    width={'200px'}
                                />
                            }
                            key={"short_description"}
                            dataIndex={"short_description"}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Trạng thái"
                                    width={'100px'}
                                />
                            }
                            key={"active"}
                            dataIndex={"active"}
                            render={(val) => {
                                const result = Constants.DisplayConfig.List.find(item => item.value == val)
                                if (result) {
                                    return <StatusCommon title={result.label} status={result.value} />
                                }
                                return
                            }}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Thao tác"
                                    width={"60px"}
                                />
                            }
                            fixed="right"
                            align='center'
                            width={"60px"}
                            render={(action, record: any) => (
                                <ActionCommon
                                    onClickDetail={() => onNavigate(record.id)}
                                    onClickDelete={() => onOpenModalDelete(record.id)}
                                />
                            )}
                        />
                    </Table>
                </div>
                <div className={styles.pagination}>
                    <PaginationCommon
                        currentPage={currentPage}
                        pageSize={pageSize}
                        total={total}
                        onChangePage={onChangePage}
                        onChangeSize={onPageSizeChanged}
                        disabled={false}
                    />
                </div>
                <DialogConfirmCommon
                    message={"Bạn có muốn xóa sản phẩm này ra khỏi hệ thống"}
                    titleCancel={"Bỏ qua"}
                    titleOk={"Xóa"}
                    visible={isDeleteModal}
                    handleCancel={onCloseModalDelete}
                    handleOk={onDeleteAsync}
                    title={"Xác nhận"}
                />
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout>

    );
}
export default ProductListPage;