import React, {useContext} from 'react';
import {GameContext} from "../../App"

import styles from './Results.module.css'

const Results = () => {
    const {isPopup, drawIds, rounds} = useContext(GameContext)
    return (
        <div className={styles.results}>
            <h1 className={styles.title}>Zapamiętywanie kombinacji</h1>
            {!isPopup && <p className={styles.text}>Runda: <span>{drawIds.length}/{rounds}</span></p>}
        </div>
    )
}

export default Results