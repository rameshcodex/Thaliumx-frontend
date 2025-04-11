

// import './UserList.css';
import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Grid2 } from '@mui/material';
import Header from '../Header/Header';
import TextField from '@mui/material/TextField';
import consts from "../../constant";
import Axios from "axios";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import { ToastContainer, toast } from "react-toastify";


import './Kyc.css'
const drawerWidth = 260;

const KycDetails = () => {
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const detail = useLocation();
    const [reason, setReason] = useState();
    const [reasons, setReasons] = useState(false);
    const Navigate = useNavigate();
    const back = useNavigate();

    const Action = async (status) => {
        setReasons(false);
        const data = {
            _id: detail?.state?._id,
            status: status,
            reason: reason != undefined ? reason : "original",
        };

        await Axios.post(`${consts.BackendUrl}/verifyKyc`, data, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                Authorization: localStorage.getItem("kaavi"),
            },
        })
            .then((res) => {
                if (res?.data?.success) {
                    toast.success(`${res?.data?.message}`, {

                        duration: 1800,
                        position: "top-center",

                        // Styling
                        style: {
                            padding: "1rem",
                            fontSize: "15px",
                            color: "green",
                            fontWeight: "bold",
                        },
                        className: "",

                        // Custom Icon
                        icon: "👏",

                        // Change colors of success/error/loading icon
                        iconTheme: {
                            primary: "#000",
                            secondary: "#fff",
                        },

                        // Aria
                        ariaProps: {
                            role: "status",
                            "aria-live": "polite",
                        },
                    });
                    setTimeout(() => {
                        Navigate(`/${consts?.route}/kyc`);
                    }, 1800);
                }
                else {
                    toast.error(`${res?.data?.message}`, {

                        duration: 1800,
                        position: "top-center",

                        // Styling
                        style: {
                            padding: "1rem",
                            fontSize: "15px",
                            color: "red",
                            fontWeight: "bold",
                        },
                        className: "",

                        // Custom Icon
                        icon: "👏",

                        // Change colors of success/error/loading icon
                        iconTheme: {
                            primary: "#000",
                            secondary: "#fff",
                        },

                        // Aria
                        ariaProps: {
                            role: "status",
                            "aria-live": "polite",
                        },
                    });
                    setTimeout(() => {
                        Navigate(`/${consts?.route}/kyc`);
                    }, 1800);
                }
            })
            .catch((err) => {
                toast.error(`${err?.response?.data?.message}`, {

                    duration: 1800,
                    position: "top-center",

                    // Styling
                    style: {
                        padding: "1rem",
                        fontSize: "15px",
                        color: "green",
                        fontWeight: "bold",
                    },
                    className: "",

                    // Custom Icon
                    // icon: "👏",

                    // Change colors of success/error/loading icon
                    iconTheme: {
                        primary: "#000",
                        secondary: "#fff",
                    },

                    // Aria
                    ariaProps: {
                        role: "status",
                        "aria-live": "polite",
                    },
                });
            });
    };




    return (
        <div className="UserList">
            <Box sx={{ display: lg ? 'flex' : 'block' }}>
                <Header />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 5, width: { lg: `calc(100% - ${drawerWidth}px)` }, marginTop: '50px' }}
                >
                    <Grid2 container spacing={2}>
                        <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                            <Button
                                className="Backbutton"
                                variant="contained"
                                onClick={() => {
                                    back(-1);
                                }}
                            >
                                Back
                            </Button>
                            <div className="custom_table ">
                                <div className='display-1 flex-wrap gap-5 '>

                                    <div className='view-inp p-10'>
                                        <div className='  '>
                                            First Name
                                        </div>
                                        <div className='mt-10'>
                                            <TextField id="outlined-basic" variant="outlined" value={detail?.state?.first_name}
                                                disabled={detail?.state?.first_name} />
                                        </div>
                                    </div>
                                    <div className='view-inp p-10'>
                                        <div className='  '>
                                            Last  Name
                                        </div>
                                        <div className='mt-10'>
                                            <TextField id="outlined-basic" variant="outlined" value={detail?.state?.last_name}
                                                disabled="true" />
                                        </div>
                                    </div>
                                    <div className='view-inp p-10'>
                                        <div className='  '>
                                            Reason
                                        </div>
                                        <div className='mt-10'>
                                            <TextField id="outlined-basic" variant="outlined" value={detail?.state?.reason}
                                                disabled="true" />
                                        </div>
                                    </div>
                                    <div className='view-inp p-10'>
                                        <div className='  '>
                                            Phone
                                        </div>
                                        <div className='mt-10'>
                                            <TextField id="outlined-basic" variant="outlined" value={detail?.state?.phone_no}
                                                disabled={detail?.state?.phone_no} />
                                        </div>
                                    </div>
                                    <div className='view-inp p-10'>
                                        <div className='  '>
                                            Gender
                                        </div>
                                        <div className='mt-10'>
                                            <TextField id="outlined-basic" variant="outlined" value={detail?.state?.gender}
                                                disabled={detail?.state?.gender} />
                                        </div>
                                    </div>
                                    <div className='view-inp p-10'>
                                        <div className='  '>
                                            DOB
                                        </div>
                                        <div className='mt-10'>
                                            <TextField id="outlined-basic" variant="outlined" value={detail?.state?.dob}
                                                disabled={detail?.state?.dob} />
                                        </div>
                                    </div>
                                    <div className='view-inp p-10'>
                                        <div className='  '>
                                            Country
                                        </div>
                                        <div className='mt-10'>
                                            <TextField id="outlined-basic" variant="outlined" value={detail?.state?.country}
                                                disabled={detail?.state?.country} />
                                        </div>
                                    </div>
                                    <div className='view-inp p-10'>
                                        <div className='  '>
                                            State
                                        </div>
                                        <div className='mt-10'>
                                            <TextField id="outlined-basic" variant="outlined" value={detail?.state?.state}
                                                disabled={detail?.state?.state} />
                                        </div>
                                    </div>
                                    <div className='view-inp p-10'>
                                        <div className='  '>
                                            City
                                        </div>
                                        <div className='mt-10'>
                                            <TextField id="outlined-basic" variant="outlined" value={detail?.state?.city}
                                                disabled={detail?.state?.city} />
                                        </div>
                                    </div>
                                    <div className='view-inp p-10'>
                                        <div className='  '>
                                            ZipCode
                                        </div>
                                        <div className='mt-10'>
                                            <TextField id="outlined-basic" variant="outlined" value={detail?.state?.zipcode}
                                                disabled={detail?.state?.zipcode} />
                                        </div>
                                    </div>
                                    <div className='view-inp p-10'>
                                        <div className='  '>
                                            Address
                                        </div>
                                        <div className='mt-10'>
                                            <TextField id="outlined-basic" variant="outlined" value={detail?.state?.address}
                                                disabled={detail?.state?.address} />
                                        </div>
                                    </div>
                                    <div className='view-inp p-10'>
                                        <div className='  '>
                                            Document Type
                                        </div>
                                        <div className='mt-10'>
                                            <TextField id="outlined-basic" variant="outlined" value={detail?.state?.document_type}
                                                disabled={detail?.state?.document_type} />
                                        </div>
                                    </div>
                                    <div className='view-inp p-10'>
                                        <div className='  '>
                                            Document Number
                                        </div>
                                        <div className='mt-10'>
                                            <TextField id="outlined-basic" variant="outlined" value={detail?.state?.document_num}
                                                disabled={detail?.state?.document_num} />
                                        </div>
                                    </div>
                                </div>
                                <div className='display-1 align-fs'>
                                    <div className='vi-img-main'>
                                        <div className='m-10'>
                                            Document Image
                                        </div>
                                        <div className='doc-img '>
                                            <img src={detail?.state?.document_image ? detail?.state?.document_image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYRfUe-QsoznVHhioYTZCgqF2XrP4r2uCWoA&s'} alt="NFTLogo" />
                                        </div>
                                    </div>  
                                    <div className='vi-img-main'>
                                        <div className='m-10'>
                                            Document Image
                                        </div>
                                        <div className='doc-img '>
                                            <img src={detail?.state?.document_image ? detail?.state?.document_image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYRfUe-QsoznVHhioYTZCgqF2XrP4r2uCWoA&s'} alt="NFTLogo" />
                                        </div>
                                    </div>                                 
                                </div>

                            </div>

                        </Grid2>
                    </Grid2>
                </Box>
            </Box>
        </div>
    );
};

export default KycDetails;
