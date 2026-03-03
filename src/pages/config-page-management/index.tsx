import React, { useEffect, useState } from 'react';
import { Table, Input, Row, Col } from 'antd';
import styles from '../../asset/css/admin/admin-component.module.css';
import { useNavigate } from 'react-router-dom';
import Constants from '../../core/common/constants';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import { ROUTE_PATH } from '../../core/common/appRouter';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import { TitleTableCommon } from '../../infrastructure/common/text/title-table-common';
import { ActionCommon } from '../../infrastructure/common/action/action-common';
import { PaginationCommon } from '../../infrastructure/common/pagination/PaginationPageSize';
import DialogConfirmCommon from '../../infrastructure/common/modal/dialogConfirm';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import { ConfigPageInterface } from '../../infrastructure/interface/configPage/configPage.interface';
import configPageService from '../../infrastructure/repository/config-page/configPage.service';
import SelectSearchCommon from '../../infrastructure/common/input/select-search-common';

let timeout: any
const ConfigPageListPage = () => {
    const [listResponse, setListResponse] = useState<Array<ConfigPageInterface>>([])
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [idSelected, setIdSelected] = useState<string>("");

    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const router = useNavigate();

    const onGetListAsync = async ({ search = "", type = "", size = pageSize, page = currentPage, }) => {
        const param = {
            page: page,
            limit: size,
            search: search,
            type: type
        }
        try {
            await configPageService.GetConfigPage(
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
    const onSearch = async (search = "", type = "", size = pageSize, page = 1) => {
        await onGetListAsync({ search: search, type: type, size: size, page: page });
    };

    const onChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, type, pageSize, currentPage,).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, []);

    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, type, pageSize, value).then(_ => { });
    };

    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, type, value, 1).then(_ => { });
    };

    const onChangeType = async (value: string) => {
        setType(value)
        await onSearch(searchText, value, pageSize, currentPage).then(_ => { });
    };

    // Xóa bài
    const onOpenModalDelete = (id: string) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };

    const onDeleteAsync = async () => {
        try {
            await configPageService.DeleteConfigPageAdmin(
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
        router(`${(ROUTE_PATH.EDIT_CONFIG_PAGE_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    return (
        <AdminLayout
            breadcrumb={"Quản lý nội dung"}
            title={""}
            redirect={ROUTE_PATH.CONFIG_PAGE_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <h2>Quản lý nội dung</h2>
                <Row gutter={[15, 15]}>
                    <Col xs={24} md={9}>
                        <Input
                            className="form-control"
                            placeholder="Tìm kiếm theo tiêu đề"
                            value={searchText}
                            onChange={onChangeSearchText}
                        />
                    </Col>
                    <Col xs={24} md={9}>
                        <SelectSearchCommon
                            listDataOfItem={Constants.ConfigPage.List}
                            onChange={onChangeType}
                            value={type}
                            label={'Loại nội dung'}
                            labelName='label'
                            valueName='value'
                        />
                    </Col>
                    <Col xs={24} md={3}>
                        <ButtonHref
                            href={ROUTE_PATH.EDIT_INDEX_CONFIG_PAGE_MANAGEMENT}
                            title={'Thay đổi vị trí'}
                            variant={'ps-btn--fullwidth'}
                        />
                    </Col>
                    <Col xs={24} md={3}>
                        <ButtonHref
                            href={ROUTE_PATH.ADD_CONFIG_PAGE_MANAGEMENT}
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
                                    title="Tiêu đề"
                                    width={'150px'}
                                />
                            }
                            key={"title"}
                            dataIndex={"title"}
                            render={(val, record: ConfigPageInterface) => {
                                const result = Constants.ConfigPage.List.find(item => item.value == record.type)
                                return (
                                    <article
                                        style={{
                                            background: result?.darkBackground ? "linear-gradient(180deg, #1c1915 0%, #302c26 100%)" : "#FFF",
                                            textAlign: 'center',
                                            padding: "12px 0"
                                        }}
                                        dangerouslySetInnerHTML={{ __html: val }}
                                    />
                                )
                            }}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Nội dung thẻ"
                                    width={'150px'}
                                />
                            }
                            key={"box_content"}
                            dataIndex={"box_content"}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Mô tả"
                                    width={'150px'}
                                />
                            }
                            key={"description"}
                            dataIndex={"description"}
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
                                    title="Loại nội dung"
                                    width={'200px'}
                                />
                            }
                            key={"type"}
                            dataIndex={"type"}
                            render={(val, _record) => {
                                const result = Constants.ConfigPage.List.find(item => item.value == val)
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
                    message={"Bạn có muốn xóa nội dung này ra khỏi hệ thống"}
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
export default ConfigPageListPage;