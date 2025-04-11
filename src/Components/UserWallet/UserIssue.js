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

import ReusableTable from "../ReuseTable/ReuseTable";
import { Close } from "@mui/icons-material";
const drawerWidth = 260;
const fieldStyle = {
  width: 150,
  "@media(max-width:767.98px)": {
    width: "45%",
  },
  "@media(max-width:425.98px)": {
    width: "45%",
  },
};
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
  width: 700,
  "@media(max-width:767.98px)": {
    width: "95%",
  },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
const UserIssue = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("all");
  const [modelDetails, setModelDetails] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalTable, setModelTable] = useState({});
  const handleOpen = (details) => {
    setModelDetails(details);
    setOpen(true);
  };
  const handleClose = () => {
    setModelDetails("");
    setOpen(false);
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

  const depositDetailsModel = (
    <Grid2 container spacing={2} sx={{ height: 480, overflowY: "scroll" }}>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Issue Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong> Issue ID : </strong>cm8i9f977cdx3zcn0u1ir160d
            </div>
            <div>
              <strong>Created at : </strong>21 Mar, 2025 09:38 am
            </div>
            <div>
              <strong>Updated at : </strong> 21 Mar, 2025 09:38 am
            </div>
            <div>
              <strong>Status : </strong>
              <span className='badge'>In progress</span>
            </div>
            <div>
              <strong>Automation Checking : </strong>
              <span className='badge'>Done</span>
            </div>
            <div>
              <strong>Updated By : </strong>{" "}
              <span className='text-muted'>SYSTEM </span>
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Currency & Amount</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Event : </strong>Deposit
            </div>
            <div>
              <strong>Deposit ID : </strong> N/A
            </div>
            <div>
              <strong>Currency : </strong>DOGE Dogecoin
            </div>
            <div>
              <strong>Network : </strong>N/A
            </div>
            <div>
              <strong>Amount : </strong> 100 DOGE
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box>
          <div className='p2p-user-head'>More Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong> Destination : </strong>
              nomanur1@yopmail.com
            </div>
            <div>
              <strong>Description : </strong>
              Did not get it
            </div>
            <div>
              <strong>Txid : </strong>
              8298465486394569354678457698745
            </div>
            <div>
              <strong>System Findings : </strong>
              There might be amount mismatch. Please check ...
            </div>
            <div>
              <strong>Response Sent : </strong>
              N/A
            </div>
          </div>
          <div className='display-1'>
            <Button variant='contained' className='action-btn' color='success'>
              Resolve
            </Button>
            <Button variant='contained' className='action-btn' color='error'>
              Close
            </Button>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box className='mb-10'>
          <div className='p2p-user-head'>Issue Submitted By</div>
          <ReusableTable collections={modalTable} />
        </Box>
        <Button variant='contained' className='action-btn' color='error'>
          Make Fail
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
  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Issue ID", accessor: "_id", align: "left" },
        { Header: "Currency", accessor: "currency", align: "left" },
        { Header: "Network", accessor: "network", align: "left" },
        { Header: "Transfer Type", accessor: "transfer_type", align: "left" },
        { Header: "Event", accessor: "event", align: "left" },
        { Header: "TxId", accessor: "TxId", align: "left" },
        { Header: "Destination", accessor: "destination", align: "left" },
        { Header: "Amount", accessor: "amount", align: "left" },
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
    setModelTable({
      columns: [
        { Header: "User Code", accessor: "usercode", align: "left" },
        { Header: "Nick Name", accessor: "Nick_name", align: "left" },
        { Header: "Email", accessor: "email", align: "left" },
      ],
      row: [],
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
                <h2 style={{ margin: 0 }}>Wallet Issue Management</h2>
              </div>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab
                    label='Pending'
                    {...a11yProps(0)}
                    className='tab-title'
                  />
                  <Tab label='All' {...a11yProps(1)} className='tab-title' />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className='display-4 mb-10  wrap-field'>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='event'>Event</InputLabel>
                      <Select
                        labelId='event'
                        id='event'
                        value='all'
                        label='Event'
                        size='small'
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"active"}>Deposit</MenuItem>
                        <MenuItem value={"inactive"}>Withdrawal</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
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
              <CustomTabPanel value={value} index={1}>
                <div className='display-4 mb-10  wrap-field'>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='event'>Event</InputLabel>
                      <Select
                        labelId='event'
                        id='event'
                        value='all'
                        label='Event'
                        size='small'
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"active"}>Deposit</MenuItem>
                        <MenuItem value={"inactive"}>Withdrawal</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
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
                        value={"last"}
                      >
                        <MenuItem value={"last"}>Last Updated </MenuItem>
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
                width: modelDetails === 0 ? 700 : 500,
              }}
            >
              <div className='display-2 mb-10'>
                <h3>{modelDetails === 0 ? "Issue Details" : ""}</h3>
                <Close onClick={handleClose} className='cursor' />
              </div>
              {modelDetails === 0 ? depositDetailsModel : securityModel}
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
              <Button
                className='action-btn'
                sx={{ width: "150px" }}
                onClick={() => handleOpen(0)}
              >
                View Details
              </Button>
              <Button
                className='action-btn'
                sx={{ width: "150px" }}
                onClick={() => handleOpen(1)}
              >
                Resolve
              </Button>
              <Button
                className='action-btn'
                sx={{ width: "150px" }}
                onClick={() => handleOpen(1)}
              >
                Make Fail
              </Button>
            </Box>
          </Popover>
        </Box>
      </Box>
    </div>
  );
};

export default UserIssue;
