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

const CreateInvestment = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate();

  const [buysell, setBuySell] = useState(10);

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
                <h2>Create Investment Offer</h2>
              </div>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2}>
            <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Coin</InputLabel>
                  <Select labelId='coin' id='coin' label='Coin' value='USDT'>
                    <MenuItem value='USDT'>USDT</MenuItem>
                    <MenuItem value='USDT'>USDT</MenuItem>
                    <MenuItem value='USDT'>USDT</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select labelId='type' id='type' label='Type'>
                    <MenuItem value='locked'>Locked</MenuItem>
                    <MenuItem value='flexible'>Flexible</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Period (in days)'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Minimum Maturity Days'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Annual Percentage Rate (APR)'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Minimum Investment Amount'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>

            <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='Maximum Investment Amount'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
              <div className='add-suer-input'>
                <TextField
                  id='outlined-basic'
                  label='User Registration Days'
                  variant='outlined'
                  fullWidth
                />
              </div>
            </Grid2>
          </Grid2>

          <Grid2 container spacing={2}>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <FormControlLabel control={<Switch />} label='Status' />
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <FormControlLabel control={<Switch />} label='Is Default' />
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <FormControlLabel control={<Switch />} label='Phone Verification Required' />
            </Grid2>
          </Grid2>
          <div className='display-1 mt-20'>
            <Button variant='contained' color='primary' type='submit' className="action-btn">
              Create
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default CreateInvestment;
