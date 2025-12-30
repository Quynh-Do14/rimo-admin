import { notification } from "antd";
import {
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import { ReactNode } from 'react';
import styles from "../../../asset/css/common/common.module.css";

type ToastOptions = {
    duration?: number;
    placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    onClose?: () => void;
};

const DEFAULT_DURATION = 4.5;
const DEFAULT_PLACEMENT = 'topRight';

function renderContent(content: string | ReactNode, styleClass: string) {
    return typeof content === 'string' ? (
        <div className={styleClass}>{content}</div>
    ) : (
        content
    );
}

export const SuccessMessage = (
    message: string | ReactNode,
    description: string | ReactNode,
    options: ToastOptions = {}
) => {
    notification.success({
        message: renderContent(message, styles.success_message),
        description: renderContent(description, styles.success_message),
        icon: <CheckCircleOutlined style={{ fontSize: 24, color: '#34a849' }} />,
        duration: options.duration ?? DEFAULT_DURATION,
        placement: options.placement ?? DEFAULT_PLACEMENT,
        onClose: options.onClose,
    });
};

export const FailMessage = (
    message: string | ReactNode,
    description: string | ReactNode,
    options: ToastOptions = {}
) => {
    notification.error({
        message: renderContent(message, styles.fail_message),
        description: renderContent(description, styles.fail_message),
        icon: <CloseCircleOutlined style={{ fontSize: 24, color: '#ff2828' }} />,
        duration: options.duration ?? DEFAULT_DURATION,
        placement: options.placement ?? DEFAULT_PLACEMENT,
        onClose: options.onClose,
    });
};

export const WarningMessage = (
    message: string | ReactNode,
    description: string | ReactNode,
    options: ToastOptions = {}
) => {
    notification.warning({
        message: renderContent(message, styles.warning_message),
        description: renderContent(description, styles.warning_message),
        icon: <WarningOutlined style={{ fontSize: 24, color: '#ff8355' }} />,
        duration: options.duration ?? DEFAULT_DURATION,
        placement: options.placement ?? DEFAULT_PLACEMENT,
        onClose: options.onClose,
    });
};
