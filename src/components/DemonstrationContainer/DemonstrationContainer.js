import React, { useContext } from 'react';
import Button from '../Button/Button';
import { GameContext } from '../../App';
import styles from './DemonstrationContainer.module.css'

const DemonstrationContainer = () => {
    const { ids, demonstrationRefs, messageRef } = useContext(GameContext)
    return (
        <div className={styles["demonstration-container"]}>
            <div className={styles.panel}>
                {ids.map(id => {
                    return <Button ref={demonstrationRefs.current[id]} id={id} key={id}></Button>
                })}
                <p ref={messageRef} className={styles.message}></p>
            </div>
        </div>
    )
}

export default DemonstrationContainer
