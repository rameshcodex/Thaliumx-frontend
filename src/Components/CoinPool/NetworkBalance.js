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

import "./CoinPool.css";
import ReusableTable from "../ReuseTable/ReuseTable";
import { Close } from "@mui/icons-material";
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
  width: 500,
  "@media(max-width:767.98px)": {
    width: "95%",
  },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
const NetworkBalance = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("all");
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [network, setNetwork] = useState("all");
  const [currency, setCurrency] = useState("all");
  const [open, setOpen] = useState(false);
  const [modelDetails, setModelDetails] = useState("");

  const handleOpen = (details) => {
    setOpen(true);
    setModelDetails(details);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopOverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const popOverOpen = Boolean(anchorEl);
  const id = popOverOpen ? "simple-popover" : undefined;
  const handleNetworkChange = (event) => {
    setNetwork(event.target.value);
  };
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleSort = (event) => {
    setSort(event.target.value);
  };

  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };
  const balanceModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box>
          <div className='p2p-user-head'>Balance Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Crypto : </strong>
              DKFT20DK Free Token
            </div>
            <div>
              <strong>Network : </strong>
              Mumbai
            </div>
            <div>
              <strong>Created at : </strong>03 Nov, 2023 01:08 am
            </div>
            <div>
              <strong>Updated at : </strong> 03 Nov, 2023 01:08 am
            </div>
            <div>
              <strong>User Code: </strong>u-1664547157058
            </div>
            <div>
              <strong>Address : </strong>
              0x1C919083DB817ab9684F66d9A032EB24b1F10418
            </div>
            <div>
              <strong>Balance : </strong> 1000DKFT20
            </div>
          </div>
        </Box>
      </Grid2>
    </Grid2>
  );
  const withdrawModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, sm: 12, lg: 12, xl: 12 }}>
        <TextField label='Amount' fullWidth variant='outlined' />
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, lg: 12, xl: 12 }}>
        <TextField label='Destination' fullWidth variant='outlined' />
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, lg: 12, xl: 12 }}>
        <TextField
          label='Note'
          fullWidth
          multiline
          rows={4}
          variant='outlined'
        />
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, lg: 12, xl: 12 }}>
        <Button className='action-btn' variant='contained'>
          Withdraw
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
        <Button variant='contained' color="warning" className='action-btn'>
          Cancel
        </Button>
        <Button variant='contained' color="error" className='action-btn'>
          Confirm
        </Button>
      </div>
    </div>
  );
  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Crypto", accessor: "Crypto", align: "left" },
        { Header: "Network", accessor: "Network", align: "left" },
        { Header: "Address", accessor: "Address", align: "left" },
        { Header: "Usercode", accessor: "Usercode", align: "left" },
        { Header: "Balance", accessor: "Balance", align: "left" },
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
              <div className='m-10'>
                <div>
                  <h2 style={{ margin: 0 }}>Network Balance</h2>
                </div>
                <div className='display-4 mt-20 flex-wrap'>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='network'>Network</InputLabel>
                      <Select
                        labelId='network'
                        id='network'
                        value={network}
                        label='Network'
                        size='small'
                        onChange={handleNetworkChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='currency'>Currency</InputLabel>
                      <Select
                        labelId='currency'
                        id='currency'
                        value={currency}
                        label='Currency'
                        size='small'
                        onChange={handleCurrencyChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='sort'>Sort</InputLabel>
                      <Select
                        labelId='sort'
                        id='sort'
                        value={sort}
                        label='Sort'
                        onChange={handleSort}
                        size='small'
                      >
                        <MenuItem value={"all"}>All</MenuItem>
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
                  <Button variant='contained' className='action-btn'>
                    Sync Balance
                  </Button>
                </div>
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
                sx={{ width: "200px" }}
                onClick={() => handleOpen("Balance Details")}
              >
                View Details
              </Button>
              <Button
                className='action-btn'
                sx={{ width: "200px" }}
                onClick={() => handleOpen("")}
              >
                Sync Balance
              </Button>
              <Button
                className='action-btn'
                sx={{ width: "200px" }}
                onClick={() => handleOpen("")}
              >
                Sync Native Balance
              </Button>
              <Button
                className='action-btn'
                sx={{ width: "200px" }}
                onClick={() => handleOpen("Coin Pool Withdrawal Modal ")}
              >
                Withdraw
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
                <h3>{modelDetails}</h3>
                <Close onClick={handleClose} className='cursor' />
              </div>
              {modelDetails === "Balance Details"
                ? balanceModel
                : modelDetails === "Coin Pool Withdrawal Modal "
                ? withdrawModel
                : securityModel}
            </Box>
          </Modal>
        </Box>
      </Box>
    </div>
  );
};

export default NetworkBalance;
