import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid2,
  InputLabel,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useMediaQuery from "@mui/material/useMediaQuery";
const drawerWidth = 260;
const P2PSettings = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate();

  const [buysell, setBuySell] = useState(10);

  const handleChangeTradeBuySell = (event) => {
    setBuySell(event.target.value);
  };

  const [imageUrl, setImageUrl] = useState(null);

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
                <h2>Crypto Currency P2P Settings</h2>
              </div>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2}>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Min Adv Amount'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Max Adv Amount'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Buyer Fee (Percentage)'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Seller Fee (Percentage)'
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
