
import React, { useState, useEffect } from 'react';
import moon from "../../Images/moon.gif"
import sun from "../../Images/sun.gif"
import IconButton from '@mui/material/IconButton';

const getThemeFromStorage = () => {
    let theme = true
    if (localStorage.getItem('theme')) {
        theme = JSON.parse(localStorage.getItem('theme'))
    }
    return theme
}

function DarkMode() {

    const [isLightMode, setIsLightMode] = useState(getThemeFromStorage())

    const handledarkmode = () => {
        setIsLightMode(!isLightMode)
    }

    useEffect(() => {

        if (isLightMode) {
            var body = document.querySelector("body");
            body.className = 'light-theme'
        } else {
            var body = document.querySelector("body");
            body.className = 'dark-theme'
        }

        localStorage.setItem('theme', isLightMode)


    }, [isLightMode])






    return (<>
        <IconButton sx={{ ml: 1 }} onClick={handledarkmode} color="inherit">
            {isLightMode ? <img src={sun} style={{ width: '40px', height: '40px' }} alt='sun' /> : <img src={moon} style={{ width: '40px', height: '40px' }} alt="sun" />}
        </IconButton>
        {/* {isLightMode ? 'Light-mode' : 'Dark-Mode'} */}
    </>);
}


export default DarkMode;