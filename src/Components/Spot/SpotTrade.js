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

const SpotTrade = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [cryptoType, setCryptoType] = useState("all");
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCryptoChange = (event) => {
    setCryptoType(event.target.value);
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
          <div className='p2p-user-head'>Trade Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Trade ID : </strong>
              cm8x3atpvba5lzcoo64446551
            </div>
            <div>
              <strong>Currency Pair : </strong>
              ETHUSDT
            </div>
            <div>
              <strong>Buyer : </strong>
              system-bot
            </div>
            <div>
              <strong>Seller : </strong>
              system-bot
            </div>
            <div>
              <strong>Maker : </strong>
              system-bot
            </div>
            <div>
              <strong>Taker : </strong>
              system-bot
            </div>
            <div>
              <strong>Created at : </strong>03 Nov, 2023 01:08 am
            </div>
            <div>
              <strong>Updated at : </strong> 03 Nov, 2023 01:08 am
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
              1828.98 USDT
            </div>
            <div>
              <strong>Amount : </strong>
              8.19398998 ETH
            </div>
            {/* 

Seller Earnings: 9.5311258518 USDT
            */}
            <div>
              <strong>Total Price : </strong>14986.64 USDT
            </div>
            <div>
              <strong>Base Fee Amount : </strong> 2.53872955 ETH
            </div>
            <div>
              <strong>Trade Fee Amount : </strong>5.65526043 ETH
            </div>
            <div>
              <strong>Buyer Earnings : </strong>5.65526043 ETH
            </div>
            <div>
              <strong>Seller Earnings : </strong>5.65526043 ETH
            </div>
          </div>
        </Box>
      </Grid2>
    </Grid2>
  );
  useEffect(() => {
    setCollections({
      columns: [
        { Header: "ID", accessor: "id", align: "left" },
        { Header: "Currency Pair", accessor: "currency_pair", align: "left" },
        { Header: "Buyer", accessor: "buyer", align: "left" },
        { Header: "Seller", accessor: "seller", align: "left" },
        { Header: "Price", accessor: "price", align: "left" },
        { Header: "Amount", accessor: "amount", align: "left" },
        { Header: "Total Price", accessor: "Total_Price", align: "left" },
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
                <h2 style={{ margin: 0 }}>Futures Trade List</h2>
              </div>

              <div className='display-4  wrap-field'>
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
                    <InputLabel id='Currency'>Currency Pair</InputLabel>
                    <Select
                      labelId='Currency'
                      id='Currency'
                      label='Currency Pair'
                      size='small'
                      value='all'
                    >
                      <MenuItem value={"all"}>All</MenuItem>
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
                <Button variant='contained' className='action-btn'>
                  Export
                </Button>
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
              <h3>Trade Details</h3>
              <Close onClick={handleClose} className='cursor' />
            </div>
            {detailsModel}
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default SpotTrade;
