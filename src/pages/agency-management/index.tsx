import React, { useEffect, useState } from 'react';
import { Table, Input, Col, Row, } from 'antd';
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
import agencyService from '../../infrastructure/repository/agency/agency.service';
import districtService from '../../infrastructure/repository/district/district.service';
import SelectSearchCommon from '../../infrastructure/common/input/select-search-common';
import SelectSearchProvince from '../../infrastructure/common/input/select-search-province';
import { StatusCommon } from '../../infrastructure/common/controls/Status';
import { ActionAdvangeCommon } from '../../infrastructure/common/action/action-approve-common';

let timeout: any
const AgencyListPage = () => {
    const [listResponse, setListResponse] = useState<Array<any>>([])
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>("");
    const [province, setProvince] = useState<string>("");
    const [district, setDistrict] = useState<string>("");
    const [active, setActive] = useState<string>("");
    const [listProvince, setListProvince] = useState<Array<any>>([])
    const [listDistrict, setListDistrict] = useState<Array<any>>([])
    const [idSelected, setIdSelected] = useState<string>("");

    const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);

    const router = useNavigate();

    const onGetListAsync = async ({ search = "", province = "", district = "", active = "", size = pageSize, page = currentPage }) => {
        const param = {
            page: page,
            limit: size,
            search: search,
            province: province,
            district: district,
            active: active
        }
        try {
            await agencyService.GetAgency(
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
    const onSearch = async (search = "", province = "", district = "", active = "", size = pageSize, page = 1) => {
        await onGetListAsync({ search: search, province: province, district: district, active: active, size: size, page: page });
    };

    const onChangeSearchText = (e: any) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, province, district, active, pageSize, currentPage,).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, []);

    const onChangePage = async (value: any) => {
        setCurrentPage(value)
        await onSearch(searchText, province, district, active, pageSize, value).then(_ => { });
    };

    const onPageSizeChanged = async (value: any) => {
        setPageSize(value)
        setCurrentPage(1)
        await onSearch(searchText, province, district, active, value, 1).then(_ => { });
    };

    const onChangeProvince = async (value: any) => {
        setProvince(value)
        await onSearch(searchText, value, district, active, pageSize, currentPage).then(_ => { });
    };

    const onChangeDistrict = async (value: any) => {
        setDistrict(value)
        await onSearch(searchText, province, value, active, pageSize, currentPage).then(_ => { });
    };

    const onChangeActive = async (value: any) => {
        setActive(value)
        await onSearch(searchText, province, district, value, pageSize, currentPage).then(_ => { });
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
            await agencyService.DeleteAgencyAdmin(
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
        router(`${(ROUTE_PATH.EDIT_AGENCY_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }

    const onView = (id: any) => {
        router(`${(ROUTE_PATH.VIEW_AGENCY_MANAGEMENT).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    };


    const onGetListProvinceAsync = async () => {
        const param = {

        }
        try {
            await districtService.getAll(
                param,
                setLoading
            ).then((res) => {
                setListProvince(res);
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    const onGetListDistrictAsync = async () => {
        if (province) {
            try {
                await districtService.getDetail(
                    String(province).split('-')[0],
                    setLoading
                ).then((res) => {
                    setListDistrict(res.districts);
                })
            }
            catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        onGetListProvinceAsync().then(_ => { });
    }, []);

    useEffect(() => {
        onGetListDistrictAsync().then(_ => { });
    }, [province]);

    return (
        <AdminLayout
            breadcrumb={"Quản lý đại lý"}
            title={"Quản lý đại lý"}
            redirect={ROUTE_PATH.AGENCY_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <h2>Quản lý đại lý</h2>
                <Row gutter={[15, 15]}>
                    <Col xs={24} md={5}>
                        <Input
                            className="form-control"
                            placeholder="Tìm kiếm theo tên"
                            value={searchText}
                            onChange={onChangeSearchText}
                        />
                    </Col>
                    <Col xs={24} md={5}>
                        <SelectSearchProvince
                            listDataOfItem={listProvince}
                            onChange={onChangeProvince}
                            value={province}
                            label={'Tỉnh/TP'}
                            valueName='code'
                            labelName='name'
                        />
                    </Col>
                    <Col xs={24} md={5}>
                        <SelectSearchCommon
                            listDataOfItem={listDistrict}
                            onChange={onChangeDistrict}
                            value={district}
                            label={'Huyện'}
                            valueName='name'
                            labelName='name'
                        />
                    </Col>
                    <Col xs={24} md={5}>
                        <SelectSearchCommon
                            listDataOfItem={Constants.DisplayConfig.List}
                            onChange={onChangeActive}
                            value={active}
                            label={'Trạng thái'}
                            labelName='label'
                            valueName='value'
                        />
                    </Col>
                    <Col xs={24} md={4}>
                        <ButtonHref
                            href={ROUTE_PATH.ADD_AGENCY_MANAGEMENT}
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
                                    <img src={configImageURL(val)} alt="" width={150} height={150} />
                                )
                            }}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Tên đại lý"
                                    width={'150px'}
                                />
                            }
                            key={"name"}
                            dataIndex={"name"}
                        />
                        <Table.Column
                            title={
                                <TitleTableCommon
                                    title="Địa chỉ"
                                    width={'200px'}
                                />
                            }
                            key={"address"}
                            dataIndex={"address"}
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
                    message={"Bạn có muốn xóa đại lý này ra khỏi hệ thống"}
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
export default AgencyListPage;