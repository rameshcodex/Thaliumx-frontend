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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const drawerWidth = 260;
const CreateCurrencyPair = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate();

  const [buysell, setBuySell] = useState(0);

  const handleChangeTradeBuySell = (event) => {
    setBuySell(event.target.value);
  };

  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    console.log(reader, "result of file");

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

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
                <h2>Currency Pair Create</h2>
              </div>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2}>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Collateral Type</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={buysell}
                    label='Collateral Type'
                    onChange={handleChangeTradeBuySell}
                  >
                    <MenuItem value={0}>USDT</MenuItem>
                    <MenuItem value={1}>USDT</MenuItem>
                    <MenuItem value={2}>USDT</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Base Currency </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={buysell}
                    label='Base Currency '
                    onChange={handleChangeTradeBuySell}
                  >
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={1}>USDT</MenuItem>
                    <MenuItem value={2}>USDT</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Trade Currency</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={buysell}
                    label='Trade Currency'
                    onChange={handleChangeTradeBuySell}
                  >
                    <MenuItem value={0}>All</MenuItem>
                    <MenuItem value={1}>USDT</MenuItem>
                    <MenuItem value={2}>USDT</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Base Currency Decimal'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Trade Currency Decimal'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Cap Ratio (Percentage)'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Floor Ratio (Percentage) '
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Maker Fee (Percentage)'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Taker Fee (Percentage)'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Minimum Amount'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Maximum Amount'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Minimum Price (Percentage)'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Maximum Price (Percentage) '
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Market Order Price Max Slippage (Percentage) '
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Minimum Stop Price (Percentage)'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Maximum Stop Price (Percentage)'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='MMaximum Open Order'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Max Leverage'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <FormControlLabel control={<Switch />} label="Is Default" />
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <FormControlLabel control={<Switch />} label="Status" />
            </Grid2>
          </Grid2>
          <div className='display-1 mt-20'>
            <Button variant='contained' color='primary' type='submit' className="action-btn">
              Save
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default CreateCurrencyPair;
