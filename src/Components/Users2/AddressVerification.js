import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
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
  width : 150 ,
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
  width: 700,
  "@media(max-width:767.98px)": {
    width: "95%",
  },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
const AddressVerifcation = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("all");

  const [open, setOpen] = useState(false);

  const handleOpen = (user) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Image", accessor: "image", align: "left" },
        { Header: "Request Id", accessor: "request_id", align: "left" },
        { Header: "Name", accessor: "name", align: "left" },
        { Header: "Usercode", accessor: "usercode", align: "left" },
        { Header: "Status", accessor: "status", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: [
        {
          action: (
            <Button
              onClick={handleOpen}
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
                <h2 style={{ margin: 0 }}>
                  Address Verification Request Management
                </h2>
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
            <Box sx={style}>
              <div className='display-2 mb-10'>
                <h3>User Address Verification Request Details </h3>
                <Close onClick={handleClose} className='cursor' />
              </div>
              <Grid2 container spacing={2}>
                <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Box>
                    <div className='mt-10 p2p-user'>
                      <div>
                        <strong>Request ID: </strong>cm8fs9jr4363lzcdvjqj2o411
                      </div>
                      <div>
                        <strong>Nick Name : </strong> mezba
                      </div>
                      <div>
                        <strong>Usercode : </strong>u-1710224257717
                      </div>
                      <div>
                        <strong>Email : </strong> demouser@yopmail.com
                      </div>
                      <div>
                        <strong>Phone : </strong> N/A
                      </div>
                      <div>
                        <strong>Created at : </strong> N/A
                      </div>
                      <div>
                        <strong>Status : </strong>{" "}
                        <span className='badge'>Rejected</span>
                      </div>
                    </div>
                  </Box>
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Box>
                    <div className='mt-10 p2p-user'>
                      <div>
                        <strong>Country : </strong>Bangladesh
                      </div>
                      <div>
                        <strong>City : </strong>Kkk
                      </div>
                      <div>
                        <strong>Post : </strong>1234
                      </div>
                      <div>
                        <strong>Residential Address : </strong>test
                      </div>
                      <div>
                        <strong>Document Type : </strong> Internet service bill
                      </div>
                    </div>
                    <Button
                      variant='contained'
                      className='action-btn'
                      size='small'
                    >
                      View Details
                    </Button>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          </Modal>
   
        </Box>
      </Box>
    </div>
  );
};

export default AddressVerifcation;
