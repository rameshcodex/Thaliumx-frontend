import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
const drawerWidth = 260;

const P2PReportDetails = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();
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
                <h2>P2p Order Report Details</h2>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
              <Box>
                <div className='p2p-user-head'>Report Info</div>

                <div className='mt-10 p2p-user'>
                  <div>
                    <strong>Status: </strong>
                    Published
                  </div>
                  <div>
                    <strong>Created at : </strong>03 Nov, 2023 01:08 am
                  </div>
                  <div>
                    <strong>Updated at : </strong> 03 Nov, 2023 01:08 am
                  </div>
                  <div>
                    <strong>Expiration Time : </strong> 03 Nov, 2023 01:08 am
                  </div>
                  <div>
                    <strong>Created By :</strong>
                    BDT
                  </div>
                  <div>
                    <strong>Reported By :</strong>
                    tomar kaku
                  </div>
                  <div>
                    <strong>Reported Against : </strong>
                    tomar kaku
                  </div>
                  <div>
                    <strong>Reason :</strong>
                    N/A
                  </div>
                  <div>
                    <strong>Description : </strong>
                    N/A
                  </div>{" "}
                  <div>
                    <strong>Document : </strong>
                    N/A
                  </div>{" "}
                  <div>
                    <strong>Closing Statement : </strong>
                    N/A
                  </div>
                </div>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
              <Box>
                <div className='p2p-user-head'>Order Info</div>
                <div className='mt-10 p2p-user'>
                  <div>
                    <strong> Order ID: </strong>
                    ORD0000000103
                  </div>
                  <div>
                    <strong>ADV ID: </strong>
                    ADV0000000032
                  </div>
                  <div>
                    <strong>Created at : </strong>03 Nov, 2023 01:08 am
                  </div>
                  <div>
                    <strong>Updated at : </strong> 03 Nov, 2023 01:08 am
                  </div>
                  <div>
                    <strong>Expiration Time: </strong> 03 Nov, 2023 01:08 am
                  </div>
                  <div>
                    <strong>Created By:</strong>
                    BDT
                  </div>
                  <div>
                    <strong>Buyer : </strong>
                    tomar kaku
                  </div>
                  <div>
                    <strong>Seller</strong>
                    tomar kaku
                  </div>
                  <div>
                    <strong>Assigned To: </strong>
                    N/A
                  </div>
                  <div>
                    <strong>Status: </strong>
                    Published
                  </div>
                </div>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
              <Box>
                <div className='p2p-user-head'>
                  DKFT20 Wallet Info of NameP2p (Seller)
                </div>
                <div className='mt-10 p2p-user'>
                  <div>
                    <strong> Status : </strong>
                    Active
                  </div>
                  <div>
                    <strong>ADV ID: </strong>
                    ADV0000000032
                  </div>
                  <div>
                    <strong>Funding Available Balance : </strong>97.99997435
                    DKFT20
                  </div>
                  <div>
                    <strong>Funding In Order Balance : </strong> 03 Nov, 2023
                    01:08 am
                  </div>
                </div>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default P2PReportDetails;
