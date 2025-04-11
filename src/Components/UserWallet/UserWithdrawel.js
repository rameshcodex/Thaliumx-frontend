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
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddIcon from "@mui/icons-material/Add";

import ReusableTable from "../ReuseTable/ReuseTable";
import { Close } from "@mui/icons-material";
const drawerWidth = 260;
const fieldStyle = {
  width: 150,
  '@media(max-width:767.98px)': {
    width: '45%'
  },
  '@media(max-width:425.98px)': {
    width: '100%'
  },
}
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  "@media(max-width:767.98px)": {
    width: "95%",
  },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
const UserWithdrawel = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("all");
  const [modelDetails, setModelDetails] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [url, setUrl] = useState("");

  const handleOpen = (details) => {
    setModelDetails(details);
    setOpen(true);
  };
  const handleClose = () => {
    setModelDetails("");
    setOpen(false);
  };
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUrl(imageUrl);
      var payload = new FormData();
      payload.append("image", file);
      setImageUrl("");
    }
  };

  const handleChange = (event, newValue) => setValue(newValue);
  const handleStatusChange = (event) => setStatus(event.target.value);
  const handlePopOverClick = (event) => setAnchorEl(event.currentTarget);
  const handlePopOverClose = () => setAnchorEl(null);

  const popOverOpen = Boolean(anchorEl);
  const id = popOverOpen ? "simple-popover" : undefined;
  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };
  const cryptoPopOver = (
    <Box component={"div"} className='display-1 p-10' flexDirection={"column"}>
      <Button
        className='action-btn'
        sx={{ width: "150px" }}
        onClick={() => handleOpen("Withdrawal Request Details")}
      >
        View Details
      </Button>
      <Button
        className='action-btn'
        sx={{ width: "150px" }}
        onClick={() => handleOpen()}
      >
        Approve
      </Button>
      <Button
        className='action-btn'
        sx={{ width: "150px" }}
        onClick={() => handleOpen()}
      >
        Reject
      </Button>
    </Box>
  );
  const failPopOver = (
    <Box component={"div"} className='display-1 p-10' flexDirection={"column"}>
      <Button
        className='action-btn'
        sx={{ width: "150px" }}
        onClick={() => handleOpen("Withdrawal Details")}
      >
        View Details
      </Button>
      <Button
        className='action-btn'
        sx={{ width: "150px" }}
        onClick={() => handleOpen()}
      >
        Make Fail
      </Button>
      <Button
        className='action-btn'
        sx={{ width: "150px" }}
        onClick={() => handleOpen()}
      >
        Make Paymnet Processing
      </Button>
      <Button
        className='action-btn'
        sx={{ width: "150px" }}
        onClick={() => handleOpen()}
      >
        Cancel
      </Button>
    </Box>
  );
  const reqStatusModel = (
    <Grid2 container spacing={2} sx={{ height: 480, overflowY: "scroll" }}>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Withdrawal Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Withdrawal ID : </strong>cm7u5ogx90a51zc27z85hlhex
            </div>
            <div>
              <strong>Created at : </strong>21 Mar, 2025 09:38 am
            </div>
            <div>
              <strong>Type : </strong> Internal
            </div>
            <div>
              <strong>From Wallet Type : </strong> Spot
            </div>
            <div>
              <strong>To Wallet Type : </strong> Spot
            </div>
            <div>
              <strong>Status : </strong>{" "}
              <span className='badge'>Awaiting for Approval</span>
            </div>
            <div>
              <strong>Updated at : </strong>21 Mar, 2025 09:38 am
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Amount Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Currency : </strong>USDT Tether USD
            </div>
            <div>
              <strong>Network : </strong> N/A
            </div>
            <div>
              <strong>Amount : </strong>2 USDT
            </div>
            <div>
              <strong>Fee : </strong> 0.04 USDT
            </div>
            <div>
              <strong>Total amount : </strong> 2.04 USDT
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'> From User</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong> Nick Name : </strong>
              nomanur1
            </div>
            <div>
              <strong>User Code : </strong>
              u-1667456239219
            </div>
            <div>
              <strong>Email : </strong>
              nomanur1@yopmail.com
            </div>
            <div>
              <strong>Phone : </strong>
              N/A
            </div>
            <div>
              <strong>Sender note : </strong>
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>User Device</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Device : </strong>
              MOBILE
            </div>
            <div>
              <strong>Device Info : </strong>
              TradiumPro V (Vivo, Y91, Android)
            </div>
            <div>
              <strong>Location : </strong>
              Dhaka, Bangladesh
            </div>
            <div>
              <strong>Ip Address : </strong>
              115.127.97.52
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box>
          <div className='p2p-user-head'>Tx Info & Others</div>

          <div className='mt-10 p2p-user'>
            <div>
              <strong>Destination : </strong>
              0x8F2d729275E0f4146ea7Ee211fd46a8c046f92Cb
            </div>
            <div>
              <strong>Txid : </strong>
              0x142982c5ad80e1adaf8f7167df42e67064f33484950af164bc40bb75d1bda836
            </div>
          </div>
          <div className='display-1'>
            <Button variant='contained' className='action-btn' color='success'>
              Approve
            </Button>
            <Button variant='contained' className='action-btn' color='error'>
              Reject
            </Button>
          </div>
        </Box>
      </Grid2>
    </Grid2>
  );
  const withdrawRequestModel = (
    <Grid2 container spacing={2} sx={{ height: 490, overflowY: "scroll" }}>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
        <Box>
          <div className='p2p-user-head'>Withdrawal Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Withdrawal ID : </strong>cm8eddsx9o45zzc54v7paq9vs
            </div>
            <div>
              <strong>Created at : </strong>21 Mar, 2025 09:38 am
            </div>
            <div>
              <strong>From Wallet Type : </strong> Spot
            </div>
            <div>
              <strong>Payment Method : </strong> Bank
            </div>
            <div>
              <strong>Status : </strong>{" "}
              <span className='badge'>Processing</span>
            </div>
            <div>
              <strong>Payment : </strong> <span className='badge'>Pending</span>
            </div>
            <div>
              <strong>Updated at : </strong>21 Mar, 2025 09:38 am
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
        <Box>
          <div className='p2p-user-head'>Amount Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Currency : </strong>USD United States Dollar
            </div>
            <div>
              <strong>Amount : </strong> 100 USD
            </div>
            <div>
              <strong>Fee : </strong>2.2 USD
            </div>
            <div>
              <strong>Total amount : </strong>102.2 USD
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 4 }}>
        <Box>
          <div className='p2p-user-head'>From User</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Nick Name : </strong>Ashiqur Rahman
            </div>
            <div>
              <strong>User Code : </strong> u-1719998614281
            </div>
            <div>
              <strong>Email : </strong>m.m.ashiqur.rahman@gmail.com
            </div>
            <div>
              <strong>Phone : </strong>N/A
            </div>
            <div>
              <strong>Device : </strong>DESKTOP
            </div>
            <div>
              <strong>Device Info : </strong>Firefox V136.0 (Ubuntu)
            </div>
            <div>
              <strong>Location : </strong> Dhaka, Bangladesh
            </div>
            <div>
              <strong>Ip Address : </strong>115.127.97.52
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box>
          <div className='p2p-user-head'>Others</div>
          <Box className='m-20'>
            <div className='img-upload'>
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
            </div>
            <div className='display-3'>
              <Button
                className='action-btn'
                color='success'
                variant='contained'
              >
                Upload & Complete
              </Button>
            </div>
          </Box>
          <div className='mt-10 p2p-user'>
            <div>
              <strong> Txid :</strong>
              WDLTin1BssUiJB24ACHAiKyngR7x6NEfNwRJUTiD61mIZNks4fEihWWrkxKZd0II
            </div>
            <div>
              <strong>Document Status : </strong>
              <span className='badge'>Pending</span>
            </div>
            <div>
              <strong>Pay Method Details:</strong>
              <div>
                <strong> Method Name : </strong>
                Sonali Bank Limited
              </div>
              <div>
                <strong>Account No : </strong>
                2222111122221111
              </div>
              <div>
                <strong>Name : </strong>
                Taimur Rahman
              </div>{" "}
              <div>
                <strong>Routing No : </strong>
                EX-333
              </div>
            </div>
          </div>
          <div className='mb-10'>
            <Button variant='contained' color='error'>
              Make Fail
            </Button>
          </div>
          <div className='display-1'>
            <Button variant='contained'>Making Payment Processing</Button>
            <Button variant='contained' color='warning'>
              Cancel
            </Button>
          </div>
        </Box>
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
  useEffect(() => {
    setCollections({
      columns: [
        { Header: "ID", accessor: "_id", align: "left" },
        { Header: "Currency", accessor: "currency", align: "left" },
        { Header: "Network", accessor: "network", align: "left" },
        { Header: "Destination", accessor: "Destination", align: "left" },
        { Header: "Type", accessor: "type", align: "left" },
        { Header: "Amount", accessor: "amount", align: "left" },
        { Header: "Fee", accessor: "fee", align: "left" },
        { Header: "Status", accessor: "status", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: [
        {
          action: (
            <Button
              onClick={handlePopOverClick}
              variant='contained'
              className='action-btn'
            >
              Action
            </Button>
          ),
        },
      ],
    });
  }, []);

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
                <h2 style={{ margin: 0 }}>Withdrawal Management</h2>
              </div>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab
                    label='Awaiting For Approval'
                    {...a11yProps(0)}
                    className='tab-title'
                  />
                  <Tab label='Crypto' {...a11yProps(1)} className='tab-title' />
                  <Tab label='Fiat' {...a11yProps(2)} className='tab-title' />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className='display-4 mb-10  wrap-field'>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='status'>Status</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        value='all'
                        label='Status'
                        size='small'
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"active"}>Active</MenuItem>
                        <MenuItem value={"inactive"}>In Active</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='sort'>Sort</InputLabel>
                      <Select
                        labelId='sort'
                        id='sort'
                        label='Sort'
                        size='small'
                        value={"new"}
                      >
                        <MenuItem value={"new"}>Newest </MenuItem>
                        <MenuItem value={"old"}>Oldest</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
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
                    <FormControl fullWidth>
                      <InputLabel id='status'>Status</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        value='all'
                        label='Status'
                        size='small'
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"active"}>Active</MenuItem>
                        <MenuItem value={"inactive"}>In Active</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='sort'>Sort</InputLabel>
                      <Select
                        labelId='sort'
                        id='sort'
                        label='Sort'
                        size='small'
                        value={"new"}
                      >
                        <MenuItem value={"new"}>Newest </MenuItem>
                        <MenuItem value={"old"}>Oldest</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
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
              <CustomTabPanel value={value} index={2}>
                <div className='display-4 mb-10  wrap-field'>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='status'>Status</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        value={status}
                        label='Status'
                        size='small'
                        onChange={handleStatusChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"open"}>Open</MenuItem>
                        <MenuItem value={"complete"}>Completed</MenuItem>
                        <MenuItem value={"cancel"}>Cancelled</MenuItem>
                        <MenuItem value={"expired"}>Expired</MenuItem>
                        <MenuItem value={"failed"}>Failed</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='payment'>Payment Status</InputLabel>
                      <Select
                        labelId='payment'
                        id='payment'
                        label='Payment Status'
                        value='all'
                        size='small'
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"processing"}>Processing</MenuItem>
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"complete"}>Completed</MenuItem>
                        <MenuItem value={"cancel"}>Cancelled</MenuItem>
                        <MenuItem value={"failed"}>Failed</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='payment'>Payment Type</InputLabel>
                      <Select
                        labelId='payment'
                        id='payment'
                        label='Payment Type'
                        size='small'
                        value={"all"}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"online"}>Online_Payment</MenuItem>
                        <MenuItem value={"bank"}>Bank Deposit</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
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
                width:
                  modelDetails === "Withdrawal Request Details" ||
                    modelDetails === "Withdrawal Details"
                    ? 760
                    : 500,
              }}
            >
              <div className='display-2 mb-10'>
                <h3>{modelDetails}</h3>
                <Close onClick={handleClose} className='cursor' />
              </div>
              {modelDetails === "Withdrawal Request Details"
                ? reqStatusModel
                : modelDetails === "Withdrawal Details"
                  ? withdrawRequestModel
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
            {value === 2 ? failPopOver : cryptoPopOver}
          </Popover>
        </Box>
      </Box>
    </div>
  );
};

export default UserWithdrawel;
