import React, { useState } from "react";
import { Avatar, Box, Button, Grid2 } from "@mui/material";
import { styled } from '@mui/material/styles';
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useMediaQuery from "@mui/material/useMediaQuery";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const drawerWidth = 260;
const CraetePair = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

   const navigate = useNavigate()

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

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  return (
    <div className="CraetePair">
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
            <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <div className="display-1">
              <ArrowBackIosIcon className="cursor" onClick={() => navigate(-1)} />
                <h2>Create Pair</h2>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <div className="display-1">
              <Avatar alt="Remy Sharp" src={imageUrl}   sx={{ width: 56, height: 56 }} />
              <div className="">
                <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
    >
     Upload
      <VisuallyHiddenInput
        type="file"
        onChange={handleImageUpload} 
        multiple
      />
    </Button>
              </div>
              </div>
              <div className="add-suer-input">
                <TextField
                  id="outlined-basic"
                  label="Max Withdraw"
                  variant="outlined"
                  sx={{
                    width: "500px",
                    "@media (max-width: 600px)": {
                      width: "90%",
                    },
                    input: { padding: "13px" },
                    label: { top: "-3px" },
                    marginTop: "15px",
                  }}
                />
              </div>
              <div className="add-suer-input">
                <TextField
                  id="outlined-basic"
                  label="Withdraw Commission"
                  variant="outlined"
                  sx={{
                    width: "500px",
                    "@media (max-width: 600px)": {
                      width: "90%",
                    },
                    input: { padding: "13px" },
                    label: { top: "-3px" },
                    marginTop: "15px",
                  }}
                />
              </div>
              <Box
                sx={{
                  width: "500px",
                  "@media (max-width: 600px)": {
                    width: "90%",
                  },
                }}
                className="mt-20"
              >
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={buysell}
                    //   label="Age"
                    onChange={handleChangeTradeBuySell}
                  >
                    {" "}
                    <MenuItem value={0}>Type</MenuItem>
                    <MenuItem value={10}>Coin</MenuItem>
                    <MenuItem value={20}>Token</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <div className="add-suer-input">
                <TextField
                  id="outlined-basic"
                  label="Min Withdraw"
                  variant="outlined"
                  sx={{
                    width: "500px",
                    "@media (max-width: 600px)": {
                      width: "90%",
                    },
                    input: { padding: "13px" },
                    label: { top: "-3px" },
                    marginTop: "15px",
                  }}
                />
              </div>
              <Box
                sx={{
                  width: "500px",
                  "@media (max-width: 600px)": {
                    width: "90%",
                  },
                }}
                className="mt-20"
              >
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={buysell}
                    //   label="Age"
                    onChange={handleChangeTradeBuySell}
                  >
                    {" "}
                    <MenuItem value={0}>Network Type</MenuItem>
                    <MenuItem value={10}>BNB</MenuItem>
                    <MenuItem value={20}>ETH</MenuItem>
                    <MenuItem value={30}>TEST</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <div className="display-1 mt-20">
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default CraetePair;
