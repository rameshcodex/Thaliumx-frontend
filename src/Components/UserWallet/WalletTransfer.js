import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReusableTable from "../ReuseTable/ReuseTable";
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

const WalletTransfer = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Currency", accessor: "currency", align: "left" },
        { Header: "User", accessor: "user", align: "left" },
        { Header: "Currency Type", accessor: "currency_type", align: "left" },
        { Header: "Tx Type", accessor: "Tx_Type", align: "left" },
        {
          Header: "From Wallet Type",
          accessor: "from_wallet_Type",
          align: "left",
        },
        { Header: "To Wallet Type", accessor: "to_wallet_Type", align: "left" },
        { Header: "Amount", accessor: "amount", align: "left" },
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
              <div className='display-1 mb-10'>
                <ArrowBackIosIcon
                  className='cursor'
                  onClick={() => navigate(-1)}
                />
                <h2>Wallet Transfer Histories</h2>
              </div>

              <div className='display-4 mb-10  wrap-field'>
                <Box sx={fieldStyle}>
                  <FormControl fullWidth>
                    <InputLabel id='currency_type'>Currency Type</InputLabel>
                    <Select
                      labelId='currency_type'
                      id='currency_type'
                      value='all'
                      label='Currency Type'
                      size='small'
                    >
                      <MenuItem value={"all"}>All</MenuItem>
                      <MenuItem value={"crypto"}>Crypto</MenuItem>
                      <MenuItem value={"fiat"}>Fiat</MenuItem>
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
        </Box>
      </Box>
    </div>
  );
};

export default WalletTransfer;
