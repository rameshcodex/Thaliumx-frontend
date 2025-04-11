import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Box, Button, Grid2 } from "@mui/material";
import Header from "../Header/Header";
import consts from "../../constant";
import Axios from "axios";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ReusableTable from "../ReuseTable/ReuseTable";
import Chart from "react-apexcharts";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
const drawerWidth = 260;

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({});
  const [depositTable, setDepositTable] = useState({ columns: [], row: [] });
  const [withdrawalTable, setWithdrawelTable] = useState({
    columns: [],
    row: [],
  });
  const [tradeTable, setTradeTable] = useState({ columns: [], row: [] });
  const [coinTable, setCoinTable] = useState({ columns: [], row: [] });
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  
  const chartOptionsByWeek = {
    options: {
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
      },
    },
    series: [
      {
        data: [0, 0.5, 1, 2, 1,1,1],
      },
    ],
  };

  const chartOptions = {
    options: {
      xaxis: {
        categories: ["25/2", "3/3", "5/3", "18/3", "19/3", "25/3"],
      },
    },
    series: [
      {
        data: [0, 0.5, 1, 1.5, 2],
      },
    ],
  };
  const [userChart, setuserChart] = useState(chartOptionsByWeek);
  const [dailyChart, setDailyChart] = useState(chartOptions);
  const [monthlyChart, setMonthlyChart] = useState(chartOptions);
  const [tradeChart, setTradeChart] = useState(chartOptions);

  const getAnalyticsData = async () => {
    try {
      const { data } = await Axios.get(
        `${consts.BackendUrl}/admin/getanalytics?limit=10`,
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data?.success == true) {
        setAnalyticsData(data?.result);
      } else {
        setAnalyticsData({});
      }
    } catch (error) {
      setAnalyticsData({});
      console.log(error);
    }
  };

  useEffect(() => {
    getAnalyticsData();
  }, []);

  useEffect(() => {
    setDepositTable({
      columns: [
        // { Header: "Sno", accessor: "sno", align: "left" },
        { Header: "Currency", accessor: "asset", align: "left" },
        { Header: "Network", accessor: "contractAddress", align: "left" },
        { Header: "Destination", accessor: "to", align: "left" },
        { Header: "Amount", accessor: "amount", align: "left" },
      ],
      row: analyticsData?.latestDeposits?.docs,
      // pagecount: 
    });
    setWithdrawelTable({
      columns: [
        { Header: "Sno", accessor: "sno", align: "left" },
        { Header: "Currency", accessor: "currency", align: "left" },
        { Header: "Network", accessor: "network", align: "left" },
        { Header: "Destination", accessor: "destination", align: "left" },
        { Header: "Amount", accessor: "amount", align: "left" },
      ],
      row: [],
    });
    setTradeTable({
      columns: [
        { Header: "Currency Pair", accessor: "pair_symbol", align: "left" },
        { Header: "Price", accessor: "price", align: "left" },
        { Header: "Amount", accessor: "value", align: "left" },
        // { Header: "Total Price", accessor: "total_price", align: "left" },
      ],
      row: analyticsData?.latestTrades?.docs,
    });
    setCoinTable({
      columns: [
        { Header: "Currency", accessor: "currency", align: "left" },
        { Header: "Total Amount", accessor: "total_amount", align: "left" },
        { Header: "In USD", accessor: "usd", align: "left" },
      ],
      row: [],
    });
    setuserChart({
      options: {
        xaxis: {
          categories: analyticsData?.dailyLogins?.map(logins=>logins._id),
        },
      },
      series: [
        {
          data: analyticsData?.dailyLogins?.map(logins=>logins.count.toFixed(2)),
        },
      ],
    });
    setDailyChart({
      options: {
        xaxis: {
          categories: analyticsData?.dailyRevenues?.map(revenue=>revenue._id),
        },
      },
      series: [
        {
          data: analyticsData?.dailyRevenues?.map(revenue=>revenue.value.toFixed(2)),
        },
      ],
    });
    setTradeChart(chartOptionsByWeek);
    setMonthlyChart(chartOptions);
  }, [analyticsData]);

  return (
    <div className="Dashboard">
      <Box sx={{ display: lg ? "flex" : "block" }}>
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 5,
            width: { lg: `calc(100% - ${drawerWidth}px)` },
            marginTop: "50px",
          }}
        >
          <Grid2 container spacing={2}>
            {/* <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class="card">
                <div class="title">
                  <p class="title-text">Completed Trades</p>
                </div>
                <div class="data">
                  <p>{pairsCount?.completedTrades ? pairsCount?.completedTrades : 0}</p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class="card">
                <div class="title">
                  <p class="title-text">Pending Buy Trade</p>
                </div>
                <div class="data">
                  <p>{pairsCount?.pendingBuyTrades ? pairsCount?.pendingBuyTrades : 0}</p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class="card">
                <div class="title">
                  <p class="title-text">Pending Sell Trade</p>
                </div>
                <div class="data">
                  <p>{pairsCount?.pendingSellTrades ? pairsCount?.pendingSellTrades : 0}</p>
                </div>
              </div>
            </Grid2> */}
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class="card">
                <div class="title">
                  <p class="title-text">Total User</p>
                </div>
                <div class="data">
                  <p>{analyticsData?.totalUsers ? analyticsData?.totalUsers : 0}</p>
                </div>
              </div>
            </Grid2>
            {/* <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class="card">
                <div class="title">
                  <p class="title-text"> Kyc Verify User</p>
                </div>
                <div class="data">
                  <p>
                    {pairsCount?.kycVerifiedUsers
                      ? pairsCount?.kycVerifiedUsers
                      : 0}
                  </p>
                </div>
              </div>
            </Grid2> */}
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class="card">
                <div class="title">
                  <p class="title-text">Networks</p>
                </div>
                <div class="data">
                  <p>{analyticsData?.totalNetworks ? analyticsData?.totalNetworks : 0}</p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class="card">
                <div class="title">
                  <p class="title-text">Total Deposits</p>
                </div>
                <div class="data">
                  <p>{analyticsData?.totalDeposits ? analyticsData?.totalDeposits : 0}</p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class="card">
                <div class="title">
                  <p class="title-text">Total Withdrawals</p>
                </div>
                <div class="data">
                  <p>0</p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class="card">
                <div class="title">
                  <p class="title-text">Total Buy Orders</p>
                </div>
                <div class="data">
                  <p>{analyticsData?.totalBuyOrders ? analyticsData?.totalBuyOrders : 0}</p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class="card">
                <div class="title">
                  <p class="title-text">Total Sell Orders</p>
                </div>
                <div class="data">
                  <p>{analyticsData?.totalSellOrders ? analyticsData?.totalSellOrders : 0}</p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class="card">
                <div class="title">
                  <p class="title-text">Total Trades</p>
                </div>
                <div class="data">
                  <p>{analyticsData?.totalTrades ? analyticsData?.totalTrades : 0}</p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <div class="card">
                <div class="title">
                  <p class="title-text">Total Revenues</p>
                </div>
                <div class="data">
                  <p>{analyticsData?.totalRevenues ? analyticsData?.totalRevenues : 0}</p>
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <div class="card card-table">
                <div className="data-head title-text">
                  <p>User Chart (By week)</p>
                </div>
                <div>
                  <Chart
                    series={userChart?.series}
                    options={userChart?.options}
                    height={300}
                    type="line"
                  />
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <div class="card card-table">
                <div className="data-head title-text">
                  <p style={{ marginBottom: 0 }}>
                    Daily Revenue Chart
                  </p>
                  <small>Amount in ($) USD</small>
                </div>
                <div>
                  <Chart
                    series={dailyChart?.series}
                    options={dailyChart?.options}
                    height={300}
                    type="line"
                  />
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <div class="card card-table">
                <div className="data-head title-text">
                  <p style={{ marginBottom: 0 }}>Monthly Revenue Chart</p>
                  <small>Amount in ($) USD</small>
                </div>
                <div>
                  <Chart
                    series={monthlyChart?.series}
                    options={monthlyChart?.options}
                    height={300}
                    type="line"
                  />
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <div class="card card-table">
                <div className="data-head title-text">
                  <p>Daily Trade Chart</p>
                </div>
                <div>
                  <Chart
                    series={tradeChart?.series}
                    options={tradeChart?.options}
                    height={300}
                    type="line"
                  />
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <div class="card card-table">
                <div className="data-head title-text">
                  <p>Latest Deposit</p>
                </div>
                <div>
                  <ReusableTable collections={depositTable} />
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <div class="card card-table">
                <div className="data-head title-text">
                  <p>Latest Withdrawals</p>
                </div>
                <div>
                  <ReusableTable collections={withdrawalTable} />
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <div class="card card-table">
                <div className="data-head title-text">
                  <p>Latest Trades</p>
                </div>
                <div>
                  <ReusableTable collections={tradeTable} />
                </div>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 6, md: 6, lg: 6, xl: 6 }}>
              <div class="card card-table">
                <div className="data-head title-text">
                  <p>Coin Wise revenue</p>
                </div>
                <div>
                  <Button variant="contained" startIcon={<FileDownloadIcon/>} className="data-btn">
                   Export
                  </Button>
                  <ReusableTable collections={coinTable} />
                </div>
              </div>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
