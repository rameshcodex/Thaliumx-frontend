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
const UserDeposit = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("all");
  const [modelDetails, setModelDetails] = useState("");
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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
  const depositModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, md: 12 }}>
        <Box>
          <FormControl fullWidth>
            <InputLabel>Crypto Currency</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Crypto Currency'
              value={"USDT"}
              name='crypto_currency'
            >
              <MenuItem value='USDT'>USDT</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 12 }}>
        <Box>
          <FormControl fullWidth>
            <InputLabel>Network</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Network'
              name='network'
              value={"USDT"}
            >
              <MenuItem value='USDT'>USDT</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 12 }}>
        <TextField label='Amount' type='number' name='Amount' fullWidth />
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 12 }}>
        <TextField label='Address' name='Address' fullWidth />
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 12 }}>
        <TextField label='TxID/Hash' name='TxID/Hash' fullWidth />
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 12 }}>
        <TextField label='Block Number' name='Block_Number' fullWidth />
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 12 }}>
        <TextField
          label='Reason note'
          name='Reason_note'
          multiline
          rows={4}
          fullWidth
        />
      </Grid2>
      <Button variant='contained' className='action-btn'>
        Create
      </Button>
    </Grid2>
  );
  const depositDetailsModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Deposit Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Deposit ID : </strong>cm8i9f977cdx3zcn0u1ir160d
            </div>
            <div>
              <strong>Created at : </strong>21 Mar, 2025 09:38 am
            </div>
            <div>
              <strong>Updated at : </strong> 21 Mar, 2025 09:38 am
            </div>
            <div>
              <strong>Type : </strong> External
            </div>
            <div>
              <strong>Status : </strong>{" "}
              <span className='badge'>Completed</span>
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>To User</div>

          <div className='mt-10 p2p-user'>
            <div>
              <strong>Nick Name :</strong>boss
            </div>
            <div>
              <strong>User Code : </strong> u-1710224257717
            </div>
            <div>
              <strong>Email : </strong>demouser@yopmail.com
            </div>
            <div>
              <strong>Phone : </strong> N/A
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box>
          <div className='p2p-user-head'>Amount</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong> Currency : </strong>
              ETH Ether
            </div>
            <div>
              <strong>Network : </strong>
              Sepolia ETH
            </div>
            <div>
              <strong>Amount : </strong>
              0.01 ETH
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
          <Button variant='contained' className='action-btn' color='error'>
            Make Fail
          </Button>
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
        { Header: "Type", accessor: "type", align: "left" },
        { Header: "Destination", accessor: "Destination", align: "left" },
        { Header: "TxId", accessor: "TxId", align: "left" },
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
                <h2 style={{ margin: 0 }}>Deposit Management</h2>
              </div>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <div className='display-4'>
                  <Button
                    variant='contained'
                    className='action-btn'
                    onClick={() => handleOpen("Create User Deposit Modal")}
                  >
                    Create Deposit
                  </Button>
                </div>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab label='Crypto' {...a11yProps(0)} className='tab-title' />
                  <Tab label='Fiat' {...a11yProps(1)} className='tab-title' />
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
                        value="all"
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
                width: modelDetails === "Deposit Details" ? 700 : 500,
              }}
            >
              <div className='display-2 mb-10'>
                <h3>{modelDetails}</h3>
                <Close onClick={handleClose} className='cursor' />
              </div>
              {modelDetails === "Deposit Details"
                ? depositDetailsModel
                : modelDetails === "Create User Deposit Modal"
                ? depositModel
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
              <Button
                className='action-btn'
                sx={{ width: "150px" }}
                onClick={() => handleOpen("Deposit Details")}
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
            </Box>
          </Popover>
        </Box>
      </Box>
    </div>
  );
};

export default UserDeposit;
