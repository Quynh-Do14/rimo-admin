import React, { useEffect, useState } from 'react';
import { Table, Col, Row } from 'antd';
import styles from '../../asset/css/admin/admin-component.module.css';
import { useNavigate } from 'react-router-dom';
import Constants from '../../core/common/constants';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import { ROUTE_PATH } from '../../core/common/appRouter';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import { TitleTableCommon } from '../../infrastructure/common/text/title-table-common';
import { PaginationCommon } from '../../infrastructure/common/pagination/PaginationPageSize';
import DialogConfirmCommon from '../../infrastructure/common/modal/dialogConfirm';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import SelectSearchCommon from '../../infrastructure/common/input/select-search-common';
import { CategoryBlogState } from '../../core/atoms/category/categoryState';
import { useRecoilValue } from 'recoil';
import { ActionAdvangeCommon } from '../../infrastructure/common/action/action-approve-common';
import { BlogInterface } from '../../infrastructure/interface/blog/blog.interface';
import { ContentPageInterface } from '../../infrastructure/interface/contentPage/contentPage.interface';
import contentPageService from '../../infrastructure/repository/contentPage/contentPage.service';

let timeout: any
const ContentPageListPage = () => {
    const [listResponse, setListResponse] = useState<Array<ContentPageInterface>>([])
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [type, settype] = useState<string>("");

    const [idSelected, setIdSelected] = useState<string>("");

    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const router = useNavigate();
    const categoryBlogState = useRecoilValue(CategoryBlogState).data;

    const onGetListAsync = async ({ type = "", size = pageSize, page = currentPage }) => {
        const param = {
            page: page,
            limit: size,
            type: type
        }
        try {
            await contentPageService.GetContentPage(
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
    const onSearch = async (type = "", size = pageSize, page = 1) => {
        await onGetListAsync({ type: type, size: size, page: page });
    };


    useEffect(() => {
        onSearch().then(_ => { });
    }, []);

    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(type, pageSize, value).then(_ => { });
    };

    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(type, value, 1).then(_ => { });
    };
    const onChangetype = async (value: any) => {
        settype(value)
        await onSearch(value, pageSize, currentPage).then(_ => { });
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
            await contentPageService.DeleteContentPageAdmin(
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
        router(`${(ROUTE_PATH.EDIT_CONTENT_PAGE_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    };

    const onView = (id: any) => {
        router(`${(ROUTE_PATH.VIEW_CONTENT_PAGE_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    };

    return (
        <AdminLayout
            breadcrumb={"Quản lý nội dung trang"}
            title={""}
            redirect={ROUTE_PATH.CONTENT_PAGE_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <h2>Quản lý nội dung trang</h2>
                <Row gutter={[15, 15]}>
                    <Col xs={24} md={21}>
                        <SelectSearchCommon
                            listDataOfItem={Constants.ContentPage.ListType}
                            onChange={onChangetype}
                            value={type}
                            label={'Loại trang'}
                            labelName='label'
                            valueName='value'
                        />
                    </Col>
                    <Col xs={24} md={3}>
                        <ButtonHref
                            href={ROUTE_PATH.ADD_CONTENT_PAGE_MANAGEMENT}
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
                                    title="Loại trang"
                                    width={'200px'}
                                />
                            }
                            key={"type"}
                            dataIndex={"type"}
                            render={(val, _record) => {
                                const result = Constants.ContentPage.ListType.find(item => item.value == val)
                                return <div>{result?.label || ""}</div>
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
                                <ActionAdvangeCommon
                                    show='Xem chi tiết'
                                    onClickShow={() => onView(record.id)}
                                    detail={'Sửa'}
                                    onClickDetail={() => onNavigate(record.id)}
                                    approve={''}
                                    onClickApprove={() => { }}
                                    remove={'Xóa'}
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
                    message={"Bạn có muốn xóa nội dung trang này ra khỏi hệ thống"}
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
export default ContentPageListPage;