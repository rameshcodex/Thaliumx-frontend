/* eslint-disable no-unused-vars, eqeqeq */
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
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
import { useForm } from "react-hook-form";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { alpha, styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ReusableTable from "../ReuseTable/ReuseTable";
import Axios from "axios";
import consts from "../../constant";

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

const Tradehistory = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate();

  const [tradeType, setTradeType] = useState(0);

  const handleChangeTradeType = (event) => {
    setTradeType(event.target.value);
  };

  const [tdStatus, setTdStatus] = useState(0);

  const handleChangeTradeStatus = (event) => {
    setTdStatus(event.target.value);
  };

  const [buysell, setBuySell] = useState(10);

  const handleChangeTradeBuySell = (event) => {
    setBuySell(event.target.value);
  };

  const [ltMt, setLtMt] = useState(10);

  const handleChangeTradeLimit = (event) => {
    setLtMt(event.target.value);
  };


  const {
    register: addUser,
    handleSubmit: handleAddUser,
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

  const onSubmitUser = (data) => {
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

  const [OpenDeleteUser, setOpenDeleteUser] = useState(false);

  const handleOpenDelete = (val) => {
    setOpenDeleteUser(true);
    setDeleteUser("name", val.name);
  };
  const handleCloseDelete = () => setOpenDeleteUser(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [collections, setCollections] = useState({ columns: [], row: [] });

  const [usersList, setUsersList] = useState([])

  const [type, setType] = useState("")
  const [status, setStatus] = useState("")
  const [orderType, setOrderType] = useState("")
  const [tradeTypes, setTradeTypes] = useState("")

  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)

  const getUsersList = async (types, page) => {
    try {
      setCollections(
        {
          columns: [
            { Header: 'Sno', accessor: 'sno', align: 'left' },
            { Header: 'OrderID', accessor: 'order_id', align: 'center' },
            { Header: 'Pair', accessor: 'pair', align: 'center' },
            { Header: 'Order Type', accessor: 'order_type', align: 'center' },
            { Header: ' Type', accessor: 'trade', align: 'center' },
            { Header: 'Trade Type', accessor: 'tradetrade', align: 'center' },
            { Header: 'Price', accessor: 'price', align: 'center' },
            { Header: 'Volume', accessor: 'volume', align: 'center' },
            { Header: 'Value', accessor: 'value', align: 'center' },
            { Header: 'Status', accessor: 'status', align: 'center' },
          ]
        }
      )

      if (types) {
        setType("")
        setStatus("")
        setOrderType("")
        setTradeTypes("")
        setTradeType(0)
        setTdStatus(0)
        setBuySell(10)
        setLtMt(10)
      }
      const { data } = await Axios.post(
        `${consts.BackendUrl}/tradehistory?page=${page ? page : 1}&limit=10`,
        {
          trade_type: types ? "" : tradeTypes,
          order_type: types ? "" : orderType,
          pending: types ? "" : status,
          type: types ? "" : type
        },
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
        obj.order_id = (<div>{users?.order_id ? users?.order_id : "-"}</div>)
        obj.pair = (<div>{users?.pair ? users?.pair : "-"}</div>)
        obj.order_type = (<div>{users?.order_type ? users?.order_type : "-"}</div>)
        obj.trade = (<div>{users?.trade}</div>)
        obj.tradetrade = (<div>{users?.trade_type}</div>)
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
  }, [usersList])


  useEffect(() => {
    getUsersList()
  }, [])

  const paginationChange = (val) => {
    if (page !== val) {
      getUsersList("", val);
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
                <h2>Trade history</h2>
                <Box sx={{ minWidth: 150 }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={tradeType}
                      //   label="Age"
                      onChange={handleChangeTradeType}
                    >   <MenuItem value={0} disabled onClick={() => { setType("") }}> Type</MenuItem>
                      <MenuItem value={10} onClick={() => { setType("spot") }}  >Spot</MenuItem>
                      <MenuItem value={20} onClick={() => { setType("margin") }} >Margin</MenuItem>
                      <MenuItem value={30} onClick={() => { setType("future") }} >Future</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={tdStatus}
                      //   label="Age"
                      onChange={handleChangeTradeStatus}
                    >   <MenuItem value={0} disabled onClick={() => { setStatus("") }} >Status</MenuItem>
                      <MenuItem value={10} onClick={() => { setStatus("pending") }} >Pending</MenuItem>
                      <MenuItem value={20} onClick={() => { setStatus("completed") }} >Completed</MenuItem>
                      <MenuItem value={30} onClick={() => { setStatus("cancelled") }} >Cancelled</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={buysell}
                      //   label="Age"
                      onChange={handleChangeTradeBuySell}
                    >
                      <MenuItem value={10} disabled onClick={() => { setTradeTypes("") }}  >Trade Type</MenuItem>
                      <MenuItem value={20} onClick={() => { setTradeTypes("buy") }}  >Buy</MenuItem>
                      <MenuItem value={30} onClick={() => { setTradeTypes("sell") }}>Sell</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={ltMt}
                      //   label="Age"
                      onChange={handleChangeTradeLimit}
                    >
                      <MenuItem value={10} disabled onClick={() => { setOrderType("") }} >Order Type</MenuItem>
                      <MenuItem value={20} onClick={() => { setOrderType("limit") }} >Limit</MenuItem>
                      <MenuItem value={30} onClick={() => { setOrderType("market") }} >Market</MenuItem>
                    </Select>
                  </FormControl>
                </Box>


                <div className="display-1">
                  <div class="group">
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
                      <g>
                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                      </g>
                    </svg>
                    {/* <input class="input2" type="search" placeholder="Search" /> */}
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      getUsersList("", 1);
                      setPage(1)
                    }}
                  >
                    Search
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      getUsersList("reset", 1)
                      setPage(1)
                    }}
                  >
                    Reset
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
          <form
            onSubmit={() => {
              addUser(onSubmitUser);
            }}
          >
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
              <Button variant="contained" color="primary" type="submit">
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
          </form>
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
          <h2 className="text-center">
            Aare yo Sure you want to Delete {getValues("name")}
          </h2>
          <div className="display-3 mt-20">
            <Button variant="contained" color="primary" type="submit">
              Delete
            </Button>
            <Button
              variant="contained"
              color="error"
              style={{ marginLeft: "8px" }}
              onClick={() => {
                handleCloseDelete();
              }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div >
  );
};

export default Tradehistory;
