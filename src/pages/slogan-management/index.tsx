import React, { useEffect, useState } from 'react';
import { Table, Input, Pagination, Space, Button, Image, Col, Row } from 'antd';
import styles from '../../asset/css/admin/admin-component.module.css';
import { useNavigate } from 'react-router-dom';
import Constants from '../../core/common/constants';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import { ROUTE_PATH } from '../../core/common/appRouter';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import { TitleTableCommon } from '../../infrastructure/common/text/title-table-common';
import { configImageURL } from '../../infrastructure/helper/helper';
import { ActionCommon } from '../../infrastructure/common/action/action-common';
import { PaginationCommon } from '../../infrastructure/common/pagination/PaginationPageSize';
import DialogConfirmCommon from '../../infrastructure/common/modal/dialogConfirm';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import sloganService from '../../infrastructure/repository/slogan/slogan.service';
import { SloganInterface } from '../../infrastructure/interface/slogan/slogan.interface';
import { StatusCommon } from '../../infrastructure/common/controls/Status';
import SelectSearchCommon from '../../infrastructure/common/input/select-search-common';
import { ActionAdvangeCommon } from '../../infrastructure/common/action/action-approve-common';

let timeout: any
const SloganListPage = () => {
    const [listResponse, setListResponse] = useState<Array<SloganInterface>>([])
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [active, setActive] = useState<string>("");
    const [idSelected, setIdSelected] = useState<string>("");

    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const router = useNavigate();

    const onGetListAsync = async ({ search = "", active = "", size = pageSize, page = currentPage }) => {
        const param = {
            page: page,
            limit: size,
            search: search,
            active: active
        }
        try {
            await sloganService.GetSlogan(
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
    const onSearch = async (search = "", active = "", size = pageSize, page = 1) => {
        await onGetListAsync({ search: search, active: active, size: size, page: page });
    };

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, active, pageSize, currentPage,).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, []);

    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, active, pageSize, value).then(_ => { });
    };

    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, active, value, 1).then(_ => { });
    };

    const onChangeActive = async (value: any) => {
        setActive(value)
        await onSearch(searchText, value, pageSize, currentPage).then(_ => { });
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
            await sloganService.DeleteSloganAdmin(
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
        router(`${(ROUTE_PATH.EDIT_SLOGAN_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }

    const onView = (id: any) => {
        router(`${(ROUTE_PATH.VIEW_SLOGAN_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <AdminLayout
            breadcrumb={"Quản lý hình ảnh trong trang chủ"}
            title={""}
            redirect={ROUTE_PATH.SLOGAN_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <h2>Quản lý hình ảnh trong trang chủ</h2>
                <Row gutter={[15, 15]}>
                    <Col xs={24} md={8} lg={9}>
                        <Input
                            className="form-control"
                            placeholder="Tìm kiếm theo tiêu đề"
                            value={searchText}
                            onChange={onChangeSearchText}
                        />
                    </Col>
                    <Col xs={24} md={8} lg={9}>
                        <SelectSearchCommon
                            listDataOfItem={Constants.DisplayConfig.List}
                            onChange={onChangeActive}
                            value={active}
                            label={'Trạng thái'}
                            labelName='label'
                            valueName='value'
                        />
                    </Col>
                    <Col xs={24} md={4} lg={3}>
                        <ButtonHref
                            href={ROUTE_PATH.EDIT_INDEX_SLOGAN_MANAGEMENT}
                            title={'Thay đổi vị trí'}
                            variant={'ps-btn--fullwidth'}
                        />
                    </Col>
                    <Col xs={24} md={4} lg={3}>
                        <ButtonHref
                            href={ROUTE_PATH.ADD_SLOGAN_MANAGEMENT}
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
                                    title="Ảnh"
                                    width={'150px'}
                                />
                            }
                            key={"image"}
                            dataIndex={"image"}
                            render={(val, record) => {
                                return (
                                    <Image src={configImageURL(val)} alt="" width={200} />
                                )
                            }}
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
                                    title="Thứ tự"
                                    width={'100px'}
                                />
                            }
                            key={"index"}
                            dataIndex={"index"}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Nội dung"
                                    width={'150px'}
                                />
                            }
                            key={"description"}
                            dataIndex={"description"}
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
                    message={"Bạn có muốn xóa hình ảnh này ra khỏi hệ thống"}
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
export default SloganListPage;