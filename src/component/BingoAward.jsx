import styles from './Bingo.module.css';
import React, {useEffect, useState} from "react";

const BingoAward = () => {

    const apiUrl = process.env.REACT_APP_API_URL;
    const [letter, setLetter] = useState('');

    useEffect(() => {
        const getLetter = async () => {
            const fetchedContent = await fetch(apiUrl, {
                method: "GET",
                headers: new Headers({
                    'Content-Type': 'application/json',
                })
            });
            setLetter(fetchedContent.letter);
        }
        getLetter();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.letterContainer}>
                <p className={styles.letterContent}>
                    {letter}
                </p>
            </div>

            <div className={styles.topLeft}>
                <img className={styles.img}
                     src={'https://stickershop.line-scdn.net/stickershop/v1/product/7240248/LINEStorePC/main.png?v=1'}/>
            </div>
            <div className={styles.bottomRight}>
                <img className={styles.img}
                     src={'https://stickershop.line-scdn.net/stickershop/v1/product/18896536/IOS/main_animation@2x.png'}/>
            </div>
        </div>
    )
}

export default BingoAward;