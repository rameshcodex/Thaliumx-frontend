import React, { useEffect, useState } from "react";
import {
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";

import "./CoinPool.css";
import ReusableTable from "../ReuseTable/ReuseTable";
const drawerWidth = 260;

const CoinpoolDashboard = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Crypto", accessor: "Crypto", align: "left" },
        { Header: "Network", accessor: "Network", align: "left" },
        { Header: "	Address", accessor: "Address", align: "left" },
        { Header: "Usercode", accessor: "Usercode", align: "left" },
        { Header: "Balance", accessor: "Balance", align: "left" },
        { Header: "Action", accessor: "Action", align: "left" },
      ],
      row: [],
    });
  }, []);

  return (
    <div className='coinpool'>
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
            <Grid2 item size={{xs : 12 , lg: 12 }}>
              <div className='display-1'>
                <h2 style={{ margin: 0 }}>Coin Pool Dashboard</h2>
                <Button variant='contained' className="action-btn">Sync Data Now</Button>
              </div>
            </Grid2>

            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In BTC : </strong> 251.55086196 BTC
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Mumbai</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In MATIC : </strong> 15.74153298 MATIC
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Sepolia ETH</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In ETH : </strong> 43.22073728 ETH
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Goerli</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In ETH : </strong> 43.22073728 ETH
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Binance Testnet</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In BNB : </strong> 43.22073728 BNB
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Solana Devnet</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In SOL : </strong> 43.22073728 SOL
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Bitcoin Testnet</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In BTC : </strong> 43.22073728 BTC
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Dashcoin Testnet</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In DASH : </strong> 43.22073728 DASH
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Tron Nile Testnet</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In TRX : </strong> 43.22073728 TRX
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Bitcoin Cash Testnet</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In BCH : </strong> 43.22073728 BCH
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Litecoin Testnet</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In LTC : </strong> 43.22073728 LTC
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Dogecoin Testnet</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In DOGE : </strong> 43.22073728 DOGE
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Monero Testnet</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In XMR : </strong> 43.22073728 XMR
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Tron Mainnet</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In TRX : </strong> 43.22073728 TRX
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Remaining Asset in Polygon Mainnet</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In POL : </strong> 43.22073728 POL
                  </p>
                  <p>
                    <strong>In USD : </strong> 21,964,638.94 USD
                  </p>
                </div>
              </div>
            </Grid2>
          </Grid2>
          <div className='m-10 text-center'>
            <h4>Top Balances</h4>
          </div>
          <ReusableTable
            collections={collections}
            paginationChange={paginationChange}
            page={page}
          />
        </Box>
      </Box>
    </div>
  );
};

export default CoinpoolDashboard;
