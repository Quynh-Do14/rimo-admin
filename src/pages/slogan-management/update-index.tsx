import React, { useEffect, useState } from 'react'
import { SloganInterface, UpdateIndexSloganInterface } from '../../infrastructure/interface/slogan/slogan.interface'
import sloganService from '../../infrastructure/repository/slogan/slogan.service';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import { ROUTE_PATH } from '../../core/common/appRouter';
import styles from '../../asset/css/admin/admin-component.module.css';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import { Table, Input, Pagination, Space, Button, Image } from 'antd';
import { TitleTableCommon } from '../../infrastructure/common/text/title-table-common';
import { configImageURL } from '../../infrastructure/helper/helper';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import { StatusCommon } from '../../infrastructure/common/controls/Status';
import Constants from '../../core/common/constants';
import InputArrayTextCommon from '../../infrastructure/common/input/input-array/input-array-text-common';
import InputArrayIndex from '../../infrastructure/common/input/input-array/input-array-index';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import { useNavigate } from 'react-router-dom';

const UpdateIndexSloganManagement = () => {
    const [listResponse, setListResponse] = useState<Array<SloganInterface>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [_data, _setData] = useState<any>({});
    const dataRequest = _data;

    const [indexList, setIndexList] = useState<UpdateIndexSloganInterface[]>([])
    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it: any) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });
        return allRequestOK;
    };

    const onGetListAsync = async () => {
        const param = {}
        try {
            await sloganService.GetSlogan(
                param,
                setLoading
            ).then((res) => {
                setListResponse(res.data)
            })
        }
        catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        onGetListAsync().then(() => { })
    }, [])
    const router = useNavigate();

    const onBack = () => {
        router(ROUTE_PATH.SLOGAN_MANAGEMENT)
    }

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());

        // Tìm các vị trí bị thiếu index
        const missingIndexes = indexList
            .map((item, idx) => !item?.index ? idx + 1 : null)
            .filter(idx => idx !== null);

        if (missingIndexes.length > 0) {
            const positionMessage = missingIndexes.length === 1
                ? `Vị trí thứ ${missingIndexes[0]} chưa được điền thứ tự`
                : `Các vị trí ${missingIndexes.join(', ')} chưa được điền thứ tự`;

            WarningMessage("Nhập thiếu thông tin", positionMessage);
            return;
        }

        if (isValidData()) {
            try {
                await sloganService.UpdateIndexSloganAdmin(
                    {
                        items: indexList.filter(item => item?.index) // Lọc các item có index
                    },
                    onBack,
                    setLoading
                )
            }
            catch (error) {
                console.error(error)
            }
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }
    return (
        <AdminLayout
            breadcrumb={"Quản lý thứ tự hình ảnh trong trang chủ"}
            title={"Quản lý thứ tự hình ảnh"}
            redirect={ROUTE_PATH.SLOGAN_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Quản lý hình ảnh trong trang chủ</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.SLOGAN_MANAGEMENT}
                            title={'Quay lại'}
                            width={150}
                            variant={'ps-btn--gray'}
                        />
                        <ButtonCommon
                            onClick={onUpdateAsync}
                            title={'Cập nhật'}
                            width={150}
                            variant={'ps-btn--fullwidth'}
                        />
                    </div>
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
                                    {index + 1}
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
                                    width={'150px'}
                                />
                            }
                            key={"index"}
                            dataIndex={"index"}
                            render={(val, record: SloganInterface, index: number) => {
                                return (
                                    <InputArrayIndex
                                        label={""}
                                        attribute={"index"}
                                        isRequired={false}
                                        dataAttribute={record.index}
                                        setData={setIndexList}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        index={index}
                                        data={indexList}
                                        idKey={record.id || ""}
                                    />
                                )
                            }}
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
                    </Table>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    )
}

export default UpdateIndexSloganManagement