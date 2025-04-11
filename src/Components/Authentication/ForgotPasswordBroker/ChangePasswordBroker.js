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

const ChangePasswordBroker = () => {
    const theme = useTheme();
    const { auth, toggleAuth, setAuth, setBrokerLogo } = useContext(AuthContext);

    const mdScreen = useMediaQuery(theme.breakpoints.up('md'));

    var token = window.localStorage.getItem('Sankar')

    const navigate = useNavigate()

    const [otp, setOtp] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [otperr, setOtpErr] = useState(false);
    const [passworderr, setPassworderr] = useState(false);
    const [confpassworderr, setConfPassworderr] = useState(false);
    const [otpErrmsg, setOtpErrmsg] = useState();
    const [pswErrmsg, setpswerrmsg] = useState();
    const [confpswErrmsg, setConfpswerrmsg] = useState();

    const [load, setLoad] = useState(false)

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickConfirmShowPassword = () =>
        setShowConfirmPassword((show) => !show);

    const [confPassErr, setConfPassErr] = useState("");


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [checked, setChecked] = useState(false);

    const [localLogo, setLocalLogo] = useState(localStorage.getItem('Brokerlogo'))

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
            localStorage.setItem('Subadmin', 'true')
        } else {
            localStorage.setItem('Subadmin', 'false')
        }
    };

    const { dynamicValue } = useParams();

    const signin = async () => {
        try {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
            if (otp == undefined) {
                setOtpErrmsg("Please Enter OTP")
                return setOtpErr(true)
            }
            // else if (otp?.length != 6) {
            //     setOtpErrmsg("Please Enter 6 digit OTP")
            //     return setOtpErr(true)
            // }
            else if (password == undefined) {
                setpswerrmsg("Please Enter Password");
                return setPassworderr(true);
            }
            else if (!passwordRegex.test(password)) {
                setpswerrmsg("Password must contain at least 8 characters, one uppercase letter, one number, and one special character (e.g., Abc@1234)");
                return setPassworderr(true);
            }
            else if (confirmPassword == undefined) {
                setConfpswerrmsg("Please Enter Re-Enter Password");
                return setConfPassworderr(true);
            }
            else if (password != confirmPassword) {
                setConfpswerrmsg("Password does not match with Re-enter Password");
                return setConfPassworderr(true);
            }
            else {
                setLoad(true)
                const payload = {
                    otp,
                    email: localStorage.getItem("email"),
                    password,
                    role: 'broker'
                };
                const { data } = await Axios.post(`${consts.BackendUrl}/admin/resetPassword`, payload)
                console.log(data, 'data');

                if (data.success) {
                    localStorage.removeItem("email");
                    toast.success(data.message)
                    setTimeout(() => {
                        navigate(`/${consts.route}/${dynamicValue}/login`)
                    }, 1000);
                }
                else {
                    setLoad(false)
                    toast.error(data?.messsage)
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
                                    <label className='display-1 fllname'>OTP</label>
                                    <TextField placeholder='Enter OTP'
                                        onChange={(e) => {
                                            setOtp(e.target.value);
                                            setOtpErrmsg("")
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
                                    <div style={{ color: "red", textAlign: "center" }}  >{otpErrmsg}</div>
                                </div>
                                <div className='email-filed phr'>
                                    <label className='display-1 fllname'>Password</label>
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Password'
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility sx={{ fill: '#fff' }} /> : <VisibilityOff sx={{ fill: '#fff' }} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="start"
                                                    >
                                                        <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.6014 7.01721C13.4139 7.01721 14.1014 7.70471 14.1014 8.51721V14.5172C14.1014 15.361 13.4139 16.0172 12.6014 16.0172H1.60138C0.757629 16.0172 0.101379 15.361 0.101379 14.5172V8.51721C0.101379 7.70471 0.757629 7.01721 1.60138 7.01721H2.35138V4.76721C2.35138 2.17346 4.47638 0.0172119 7.10138 0.0172119C9.69513 0.0172119 11.8514 2.17346 11.8514 4.76721V7.01721H12.6014ZM9.35138 7.01721V4.76721C9.35138 3.54846 8.32013 2.51721 7.10138 2.51721C5.85138 2.51721 4.85138 3.54846 4.85138 4.76721V7.01721H9.35138Z" fill="#FF7028" />
                                                        </svg>

                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            onChange={(e) => {
                                                setPassworderr(false);
                                                setPassword(e.target.value);
                                            }}

                                        />

                                    </FormControl>
                                    {passworderr && <p style={{ color: "red", textAlign: "center" }} className="errmsg">{pswErrmsg}</p>}
                                </div>

                                <div className='email-filed phr'>
                                    <label className='display-1 fllname'>Re-Enter Password</label>
                                    <FormControl variant="outlined">
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder='Re-Enter Password'
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickConfirmShowPassword}
                                                        edge="end"
                                                    >
                                                        {showConfirmPassword ? <Visibility sx={{ fill: '#fff' }} /> : <VisibilityOff sx={{ fill: '#fff' }} />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickConfirmShowPassword}
                                                        edge="start"
                                                    >
                                                        <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M12.6014 7.01721C13.4139 7.01721 14.1014 7.70471 14.1014 8.51721V14.5172C14.1014 15.361 13.4139 16.0172 12.6014 16.0172H1.60138C0.757629 16.0172 0.101379 15.361 0.101379 14.5172V8.51721C0.101379 7.70471 0.757629 7.01721 1.60138 7.01721H2.35138V4.76721C2.35138 2.17346 4.47638 0.0172119 7.10138 0.0172119C9.69513 0.0172119 11.8514 2.17346 11.8514 4.76721V7.01721H12.6014ZM9.35138 7.01721V4.76721C9.35138 3.54846 8.32013 2.51721 7.10138 2.51721C5.85138 2.51721 4.85138 3.54846 4.85138 4.76721V7.01721H9.35138Z" fill="#FF7028" />
                                                        </svg>

                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            onChange={(e) => {
                                                setConfPassworderr(false);
                                                setConfirmPassword(e.target.value);
                                            }}

                                        />

                                    </FormControl>
                                    {confpassworderr && <p style={{ color: "red", textAlign: "center" }} className="errmsg">{confpswErrmsg}</p>}
                                </div>
                                <div className='form-submit margin-t-30px'>
                                    <Button disabled={load} onClick={() => { signin() }} >Change Password</Button>
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

export default ChangePasswordBroker
