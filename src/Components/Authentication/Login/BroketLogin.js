import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { Link, useParams } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import "./Login.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../../../Images/txlogo.png";
// import consts from '../../../constant.js';
import { useNavigate, NavLink } from "react-router-dom";
import Axios from "axios";
// import toast from "react-hot-toast";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
// import Axios from "axios";
import consts from "../../../constant";
import Checkbox from "@mui/material/Checkbox";
import { AuthContext } from "../../../Authprovider";
import usePagination from "@mui/material/usePagination/usePagination";
import { useSidebar } from "../../../SidebarContext";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const BrokerLogin = () => {
  const theme = useTheme();
  const { auth, toggleAuth, setAuth, setBrokerLogo } = useContext(AuthContext);

  const { dynamicValue } = useParams();

  const [broker, setBroker] = useState(auth ? "/user" : "");

  console.log(auth, "broker");

  const mdScreen = useMediaQuery(theme.breakpoints.up("md"));

  var token = window.localStorage.getItem("Sankar");

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailerr, setEmailerr] = useState(false);
  const [passworderr, setPassworderr] = useState(false);
  const [emailerrmsg, setEmailerrmsg] = useState();
  const [pswErrmsg, setpswerrmsg] = useState();
  const [logoUrl, setLogoUrl] = useState();

  const [load, setLoad] = useState(false);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      localStorage.setItem("Subadmin", "true");
    } else {
      localStorage.setItem("Subadmin", "false");
    }
  };

  const { setBrokers } = useSidebar()

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
      else if (password == undefined) {
        setpswerrmsg("Please Enter Password");
        return setPassworderr(true);
      }
      else if (password.length <= 5) {
        setpswerrmsg("Password must be at least 5 characters long");
        return setPassworderr(true);
      }
      else {
        setLoad(true)
        const payload = {
          email,
          password,
        };
        const { data } = await Axios.post(`${consts.BackendUrl}/brokerlogin`, payload)
        console.log(data, 'data');

        if (data.success) {
          localStorage.setItem("nzanzi", data?.result?.token);
          toast.success(data.message)
          setBrokers("broker")
          setTimeout(() => {
            setLoad(false)
            // navigate(`/${consts.route}`+ auth + '/dashboard');
            setAuth(`/${dynamicValue}`);
            window.localStorage.setItem('DyAuth', `/${dynamicValue}`)
            navigate(`/thaliumxAdmin/${dynamicValue}/dashboard`);
          }, 2000)
        }
        else {
          setLoad(false)
        }
      }

    } catch (error) {
      setLoad(false)
      toast.error(error?.response?.data?.message)
    }

  };

  const GetLogo = async () => {
    const { data } = await Axios.post(`${consts.BackendUrl}/getbrokerlogo`, {
      sitename: dynamicValue,
    });


    if (data.success) {
      setAuth(`/${data?.result?.sitename}`);
      setLogoUrl(data?.result?.logo);
      setBrokerLogo(data?.result?.logo);
      // changeFavicon(data?.result?.logo);
      // document.title = `${data?.result?.sitename.charAt(0).toUpperCase() + data?.result?.sitename.slice(1).toLowerCase()} Panel`;
      localStorage.setItem("Brokerlogo", data?.result?.logo);
    }
  };

  useEffect(() => {
    GetLogo();
  }, []);

  return (
    <div className="auth-page" style={{ height: "100vh", overflow: "hidden" }}>
      <Grid
        container
        spacing={0}
        style={{ height: "100%" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className="login-left-part">
              <div className="logo-part text-center">
                <Link to="/">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Thaliumx" Axios
                      style={{ width: "90px" }}
                      className="log-logo"
                    />
                  ) : (
                    <div aria-label="Loading..." role="status" class="loader">
                      <svg class="icons" viewBox="0 0 256 256">
                        <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                        <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                        <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                        <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                        <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                        <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                        <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                        <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                      </svg>
                      <span class="loading-text">Loading...</span>
                    </div>
                  )}
                </Link>
              </div>

              <div className="login-grid">
                <div className="auth-form">
                  <div className="email-filed">
                    <label className="display-1 fllname">Email</label>
                    <TextField
                      placeholder="Enter email address"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailerrmsg("");
                      }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <svg
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M7.28261 8.94116C5.06386 8.94116 3.28261 7.15991 3.28261 4.94116C3.28261 2.75366 5.06386 0.941162 7.28261 0.941162C9.47011 0.941162 11.2826 2.75366 11.2826 4.94116C11.2826 7.15991 9.47011 8.94116 7.28261 8.94116ZM10.0639 9.94116C12.3764 9.94116 14.2826 11.8474 14.2826 14.1599V15.4412C14.2826 16.2849 13.5951 16.9412 12.7826 16.9412H1.78261C0.938864 16.9412 0.282614 16.2849 0.282614 15.4412V14.1599C0.282614 11.8474 2.15761 9.94116 4.47011 9.94116H5.00136C5.68886 10.2849 6.47011 10.4412 7.28261 10.4412C8.09511 10.4412 8.84511 10.2849 9.53261 9.94116H10.0639Z"
                                  fill="#FF7028"
                                />
                              </svg>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                    <div style={{ color: "red", textAlign: "center" }}>
                      {emailerrmsg}
                    </div>
                  </div>
                  <div className="email-filed phr">
                    <label className="display-1 fllname">Password</label>
                    <FormControl variant="outlined">
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility sx={{ fill: "#fff" }} />
                              ) : (
                                <VisibilityOff sx={{ fill: "#fff" }} />
                              )}
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
                              <svg
                                width="15"
                                height="17"
                                viewBox="0 0 15 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.6014 7.01721C13.4139 7.01721 14.1014 7.70471 14.1014 8.51721V14.5172C14.1014 15.361 13.4139 16.0172 12.6014 16.0172H1.60138C0.757629 16.0172 0.101379 15.361 0.101379 14.5172V8.51721C0.101379 7.70471 0.757629 7.01721 1.60138 7.01721H2.35138V4.76721C2.35138 2.17346 4.47638 0.0172119 7.10138 0.0172119C9.69513 0.0172119 11.8514 2.17346 11.8514 4.76721V7.01721H12.6014ZM9.35138 7.01721V4.76721C9.35138 3.54846 8.32013 2.51721 7.10138 2.51721C5.85138 2.51721 4.85138 3.54846 4.85138 4.76721V7.01721H9.35138Z"
                                  fill="#FF7028"
                                />
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
                    {passworderr && (
                      <p
                        style={{ color: "red", textAlign: "center" }}
                        className="errmsg"
                      >
                        {pswErrmsg}
                      </p>
                    )}
                    <div className="forget-link fllname mt-10">
                      <Link to={`/${consts.route}/${dynamicValue}/forgotPassword`}>Forgot Password?</Link>
                    </div>
                  </div>
                  <div className="form-submit margin-t-30px">
                    <Button
                      disabled={load}
                      onClick={() => {
                        signin();
                      }}
                    >
                      Login
                    </Button>
                  </div>

                  {/* <Checkbox {...label} onChange={toggleAuth}  /> */}
                </div>
              </div>
            </div>
          </Grid>
        }
      </Grid>
      <Toaster />
    </div>
  );
};

export default BrokerLogin;
