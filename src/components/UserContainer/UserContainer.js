import React, { useContext } from 'react';

import styles from './UserContainer.module.css'
import Button from '../Button/Button';
import { GameContext } from '../../App';

const UserContainer = ({ choiceButton }) => {
    const { ids, isClickable, userRefs } = useContext(GameContext)
    return (
        <div className={[styles["user-container"], isClickable ? styles["user-container-active"] : null].join(" ")}>
            <div className={styles["panel"]}>
                {ids.map(id => {
                    return <Button ref={userRefs.current[id]} handleClick={choiceButton} id={id} key={id}></Button>
                })}
            </div>
        </div>
    )
}

export default UserContainer