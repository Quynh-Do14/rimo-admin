import React, { useEffect, useState } from 'react';
import { Table, Input, Pagination, Space, Button } from 'antd';
import styles from '../../asset/css/admin/admin-component.module.css';
import Constants from '../../core/common/constants';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import { ROUTE_PATH } from '../../core/common/appRouter';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import { TitleTableCommon } from '../../infrastructure/common/text/title-table-common';
import { ActionCommon } from '../../infrastructure/common/action/action-common';
import { PaginationCommon } from '../../infrastructure/common/pagination/PaginationPageSize';
import DialogConfirmCommon from '../../infrastructure/common/modal/dialogConfirm';
import { useNavigate } from 'react-router-dom';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import { CategoryBlogInterface } from '../../infrastructure/interface/category/categoryBlog.interface';
import seoProductService from '../../infrastructure/repository/seo-product/SEOProduct.service';
import SelectSearchCommon from '../../infrastructure/common/input/select-search-common';
import { CategoryProductState } from '../../core/atoms/category/categoryState';
import { useRecoilValue } from 'recoil';

let timeout: any
const SEOProductListPage = () => {
    const [listResponse, setListResponse] = useState<Array<CategoryBlogInterface>>([])
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [categorySlug, setCategorySlug] = useState<string>("");

    const [idSelected, setIdSelected] = useState<string>("");

    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const router = useNavigate();
    const categoryProductState = useRecoilValue(CategoryProductState).data;
    const newItem = {
        id: 0,
        index: 1000,
        name: "Sản phẩm RIMO",
        slug: "san-pham",
        description: "",
        image: "",
        products: []
    };
    const categoryProductStateNew = [newItem, ...categoryProductState];
    const onGetListAsync = async ({ search = "", size = pageSize, page = currentPage }) => {
        const param = {
            page: page,
            limit: size,
            slug: search,
        }
        try {
            await seoProductService.GetSEOProduct(
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
    const onSearch = async (search = "", size = pageSize, page = 1) => {
        await onGetListAsync({ search: search, size: size, page: page });
    };

    const onChangeCategory = async (value: any) => {
        setCategorySlug(value)
        onSearch(value, pageSize, currentPage,).then((_) => { });
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, []);

    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, pageSize, value).then(_ => { });
    };

    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, value, 1).then(_ => { });
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
            await seoProductService.DeleteSEOProductAdmin(
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
        router(`${(ROUTE_PATH.EDIT_SEO_PRODUCT_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }

    return (
        <AdminLayout
            breadcrumb={"Quản lý bài viết SEO cho sản phẩm"}
            title={""}
            redirect={ROUTE_PATH.SEO_PRODUCT_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <h2>Quản lý bài viết SEO cho sản phẩm</h2>
                <div className={styles.searchBar}>
                    <SelectSearchCommon
                        listDataOfItem={categoryProductStateNew}
                        onChange={onChangeCategory}
                        value={categorySlug}
                        label={'Danh mục'}
                        valueName='slug'
                    />
                    <ButtonHref
                        href={ROUTE_PATH.ADD_SEO_PRODUCT_MANAGEMENT}
                        title={'Thêm mới'}
                        width={150}
                        variant={'ps-btn--fullwidth'}
                    />
                </div>
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
                                    title="Tên danh mục"
                                    width={'150px'}
                                />
                            }
                            key={"title"}
                            dataIndex={"title"}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Đường dẫn"
                                    width={'150px'}
                                />
                            }
                            key={"slug"}
                            dataIndex={"slug"}
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
                    message={"Bạn có muốn xóa danh mục tin tức này ra khỏi hệ thống"}
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
export default SEOProductListPage;