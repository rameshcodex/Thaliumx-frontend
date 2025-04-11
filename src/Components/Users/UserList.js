/* eslint-disable no-unused-vars, eqeqeq */
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
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useForm, Controller } from "react-hook-form";
import { red } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ReusableTable from "../ReuseTable/ReuseTable";
import Axios from "axios";
import consts from "../../constant";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { MenuItem } from '@mui/material';
import toast, { Toaster } from "react-hot-toast";

const drawerWidth = 260;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  '@media(max-width:767.98px)': {
    width: '95%'
  },
  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const UserList = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate();

  const location = useLocation()

  const id = location?.state?.id

  const {
    register: addUser,
    handleSubmit: handleAddUser,
    setValue: userSetValue,
    getValues: userGetValue,
    setError: userSetError,
    clearErrors: userClearError,
    control: userControl,
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

  const onSubmitUser = async () => {
    var payload = {
      name: userGetValue("name"),
      email: userGetValue("email"),
      country: userGetValue("country"),
      phone: userGetValue("phone"),
      referral_code: userGetValue("referral_code"),
      kyc_verify: userGetValue("kyc_verify") == "verified" ? "true" : "false",
    }
    var emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
    if (!payload?.name) return userSetError("name", { type: "manual", message: "Please Enter Name" })
    if (!payload?.email) return userSetError("email", { type: "manual", message: "Please Enter Email" })
    if (!emailregex.test(payload?.email)) return userSetError("email", { type: "manual", message: "Please Enter Valid Email" })
    if (!payload?.country) return userSetError("country", { type: "manual", message: "Please Enter Country" })
    if (!payload?.phone) return userSetError("phone", { type: "manual", message: "Please Enter Phone Number" })
    payload.userId = id?._id
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

  const onSubmitEditUser = (data) => {
    console.log(data);
  };


  const [valueTab, setValueTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
    setKycList([])
    setBuyTrade([])
    setDepositHistory([])
    setPage(1)
    setTotalCount(0)
    if (newValue == 1) {
      getKycDetails(1)
    } else if (newValue == 3) {
      depositandWithdrawHistory("deposit", 1)
    } else if (newValue == 4) {
      depositandWithdrawHistory("withdraw", 1)
    } else if (newValue == 5) {
      getBuyTrade("buy", 1)
    } else if (newValue == 6) {
      getBuyTrade("sell", 1)
    }
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

  const [check, setCheck] = useState(false)

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [collections, setCollections] = useState({ columns: [], row: [] })


  const handleWheel = (event) => {
    event.target.blur(); // Prevents number from changing when scrolling
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault(); // Prevents number from changing with arrow keys
    }
  };


  const [kycList, setKycList] = useState([])
  const [buyTrade, setBuyTrade] = useState([])
  const [depositHistory, setDepositHistory] = useState([])

  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const getKycDetails = async (page) => {
    try {
      setCollections(
        {
          columns: [
            { Header: 'Sno', accessor: 'sno', align: 'left' },
            { Header: 'Firstname', accessor: 'firstname', align: 'left' },
            { Header: 'Secondname', accessor: 'secondname', align: 'left' },
            { Header: 'Email', accessor: 'email', align: 'left' },
            { Header: 'Phone No', accessor: 'phone', align: 'left' },
            { Header: 'ID Type', accessor: 'idtype', align: 'left' },
            { Header: 'Status', accessor: 'status', align: 'left' },
            { Header: 'Action', accessor: 'view', align: 'left' },
          ]
        }
      )
      const { data } = await Axios.get(
        `${consts.BackendUrl}/kycsList?user_id=${id?._id}&page=${page}&limit=10`,
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data?.success == true) {
        if (data?.result?.docs?.length > 0) {
          setKycList(data?.result?.docs)
          setTotalCount(data?.result?.totalPages)
        }
      } else {
        setKycList([])
        setCollections(prevState => (
          {
            ...prevState,
            row: [],
            pagecount: 0
          }
        ))
      }
    } catch (error) {
      setCollections(prevState => (
        {
          ...prevState,
          row: [],
          pagecount: 0
        }
      ))
      console.log(error, "error")
    }
  }

  const getBuyTrade = async (type, page) => {
    try {
      setCollections(
        {
          columns: [
            { Header: 'Sno', accessor: 'sno', align: 'left' },
            { Header: 'OrderID', accessor: 'order_id', align: 'center' },
            { Header: 'Pair', accessor: 'pair', align: 'center' },
            { Header: 'Order Type', accessor: 'order_type', align: 'center' },
            { Header: 'Trade Type', accessor: 'trade', align: 'center' },
            { Header: 'Price', accessor: 'price', align: 'center' },
            { Header: 'Volume', accessor: 'volume', align: 'center' },
            { Header: 'Value', accessor: 'value', align: 'center' },
            { Header: 'Status', accessor: 'status', align: 'center' },
          ]
        }
      )
      const { data } = await Axios.post(
        `${consts.BackendUrl}/trade/getusertrade?page=${page}&limit=10`,
        {
          userId: id?._id,
          trade_type: type
        },
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data?.success == true) {
        if (data?.result?.docs?.length > 0) {
          setBuyTrade(data?.result?.docs);
          setTotalCount(data?.result?.totalPages)
        }
      } else {
        setBuyTrade([])
        setCollections(prevState => (
          {
            ...prevState,
            row: [],
            pagecount: 0
          }
        ))
      }
    } catch (error) {
      setBuyTrade([])
      setCollections(prevState => (
        {
          ...prevState,
          row: [],
          pagecount: 0
        }
      ))
      console.log(error, "error")
    }
  }

  const depositandWithdrawHistory = async (type, page) => {
    try {
      setCollections(
        {
          columns: [
            { Header: 'Sno', accessor: 'sno', align: 'left' },
            { Header: 'Date', accessor: 'date', align: 'center' },
            { Header: 'Asset', accessor: 'asset', align: 'center' },
            { Header: 'From', accessor: 'from', align: 'center' },
            { Header: 'Amount', accessor: 'amount', align: 'center' },
            // { Header: 'Contract Address', accessor: 'contractAddress', align: 'center' },
            { Header: 'Status', accessor: 'status', align: 'center' },
          ]
        }
      )
      const { data } = await Axios.post(
        `${consts.BackendUrl}/wallet/adminGetDepositHistory?page=${page}&limit=10`,
        {
          user_id: id?._id,
          type: type
        },
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data?.success == true) {
        if (data?.result?.docs?.length > 0) {
          setDepositHistory(data?.result?.docs)
          setTotalCount(data?.result?.totalPages)
        }
      } else {
        setDepositHistory([])
        setCollections(prevState => (
          {
            ...prevState,
            row: [],
            pagecount: 0
          }
        ))
      }
    } catch (error) {
      setDepositHistory([])
      setCollections(prevState => (
        {
          ...prevState,
          row: [],
          pagecount: 0
        }
      ))
      console.log(error, "error")
    }
  }

  useEffect(() => {
    if (kycList?.length > 0) {
      var formattedRows = []
      for (let i = 0; i < kycList?.length; i++) {
        var obj = {}
        const users = kycList[i];
        obj.sno = (<div>{i + 1}</div>)
        obj.firstname = (<div>{users?.Firstname ? users?.Firstname : "-"}</div>)
        obj.secondname = (<div>{users?.Lastname ? users?.Lastname : "-"}</div>)
        obj.email = (<div>{users?.email}</div>)
        obj.phone = (<div>{users?.phone ? users?.phone : "-"}</div>)
        obj.idtype = (<div>{users?.ID_type ? users?.ID_type : "-"}</div>)
        obj.status = (<div>{users?.status == "0" ? "Liveness Pending" : users?.status == "1" ? "Liveness Failed" : users?.status == "2" ? "Approved" : "-"}</div>)
        obj.view = (<div><Button variant="contained" onClick={() => { navigate(`/${consts?.route}/userlist`) }} >View</Button></div>)
        formattedRows.push(obj)
      }
      setCollections(prevState => ({
        ...prevState,
        row: formattedRows,
        pagecount: totalCount
      }));
    } else if (buyTrade?.length > 0) {
      var formattedRows = []
      for (let i = 0; i < buyTrade?.length; i++) {
        var obj = {}
        const users = buyTrade[i];
        obj.sno = (<div>{i + 1}</div>)
        obj.order_id = (<div>{users?.order_id ? users?.order_id : "-"}</div>)
        obj.pair = (<div>{users?.pair ? users?.pair : "-"}</div>)
        obj.order_type = (<div>{users?.order_type ? users?.order_type : "-"}</div>)
        obj.trade = (<div>{users?.trade}</div>)
        obj.price = (<div>{users?.price ? users?.price : "-"}</div>)
        obj.volume = (<div>{users?.volume ? users?.volume : "-"}</div>)
        obj.value = (<div>{users?.value ? users?.value : "-"}</div>)
        obj.status = (<div>{users?.status}</div>)
        formattedRows.push(obj)
      }
      setCollections(prevState => ({
        ...prevState,
        row: formattedRows,
        pagecount: totalCount
      }));
    }
    else if (depositHistory?.length > 0) {
      var formattedRows = []
      for (let i = 0; i < depositHistory?.length; i++) {
        var obj = {}
        const users = depositHistory[i];
        obj.sno = (<div>{i + 1}</div>)
        obj.date = (<div>{users?.createdAt?.split("T")[0]} : {users?.createdAt?.split("T")[1]?.split(".")[0]}</div>)
        obj.asset = (<div>{users?.asset ? users?.asset : "-"}</div>)
        obj.from = (<div>{users?.from ? users?.from : "-"}</div>)
        obj.amount = (<div>{users?.amount}</div>)
        // obj.contractAddress = (<div>{users?.contractAddress ? users?.contractAddress : "-"}</div>)
        obj.status = (<div>{users?.status}</div>)
        formattedRows.push(obj)
      }
      setCollections(prevState => ({
        ...prevState,
        row: formattedRows,
        pagecount: totalCount
      }));
    }
  }, [kycList, buyTrade, depositHistory])


  const [userDetails, setUserDetails] = useState("")

  const getSingleUserDetails = async () => {
    try {
      const { data } = await Axios.get(
        `${consts.BackendUrl}/admin/getoneuser/${id?._id}`,
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data?.success == true) {
        setUserDetails(data?.result?.user)
      }
    } catch (error) {
      console.log(error, "errorerror")
    }
  }


  useEffect(() => {
    if (userDetails) {
      userSetValue("name", userDetails?.name)
      userSetValue("email", userDetails?.email)
      userSetValue("country", userDetails?.country)
      userSetValue("phone", userDetails?.phone)
      userSetValue("referral_code", userDetails?.referral_code)
      userSetValue("kyc_verify", userDetails?.kyc_verify == "true" ? "verified" : "not_verified")
    }
  }, [userDetails])

  useEffect(() => {
    if (id) {
      getSingleUserDetails()
    }
  }, [id])

  const paginationChange = (val) => {
    if (page !== val) {
      if (valueTab == 1) {
        getKycDetails(val)
      }
      else if (valueTab == 3) {
        depositandWithdrawHistory("deposit", val)
      } else if (valueTab == 4) {
        depositandWithdrawHistory("withdraw", val)
      } else if (valueTab == 5) {
        getBuyTrade("buy", val)
      } else if (valueTab == 6) {
        getBuyTrade("sell", val)
      }
      setPage(val)
    }
  }


  return (
    <div className="users-container">
      <Toaster />
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
                <div className="display-1">
                  <ArrowBackIosIcon className="cursor" onClick={() => navigate(-1)} />

                  <h2>User List</h2>
                </div>

              </div>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={valueTab} onChange={handleChangeTab} aria-label="basic tabs example" className="usersatb">
                  <Tab label="User Details" {...a11yProps(0)} />
                  <Tab label="Kyc" {...a11yProps(1)} />
                  <Tab label="Wallet" {...a11yProps(2)} />
                  <Tab label="Deposit" {...a11yProps(2)} />
                  <Tab label="Withdraw" {...a11yProps(2)} />
                  <Tab label="Buy Trade" {...a11yProps(2)} />
                  <Tab label="Sell Trade" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={valueTab} index={0}>

                <div className="add-suer-input">
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    sx={{
                      width: "500px",
                      '@media (max-width: 600px)': {
                        width: "90%",
                      },
                      input: { padding: "13px" },
                      label: { top: "-3px" },
                      marginTop: "15px",
                    }}
                    InputLabelProps={{
                      shrink: true,  // Keeps the label above the input always
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
                      width: "500px",
                      '@media (max-width: 600px)': {
                        width: "90%",
                      },
                      input: { padding: "13px" },
                      label: { top: "-3px" },
                      marginTop: "15px",
                    }}
                    InputLabelProps={{
                      shrink: true,  // Keeps the label above the input always
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
                      width: "500px",
                      '@media (max-width: 600px)': {
                        width: "90%",
                      },
                      input: { padding: "13px" },
                      label: { top: "-3px" },
                      marginTop: "15px",
                    }}
                    InputLabelProps={{
                      shrink: true,  // Keeps the label above the input always
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
                      width: "500px",
                      '@media (max-width: 600px)': {
                        width: "90%",
                      },
                      input: { padding: "13px" },
                      label: { top: "-3px" },
                      marginTop: "15px",
                    }}
                    InputLabelProps={{
                      shrink: true,  // Keeps the label above the input always
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
                    label="Refferal ID"
                    variant="outlined"
                    disabled={true}
                    sx={{
                      width: "500px",
                      '@media (max-width: 600px)': {
                        width: "90%",
                      },
                      input: { padding: "13px" },
                      label: { top: "-3px" },
                      marginTop: "15px",
                    }}
                    InputLabelProps={{
                      shrink: true,  // Keeps the label above the input always
                    }}
                    {...addUser("referral_code", { required: "Refferal is required" })}
                    error={!!errorsAddUser.referral_code}
                    helperText={errorsAddUser.referral_code?.message}
                  />
                </div>
                <div className="add-user-input">
                  <Controller
                    name="kyc_verify"
                    control={userControl}
                    defaultValue="" // Default value for the select dropdown
                    rules={{ required: "KYC verification is required" }} // Validation rule
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="kyc-verify"
                        label="KYC Verify"
                        variant="outlined"
                        select
                        sx={{
                          width: "500px",
                          '@media (max-width: 600px)': {
                            width: "90%",
                          },
                          input: { padding: "13px" },
                          label: { top: "-3px" },
                          marginTop: "15px",
                        }}
                        error={!!errorsAddUser.kyc_verify}
                        helperText={errorsAddUser.kyc_verify?.message}
                      >
                        <MenuItem value="verified">Verified</MenuItem>
                        <MenuItem value="not_verified">Not Verified</MenuItem>
                      </TextField>
                    )}
                  />
                </div>
                <div className="display-1 mt-20">
                  <Button variant="contained" color="primary" onClick={() => {
                    onSubmitUser()
                  }}>
                    Submit
                  </Button>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={valueTab} index={1}>
                <ReusableTable collections={collections} paginationChange={paginationChange} page={page} />
              </CustomTabPanel>
              <CustomTabPanel value={valueTab} index={2}>
                <div className="btc-addd-main">
                  <div className="">
                    <div>
                      BTC Address
                    </div>
                    <TextField id="standard-basic" placeholder="No Address" variant="standard" fullWidth

                    />
                  </div>
                  <div className="mt-20">
                    <div>
                      BTC Available Balance

                    </div>
                    <TextField id="standard-basic" placeholder="0" type="number" variant="standard" fullWidth
                      onWheel={handleWheel}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={valueTab} index={3}>
                <ReusableTable collections={collections} paginationChange={paginationChange} page={page} />
              </CustomTabPanel>
              <CustomTabPanel value={valueTab} index={4}>
                <ReusableTable collections={collections} paginationChange={paginationChange} page={page} />
              </CustomTabPanel>
              <CustomTabPanel value={valueTab} index={5}>
                <ReusableTable collections={collections} paginationChange={paginationChange} page={page} />
              </CustomTabPanel>
              <CustomTabPanel value={valueTab} index={6}>
                <ReusableTable collections={collections} paginationChange={paginationChange} page={page} />
              </CustomTabPanel>

            </Grid2>
          </Grid2>
        </Box>
      </Box>






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

export default UserList;
