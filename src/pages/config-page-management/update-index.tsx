import React, { useEffect, useState } from 'react'
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import { ROUTE_PATH } from '../../core/common/appRouter';
import styles from '../../asset/css/admin/admin-component.module.css';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import { Table, Image } from 'antd';
import { TitleTableCommon } from '../../infrastructure/common/text/title-table-common';
import { configImageURL } from '../../infrastructure/helper/helper';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import InputArrayIndex from '../../infrastructure/common/input/input-array/input-array-index';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import { useNavigate } from 'react-router-dom';
import { ConfigPageInterface, UpdateIndexConfigPageInterface } from '../../infrastructure/interface/configPage/configPage.interface';
import configPageService from '../../infrastructure/repository/config-page/configPage.service';
import Constants from '../../core/common/constants';
import SelectArrayIndex from '../../infrastructure/common/input/input-array/select-array-index';

const UpdateIndexConfigPageManagement = () => {
    const [listResponse, setListResponse] = useState<Array<ConfigPageInterface>>([]);
    const [listResponsePreview, setListResponsePreview] = useState<Array<ConfigPageInterface>>([]);

    const [loading, setLoading] = useState<boolean>(false);
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [_data, _setData] = useState<any>({});
    const dataRequest = _data;

    const [indexList, setIndexList] = useState<UpdateIndexConfigPageInterface[]>([])
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
        const param = {
            type: "SECTION_1"
        }
        try {
            await configPageService.GetConfigPage(
                param,
                setLoading
            ).then((res) => {
                setListResponse(res.data)
                setListResponsePreview(res.data)
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
        router(ROUTE_PATH.CONFIG_PAGE_MANAGEMENT)
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
                await configPageService.UpdateIndexConfigPageAdmin(
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

    function hasDuplicate(arr: ConfigPageInterface[]) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (Number(arr[i].index) === Number(arr[j].index)) {
                    return true;
                }
            }
        }
        return false;
    }

    const onPreview = () => {
        const indexMap = new Map();
        indexList.forEach(item => {
            indexMap.set(item.id, Number(item.index));
        });
        console.log('indexList', indexList);

        const result = listResponse.map(item => {
            if (indexMap.has(item.id)) {
                return {
                    ...item,
                    index: indexMap.get(item.id)
                };
            }
            return item;
        });
        const duplicate = hasDuplicate(result)
        console.log('result', result);
        console.log('duplicate', duplicate);

        if (duplicate) {
            WarningMessage("Tồn tại các vị trí trùng nhau", "")
            return
        }
        const sortedResult = [...result].sort((a, b) => a.index - b.index);
        setListResponsePreview(sortedResult);
    }

    return (
        <AdminLayout
            breadcrumb={"Quản lý nội dung"}
            title={"Quản lý thứ tự nội dung"}
            redirect={ROUTE_PATH.CONFIG_PAGE_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Quản lý thứ tự nội dung</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.CONFIG_PAGE_MANAGEMENT}
                            title={'Quay lại'}
                            width={150}
                            variant={'ps-btn--gray'}
                        />
                        <ButtonCommon
                            onClick={onPreview}
                            title={'Xem trước'}
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
                    <div className="stats-bar">
                        <div className="stats-container">
                            {listResponsePreview.map((stat: ConfigPageInterface, index: number) => (
                                <div key={index} className="stat-item" >
                                    <div className="stat-number">
                                        <article
                                            dangerouslySetInnerHTML={{ __html: stat.title }}
                                        />
                                    </div>
                                    <div className="stat-label">{stat.description}</div>
                                </div>
                            ))}
                        </div>
                    </div>
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
                                    width={'150px'}
                                />
                            }
                            key={"index"}
                            dataIndex={"index"}
                            render={(val, record: ConfigPageInterface, index: number) => {
                                return (
                                    <SelectArrayIndex
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
                                        listDataOfItem={Constants.ConfigPage.ListIndex}
                                        labelName='label'
                                        valueName='value'
                                    />
                                )
                            }}
                        />
                    </Table>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    )
}

export default UpdateIndexConfigPageManagement