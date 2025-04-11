import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Grid2,
  Switch,
} from "@mui/material";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useMediaQuery from "@mui/material/useMediaQuery";
const drawerWidth = 260;
const P2PSettings = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate();


  return (
    <div className='Createasset'>
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
                <h2>Fiat Currency P2P Settings</h2>
              </div>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2}>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Price Floating(Percent) Min Limit'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Price Floating(Percent) Max Limit'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Min Order Limit'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Max Order Limit'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2} sx={{ marginTop: "10px" }}>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <FormControlLabel control={<Switch />} label='P2P Enable/Disable' />
            </Grid2>
          </Grid2>
          <div className='display-1 mt-20'>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className='action-btn'
            >
              Save Settings
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default P2PSettings;
