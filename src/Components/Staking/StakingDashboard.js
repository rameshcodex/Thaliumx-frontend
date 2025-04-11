import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";
import ReusableTable from "../ReuseTable/ReuseTable";
import './Staking.css'
const drawerWidth = 260;
const StakingDashboard = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [payoutCollections, setPayoutCollections] = useState({
    columns: [],
    row: [],
  });
  const [investCollections, setInvestCollections] = useState({
    columns: [],
    row: [],
  });

  const [page, setPage] = useState(1);
  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  useEffect(() => {
    setPayoutCollections({
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
    setInvestCollections({
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
    <div className='staking'>
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
            <Grid2 item size={{ lg: 12 }}>
              <div className='display-2'>
                <h2 style={{ margin: 0 }}>Staking Dashboard</h2>
                <Button variant='contained' className='action-btn' >
                  Process Payout
                </Button>
              </div>
            </Grid2>

            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Investments</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In BTC : </strong> 20.30788004
                  </p>
                  <p>
                    <strong>In USD : </strong> 1,725,310.577
                  </p>
                  <p style={{ marginTop: "10px" }}>
                    <strong>Count :</strong> <span className='badge'>0</span>
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Running Investments</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In BTC : </strong> 20.30788004
                  </p>
                  <p>
                    <strong>In USD : </strong> 1,725,310.577
                  </p>
                  <p style={{ marginTop: "10px" }}>
                    <strong>Count :</strong> <span className='badge'>0</span>
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Due Earnings</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In BTC : </strong> 20.30788004
                  </p>
                  <p>
                    <strong>In USD : </strong> 1,725,310.577
                  </p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 3, xl: 3 }}>
              <div class='card'>
                <div class='title'>
                  <p class='title-text'>Total Earnings</p>
                </div>
                <div class='coin-data'>
                  <p>
                    <strong>In BTC : </strong> 20.30788004
                  </p>
                  <p>
                    <strong>In USD : </strong> 1,725,310.577
                  </p>
                </div>
              </div>
            </Grid2>
          </Grid2>
          <div className='margin-top'>
            <div className='text-center table-title'>
              <h4>Recent Investments</h4>
            </div>
            <ReusableTable
              collections={investCollections}
              paginationChange={paginationChange}
              page={page}
            />
          </div>

          <div className='margin-top'>
            <div className='text-center table-title' >
              <h4>Recent Payouts</h4>
            </div>
            <ReusableTable
              collections={payoutCollections}
              paginationChange={paginationChange}
              page={page}
            />
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default StakingDashboard;
