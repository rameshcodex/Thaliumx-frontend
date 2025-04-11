/* eslint-disable no-unused-vars, eqeqeq */
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid2,
  InputLabel,
  Switch,
} from "@mui/material";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useMediaQuery from "@mui/material/useMediaQuery";
const drawerWidth = 260;
const FundingRate = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate();

  const [buysell, setBuySell] = useState(10);

  const handleChangeTradeBuySell = (event) => {
    setBuySell(event.target.value);
  };

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
                <h2>Currency Pair Funding Rate</h2>
              </div>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2}>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Interval (hours)'
                  variant='outlined'
                  type='number'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Interest Rate'
                  type='number'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Minimum Rate'
                  variant='outlined'
                  type='number'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Maximum Rate'
                  variant='outlined'
                  type='number'
                  fullWidth
                />
              </div>
            </Grid2>
          </Grid2>
          <div className='display-1 mt-20'>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className='action-btn'
            >
              Submit
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default FundingRate;
