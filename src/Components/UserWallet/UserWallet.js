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
import consts from "../../constant";
import { useNavigate } from "react-router-dom";
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
const UserWallet = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [modelDetails, setModelDetails] = useState("");
  const navigate = useNavigate();
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
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Wallet Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Currency : </strong> USDT Tether USD
            </div>
            <div>
              <strong>Nick Name : </strong> N/A
            </div>
            <div>
              <strong>User Code : </strong> u-1742903121600
            </div>
            <div>
              <strong>Email : </strong> decimal_issue@yopmail.com
            </div>
            <div>
              <strong>Phone : </strong>N/A
            </div>
            <div>
              <strong>Status : </strong>
              <span className='badge'>In progress</span>
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'> Wallet Balance</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Spot available balance : </strong>878.3276432764325 USDT
            </div>
            <div>
              <strong>Spot in order balance : </strong> 0 USDT
            </div>
            <div>
              <strong>Spot total balance : </strong>878.3276432764325 USDT
            </div>
            <div>
              <strong>Funding available balance : </strong>1101.6723567235674
              USDT
            </div>
            <div>
              <strong>Funding in order balance :</strong> 0 USDT
            </div>
            <div>
              <strong>Funding total balance : </strong> 1101.6723567235674 USDT
            </div>
            <div>
              <strong>Total balance : </strong> 1980 USDT
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
        { Header: "Usercode", accessor: "usercode", align: "left" },
        {
          Header: "Total Spot Balance",
          accessor: "Total_Spot_Balance",
          align: "left",
        },
        {
          Header: "Total Funding Balance",
          accessor: "Total_Funding_Balance",
          align: "left",
        },
        { Header: "Total Balance", accessor: "Total_Balance", align: "left" },
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
                <h2 style={{ margin: 0 }}>Wallet Management</h2>
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
                <Button variant='contained' className='action-btn'>
                  Export
                </Button>
              </div>
              <ReusableTable
                collections={collections}
                paginationChange={paginationChange}
                page={page}
              />
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
                width: modelDetails === "Wallet Details" ? 700 : 500,
              }}
            >
              <div className='display-2 mb-10'>
                <h3>Wallet Details</h3>
                <Close onClick={handleClose} className='cursor' />
              </div>
              {depositDetailsModel}
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
                onClick={() => handleOpen("Wallet Details")}
              >
                View Details
              </Button>
              <Button
                className='action-btn'
                onClick={() =>
                  navigate(`/${consts.route}/user-wallet/wallet-management`)
                }
              >
                Activites
              </Button>
              <Button
                className='action-btn'
                onClick={() =>
                  navigate(`/${consts.route}/user-wallet/fund_transfer`)
                }
              >
                Wallet Transfer histories
              </Button>
            </Box>
          </Popover>
        </Box>
      </Box>
    </div>
  );
};

export default UserWallet;
