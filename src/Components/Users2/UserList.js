import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Popover,
  Select,
  Switch,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import ReusableTable from "../ReuseTable/ReuseTable";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import consts from "../../constant";
import Axios from "../../Axios";
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
const drawerWidth = 260;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const fieldStyle = {
  width: 150,
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
  width: 700,
  // height:600,
  overflowY:'scroll',
  "@media(max-width:767.98px)": {
    width: "95%",
  },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
const UsersList = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({
      columns: [
        { Header: "Name", accessor: "name", align: "left" },
        { Header: "Email", accessor: "email", align: "left" },
        { Header: "Phone", accessor: "phone", align: "left" },
        { Header: "Referral Code", accessor: "refcode", align: "left" },
        { Header: "Status", accessor: "status", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: [],
    });
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modelDetails, setModelDetails] = useState("");
const [userList,setUserList] =useState([])
const [twoFa,setTwoFa]=useState(false)
const [usrId,setUsrId]=useState(false)
  const handleOpen = (details) => {
    setOpen(true);
    setModelDetails(details);
    handlePopOverClose()
    setUsrId(userList?.id)
  };
  const handleClose = () => {
    setOpen(false);
    setModelDetails("");
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
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

  const userPopover = (
    <>
      <Button
        className='action-btn'
        sx={{ minWidth: "150px" }}
        onClick={() => handleOpen(0)}
      >
        View Details
      </Button>
      <Button
        className='action-btn'
        sx={{ minWidth: "150px" }}
        onClick={() => handleOpen(1)}
      >
        User Permissions
      </Button>
      <Button className='action-btn' sx={{ minWidth: "150px" }}>
        Wallet
      </Button>
      <Button
        className='action-btn'
        sx={{ minWidth: "150px" }}
        onClick={() => handleOpen(2)}
      >
        Reset Security questions
      </Button>
      <Button
        className='action-btn'
        sx={{ minWidth: "150px" }}
        onClick={() => navigate(`/${consts.route}/users/activities`)}
      >
        Activities
      </Button>
      <Button
        className='action-btn'
        sx={{ minWidth: "150px" }}
        onClick={() => navigate(`/${consts.route}/users/deposit-history`)}
      >
        Deposit Wallet Update History
      </Button>
    </>
  );
  const balancePopover = (
    <>
      <Button
        className='action-btn'
        sx={{ minWidth: "150px" }}
        onClick={() => navigate(`/${consts.route}/users/activities`)}
      >
        Activities
      </Button>
      <Button
        className='action-btn'
        sx={{ minWidth: "150px" }}
        onClick={() => handleOpen(2)}
      >
        Close
      </Button>
    </>
  );
  const userDetailsModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Basic</div>
          <div className='mt-10 p2p-user x-mod'>
            <div className="display-1">
              <strong> Name : </strong>{userList?.name ? userList?.name : "-"}
            </div>
            <div className="display-1">
              <strong>Usercode : </strong>u-1710224257717
            </div>
            <div className="display-1">
              <strong>Email : </strong> {userList?.email ? userList?.email : "-"}
            </div>
            <div className="display-1">
              <strong>Phone : </strong>  {userList?.phone ? userList?.phone : "-"}
            </div>
            <div className="display-1">
              <strong>Status : </strong> <span className='badge'>Active</span>
            </div>
            <div className="display-1">
              <strong> Country : </strong>{userList?.country ? userList?.country : "-"}
            </div>
            <div className="display-1"> 
              <strong>Referral Code : </strong> {userList?.referral_code ? userList?.referral_code : "-"}
            </div>
          </div>
        </Box>
      </Grid2>
    
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box>
          <div className='p2p-user-head'>Settings</div>
          <div className='mt-10 p2p-user'>
            <div className="display-1">
              <strong>Email Verified:</strong>
              {userList?.email_verify ? userList?.email_verify === "true" ? <span className='badge'>Verified</span> : <span className='badge-red'>Not-Verified</span> :"-"}
              
            </div>
            <div className="display-1"> 
              <strong>Kyc Verified: </strong>
              {userList?.kyc_verify ? userList?.kyc_verify === "true" ? <span className='badge'>Verified</span> : <span className='badge-red'>Not-Verified</span> :"-"}
            </div>
            <div className="display-1">
              <strong>Two factor authenticator Verified : </strong>
              {userList?.f2A_Status ? userList?.f2A_Status === "true" ? <span className='badge'>Verified</span> :(<>
                <span className='badge-red'>Not-Verified </span> <PublishedWithChangesIcon sx={{fontSize:'18px'}} className="cursor" onClick={()=>{setTwoFa(!twoFa);Reverify()}} />
              </>  ):"-"}

            </div>
            <div className="display-1">
              <strong>Identity Verified:</strong>
              {userList?.verified ? userList?.verified === "true" ? <span className='badge'>Verified</span> : <span className='badge-red'>Not-Verified</span> :"-"}

            </div>
            <div className="display-1">
              <strong>Updated At: </strong> {userList?.updatedAt ? userList?.updatedAt : "-"}
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box>
          <div className='p2p-user-head'>Referral List</div>
          <div className='mt-10 p2p-user'>
            <ReusableTable collections={[]} />
          </div>
        </Box>
      </Grid2>
    </Grid2>
  );
  const userPermissionModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <FormControlLabel
          control={<Switch />}
          label='Deposit Status'
          labelPlacement='end'
        />
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <FormControlLabel
          control={<Switch />}
          label='Withdrawal Status'
          labelPlacement='end'
        />
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <FormControlLabel
          control={<Switch />}
          label='Buy Status'
          labelPlacement='end'
        />
      </Grid2>{" "}
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <FormControlLabel
          control={<Switch />}
          label='Sell Status'
          labelPlacement='end'
        />
      </Grid2>{" "}
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <FormControlLabel
          control={<Switch />}
          label='Convert Status'
          labelPlacement='end'
        />
      </Grid2>{" "}
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <FormControlLabel
          control={<Switch />}
          label='Wallet Issue Submit Status'
          labelPlacement='end'
        />
      </Grid2>{" "}
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <FormControlLabel
          control={<Switch />}
          label='P2p Status'
          labelPlacement='end'
        />
      </Grid2>
      <Grid2 item size={{ xs: 12 }}>
        <Button variant='contained' className='action-btn'>
          Save
        </Button>
      </Grid2>
    </Grid2>
  );
  const securityModel = (
    <div className='display-1' style={{ flexDirection: "column" }}>
      <div className='text-center'>
        <h3>Are You sure?</h3>
        <p className='text-muted'>Do you really want to change this?</p>
      </div>
      <div className='display-3'>
        <Button variant='contained' className='action-btn'>
          Cancel
        </Button>
        <Button variant='contained' className='action-btn'>
          Confirm
        </Button>
      </div>
    </div>
  );
  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  const getUserList = async () =>{
    try {
      const {data} = await Axios.post("/admin/getUsers",{

      },
      {
        headers:{
          Authorization:  `Bearer ${window.localStorage.getItem("nzanzi")}`,
        }
      }
    )

    console.log(data,'data');
    
    if(data?.success == true && data?.result?.docs?.length > 0){
     var dts = data?.result?.docs;
            var totalCount = data?.result?.totalPages;
            var formattedRows = [];
            for (let i = 0; i < dts.length; i++) {
              const element = dts[i];
              var obj = {};
              obj.sno = <div>{i + 1}</div>;
              obj.name = (
                <div>{element?.name ? element?.name : "-"}</div>
              );
              obj.refcode = (
                <div>{element?.referral_code ? element?.referral_code : "-"}</div>
              );
              obj.email = <div>{element?.email ? element?.email : "-"}</div>;
              obj.phone = <div>{element?.phone ? element?.phone : "-"}</div>;
              obj.status = (
                <div>
                  {element?.verified ? element?.verified === true ? 'Verified' : "Unverified" : "-"}
                </div>
              );
              obj.action = (
                <div className="display-1">
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      // handleOpen(element);
                      handlePopOverClick(e)
                      setUserList(element)
                    }}
                  >
                    Action
                  </Button>
                </div>
              );
              formattedRows.push(obj);
            }
            setCollections((prevState) => ({
              ...prevState,
              row: formattedRows,
              pagecount: totalCount,
            }));
          } else {
            setCollections((prevState) => ({
              ...prevState,
              row: [],
              pagecount: 0,
            }));
    }
      
    } catch (error) {
      console.log(error,'error');
      
    }
  } 

  useEffect(() => {
    // setCollections({
    //   columns: [
    //     { Header: "Image", accessor: "image", align: "left" },
    //     { Header: "Request Id", accessor: "request_id", align: "left" },
    //     { Header: "Name", accessor: "name", align: "left" },
    //     { Header: "Usercode", accessor: "usercode", align: "left" },
    //     { Header: "Status", accessor: "status", align: "left" },
    //     { Header: "Action", accessor: "action", align: "left" },
    //   ],
    //   row: [
    //     {
    //       action: (
    //         <Button
    //           onClick={handlePopOverClick}
    //           variant='contained'
    //           className='action-btn'
    //         >
    //           Action
    //         </Button>
    //       ),
    //     },
    //   ],
    // });
    getUserList()
  }, []);

  const Reverify = async()=>{
try {
  const {data}= await Axios.post("/admin/updateUser",  {
    userId:usrId,
    f2A_Status: twoFa
  },
  {
    headers:{
      Authorization:  `Bearer ${window.localStorage.getItem("nzanzi")}`,
    }
  })

  if(data?.success === true){
    getUserList()
    handleClose()
  }
  
} catch (error) {
  console.log(error,'error');
  
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
              <div className='display-2 mb-10'>
                <h2 style={{ margin: 0 }}>User Management</h2>
              </div>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab
                    label='Userlist'
                    {...a11yProps(0)}
                    className='tab-title'
                  />
                  <Tab
                    label='Balance Mismatch'
                    {...a11yProps(1)}
                    className='tab-title'
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className='display-4 mb-10  wrap-field'>
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
                        placeholder='name or address'
                      />
                    </div>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='type'>Type</InputLabel>
                      <Select
                        labelId='type'
                        id='type'
                        label='Type'
                        size='small'
                        value={"all"}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"regular"}>Regular</MenuItem>
                        <MenuItem value={"system_bot"}>System Bot</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='status'>Status</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        label='Status'
                        size='small'
                        value={"all"}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"active"}>Active</MenuItem>
                        <MenuItem value={"inactive"}>In Active</MenuItem>
                        <MenuItem value={"disabled"}>Disabled</MenuItem>
                        <MenuItem value={"suspended"}>Suspended</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Button variant='contained' className='action-btn'>
                    Export
                  </Button>
                </div>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className='display-4 mb-10  wrap-field'>
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
                        placeholder='name or address'
                      />
                    </div>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='crypto'>Crypto Code</InputLabel>
                      <Select
                        labelId='crypto'
                        id='crypto'
                        label='Crypto Code'
                        size='small'
                        value={"all"}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='wallet'>Wallet</InputLabel>
                      <Select
                        labelId='wallet'
                        id='wallet'
                        label='wallet'
                        size='small'
                        value={"all"}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"spot"}>Spot</MenuItem>
                        <MenuItem value={"funding"}>Funding</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ minWidth: 100 }}>
                    <FormControl fullWidth>
                      <InputLabel id='sort'>Sort</InputLabel>
                      <Select
                        labelId='sort'
                        id='sort'
                        value={"new"}
                        label='Sort'
                        size='small'
                      >
                        <MenuItem value={"new"}>Newest </MenuItem>
                        <MenuItem value={"old"}>Oldest</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </CustomTabPanel>
            </Grid2>
          </Grid2>
          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box
              sx={{
                ...style,
                width: modelDetails === 0 ? 700 : 500,
              }}
            >
              <div className='display-2 mb-10'>
                <h3>
                  {modelDetails === 0
                    ? "User Details"
                    : modelDetails === 1
                    ? "User Permission"
                    : ""}
                </h3>
                <Close onClick={handleClose} className='cursor' />
              </div>
              {modelDetails === 0
                ? userDetailsModel
                : modelDetails === 1
                ? userPermissionModel
                : securityModel}
            </Box>
          </Modal>
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
              {value === 0 ? userPopover : balancePopover}
            </Box>
          </Popover>
        </Box>
      </Box>
    </div>
  );
};

export default UsersList;
