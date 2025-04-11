import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";

import ReusableTable from "../ReuseTable/ReuseTable";
import consts from "../../constant";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authprovider";
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
const SystemDeposit = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("all");
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [network, setNetwork] = useState("all");
  const [currency, setCurrency] = useState("all");
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

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

  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Currency", accessor: "currency", align: "left" },
        { Header: "Network", accessor: "network", align: "left" },
        { Header: "TxId", accessor: "TxId", align: "left" },
        { Header: "Amount", accessor: "amount", align: "left" },
        { Header: "Date", accessor: "date", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: [
        {
          action: (
            <Button className='action-btn' variant='contained'>
              Explore
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
                  <h2 style={{ margin: 0 }}>Deposit History</h2>
                </div>
                <div className='display-4 mt-20  wrap-field'>
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
              </div>
           <div className="margin-top">
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

export default SystemDeposit;
