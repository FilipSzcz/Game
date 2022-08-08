import React from 'react';
import styles from './Button.module.css'

const Button = React.forwardRef(({ id, handleClick }, ref) => {
    return (
        <button ref={ref} onClick={() => handleClick(id)} data-id={id} className={styles.button}></button>
    )
}
)
export default Button
