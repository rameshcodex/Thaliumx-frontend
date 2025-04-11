import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Popover,
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
import "./BuySell.css";
const drawerWidth = 260;
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

const fieldStyle = {
  width: 150,
  "@media(max-width:767.98px)": {
    width: "45%",
  },
  "@media(max-width:425.98px)": {
    width: "100%",
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

const BuySell = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [buyStatus, setBuyStatus] = useState("all");
  const [sellStatus, setSellStatus] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [payment, setPayment] = useState("all");
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = (user) => setOpen(true);

  const handleClose = () => setOpen(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopOverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const popOverOpen = Boolean(anchorEl);
  const id = popOverOpen ? "simple-popover" : undefined;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBuyStatusChange = (event) => {
    setBuyStatus(event.target.value);
  };
  const handleSellStatusChange = (event) => {
    setSellStatus(event.target.value);
  };
  const handlePaymentChange = (event) => {
    setPayment(event.target.value);
  };
  const handlePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };
  const [page, setPage] = useState(1);

  const buyModel = (
    <Grid2 container spacing={2} sx={{ height: 500, overflowY: "scroll" }}>
      <Grid2 container spacing={2}>
        <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box>
            <div className='p2p-user-head'>Buy Crypto Details</div>
            <div className='mt-10 p2p-user'>
              <div>
                <strong> Buy Cryto ID :</strong>
                cm8ofnqxh1aomzcdp3fna3gnk
              </div>
              <div>
                <strong>Created at : </strong>25 Mar, 2025 05:19 pm
              </div>
              <div>
                <strong>Updated at : </strong> 25 Mar, 2025 05:19 pm
              </div>
              <div>
                <strong>Phone : </strong> 9876543210
              </div>
              <div>
                <strong>Status : </strong> <span className='badge'>Active</span>
              </div>
              <div>
                <strong>Payment : </strong>{" "}
                <span className='badge'>Active</span>
              </div>
              <div>
                <strong>Referrer ID : </strong>N/A
              </div>
              <div>
                <strong>Pay Method Type: </strong>Online Payment
              </div>
            </div>
          </Box>
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box>
            <div className='p2p-user-head'>To User</div>

            <div className='mt-10 p2p-user'>
              <div>
                <strong> Nick Name : </strong>N/A
              </div>
              <div>
                <strong>User Code : </strong> u-1742903121600
              </div>
              <div>
                <strong>Email : </strong>decimal_issue@yopmail.com
              </div>
              <div>
                <strong>Phone: </strong> N/A
              </div>
            </div>
          </Box>
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Box>
            <div className='p2p-user-head'>Amount</div>
            <div className='mt-10 p2p-user'>
              <div>
                <strong>Payment Amount : </strong>
                1000 USD
              </div>
              <div>
                <strong>Converted Total Amount : </strong>
                1000 USDT
              </div>
              <div>
                <strong>Fee : </strong>990 USDT
              </div>
              <div>
                <strong>User will get : </strong>10 USDT
              </div>
            </div>
          </Box>
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Box>
            <div className='p2p-user-head'>Payment Details</div>
            <div className='mt-10 p2p-user'>
              <div>
                <strong> Gateway : </strong>
                BrainTree
              </div>
              <div>
                <strong>Status : </strong>
                submitted_for_settlement
              </div>
              <div>
                <strong>TxID : </strong>28dx3s3m
              </div>
              <div>
                <strong>Gateway Metadata:</strong>10 USDT
              </div>
            </div>
          </Box>
        </Grid2>
      </Grid2>
    </Grid2>
  );
  const sellModel = (
    <Grid2 container spacing={2} sx={{ height: 500, overflowY: "scroll" }}>
      <Grid2 container spacing={2}>
        <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box>
            <div className='p2p-user-head'>Sell Crypto Details</div>
            <div className='mt-10 p2p-user'>
              <div>
                <strong>Sell Cryto ID :</strong>
                cm8ofnqxh1aomzcdp3fna3gnk
              </div>
              <div>
                <strong>Created at : </strong>25 Mar, 2025 05:19 pm
              </div>
              <div>
                <strong>Updated at : </strong> 25 Mar, 2025 05:19 pm
              </div>
              <div>
                <strong>Status : </strong> <span className='badge'>Active</span>
              </div>
            </div>
          </Box>
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box>
            <div className='p2p-user-head'>To User</div>

            <div className='mt-10 p2p-user'>
              <div>
                <strong> Nick Name : </strong>N/A
              </div>
              <div>
                <strong>User Code : </strong> u-1742903121600
              </div>
              <div>
                <strong>Email : </strong>decimal_issue@yopmail.com
              </div>
              <div>
                <strong>Phone: </strong> N/A
              </div>
            </div>
          </Box>
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Box>
            <div className='p2p-user-head'>Amount</div>
            <div className='mt-10 p2p-user'>
              <div>
                <strong>Payment Amount : </strong>
                1000 USD
              </div>
              <div>
                <strong>Converted Total Amount : </strong>
                1000 USDT
              </div>
              <div>
                <strong>Fee : </strong>990 USDT
              </div>
              <div>
                <strong>User will get : </strong>10 USDT
              </div>
            </div>
          </Box>
        </Grid2>
      </Grid2>
    </Grid2>
  );

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  useEffect(() => {
    setCollections({
      columns: [
        { Header: "ID", accessor: "id", align: "left" },
        { Header: "Created At", accessor: "createdAt", align: "left" },
        { Header: "Payment Amount", accessor: "amount", align: "left" },
        { Header: "Converted Total Amount", accessor: "total", align: "left" },
        { Header: "Fee", accessor: "fee", align: "left" },
        { Header: "User's Amount", accessor: "user_amount", align: "left" },
        {
          Header: "Pay Method Type",
          accessor: "payment_method",
          align: "left",
        },
        { Header: "Status", accessor: "status", align: "left" },
        {
          Header: "Payment Status",
          accessor: "Payment Status",
          align: "left",
        },
        {
          Header: "Action",
          accessor: "action",
          align: "left",
        },
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
                <h2 style={{ margin: 0 }}>Buy/ Sell Crypto</h2>
              </div>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab
                    label='Buy Crypto'
                    {...a11yProps(0)}
                    className='tab-title'
                  />
                  <Tab
                    label='Sell Crypto'
                    {...a11yProps(1)}
                    className='tab-title'
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className='display-4 flex-wrap'>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='status'>Status</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        value={buyStatus}
                        label='Status'
                        size='small'
                        onChange={handleBuyStatusChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"complete"}>Completed</MenuItem>
                        <MenuItem value={"cancel"}>Cancelled</MenuItem>
                        <MenuItem value={"failed"}>Failed</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='payment'>Payment Status</InputLabel>
                      <Select
                        labelId='payment'
                        id='paymnet'
                        value={payment}
                        label='Payment Status'
                        size='small'
                        onChange={handlePaymentChange}
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
                      <InputLabel id='payment_method'>
                        Payment Method
                      </InputLabel>
                      <Select
                        labelId='payment_method'
                        id='payment_method'
                        value={paymentMethod}
                        label='Payment Method'
                        onChange={handlePaymentMethod}
                        size='small'
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"online_payment"}>
                          Online Payment
                        </MenuItem>
                        <MenuItem value={"bank_deposit"}>Bank Deposit</MenuItem>
                        <MenuItem value={"wallet"}>Wallet</MenuItem>
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
                <div className='display-4'>
                  <Box sx={{ minWidth: 150 }}>
                    <FormControl fullWidth>
                      <InputLabel id='status'>Status</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        value={sellStatus}
                        label='Status'
                        size='small'
                        onChange={handleSellStatusChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"complete"}>Completed</MenuItem>
                        <MenuItem value={"cancel"}>Cancelled</MenuItem>
                        <MenuItem value={"failed"}>Failed</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ minWidth: 150 }}>
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
        </Box>
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
              size='small'
              sx={{ width: "120px" }}
              onClick={handleOpen}
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
          <Box sx={{ ...style, overflowY: value === 0 ? "scroll" : "auto" }}>
            <div className='display-2 mb-10'>
              <h3>{value === 0 ? "Buy" : "Sell"} Crypto Details</h3>
              <Close onClick={handleClose} className='cursor' />
            </div>
            {value === 0 ? buyModel : sellModel}
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default BuySell;
