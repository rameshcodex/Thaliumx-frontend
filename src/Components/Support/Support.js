import { Box, Grid22 } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react'
import Header from '../Header/Header'
import './Suport.css'
import SendIcon from '@mui/icons-material/Send';
import Grid2 from '@mui/material/Grid2'
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';



const drawerWidth = 260;
function Support() {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));

    const [chat, setChat] = useState([
        { img: 'https://imgs.search.brave.com/IB4ponUTbzWETNl95cvLsyB6zsOzvyfNbFkElz0akrE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzcxLzE1LzYy/LzM2MF9GXzU3MTE1/NjI1OF9RWWFYVUM4/a2pCTmIxaHU5d3h3/dnRDV1VqRnhiWXE5/NC5qcGc', name: 'Sankar', noftify: 'Hi da How are you doing long time no see' },
        { img: 'https://imgs.search.brave.com/IB4ponUTbzWETNl95cvLsyB6zsOzvyfNbFkElz0akrE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzcxLzE1LzYy/LzM2MF9GXzU3MTE1/NjI1OF9RWWFYVUM4/a2pCTmIxaHU5d3h3/dnRDV1VqRnhiWXE5/NC5qcGc', name: 'Barath', noftify: 'Sankar Eod Podra' },
        { img: 'https://imgs.search.brave.com/IB4ponUTbzWETNl95cvLsyB6zsOzvyfNbFkElz0akrE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzcxLzE1LzYy/LzM2MF9GXzU3MTE1/NjI1OF9RWWFYVUM4/a2pCTmIxaHU5d3h3/dnRDV1VqRnhiWXE5/NC5qcGc', name: 'Priya', noftify: 'Saami Ac ah konjam kammi pannuda' },
        { img: 'https://imgs.search.brave.com/IB4ponUTbzWETNl95cvLsyB6zsOzvyfNbFkElz0akrE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzcxLzE1LzYy/LzM2MF9GXzU3MTE1/NjI1OF9RWWFYVUM4/a2pCTmIxaHU5d3h3/dnRDV1VqRnhiWXE5/NC5qcGc', name: 'Gowtham', noftify: 'da figma unnaku send panniten' },


    ])

    //personal chat

    const [perChat, setPerChat] = useState([chat[0].name])

    console.log(perChat, 'perChat');

    const [display, setDisplay] = useState()


    console.log(perChat, 'perchat');

    //search

    const [search, setSearch] = useState()

    const [message, setMessage] = useState([]);
    const [inputValue, setInputValue] = useState('');


    const [updated, setUpdated] = useState('');



    const handleChangeSend = (event) => {
        setUpdated(event.target.value);

    };

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClickSend();
        }
    };


    const handleClickSend = (e) => {
        // 👇 "message" stores input field value

        if (updated?.trim() !== '') {
            setMessage([...message, updated])
            setUpdated('')
        }
    };

    const handleDeleteTodo = (index) => {
        const newTodos = [...message];
        newTodos.splice(index, 1);
        setMessage(newTodos);
    };

    //image upload

    const [imageUrl, setImageUrl] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        console.log(reader, "result of file");

        reader.onloadend = () => {
            setImageUrl(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };


    // internal css


    const msgBg = {
        height: '670px',
        overflowY: 'scroll',
        margin: '0px',
        backgroundImage: `url(${imageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        opacity: '0.7'
    }






    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <Header />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 5, width: { sm: `calc(100% - ${drawerWidth}px)` }, marginTop: '50px' }}
                >

                    <Grid2 container spacing={2}>
                        <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 8, xl: 9 }}>
                            <div className="colab-msg-box">
                                {/* <div className="colab-avatar-cont vr">
                                    <Stack direction="row" spacing={1}>

                                        <Avatar sx={{ width: 30, height: 30 }} alt="Remy Sharp" src={chat[0].img} />

                                    </Stack>
                                </div> */}
                                <div className="colab-chat-area msg">


                                    <div className="chat-area-inner-text vr">
                                        <div>
                                            <Avatar sx={{ width: 30, height: 30 }} alt="Remy Sharp" src={perChat.img} />
                                        </div>
                                        <div className="collab-send-text-main">
                                            <div className="username">{perChat.name}(dev)</div>
                                            <div className="txt1">{perChat.noftify}</div>
                                            <div className="time">11:45am</div>
                                        </div>
                                    </div>
                                    {message.map((todo, ind) => {
                                        return (

                                            <div className="chat-area-inner-text user vr" key={ind}>
                                                <div>
                                                    <Avatar sx={{ width: 30, height: 30 }} alt="Remy Sharp" src={perChat.img} />
                                                </div>
                                                <div className="collab-send-text-main2 user">
                                                    <div className="username">Me(dev)</div>
                                                    <div className="txt1">{todo}</div>
                                                    <div className="time">11:45am</div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>


                                <div className="colab-text-input">



                                    <div class="messageBox">

                                        <input required="" placeholder="Message..." type="text" id="messageInput" value={updated}
                                            onChange={handleChangeSend}
                                            onKeyDown={handleEnterKeyPress} />
                                        <button id="sendButton">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                                                <path
                                                    fill="none"
                                                    d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                                                ></path>
                                                <path
                                                    stroke-linejoin="round"
                                                    stroke-linecap="round"
                                                    stroke-width="33.67"
                                                    stroke="#6c6c6c"
                                                    d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </Grid2>

                        {matches && <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }} >


                            <div className='msglist'>
                                <div className='msg-list-head display-2'>
                                    <h2 className='chats'>
                                        Chats
                                    </h2>

                                    <div id="firstFilter" class="filter-switch">
                                        <input checked="" id="option1" name="options" type="radio" />
                                        <label class="option" for="option1">Opened</label>
                                        <input id="option2" name="options" type="radio" />
                                        <label class="option" for="option2">Closed</label>
                                        <span class="background"></span>
                                    </div>

                                </div>
                                <div className='msg-list-input'>

                                    <div class="group">
                                        <svg viewBox="0 0 24 24" aria-hidden="true" class="search-icon">
                                            <g>
                                                <path
                                                    d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                                                ></path>
                                            </g>
                                        </svg>

                                        <input
                                            id="query"
                                            class="input"
                                            type="search"
                                            placeholder="Search..."
                                            name="searchbar"
                                            onChange={((e) => { setSearch(e.target.value) })}
                                        />
                                    </div>


                                </div>
                                <div className='msg-list-area '>
                                    {chat.filter((obj) => {
                                        return (
                                            search?.toLocaleLowerCase() === undefined ? obj : obj.name.toLocaleLowerCase().includes(search)
                                        )

                                    }).map((row, ind) => {
                                        return (
                                            <div key={ind} className={perChat?.name !== row?.name ? 'msg-list-chat-main display-1 cursor' : 'msg-list-chat-main display-1 cursor active'} onClick={(() => { setPerChat(row, ind) })}>
                                                <div>
                                                    <Avatar sx={{ width: 56, height: 56 }} alt="Remy Sharp" src={row.img} />
                                                </div>
                                                <div className='msg-list-chat-name' style={{ width: '100%' }}>
                                                    {row.name}
                                                    <div className='chat-desc display-2' id='sentence'>
                                                        {(row.noftify?.length > 30) ? row.noftify.substring(0, 28) + '...' : row.noftify}
                                                        <span>4w</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>

                        </Grid2>
                        }
                    </Grid2>

                </Box>
            </Box>
        </div>
    )
}

export default Support
