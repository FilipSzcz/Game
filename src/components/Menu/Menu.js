import React, { useContext } from 'react';
import styles from './Menu.module.css'
import { GameContext } from '../../App';

const Menu = () => {
    const { setIsClickable, isWin, setIsWin, drawNew, isPopup, setIsPopup, rounds, handleChange } = useContext(GameContext)

    const handleClick = () => {
        setIsPopup(false);
        setIsWin(false);
        setIsClickable(false);
        drawNew();
    }

    return (
        <div className={[styles.popup, isPopup ? styles["popup-active"] : null].join(" ")}>
            <div className={styles.menu}>
                {isWin ?
                    <div className={styles.texts}>
                        <p>Gratulacje!</p>
                        <p>Wygrałeś!</p>
                    </div>
                    :
                    null}
                <label className={styles.select}>
                    Ilość rund:
                    <select value={rounds} onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </label>
                <button className={styles.button} onClick={handleClick}>{isWin ? "zagraj jeszcze raz" : "start"}</button>
            </div>
        </div>
    )
}
export default Menu
