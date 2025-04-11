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

import ReusableTable from "../ReuseTable/ReuseTable";
import { Close } from "@mui/icons-material";
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

const FuturePositionsHistory = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [cryptoType, setCryptoType] = useState("all");
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [walletType, setWalletType] = useState("all");
  const [open, setOpen] = useState(false);

  const handleOpen = (detail) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCryptoChange = (event) => {
    setCryptoType(event.target.value);
  };
  const handleWalletTypeChange = (event) => {
    setWalletType(event.target.value);
  };

  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };
  const detailsModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Positon Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Position ID : </strong>
              cm8x3atpvba5lzcoo64446551
            </div>
            <div>
              <strong>Code : </strong>
              ETHUSDT
            </div>
            <div>
              <strong>Created at : </strong>03 Nov, 2023 01:08 am
            </div>
            <div>
              <strong>Margin Mode : </strong> Cross
            </div>
            <div>
              <strong>Margin Ratio: </strong> 100
            </div>
            <div>
              <strong>Status : </strong> Liquidated
            </div>
            <div>
              <strong>Liquidated For :</strong> Margin Ratio
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Amount Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Price : </strong>
              8.19398998 ETH
            </div>
            <div>
              <strong>Amount : </strong>
              8.19398998 ETH
            </div>
            <div>
              <strong>Leverage : </strong>
              50
            </div>
            <div>
              <strong>Mark Price : </strong>
              8.19398998 ETH
            </div>
            <div>
              <strong>Pnl : </strong>
              -0.000000000000082558 USDT
            </div>
            <div>
              <strong>Maintenance Margin : </strong>
              8.19398998 ETH
            </div>{" "}
            <div>
              <strong>Margin Balance : </strong>
              8.19398998 ETH
            </div>{" "}
            <div>
              <strong>Wallet Balance : </strong>
              8.19398998 ETH
            </div>
          </div>
        </Box>
      </Grid2>
    </Grid2>
  );
  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Position ID", accessor: "id", align: "left" },
        { Header: "Usercode", accessor: "Usercode", align: "left" },
        { Header: "Code", accessor: "Code", align: "left" },
        { Header: "Type", accessor: "Type", align: "left" },
        { Header: "Amount", accessor: "Amount", align: "left" },
        { Header: "Created At", accessor: "CreatedAt", align: "left" },
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
                <h2 style={{ margin: 0 }}>Futures Position History</h2>
              </div>

              <div className='display-4 mt-20 wrap-field'>
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
                    <InputLabel id='wallet'>Symbols</InputLabel>
                    <Select
                      labelId='wallet'
                      id='wallet'
                      value={walletType}
                      label='Symbols'
                      size='small'
                      onChange={handleWalletTypeChange}
                    >
                      <MenuItem value={"all"}>All</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={fieldStyle}>
                  <FormControl fullWidth>
                    <InputLabel id='wallet'>Status</InputLabel>
                    <Select
                      labelId='wallet'
                      id='wallet'
                      value={walletType}
                      label='Symbols'
                      size='small'
                      onChange={handleWalletTypeChange}
                    >
                      <MenuItem value={"all"}>All</MenuItem>
                      <MenuItem value={"open"}>Opened</MenuItem>
                      <MenuItem value={"close"}>Closed</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={fieldStyle}>
                  <FormControl fullWidth>
                    <InputLabel id='crypto'>Sort</InputLabel>
                    <Select
                      labelId='crypto'
                      id='crypto'
                      value={cryptoType}
                      label='Sort'
                      size='small'
                      onChange={handleCryptoChange}
                    >
                      <MenuItem value={"all"}>All</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className='mt-20'>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </div>
            </Grid2>
          </Grid2>
        </Box>
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <div className='display-2 mb-10'>
              <h3>Position Details</h3>
              <Close onClick={handleClose} className='cursor' />
            </div>
            {detailsModel}
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default FuturePositionsHistory;
