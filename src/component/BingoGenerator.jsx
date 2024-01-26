import React, {useEffect, useRef, useState} from 'react';
import styles from './Bingo.module.css';
import {NavLink} from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const BingoGenerator = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [tappedTime, setTappedTime] = useState(' ');
    const [bingoNumber, setBingoNumber] = useState(' ');
    const defaultInput = 9;
    const inputRef = useRef(defaultInput);
    const [showConfetti, setShowConfetti] = useState(false);
    const {width, height} = useWindowSize();

    useEffect(() => {
        // Set up the interval to update the current time
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Function to format time components as two digits
    const formatTwoDigits = (number) => number.toString().padStart(2, '0');

    // Function to sum the digits of time components
    const sumDigits = (time) => {
        return time.split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
    };

    // Get time components
    const year = currentTime.getFullYear().toString();
    const month = formatTwoDigits(currentTime.getMonth() + 1);
    const day = formatTwoDigits(currentTime.getDate());
    const hours = formatTwoDigits(currentTime.getHours());
    const minutes = formatTwoDigits(currentTime.getMinutes());
    const seconds = formatTwoDigits(currentTime.getSeconds());
    const milliseconds = currentTime.getMilliseconds().toString();

    // Format the full date and time
    const formattedTime = `${year}-${month}-${day} \n ${hours}:${minutes}:${seconds}.${milliseconds}`;

    // Concatenate all time components and calculate the sum of digits
    const timeString = year + month + day + hours + minutes + seconds + milliseconds;
    const sumOfTimeDigits = sumDigits(timeString);

    return (
        <div className={styles.container}>
            <p className={styles.date}>{formattedTime}</p>
            <input className={styles.input}
                   ref={inputRef}
                   defaultValue={9}
                   type='number'
            />
            {
                tappedTime &&
                <div className={styles.subContainer}>
                    <h5>Tapped Time</h5>
                    <h3 className={styles.date}>{tappedTime}</h3>
                </div>
            }
            {
                bingoNumber && inputRef.current.value &&
                <p className={styles.bingoNumber}>{bingoNumber % inputRef.current.value}</p>
            }
            <button className={styles.button}
                    disabled={showConfetti}
                    onClick={() => {
                        setBingoNumber(sumOfTimeDigits);
                        setTappedTime(formattedTime);
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 3000);
                    }}>
                BINGO
            </button>
            {
                showConfetti && <Confetti width={width} height={height}
                                          recycle={false}
                                          gravity={.5}
                                          run={showConfetti}/>
            }
            {
                inputRef.current.value === '20240127' &&
                <NavLink className={styles.award}
                         to='/award'>{('Get Award')}</NavLink>
            }

            <div>
                <div className={styles.bottomLeft}>
                    <img className={styles.img}
                         src={'https://stickershop.line-scdn.net/stickershop/v1/product/768/LINEStorePC/main.png?v=10'}/>
                </div>
                <div className={styles.bottomRight}>
                    <img className={styles.img}
                         src={'https://image1.gamme.com.tw/news2/2016/41/93/qJeWn6Kdj6eZqaY.jpg'}/>
                </div>
                <div className={styles.topLeft}>
                    <img className={styles.img}
                         src={'https://www.owndays.com/images/specials/products/cinnamoroll/character-1.svg'}/>
                </div>
                <div className={styles.topRight}>
                    <img className={styles.img}
                         src={'https://stickershop.line-scdn.net/stickershop/v1/sticker/9745/android/sticker.png'}/>
                </div>
            </div>
        </div>
    );
};

export default BingoGenerator;
