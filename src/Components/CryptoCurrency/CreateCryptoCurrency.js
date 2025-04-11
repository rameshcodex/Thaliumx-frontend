
/* eslint-disable no-unused-vars, eqeqeq */
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
import "./CryptoCurency.css";
const drawerWidth = 260;
const CreateCryptoCurrency = () => {
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
                <h2>Crypto Currency Create</h2>
              </div>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2}>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Name'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Code'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Symbol'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Withdrawal fee type</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={buysell}
                    label='Withdrawal fee type'
                    onChange={handleChangeTradeBuySell}
                  >
                    <MenuItem value={0}>Type</MenuItem>
                    <MenuItem value={10}>Percentage</MenuItem>
                    <MenuItem value={20}>Fixed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div>
                <TextField
                  id='outlined-basic'
                  label='(Internal) Withdrawal Fee'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div>
                <TextField
                  id='outlined-basic'
                  label='Minimum Withdrawal'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div>
                <TextField
                  id='outlined-basic'
                  label='Maximum Withdrawal'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div>
                <TextField
                  id='outlined-basic'
                  label='Minimum Convert/ Sell Crypto'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div>
                <TextField
                  id='outlined-basic'
                  label='Maximum Convert/ Sell Crypto '
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Convert fee type</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={buysell}
                    label='Covert fee type'
                    onChange={handleChangeTradeBuySell}
                  >
                    <MenuItem value={0}>Type</MenuItem>
                    <MenuItem value={10}>Percentage</MenuItem>
                    <MenuItem value={20}>Fixed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div>
                <TextField
                  id='outlined-basic'
                  label='Convert Fee'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Buy Crypto fee type</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={buysell}
                    label='Buy Crypto fee type'
                    onChange={handleChangeTradeBuySell}
                  >
                    <MenuItem value={0}>Type</MenuItem>
                    <MenuItem value={10}>Percentage</MenuItem>
                    <MenuItem value={20}>Fixed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div>
                <TextField
                  id='outlined-basic'
                  label='Buy Crypto Fee'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Gift Card Send Fee Type</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={buysell}
                    label='Gift Card Send Fee Type'
                    onChange={handleChangeTradeBuySell}
                  >
                    <MenuItem value={0}>Type</MenuItem>
                    <MenuItem value={10}>Percentage</MenuItem>
                    <MenuItem value={20}>Fixed</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div>
                <TextField
                  id='outlined-basic'
                  label='Gift Card Send Fee'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div>
                <TextField
                  id='outlined-basic'
                  label='Minimum Gift Card Amount'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
              <TextField
                id='outlined-basic'
                label='Maximum Gift Card Amount'
                variant='outlined'
                fullWidth
              />
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label='Sync Rate' />
              </FormGroup>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6 }}>
              <div>
                <TextField
                  id='outlined-basic'
                  label='USD rate'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
          </Grid2>
          <Grid2 container spacing={2} sx={{ marginTop: "10px" }}>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <FormControlLabel control={<Switch />} label='Status' />
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <FormControlLabel
                control={<Switch />}
                label='Deposit Enable/Disable'
              />
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <FormControlLabel
                control={<Switch />}
                label='Withdrawal Enable/Disable'
              />
            </Grid2>{" "}
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <FormControlLabel
                control={<Switch />}
                label='Convert Enable/Disable'
              />
            </Grid2>{" "}
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <FormControlLabel
                control={<Switch />}
                label='Buy Crypto Enable/Disable'
              />
            </Grid2>{" "}
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <FormControlLabel
                control={<Switch />}
                label='Sell Crypto Enable/Disable'
              />
            </Grid2>{" "}
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <FormControlLabel control={<Switch />} label='Gift Card Status' />
            </Grid2>{" "}
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <FormControlLabel
                control={<Switch />}
                label='Futures Trade Status'
              />
            </Grid2>{" "}
            <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
              <FormControlLabel
                control={<Switch />}
                label='Wallet Asset Conversion Enable/Disable'
              />
            </Grid2>
          </Grid2>
          <div className='display-1 mt-20'>
            <Button variant='contained' color='primary' type='submit' className="action-btn">
              Submit
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default CreateCryptoCurrency;
