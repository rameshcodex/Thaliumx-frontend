/* eslint-disable no-unused-vars, eqeqeq */
import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import { Link, useParams } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import '../Login/Login.css'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Logo from "../../../Images/txlogo.png";
// import consts from '../../../constant.js';
import { useNavigate, NavLink } from 'react-router-dom';
import Axios from 'axios';
// import toast from "react-hot-toast";
import { Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
// import Axios from "axios";
import consts from "../../../constant";
import Checkbox from '@mui/material/Checkbox';
import { AuthContext } from '../../../Authprovider';
import Broker from '../../Broker/Broker';


const ForgotPasswordBroker = () => {
    const theme = useTheme();
    const { auth, toggleAuth, setAuth, setBrokerLogo } = useContext(AuthContext);

    const mdScreen = useMediaQuery(theme.breakpoints.up('md'));

    var token = window.localStorage.getItem('Sankar')

    const navigate = useNavigate()

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [emailerr, setEmailerr] = useState(false);
    const [passworderr, setPassworderr] = useState(false);
    const [emailerrmsg, setEmailerrmsg] = useState();
    const [pswErrmsg, setpswerrmsg] = useState();

    const [load, setLoad] = useState(false)

    const [showPassword, setShowPassword] = React.useState(false);

    const [localLogo, setLocalLogo] = useState(localStorage.getItem('Brokerlogo'))

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [checked, setChecked] = useState(false);
    const { dynamicValue } = useParams();

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
            localStorage.setItem('Subadmin', 'true')
        } else {
            localStorage.setItem('Subadmin', 'false')
        }
    };
    const signin = async () => {
        try {
            const emailRegex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

            const emailcheck = emailRegex.test(email);
            if (email == undefined) {
                setEmailerrmsg("Please Enter Email");
                return setEmailerr(true);
            }
            else if (!emailcheck) {
                setEmailerrmsg("Invalid Email");
                return setEmailerr(true);
            }
            else {
                setLoad(true)
                const payload = {
                    email,
                    role: 'broker'
                };
                const { data } = await Axios.post(`${consts.BackendUrl}/admin/forgotPassword`, payload)
                console.log(data, 'data');

                if (data.success) {
                    toast.success(data.message)
                    localStorage.setItem('email', payload.email)
                    navigate(`/${consts.route}/${dynamicValue}/changePassword`)
                }
                else {
                    setLoad(false)
                    toast.error(data?.message)
                }
            }

        } catch (error) {
            setLoad(false)
            toast.error(error?.response?.data?.message)
        }
        // navigate('/thaliumxAdmin/dashboard')
    };


    return (
        <div className='auth-page' style={{ height: '100vh', overflow: 'hidden' }}>

            <Grid container spacing={0} style={{ height: '100%' }} alignItems={'center'} justifyContent={'center'}>
                {<Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                    <div className="login-left-part">
                        <div className="logo-part text-center">
                            <Link to='/'>
                                <img src={localLogo ? localLogo : Logo} alt="Thaliumx" style={{ width: '90px' }} className='log-logo' />
                            </Link>
                        </div>

                        <div className='login-grid'>
                            <div className="auth-form">
                                <div className='email-filed'>
                                    <label className='display-1 fllname'>Email</label>
                                    <TextField placeholder='Enter email address'
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailerrmsg("")
                                        }}

                                        slotProps={{
                                            input: {
                                                startAdornment: <InputAdornment position="start">
                                                    <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.28261 8.94116C5.06386 8.94116 3.28261 7.15991 3.28261 4.94116C3.28261 2.75366 5.06386 0.941162 7.28261 0.941162C9.47011 0.941162 11.2826 2.75366 11.2826 4.94116C11.2826 7.15991 9.47011 8.94116 7.28261 8.94116ZM10.0639 9.94116C12.3764 9.94116 14.2826 11.8474 14.2826 14.1599V15.4412C14.2826 16.2849 13.5951 16.9412 12.7826 16.9412H1.78261C0.938864 16.9412 0.282614 16.2849 0.282614 15.4412V14.1599C0.282614 11.8474 2.15761 9.94116 4.47011 9.94116H5.00136C5.68886 10.2849 6.47011 10.4412 7.28261 10.4412C8.09511 10.4412 8.84511 10.2849 9.53261 9.94116H10.0639Z" fill="#FF7028" />
                                                    </svg>
                                                </InputAdornment>,
                                            },
                                        }}

                                    />
                                    <div style={{ color: "red", textAlign: "center" }}  >{emailerrmsg}</div>
                                </div>
                                <div className='form-submit margin-t-30px'>
                                    <Button disabled={load} onClick={() => { signin() }} >Reset Password</Button>
                                </div>


                                {/* <Checkbox {...label} onChange={toggleAuth}  /> */}

                                {/* <div onClick={()=>{navigate(`/${consts.route + auth +'/login'}` )}} className='mt-10 cursor text-center'>
    Broker
</div> */}
                            </div>

                        </div>

                    </div>
                </Grid>}



            </Grid>
            <Toaster />

        </div>
    )
}

export default ForgotPasswordBroker
