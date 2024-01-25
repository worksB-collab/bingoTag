import React, {useEffect, useRef, useState} from 'react';

const BingoGrid = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [tappedTime, setTappedTime] = useState(' ');
    const [bingoNumber, setBingoNumber] = useState(' ');
    const defaultInput = 9;
    const inputRef = useRef(defaultInput);

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
    const styles = {
        container: {
            height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        },
        subContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px',
            border: '0.5 solid',
            borderRadius: '50%',
            borderColor: '#a076ec',
        },
        button: {
            height: '60px',
            aspectRatio: '1',
            borderRadius: '50%',
            borderColor: '#a076ec',
            backgroundColor: 'transparent',
            color: '#a076ec',
        },
        input: {
            width: '50px',
            height: '50px',
            border: '0.5 solid',
            borderColor: '#a076ec',
            borderRadius: '20%',
            fontSize: '20pt',
            textAlign: 'center',
            margin: '10px',
        },
        bingoNumber: {
            fontSize: '50pt',
            margin: '10px'
        },
        date: {
            whiteSpace: 'pre-line'
        },
        bottomLeft: {
            position: 'absolute',
            bottom: 10,
            left: 10,
        },
        bottomRight: {
            position: 'absolute',
            bottom: 10,
            right: 10,
        },
        topLeft: {
            position: 'absolute',
            top: 10,
            left: 10,
        },
        topRight: {
            position: 'absolute',
            top: 10,
            right: 10,
        },
        img: {
            height: '70px'
        }
    }
    return (
        <div style={styles.container}>
            <p style={styles.date}>{formattedTime}</p>
            <input style={styles.input}
                   ref={inputRef}
                   defaultValue={9}
                   type='number'
            />
            {
                tappedTime &&
                <div style={styles.subContainer}>
                    <h5>Tapped Time</h5>
                    <h3 style={styles.date}>{tappedTime}</h3>
                </div>
            }
            {
                bingoNumber && inputRef.current.value &&
                <p style={styles.bingoNumber}>{bingoNumber % inputRef.current.value}</p>
            }
            <button style={styles.button}
                    onClick={() => {
                        setBingoNumber(sumOfTimeDigits);
                        setTappedTime(formattedTime);
                    }}>
                BINGO
            </button>
            <div style={styles.bottomLeft}>
                <img style={styles.img}
                     src={'https://stickershop.line-scdn.net/stickershop/v1/product/768/LINEStorePC/main.png?v=10'}/>
            </div>
            <div style={styles.bottomRight}>
                <img style={styles.img} src={'https://image1.gamme.com.tw/news2/2016/41/93/qJeWn6Kdj6eZqaY.jpg'}/>
            </div>
            <div style={styles.topLeft}>
                <img style={styles.img}
                     src={'https://www.owndays.com/images/specials/products/cinnamoroll/character-1.svg'}/>
            </div>
            <div style={styles.topRight}>
                <img style={styles.img}
                     src={'https://stickershop.line-scdn.net/stickershop/v1/sticker/9745/android/sticker.png'}/>
            </div>

        </div>
    );
};

export default BingoGrid;
