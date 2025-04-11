import React, { useEffect, useState } from "react";
import "./Users.css";
import {
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Avatar, Box, Grid2 } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import { red } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import ReusableTable from "../ReuseTable/ReuseTable";
import Axios from "axios";
import consts from "../../constant";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import toast from "react-hot-toast";

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red[600],
    '&:hover': {
      backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: red[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

const drawerWidth = 260;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const Users = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate()


  const {
    register: addUser,
    handleSubmit: handleAddUser,
    setValue: userSetValue,
    getValues: userGetValue,
    setError: userSetError,
    clearErrors: userClearError,
    formState: { errors: errorsAddUser },
  } = useForm();

  const {
    register: editUsr,
    handleSubmit: handleEditUser,
    setValue,
    getValues: blockUser,
    formState: { errors: errorsEditUser },
  } = useForm();

  const { setValue: setDeleteUser, getValues } = useForm();


  const onSubmitEditUser = (data) => {
    console.log(data);
  };


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = (val) => {
    setOpenEdit(true);
    setValue("name", val.name);
    setValue("email", val.email);
    setValue("country", val.country);
    setValue("phone", val.phone);

  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const [OpenDeleteUser, setOpenDeleteUser] = useState(false)

  const handleOpenDelete = (val) => {
    setOpenDeleteUser(true);
    setDeleteUser("name", val.name)

  }
  const handleCloseDelete = () => setOpenDeleteUser(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [collections, setCollections] = useState({
    columns: [
      { Header: 'Sno', accessor: 'sno', align: 'left' },
      { Header: 'Name', accessor: 'name', align: 'left' },
      { Header: 'Email', accessor: 'email', align: 'left' },
      { Header: 'Phone', accessor: 'phone', align: 'left' },
      { Header: 'Kyc Verify', accessor: 'kycverify', align: 'left' },
      { Header: 'Action', accessor: 'view', align: 'left' },
    ], row: []
  })

  const [search, setSearch] = useState("")

  const [usersList, setUsersList] = useState([])

  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)

  const getUsersList = async (type, page) => {
    try {
      const { data } = await Axios.post(
        `${consts.BackendUrl}/admin/getUsers?search=${type}&page=${page}&limit=10`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data?.success == true) {
        if (data?.result?.docs?.length > 0) {
          setUsersList(data?.result?.docs)
          setTotalCount(data?.result?.totalPages)
        }
      } else {
        setUsersList([])
        setCollections(prevState => ({
          ...prevState,
          row: [],
          pagecount: 0
        }));
      }
    } catch (error) {
      setUsersList([])
      setCollections(prevState => ({
        ...prevState,
        row: [],
        pagecount: 0
      }));
      console.log(error);
    }
  };

  useEffect(() => {
    if (usersList?.length > 0) {
      var formattedRows = []
      for (let i = 0; i < usersList?.length; i++) {
        var obj = {}
        const users = usersList[i];
        obj.sno = (<div>{i + 1}</div>)
        obj.name = (<div>{users?.name ? users?.name : "-"}</div>)
        obj.email = (<div>{users?.email}</div>)
        obj.phone = (<div>{users?.phone ? users?.phone : "-"}</div>)
        obj.kycverify = (<div>{users?.kyc_verify == "true" ? <CheckCircleOutlineIcon sx={{ color: "green" }} /> : <HighlightOffIcon sx={{ color: "red" }} />}</div>)
        obj.view = (<div><Button variant="contained" onClick={() => { navigate(`/${consts?.route}/userlist`, { state: { id: users } }) }} >View</Button></div>)
        formattedRows.push(obj)
      }
      setCollections(prevState => ({
        ...prevState,
        row: formattedRows,
        pagecount: totalCount
      }));
    }
  }, [usersList])

  const onSubmitUser = async () => {
    var payload = {
      name: userGetValue("name"),
      email: userGetValue("email"),
      country: userGetValue("country"),
      phone: userGetValue("phone"),
      password: userGetValue("paswd"),
    }
    var emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
    if (!payload?.name) return userSetError("name", { type: "manual", message: "Please Enter Name" })
    if (!payload?.email) return userSetError("email", { type: "manual", message: "Please Enter Email" })
    if (!emailregex.test(payload?.email)) return userSetError("email", { type: "manual", message: "Please Enter Valid Email" })
    if (!payload?.country) return userSetError("country", { type: "manual", message: "Please Enter Country" })
    if (!payload?.phone) return userSetError("phone", { type: "manual", message: "Please Enter Phone Number" })
    if (!payload?.password) return userSetError("paswd", { type: "manual", message: "Please Enter Password" })

    const { data } = await Axios.post(`${consts.BackendUrl}/admin/updateUser`, payload,
      {
        headers: {
          Authorization: localStorage.getItem("nzanzi"),
        }
      }
    )
    if (data?.success == true) {
      toast.success("Updated Successfully")
    }
  };


  useEffect(() => {
    getUsersList(search, 1);
  }, []);


  const paginationChange = (val) => {
    if (page !== val) {
      getUsersList(search, val);
      setPage(val)
    }
  }

  return (
    <div className="users-container">
      <Box sx={{ display: lg ? "flex" : "block" }}>
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 5,
            width: { lg: `calc(100% - ${drawerWidth}px)` },
            marginTop: "50px",
          }}
        >
          <Grid2 container spacing={2}>
            <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <div className="display-2">
                <h2>Users</h2>
                <div className="display-1">
                  <div class="group">
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
                      <g>
                        <path
                          d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                        ></path>
                      </g>
                    </svg>
                    <input class="input2" type="search" placeholder="Search" value={search} onChange={(e) => {
                      setSearch(e.target.value);
                      if (e.target.value == "") {
                        getUsersList("", 1);
                        setPage(1)
                      }
                    }} />
                  </div>
                  <Button variant="contained" color="primary" onClick={() => {
                      getUsersList(search, 1)
                      setPage(1)
                    }}
                  >
                    Search
                  </Button>
                  <Button variant="contained" color="primary" onClick={handleOpen}>
                    Add User
                  </Button>
                </div>
              </div>
              <ReusableTable collections={collections} paginationChange={paginationChange} page={page} />
            </Grid2>
          </Grid2>
        </Box>
      </Box>

      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-right cursor">
            <HighlightOffIcon onClick={handleClose} />
          </div>
          <h2 className="text-center">ADD USER</h2>
          {/* <form
            onSubmit={() => {
              addUser(onSubmitUser);
            }}
          > */}
          <div className="add-suer-input">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              sx={{
                width: "100%",
                input: { padding: "13px" },
                label: { top: "-3px" },
                marginTop: "15px",
              }}
              {...addUser("name", { required: "Name is required" })}
              error={!!errorsAddUser.name}
              helperText={errorsAddUser.name?.message}
              onChange={() => { userClearError("name") }}
            />
          </div>
          <div className="add-suer-input">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              sx={{
                width: "100%",
                input: { padding: "13px" },
                label: { top: "-3px" },
                marginTop: "15px",
              }}
              {...addUser("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              error={!!errorsAddUser.email}
              helperText={errorsAddUser.email?.message}
              onChange={() => { userClearError("email") }}
            />
          </div>
          <div className="add-suer-input">
            <TextField
              id="outlined-basic"
              label="Country"
              variant="outlined"
              sx={{
                width: "100%",
                input: { padding: "13px" },
                label: { top: "-3px" },
                marginTop: "15px",
              }}
              {...addUser("country", { required: "Country is required" })}
              error={!!errorsAddUser.country}
              helperText={errorsAddUser.country?.message}
              onChange={() => { userClearError("country") }}
            />
          </div>
          <div className="add-suer-input">
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              type="number"
              sx={{
                width: "100%",
                input: { padding: "13px" },
                label: { top: "-3px" },
                marginTop: "15px",
              }}
              {...addUser("phone", { required: "Phone Number is required" })}
              error={!!errorsAddUser.phone}
              helperText={errorsAddUser.phone?.message}
              onChange={() => { userClearError("phone") }}
            />
          </div>
          <div className="add-suer-input">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              sx={{
                width: "100%",
                input: { padding: "13px" },
                label: { top: "-3px" },
                marginTop: "15px",
              }}
              {...addUser("paswd", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]+$/,
                  message:
                    "Password must contain upper, lower, number & special char",
                },
              })}
              error={!!errorsAddUser.paswd}
              helperText={errorsAddUser.paswd?.message}
              onChange={() => { userClearError("paswd") }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="display-3 mt-20">
            <Button variant="contained" color="primary" onClick={() => {
              onSubmitUser()
            }}>
              Add
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: "8px" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
          {/* </form> */}
        </Box>
      </Modal>



      {/*Delete User */}
      <Modal
        open={OpenDeleteUser}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-right cursor">
            <HighlightOffIcon onClick={handleCloseDelete} />
          </div>
          <h2 className="text-center">Aare yo Sure you want to Delete {getValues("name")}</h2>
          <div className="display-3 mt-20">
            <Button variant="contained" color="primary" type="submit">
              Delete
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: "8px" }}
              onClick={() => { handleCloseDelete() }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

    </div>
  );
};

export default Users;
