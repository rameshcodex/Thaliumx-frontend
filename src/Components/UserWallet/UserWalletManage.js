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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReusableTable from "../ReuseTable/ReuseTable";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const drawerWidth = 260;
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
  "@media(max-width:767.98px)": {
    width: "95%",
  },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
const UserWalletManage = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [open, setOpen] = useState(false);
const navigate = useNavigate()
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  const detailsModel = (
    <Grid2 container spacing={2} sx={{ height: 500, overflowY: "scroll" }}>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Activity Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Currency : </strong> USDT Tether USD
            </div>
            <div>
              <strong>Created at : </strong> 25 Mar, 2025 05:44 pm
            </div>
            <div>
              <strong>Tx Type : </strong> Debit
            </div>
            <div>
              <strong>Wallet Type : </strong> Spot
            </div>
            <div>
              <strong>Event : </strong>Wallet Transfer
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Balance Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Previous balance : </strong>990 USDT
            </div>
            <div>
              <strong>Current balance : </strong> 878.3276432764325 USDT
            </div>
            <div>
              <strong>Change amount : </strong>878.3276432764325 USDT
            </div>
            <div>
              <strong>Description : </strong>N/A
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>User Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Nick Name : </strong>N/A
            </div>
            <div>
              <strong>User Code: </strong> u-1742903121600
            </div>
            <div>
              <strong>Email : </strong>decimal_issue@yopmail.com
            </div>
            <div>
              <strong>Phone : </strong>N/A
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box>
          <div className='p2p-user-head'>Wallet Transfer Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Wallet Transfer ID : </strong>cm8ogjox61zxozcdpu2q8pegp
            </div>
            <div>
              <strong>Wallet Transfer Raw Data : </strong>
            </div>
          </div>
        </Box>
      </Grid2>
    </Grid2>
  );

  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Currency", accessor: "currency", align: "left" },
        { Header: "User", accessor: "user", align: "left" },
        { Header: "Event", accessor: "event", align: "left" },
        { Header: "Tx Type", accessor: "Tx_Type", align: "left" },
        { Header: "Wallet Type", accessor: "wallet_Type", align: "left" },
        {
          Header: "Previous balance	",
          accessor: "previous_balance",
          align: "left",
        },
        {
          Header: "Current balance	",
          accessor: "current_balance",
          align: "left",
        },
        { Header: "Change amount", accessor: "current_amount", align: "left" },
        { Header: "Created at", accessor: "createdAt", align: "left" },
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
              <div className='display-1 mb-10'>
                <ArrowBackIosIcon
                  className='cursor'
                  onClick={() => navigate(-1)}
                />
                <h2>Wallet Activities Management</h2>
              </div>

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
                    <InputLabel id='transactions'>Transactions</InputLabel>
                    <Select
                      labelId='transactions'
                      id='transactions'
                      value='all'
                      label='Transactions'
                      size='small'
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
                      value='all'
                      label='Wallet'
                      size='small'
                    >
                      <MenuItem value={"all"}>All</MenuItem>
                      <MenuItem value={"spot"}>Spot</MenuItem>
                      <MenuItem value={"funding"}>Funding</MenuItem>
                      <MenuItem value={"futures"}>Futures</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={fieldStyle}>
                  <FormControl fullWidth>
                    <InputLabel id='sort'>Sort</InputLabel>
                    <Select
                      labelId='sort'
                      id='sort'
                      value='new'
                      label='Sort'
                      size='small'
                    >
                      <MenuItem value={"new"}>Newest</MenuItem>
                      <MenuItem value={"old"}>Oldest</MenuItem>
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
              <div className='margin-top'>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </div>
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
                <h3>Wallet Activity Details</h3>
                <Close onClick={handleClose} className='cursor' />
              </div>

              {detailsModel}
            </Box>
          </Modal>
        </Box>
      </Box>
    </div>
  );
};

export default UserWalletManage;
