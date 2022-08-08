import React, { useState, useEffect, useRef, createRef, createContext } from 'react';
import DemonstrationContainer from './components/DemonstrationContainer/DemonstrationContainer';
import UserContainer from './components/UserContainer/UserContainer';
import Menu from './components/Menu/Menu';
import Results from './components/Results/Results';
import { drawId, wait, equals, showMessage } from "./utils/helpers"
import { ids, messages } from "./utils/data"
import styles from './App.module.css'
import buttonStyles from './components/Button/Button.module.css'
import demonstrationStyles from './components/DemonstrationContainer/DemonstrationContainer.module.css'

export const GameContext = createContext();

function App() {
    const [drawIds, setDrawIds] = useState([]);
    const [userChoice, setUserChoice] = useState([]);
    const [rounds, setRounds] = useState(5);
    const [isPopup, setIsPopup] = useState(true);
    const [isWin, setIsWin] = useState(false);
    const [isClickable, setIsClickable] = useState(false)

    const demonstrationRefs = useRef([]);
    demonstrationRefs.current = ids.map((id, i) => demonstrationRefs.current[i] ?? createRef());
    const userRefs = useRef([]);
    userRefs.current = ids.map((id, i) => userRefs.current[i] ?? createRef());
    const messageRef = useRef();

    const handleChange = (e) => {
        setRounds(e.target.value * 1)
    }
    const drawNew = () => {
        const id = drawId(0, ids.length)
        setDrawIds(prev => [...prev, id]);
    }

    const showPattern = async () => {
        for (let i = 0; i < drawIds.length; i++) {
            await wait(200);
            demonstrationRefs.current[drawIds[i]].current.classList.add(buttonStyles.pushed)
            await wait(500);
            demonstrationRefs.current[drawIds[i]].current.classList.remove(buttonStyles.pushed)
        }
        await wait(200);
        setIsClickable(true)
    }

    const resetGame = () => {
        setDrawIds([]);
        setUserChoice([]);
        setRounds(5)
        setIsPopup(true)
    }

    const choiceButton = async (id) => {
        setUserChoice(prev => [...prev, id])
        userRefs.current[id].current.classList.add(buttonStyles.pushed);
        await wait(200);
        userRefs.current[id].current.classList.remove(buttonStyles.pushed);
    }

    const wrongPattern = async () => {
        await showMessage(messageRef, messages.wrong.text, messages.wrong.color, demonstrationStyles["message-active"])
        await wait(200);
        showPattern()
    }

    const correctPattern = async () => {
        await showMessage(messageRef, messages.correct.text, messages.correct.color, demonstrationStyles["message-active"])
        await wait(200);
        drawNew();
        showPattern();
    }

    useEffect(() => {
        if (userChoice.length === drawIds.length && userChoice.length > 0) {
            setIsClickable(false)
            if (equals(drawIds, userChoice)) {
                if (rounds === userChoice.length) {
                    resetGame();
                    setIsWin(true)
                } else {
                    correctPattern()
                }
            } else {
                wrongPattern()
            }
            setUserChoice([]);
        }
    }, [userChoice]);

    useEffect(() => {
        showPattern()
    }, [drawIds])

    const value = { ids, drawIds, userChoice, rounds, isPopup, setIsPopup, isWin, setIsWin, isClickable, setIsClickable, drawNew, handleChange, userRefs, demonstrationRefs, messageRef }

    return (
        <GameContext.Provider value={value}>
            <div className={styles.app}>
                <Results></Results>
                <DemonstrationContainer ref={demonstrationRefs}></DemonstrationContainer>
                <UserContainer ref={userRefs} choiceButton={choiceButton}></UserContainer>
                <Menu></Menu>
                <button onClick={resetGame} className={styles.reset}>Resetuj</button>
            </div>
        </GameContext.Provider>
    );
}

export default App;