import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
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
import contactService from '../../infrastructure/repository/contact/contact.service';

let timeout: any
const ContactListPage = () => {
    const [listResponse, setListResponse] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");

    const [idSelected, setIdSelected] = useState<string>("");

    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const router = useNavigate();

    const onGetListAsync = async ({ search = "", size = pageSize, page = currentPage }) => {
        const param = {
            page: page,
            limit: size,
            search: search,
        }
        try {
            await contactService.GetContact(
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

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, currentPage,).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
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

    const onNavigate = (id: any) => {
        router(`${(ROUTE_PATH.CONTACT_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")
            }${id}`);
    }

    return (
        <AdminLayout
            breadcrumb={"Quản lý liên hệ"}
            title={"Quản lý liên hệ"}
            redirect={ROUTE_PATH.CONTACT_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <h2>Quản lý liên hệ</h2>
                <div className={styles.searchBar}>
                    <Input
                        className="form-control"
                        placeholder="Tìm kiếm theo tên"
                        value={searchText}
                        onChange={onChangeSearchText}
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
                                    title="Tiêu đề"
                                    width={'150px'}
                                />
                            }
                            key={"name"}
                            dataIndex={"name"}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Email"
                                    width={'150px'}
                                />
                            }
                            key={"email"}
                            dataIndex={"email"}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Số điện thoại"
                                    width={'150px'}
                                />
                            }
                            key={"phone_number"}
                            dataIndex={"phone_number"}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Nội dung"
                                    width={'250px'}
                                />
                            }
                            key={"message"}
                            dataIndex={"message"}
                        />
                        {/* <Table.Column
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
                        /> */}
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
                {/* <DialogConfirmCommon
                    message={"Bạn có muốn xóa liên hệ này ra khỏi hệ thống"}
                    titleCancel={"Bỏ qua"}
                    titleOk={"Xóa"}
                    visible={isDeleteModal}
                    handleCancel={onCloseModalDelete}
                    handleOk={onDeleteAsync}
                    title={"Xác nhận"}
                /> */}
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >

    );
}
export default ContactListPage;