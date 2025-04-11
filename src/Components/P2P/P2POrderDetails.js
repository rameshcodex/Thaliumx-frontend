import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
const drawerWidth = 260;

const P2POrderDetails = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();

  const location = useLocation();
  const {p2pOrderDetails} = location.state || {};

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
              <div className='display-1'>
                <ArrowBackIosIcon
                  className='cursor'
                  onClick={() => navigate(-1)}
                />
                <h2>P2p Order Details</h2>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
              <Box>
                <div className='p2p-user-head'>Order Info</div>

                <div className='mt-10 p2p-user'>
                  {/* <div>
                    <strong> Order ID: </strong>
                    ORD0000000103
                  </div>
                  <div>
                    <strong>ADV ID: </strong>
                    ADV0000000032
                  </div> */}
                  <div>
                    <strong>Transaction ID: </strong>
                    {p2pOrderDetails?.txId}
                  </div>
                  <div>
                    <strong>Created at : </strong>{p2pOrderDetails?.createdAt}
                  </div>
                  <div>
                    <strong>Updated at : </strong>{p2pOrderDetails?.updatedAt}
                  </div>
                  {/* <div>
                    <strong>Expiration Time: </strong> 03 Nov, 2023 01:08 am
                  </div> */}
                  {/* <div>
                    <strong>Created By:</strong>
                    BDT
                  </div> */}
                  <div>
                    <strong>Buyer : </strong>
                    {p2pOrderDetails?.buyerName}
                  </div>
                  <div>
                    <strong>Seller</strong>
                    {p2pOrderDetails?.userName}
                  </div>
                  {/* <div>
                    <strong>Assigned To: </strong>
                    N/A
                  </div> */}
                  <div>
                    <strong>Status: </strong>
                    {p2pOrderDetails?.status}
                  </div>
                  <div>
                    <strong>Status: </strong>
                    {p2pOrderDetails?.price}
                  </div>
                </div>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
              <Box>
                <div className='p2p-user-head'>Payment Info</div>

                <div className='mt-10 p2p-user'>
                  {/* <div>
                    <strong>Payment Status: </strong>
                    ADV0000000032
                  </div> */}
                  <div>
                    <strong>Payment At : </strong>{p2pOrderDetails?.paymentDetailes?.createdAt}
                  </div>
                  <div>
                    <strong>Method Name : </strong> {p2pOrderDetails?.paymentDetailes?.Name}
                  </div>
                  <div>
                    <strong>Method :</strong>
                    {p2pOrderDetails?.paymentDetailes?.Type}
                  </div>
                  <div>
                    <strong>Account Number :</strong>
                    {p2pOrderDetails?.paymentDetailes?.Account_Number}
                  </div>
                  {/* <div>
                    <strong>Payment Amount : </strong>
                    BDT
                  </div>
                  <div>
                    <strong>Price/Rate : </strong>
                    109.92 BDT
                  </div>
                  <div>
                    <strong>Order Amount : </strong>
                    109.92 BDT
                  </div>
                  <div>
                    <strong>Seller Fee : </strong>
                    0.26137 USDT
                  </div>
                  <div>
                    <strong>Buyer Amount : </strong>
                    10.16767 USDT
                  </div>
                  <div>
                    <strong>Buyer Fee : </strong>
                    1000 USDT
                  </div> */}
                </div>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default P2POrderDetails;
