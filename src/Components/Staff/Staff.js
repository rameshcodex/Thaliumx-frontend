/* eslint-disable no-unused-vars, eqeqeq */
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Popover,
  Select,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";

import ReusableTable from "../ReuseTable/ReuseTable";
import { Close } from "@mui/icons-material";
import Axios from "../../Axios";
import toast from "react-hot-toast";
const drawerWidth = 260;

const fieldStyle = {
  width: 300,
  "@media(max-width:767.98px)": {
    width: "45%",
  },
  "@media(max-width:425.98px)": {
    width: "100%",
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  "@media(max-width:767.98px)": {
    width: "95%",
  },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
const Staff = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({
    columns: [
      // { Header: "Sno", accessor: "sno", align: "left" },
      { Header: "Name", accessor: "name", align: "left" },
      { Header: "Username", accessor: "username", align: "left" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Phone", accessor: "phone", align: "left" },
      { Header: "Role", accessor: "role", align: "left" },
      { Header: "Status", accessor: "status", align: "left" },
      { Header: "Action", accessor: "action", align: "left" },
    ], row: []
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [modelDetail, setModelDetails] = useState("");
  const [open, setOpen] = useState(false);

  const [rolesList, setRolesList] = useState([])

  const [createMode, setCreateMode] = useState(false)

  const handleOpen = (detail) => {
    setOpen(true);
    setModelDetails(detail);
  };
  const handleClose = () => {
    setOpen(false);
    setName("")
    setUserName("")
    setEmail("")
    setPhone("")
    setPermission("")
    setPassword("")
    setLoading(false)
    setCreateMode(false)
    setSelcId("")
  };
  const handlePopOverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const popOverOpen = Boolean(anchorEl);
  const id = popOverOpen ? "simple-popover" : undefined;
  const [page, setPage] = useState(1);
  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  const [loading, setLoading] = useState(false)

  const [name, setName] = useState("")
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [permission, setPermission] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState("")

  const [selecId, setSelcId] = useState("")

  const createModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <TextField fullWidth variant='outlined' label='Name' value={name} onChange={(e) => { setName(e.target.value) }} />
      </Grid2>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <TextField fullWidth variant='outlined' label='Username' value={username} onChange={(e) => { setUserName(e.target.value) }} />
      </Grid2>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <TextField fullWidth variant='outlined' label='Email' type='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
      </Grid2>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <TextField fullWidth variant='outlined' label='Phone' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
      </Grid2>

      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <FormControl fullWidth>
          <InputLabel id='roles'>Roles</InputLabel>
          <Select labelId='roles' id='roles' label='Roles' value={permission} onChange={(e) => { setPermission(e.target.value) }}>
            {
              rolesList?.map((itm, i) => {
                return (
                  <MenuItem value={itm?._id} key={i} >{itm?.Name}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
      </Grid2>
      {
        createMode == true &&
        <Grid2 item size={{ xs: 12, lg: 12 }}>
          <TextField fullWidth variant='outlined' label='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        </Grid2>
      }
      {
        createMode == false &&
        <Grid2 item size={{ xs: 12, lg: 12 }}>
          <FormControl fullWidth>
            <InputLabel id='roles'>Status</InputLabel>
            <Select labelId='roles' id='roles' label='Status' value={status} onChange={(e) => { setStatus(e.target.value) }}>
              <MenuItem value={true} >Active</MenuItem>
              <MenuItem value={false} >De-Active</MenuItem>
            </Select>
          </FormControl>
        </Grid2>
      }

      <Button variant='contained' className='action-btn' disabled={loading} onClick={() => { CreateStaff() }} >
        {createMode ? "Create" : "Update"}
      </Button>
    </Grid2>
  );


  const detailsModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <Box>
          <div className='p2p-user'>
            <div>
              <strong> Full name : </strong>mezba
            </div>
            <div>
              <strong>User name : </strong>mezba
            </div>
            <div>
              <strong>Email :</strong>
              mezba@email.com
            </div>
            <div>
              <strong>Phone : </strong>N/A
            </div>
            <div>
              <strong>Role : </strong>Admin
            </div>
            <div>
              <strong>Google Two Factor Authentication : </strong>
              Disabled
            </div>
            <div>
              <strong>Status : </strong>
              <span className='badge'>active</span>
            </div>
          </div>
        </Box>
      </Grid2>
    </Grid2>
  );


  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Update debouncedTerm after user stops typing for 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(handler); // Clear timeout if user types again
    };
  }, [searchTerm]);

  // Call the search function when debouncedTerm updates
  useEffect(() => {
    if (debouncedTerm) {
      console.log("Searching for:", debouncedTerm);
      getStaffDetails(1, debouncedTerm);
      setPage(1)
    }
  }, [debouncedTerm]);

  const getStaffDetails = async (pgs, search) => {
    try {
      const { data } = await Axios.post(`/admin/getSubAdminList?page=${pgs ? pgs : page}&limit=10`, {
        Name: search
      },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('nzanzi')}`
          }
        }
      )
      if (data?.success == true && data?.result?.docs?.length > 0) {
        var dts = data?.result?.docs
        var totalCount = data?.result?.totalPages
        var formattedRows = []
        for (let i = 0; i < dts.length; i++) {
          const element = dts[i];
          var obj = {}
          obj.sno = (<div>{i + 1}</div>)
          obj.name = (<div>{element?.name ? element?.name : "-"}</div>)
          obj.username = (<div>{element?.username ? element?.username : "-"}</div>)
          obj.email = (<div>{element?.email ? element?.email : "-"}</div>)
          obj.phone = (<div>{element?.phone ? element?.phone : "-"}</div>)
          obj.role = (<div>{element?.permission?.Name ? element?.permission?.Name : "-"}</div>)
          obj.status = (<div>{element?.verified?.toString() ? element?.verified == false ? "Not Active" : "Active" : "-"}</div>)
          obj.action = (
            <div className='display-1'>
              <Button variant="contained"
                onClick={() => {
                  setSelcId(element?._id)
                  setName(element?.name);
                  setUserName(element?.username);
                  setEmail(element?.email);
                  setPhone(element?.phone);
                  setPermission(element?.permission?._id);
                  setStatus(element?.verified);
                  handleOpen(0);

                }}
              >Action</Button>
            </div>
          )
          formattedRows.push(obj)
        }
        setCollections(prevState => ({
          ...prevState,
          row: formattedRows,
          pagecount: totalCount
        }));
      } else {
        setCollections(prevState => ({
          ...prevState,
          row: [],
          pagecount: 0
        }));
      }
    } catch (error) {
      console.log(error, "error")
      setCollections(prevState => ({
        ...prevState,
        row: [],
        pagecount: 0
      }));
    }
  }

  const getPermissionList = async () => {
    try {
      const { data } = await Axios.post(`/admin/getPermissionsList`, {
        Name: "all_test"
      }, {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('nzanzi')}` }
      })
      if (data?.success == true && data?.result?.length > 0) {
        var dts = data?.result
        setRolesList(dts)
      } else {
        setRolesList([])
      }
    } catch (error) {
      setRolesList([])
      console.log(error, "error")
    }
  }

  useEffect(() => {
    getStaffDetails()
    getPermissionList()
  }, []);

  const CreateStaff = async () => {
    try {
      if (!name) return toast.error("Please Enter Name")
      if (!username) return toast.error("Please Enter User Name")
      if (!email) return toast.error("Please Enter Email")
      if (!phone) return toast.error("Please Enter Phone")
      if (!permission) return toast.error("Please Select Permission")
      if (!password && createMode == true) return toast.error("Please Select Password")
      var paylod = {
        name,
        username,
        email,
        phone,
        permission,
      }
      console.log(paylod, "payload")
      setLoading(true)
      var url
      if (createMode == true) {
        paylod.password = password
        url = '/admin/createSubAdmin'
      } else {
        paylod.verified = status
        paylod.id = selecId
        url = '/admin/updateSubAdmin'
      }
      const { data } = await Axios.post(url, paylod, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('nzanzi')}`
        }
      })
      if (data?.success) {
        toast.success(data?.message)
        handleClose()
        getStaffDetails()
      } else {
        toast.error(data?.message)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error, "error")
    }
  }
  return (
    <div className='blog'>
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
          <Grid2 container spacing={2}>
            <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <div>
                <h2 style={{ margin: 0 }}>Staff Management</h2>
              </div>
              <div className='display-4 mt-20  wrap-field'>
                <Box sx={fieldStyle}>
                  <div class='group'>
                    <svg viewBox='0 0 24 24' aria-hidden='true' class='icon'>
                      <g>
                        <path d='M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z'></path>
                      </g>
                    </svg>
                    <input
                      class='input2'
                      type='search'
                      style={{ width: '300px' }}
                      placeholder='name or email or username'
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        if (e.target.value == "") {
                          getStaffDetails(1, "");
                          setPage(1)
                        }
                      }}
                    />
                  </div>
                </Box>
                <Button
                  variant='contained'
                  className='action-btn'
                  onClick={() => { handleOpen(0); setCreateMode(true) }}
                >
                  Create Staff
                </Button>
                {/* <Button variant='contained' className='action-btn'>
                  Export
                </Button> */}
              </div>
              <ReusableTable
                collections={collections}
                paginationChange={paginationChange}
                page={page}
              />
            </Grid2>
          </Grid2>
          <Popover
            id={id}
            open={popOverOpen}
            anchorEl={anchorEl}
            onClose={handlePopOverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box
              component={"div"}
              className='display-1 p-10'
              flexDirection={"column"}
            >
              <Button
                className='action-btn'
                sx={{ width: "150px" }}
                onClick={() => handleOpen(0)}
              >
                Edit
              </Button>
              <Button
                className='action-btn'
                sx={{ width: "150px" }}
                onClick={() => handleOpen(1)}
              >
                View Details
              </Button>
            </Box>
          </Popover>

          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <div className='display-2 mb-10'>
                <h3>
                  {modelDetail === 0 ? "Staff Management" : "Staff Details"}
                </h3>
                <Close onClick={handleClose} className='cursor' />
              </div>
              {modelDetail === 0 ? createModel : detailsModel}
            </Box>
          </Modal>
        </Box>
      </Box>
    </div>
  );
};

export default Staff;
