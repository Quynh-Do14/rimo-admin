import React from 'react'
import styles from '../../../asset/css/common/button.module.css'
type Props = {
    href: string,
    title: string,
    width?: number,
    disabled?: boolean
    variant: "ps-btn--fullwidth" | "ps-btn--reverse" | "ps-btn--black" | "ps-btn--gray"
}
const ButtonHref = (props: Props) => {
    const {
        href,
        title,
        width = false,
        variant = "ps-btn--fullwidth"
    } = props;
    return (
        <a
            href={href}
            className={`${styles.btnCommon} ${variant}`}
            style={{
                width: width ? width : '',
                whiteSpace: "nowrap"
            }}>
            {title}
        </a>
    )
}

export default ButtonHref