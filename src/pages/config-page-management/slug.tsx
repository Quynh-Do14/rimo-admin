import { useEffect, useState } from 'react';
import styles from '../../asset/css/admin/admin-component.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import { WarningMessage } from '../../infrastructure/common/toast/message';
import AdminLayout from '../../infrastructure/common/layout/admin/MainLayout';
import ButtonHref from '../../infrastructure/common/button/ButtonHref';
import ButtonCommon from '../../infrastructure/common/button/ButtonCommon';
import { Col, Row } from 'antd';
import InputTextCommon from '../../infrastructure/common/input/input-text-common';
import TextAreaCommon from '../../infrastructure/common/input/textarea-common';
import { FullPageLoading } from '../../infrastructure/common/loader/loading';
import Constants from '../../core/common/constants';
import InputNumberCommon from '../../infrastructure/common/input/input-number';
import configPageService from '../../infrastructure/repository/config-page/configPage.service';
import { ConfigPageInterface } from '../../infrastructure/interface/configPage/configPage.interface';
import InputSelectCommon from '../../infrastructure/common/input/select-common';
import TextEditorConfig from '../../infrastructure/common/input/text-editor-config';

const SlugConfigPageManagement = () => {
    const [detail, setDetail] = useState<ConfigPageInterface>();
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [validate, setValidate] = useState<any>({});
    const [submittedTime, setSubmittedTime] = useState<any>();
    const [isShowkBackground, setIsShowkBackground] = useState<boolean>(false)
    const [isDarkBackground, setIsDarkBackground] = useState<boolean>(false)
    const [typeImage, setTypeImage] = useState<any>('')
    const [typeSelected, setTypeSelected] = useState<any>('')

    const [_data, _setData] = useState<any>({});
    const dataRequest = _data;

    const setDataRequest = (data: any) => {
        Object.assign(dataRequest, { ...data });
        _setData({ ...dataRequest });
    };

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
    const router = useNavigate();
    const param = useParams();
    const onBack = () => {
        router(ROUTE_PATH.CONFIG_PAGE_MANAGEMENT)
    }

    const onGetByIdAsync = async () => {
        if (param.id) {
            try {
                await configPageService.GetConfigPageById(
                    String(param.id),
                    setLoading
                ).then((res) => {
                    setDetail(res)
                })
            }
            catch (error) {
                console.error(error)
            }
        }

    }
    useEffect(() => {
        onGetByIdAsync().then(() => { })
    }, [param.id])

    useEffect(() => {
        if (detail) {
            setDataRequest({
                title: detail.title,
                index: detail.index,
                description: detail.description,
                box_content: detail.box_content,
                type: detail.type,
            });
        };
    }, [detail]);

    const onUpdateAsync = async () => {
        await setSubmittedTime(Date.now());

        if (isValidData()) {
            try {
                await configPageService.UpdateConfigPageAdmin(
                    String(param.id),
                    {
                        title: dataRequest.title,
                        description: dataRequest.description,
                        box_content: dataRequest.box_content,
                        type: dataRequest.type,
                        index: dataRequest.index
                    },
                    onBack,
                    setLoading
                );
            } catch (error) {
                console.error(error);
            }
        } else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin");
        }
    };

    useEffect(() => {
        if (dataRequest.type) {
            const background = Constants.ConfigPage.List.find(item => item.value == dataRequest.type);
            if (background) {
                setIsShowkBackground(background.isShowBackground);
                setIsDarkBackground(background.darkBackground);
                setTypeImage(background.image)
                setTypeSelected(background.value)
            }
        }
        if (dataRequest.type == "TITLE_PAGE") {
            setDataRequest({
                title: ""
            })
        }
    }, [dataRequest.type]);

    return (
        <AdminLayout
            breadcrumb={"Quản lý nội dung"}
            title={"Cập nhật nội dung"}
            redirect={ROUTE_PATH.CONFIG_PAGE_MANAGEMENT}
        >
            <div className={styles.manage_container}>
                <div className={styles.headerPage}>
                    <h2>Cập nhật nội dung</h2>
                    <div className={styles.btn_container}>
                        <ButtonHref
                            href={ROUTE_PATH.CONFIG_PAGE_MANAGEMENT}
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
                    <Row align="top">
                        <Col span={24} className={styles.form_container}>
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <InputSelectCommon
                                        label={"Loại nội dung"}
                                        attribute={"type"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.type}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        listDataOfItem={Constants.ConfigPage.List}
                                        labelName='label'
                                        valueName='value'
                                    />

                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                    <img src={typeImage} alt="" width={"100%"} className='' />
                                </Col>
                                <Col span={24}>
                                    <InputTextCommon
                                        label={"Nội dung thẻ"}
                                        attribute={"box_content"}
                                        isRequired={true}
                                        dataAttribute={dataRequest.box_content}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    {
                                        isShowkBackground
                                            ?
                                            <TextEditorConfig
                                                label={"Tiêu đề"}
                                                attribute={"title"}
                                                isRequired={true}
                                                dataAttribute={dataRequest.title}
                                                setData={setDataRequest}
                                                disabled={false}
                                                validate={validate}
                                                setValidate={setValidate}
                                                submittedTime={submittedTime}
                                                isDarkBackground={isDarkBackground}
                                            />
                                            :
                                            <InputTextCommon
                                                label={"Tiêu đề"}
                                                attribute={"title"}
                                                isRequired={true}
                                                dataAttribute={dataRequest.title}
                                                setData={setDataRequest}
                                                disabled={false}
                                                validate={validate}
                                                setValidate={setValidate}
                                                submittedTime={submittedTime}
                                            />
                                    }
                                </Col>
                                <Col span={24}>
                                    <TextAreaCommon
                                        label={"Mô tả"}
                                        attribute={"description"}
                                        isRequired={false}
                                        dataAttribute={dataRequest.description}
                                        setData={setDataRequest}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                    />
                                </Col>
                                <Col span={24}>
                                    {
                                        // typeSelected == "ACHIEVEMENT"
                                        //     ?
                                        //     <div className="stats-bar">
                                        //         <div className="stats-container">
                                        //             {listResponse.map((stat: ConfigPageInterface, index: number) => (
                                        //                 <div key={index} className="stat-item" >
                                        //                     <div className="stat-number">
                                        //                         <article
                                        //                             dangerouslySetInnerHTML={{ __html: stat.title }}
                                        //                         />
                                        //                     </div>
                                        //                     <div className="stat-label">{stat.description}</div>
                                        //                 </div>
                                        //             ))}
                                        //         </div>
                                        //     </div>
                                        //     :
                                        typeSelected == 'TITLE_PAGE'
                                            ?
                                            null
                                            :
                                            (dataRequest?.title || dataRequest?.description)
                                                ?
                                                <div className={`section-header ${isDarkBackground ? "dark" : "light"}`}>
                                                    {
                                                        dataRequest?.box_content
                                                            ?
                                                            < div className="header-badge">
                                                                <span className="badge-text">{dataRequest?.box_content}</span>
                                                            </div>
                                                            : null
                                                    }
                                                    <p className="main-title">
                                                        <article
                                                            dangerouslySetInnerHTML={{ __html: dataRequest?.title }}
                                                        />
                                                    </p>
                                                    <p className="subtitle">
                                                        {dataRequest?.description}
                                                    </p>
                                                </div>
                                                :
                                                null
                                    }
                                </Col>
                                {
                                    typeSelected == 'ACHIEVEMENT'
                                        ?
                                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <InputSelectCommon
                                                label={"Số thứ tự"}
                                                attribute={"index"}
                                                isRequired={typeSelected == 'ACHIEVEMENT'}
                                                dataAttribute={dataRequest.index}
                                                setData={setDataRequest}
                                                disabled={false}
                                                validate={validate}
                                                setValidate={setValidate}
                                                submittedTime={submittedTime}
                                                listDataOfItem={Constants.ConfigPage.ListIndex}
                                                labelName='label'
                                                valueName='value'
                                            />
                                        </Col>
                                        :
                                        null
                                }
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <FullPageLoading isLoading={loading} />
        </AdminLayout >
    )
}

export default SlugConfigPageManagement