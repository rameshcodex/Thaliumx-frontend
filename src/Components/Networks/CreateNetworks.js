import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid2,
  InputLabel,
  ListItemText,
  Switch,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { toast } from "react-hot-toast"
import Header from "../Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
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
import Axios from "../../Axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form"
import logo from "../../Images/logo placeholder.jpg"

const drawerWidth = 260;
const CreateNetworks = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate();

  const schema = yup.object().shape({
    Network_name: yup.string().required("Network Name is required"),
    Network_symbol: yup.string().matches(/[A-Z\s]+/, "Enter in Upper case").required("Network Symbol is required"),
    contractAddressUrl: yup.string().required("Contract Address Url is required"),
    withdrawFee: yup.number().typeError("Enter a valid number").required("Withdraw Fee is required"),
    withdrawMin: yup.number().typeError("Enter a valid number").required(" Minimum Withdraw is required"),
    withdrawMax: yup.number().typeError("Enter a valid number").required(" Maximum Withdraw is required"),
    depositEnable: yup.boolean(),
    withdrawEnable: yup.boolean(),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })


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


  const createNetwork = async (details) => {
    try {
      const { data } = await Axios.post(`/addnetwork`,
        details,
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data.success) {
        toast.success("Network Created Successfully");
        navigate(-1);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  

  const onSubmit = (details) => {

    console.log(details)

      createNetwork(details)
    

  }

  const typeDropdown = ["Type", "Coin", "Token"];

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
                <h2>Create Network</h2>
              </div>
            </Grid2>
          </Grid2>
          
          
          {/* <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <div className='display-1'>
                <Avatar
                  alt='Remy Sharp'
                  src={imageUrl}
                  sx={{ width: 56, height: 56 }}
                />
              </div> */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>

              <Grid2 item size={{ xs: 12, md: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Network Name'
                    variant='outlined'
                    fullWidth
                    {...register('Network_name')}
                    error={errors.Network_name}
                    helperText={errors.Network_name?.message}

                  />
                </div>
              </Grid2>

              <Grid2 item size={{ xs: 12, md: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Network Symbol'
                    variant='outlined'
                    fullWidth
                    {...register('Network_symbol')}
                    error={errors.Network_symbol}
                    helperText={errors.Network_symbol?.message}

                  />
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Withdraw Fee'
                    variant='outlined'
                    fullWidth
                    {...register('contractAddressUrl')}
                    error={errors.contractAddressUrl}
                    helperText={errors.contractAddressUrl?.message}

                  />
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Contract Address Link'
                    variant='outlined'
                    fullWidth
                    {...register('withdrawFee')}
                    error={errors.withdrawFee}
                    helperText={errors.withdrawFee?.message}

                  />
                </div>
              </Grid2>

              <Grid2 item size={{ xs: 12, md: 6 }}>
                <div>
                  <TextField
                    id='outlined-basic'
                    label='Minimum Withdraw'
                    variant='outlined'
                    fullWidth
                    {...register('withdrawMin')}
                    error={errors.withdrawMin}
                    helperText={errors.withdrawMin?.message}

                  />
                </div>
              </Grid2>
              
              
              <Grid2 item size={{ xs: 12, md: 6 }}>
                <div>
                  <TextField
                    id='outlined-basic'
                    label='Maximum Withdraw'
                    variant='outlined'
                    fullWidth
                    {...register('withdrawMax')}
                    error={errors.withdrawMax}
                    helperText={errors.withdrawMax?.message}

                  />
                </div>
              </Grid2>


              <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                >
                  <FormControlLabel control={<Switch
                    {...register('depositEnable')}
                  />} label='Deposit Enable' />
                </Box>
              </Grid2>


              <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                <Box

                >
                  <FormControlLabel
                    control={<Switch
                      {...register('withdrawEnable')}
                    />}
                    label='Withdraw Enable'
                  />
                </Box>
              </Grid2>
      

            </Grid2>
            <div className='display-1 mt-20'>
              <Button variant='contained' color='primary' type='submit'>
                Create
              </Button>
            </div>
          </form>

        </Box>
      </Box>
    </div >
  );
};

export default CreateNetworks;
