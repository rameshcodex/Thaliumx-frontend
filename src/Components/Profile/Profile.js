/* eslint-disable no-unused-vars, eqeqeq */
import React, { useEffect, useState } from "react";
import "./Profile.css";
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  Grid2,
  InputLabel,
  Paper,
  Switch,
  TextField,
} from "@mui/material";
import Header from "../Header/Header";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import useMediaQuery from "@mui/material/useMediaQuery";
import consts from "../../constant";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import toast, { Toaster } from "react-hot-toast";
import Axios from "../../Axios";

const drawerWidth = 260;

const Profile = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [infoLoading, setInfoLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const passwordSchema = yup.object().shape({
    oldPassword: yup.string().required("Old Password is required!"),
    newPassword: yup.string().required("New Password is required!"),
    confirmPassword: yup.string().required("Confirm New Password!").oneOf([yup.ref('newPassword'), null], "Password must Match!"),
  })


  const infoSchema = yup.object().shape({
    name: yup.string("Enter valid Name"),
    username: yup.string("Enter valid User Name"),
    phone: yup.number("Enter valid Number")
  })

  const handleUserDetailsChange = (event) => {
    setUserDetails((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };
  // const handlePasswordChange = (event) => {
  //   setPasswords((prev) => {
  //     return { ...prev, [event.target.name]: event.target.value };
  //   });
  // };
  // const handleImageChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setUrl(imageUrl);
  //     var payload = new FormData();
  //     payload.append("image", file);
  //     setImageUrl("");
  //   }
  // };

  const {
    register: passwordRegister,
    handleSubmit: passwordSubmit,
    reset: passwordReset,
    formState: { errors: passwordErrors } } = useForm({ resolver: yupResolver(passwordSchema) });

  const {
    register: detailsRegister,
    handleSubmit: detailsSubmit,
    reset: detailsReset,
    formState: { errors: detailsErrors } } = useForm({ resolver: yupResolver(infoSchema) });

  const getProfileData = async () => {
    try {

      const { data } = await Axios.get(
        '/admin/getadminprofile',
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi")
          }
        }
      )
      if (data.success) {
        setUserDetails(data.result);
      } else {
        setUserDetails({})
      }

    } catch (error) {
      console.log(error);
      setUserDetails({});
    }
  }

  const checkPassword = () => {
    if (passwordErrors.root?.message) {
      toast.error(passwordErrors.root?.message);
    } else if (passwordErrors.oldPassword?.message) {
      toast.error(passwordErrors.oldPassword?.message);
    } else if (passwordErrors.newPassword?.message) {
      toast.error(passwordErrors.newPassword?.message);
    } else if (passwordErrors.confirmPassword?.message) {
      toast.error(passwordErrors.confirmPassword?.message);
    }
  };

  const saveUserDetails = async () => {
    if (detailsErrors.root?.message) {
      toast.error(detailsErrors.root?.message);
    } else if (detailsErrors.name?.message) {
      toast.error(detailsErrors.name?.message);
    } else if (detailsErrors.username?.message) {
      toast.error(detailsErrors.username?.message);
    } else if (detailsErrors.phone?.message) {
      toast.error(detailsErrors.phone?.message);
    }
  };
  console.log(userDetails)

  const onPasswordSubmit = async (details) => {
    try {
      setLoading(true);
      const { data } = await Axios.post(
        `/admin/changeadminpassword`,
        { oldPassword: details.oldPassword, newPassword: details.newPassword },
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        })
      if (data.success) {
        toast.success("Password Changed successfully");
        passwordReset();
        setLoading(false);
      } else {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while changing password!");
      setLoading(false);
    }
  }

  const onDetailsSubmit = async (details) => {
    try {
      setInfoLoading(true);
      const { data } = await Axios.post(
        `/admin/updateadmindetails`,
        {
          name: details.name && details.name,
          username: details.username && details.username,
          phone: details.phone && details.phone
        },
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        })
      if (data.success) {
        getProfileData();
        toast.success("Details Updated successfully");
        detailsReset();
        setInfoLoading(false);
      } else {
        toast.error(data.message);
        setInfoLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while updating details!");
      setInfoLoading(false);
    }
  }

  useEffect(() => {
    getProfileData();
  }, [])

  return (
    <div className='profile'>
      <Box sx={{ display: lg ? "flex" : "block" }}>
        <Header />
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            p: 5,
            width: { lg: `calc(100% - ${drawerWidth}px)` },
            marginTop: "50px",
          }}
        >
          <div className='title'>
            <h2>Profile</h2>
          </div>
          <Grid2 container spacing={4} alignItems={"center"}>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <Box>
                <Paper className='profile-card'>
                  <div className='display-3 usr-detail'>
                    <Avatar sx={{ width: 56, height: 56 }} />
                    <h4 style={{ margin: 1 }}>{userDetails.name}</h4>
                    <small className='usr-name'>{userDetails.email}</small>
                  </div>
                  <div>
                    <h4 className='mb-10'>ABOUT ME</h4>
                    <p className='usr-name'>
                      <strong>Name : </strong>{userDetails.name}
                    </p>
                    <p className='usr-name'>
                      <strong>Email : </strong>{userDetails.email}
                    </p>
                    <p className='usr-name'>
                      <strong>Mobile : </strong>{userDetails.phone}
                    </p>
                    <FormControlLabel
                      control={<Switch />}
                      label='Google Two Factor Authenticator'
                      className='usr-name'
                      labelPlacement='start'
                    />
                  </div>
                </Paper>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <Box>
                <Paper className='profile-card mt-10'>
                  <div className='display-1'>
                    <LockPersonIcon />
                    <h4>Change Password</h4>
                  </div>
                  <form
                    onSubmit={passwordSubmit(onPasswordSubmit)}
                    className='display-3'
                    style={{ flexDirection: "column", alignItems: "start" }}
                  >
                    <TextField
                      fullWidth
                      label='Old Password'
                      size='small'
                      name='oldPassword'
                      {...passwordRegister('oldPassword')}
                    // value={passwords.oldPassword}
                    // onChange={handlePasswordChange}
                    />
                    <TextField
                      fullWidth
                      label='New Password'
                      size='small'
                      name='newPassword'
                      type='password'
                      {...passwordRegister('newPassword')}
                    // value={passwords.newPassword}
                    // onChange={handlePasswordChange}
                    />
                    <TextField
                      fullWidth
                      label='Confirm Password'
                      size='small'
                      type='password'
                      {...passwordRegister('confirmPassword')}
                      // value={passwords.confirmPassword}
                      // onChange={handlePasswordChange}
                      name='confirmPassword'
                    />
                    <Button
                      variant='contained'
                      startIcon={<SaveIcon />}
                      className='save-btn'
                      type="submit"
                      onClick={checkPassword}
                      disabled={loading}
                    >
                      {loading ? "Saving..." : "Save"}
                    </Button>
                  </form>
                </Paper>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12 }}>
              <Paper className='profile-card'>
                <div className='display-1'>
                  <AccountCircleIcon />
                  <h4>Update Personal Info</h4>
                </div>
                <form onSubmit={detailsSubmit(onDetailsSubmit)}>
                  <Grid2 container spacing={2}>
                    <Grid2 item size={{ xs: 12, md: 6 }}>
                      <InputLabel id="name">Name</InputLabel>
                      <TextField
                        labelId='name'
                        size='small'
                        fullWidth
                        name='name'
                        {...detailsRegister('name')}
                      // value={userDetails?.name}
                      // onChange={handleUserDetailsChange}
                      />
                    </Grid2>
                    <Grid2 item size={{ xs: 12, md: 6 }}>
                      <InputLabel id="user_name">User Name</InputLabel>
                      <TextField
                        labelId='user_name'
                        size='small'
                        fullWidth
                        {...detailsRegister('username')}
                      // value={userDetails?.username}
                      />
                    </Grid2>
                    {/* <Grid2 item size={{ xs: 12, md: 6 }}>
                    <InputLabel id="email">Email</InputLabel>
                    <TextField
                      labelId='email'
                      size='small'
                      fullWidth
                      disabled
                      value={userDetails?.email}
                      name='email'
                      onChange={handleUserDetailsChange}
                    />
                  </Grid2> */}
                    <Grid2 item size={{ xs: 12, md: 6 }}>
                      <InputLabel id="mobile">Mobile</InputLabel>
                      <TextField
                        labelId='mobile'
                        size='small'
                        fullWidth
                        name='mobile'
                        {...detailsRegister('phone')}
                      // value={userDetails?.phone}
                      // onChange={handleUserDetailsChange}
                      />
                    </Grid2>
                  </Grid2>
                  <Box className='m-20'>
                    <Button
                      variant='contained'
                      type="submit"
                      startIcon={<SaveIcon />}
                      className='save-btn'
                      disabled={infoLoading}
                      onClick={saveUserDetails}
                    >
                      Save
                    </Button>
                  </Box>
                </form>

                {/* <div className='img-upload'>
                    {url ? (
                      <div className='img-contianer'>
                        <img src={url} alt='Profile' />
                        <label
                          for='profile_image'
                          className='upload-btn display-3 cursor'
                        >
                          <AddIcon />
                        </label>
                        <input
                          type='file'
                          id='profile_image'
                          hidden
                          onChange={handleImageChange}
                        />
                      </div>
                    ) : (
                      <div className='img-contianer'>
                        <label
                          for='profile_image'
                          className='display-3 cursor'
                          style={{
                            height: "100%",
                            width: "100%",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
                          <AddIcon />
                          <div className='usr-name'>Upload Image</div>
                        </label>
                        <input
                          type='file'
                          id='profile_image'
                          hidden
                          onChange={handleImageChange}
                        />
                      </div>
                    )}

                    <div className='text-center'>
                      <h3 className='mb-10'>Profile Image</h3>
                      <div className='usr-name'>
                        File types supported: .png, .jpeg, .jpg
                      </div>
                      <div className='usr-name'>Max Size: 2 MB</div>
                    </div>
                  </div> */}

              </Paper>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
      <Toaster />
    </div>
  );
};

export default Profile;
