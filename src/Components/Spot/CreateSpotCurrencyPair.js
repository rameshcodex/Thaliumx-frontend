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
import d1 from "../../Images/d1.jpg"
import "./Spot.css"
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
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
const drawerWidth = 260;
const CreateSpotCurrencyPair = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const location = useLocation();
  const { spotCurrencyDetail } = location.state || {};

  const navigate = useNavigate();

  const [buysell, setBuySell] = useState(10);
  const [imgUrl, setImgUrl] = useState("");
  const [image, setImage] = useState(null);
  // const [input, setInput] = useState({
  //   base_asset_name: spotCurrencyDetail?.base_asset_name,
  //   market_asset_name: spotCurrencyDetail?.market_asset_name,
  //   pointFilter: spotCurrencyDetail?.pointFilter,
  //   minNotional: spotCurrencyDetail?.minNotional,
  //   maxNotional: spotCurrencyDetail?.maxNotional,
  //   withdraw_limit: spotCurrencyDetail?.withdraw_limit,
  //   buy_trade_commission_type: spotCurrencyDetail?.buy_trade_commission_type,
  //   sell_trade_commission_type: spotCurrencyDetail?.sell_trade_commission_type,
  //   buy_trade_commission: spotCurrencyDetail?.buy_trade_commission,
  //   sell_trade_commission: spotCurrencyDetail?.sell_trade_commission,
  //   status: spotCurrencyDetail?.status,
  // });

  const schema = yup.object().shape({
    base_asset_name: yup.string().matches(/[A-Z\s]+/, "Enter in Upper case").required("Base Asset Name is required"),
    market_asset_name: yup.string().matches(/[A-Z\s]+/, "Enter in Upper case").required("Market Asset Name is required"),
    pointFilter: yup.number().required("Poiter Filter is required"),
    minNotional: yup.number().typeError("Enter valid Number!").required("Minimum Notation is required"),
    maxNotional: yup.number().typeError("Enter valid Number!").required("Maximum Notation is required"),
    withdraw_limit: yup.number().typeError("Enter valid Number!").required("Withdrawal Limit is required"),
    buy_trade_commission_type: yup.string().required("Buy Trade Commission Type is required"),
    sell_trade_commission_type: yup.string().required("Sell Trade Commission Type is required"),
    buy_trade_commission: yup.number().typeError("Enter valid Number!").required("Buy Trade Commission is required"),
    sell_trade_commission: yup.number().typeError("Enter valid Number!").required("Sell Trade Commission is required"),
    status: yup.boolean()
  })


  // const handleInputChange = (e) => {

  //   setInput(prev => ({
  //     ...prev,
  //     [e.target.name]: e.target.value
  //   }))
  // }

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

  const handleChangeTradeBuySell = (event) => {
    setBuySell(event.target.value);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      // const reader = new FileReader();
      // reader.onloadend = ()=>{
      //   setImage(reader.result);
      // }
      // reader.readAsDataURL(file);
      formData.append("image", file);
      try {
        const { data } = await Axios.post(
          `/users/imageUpload`, formData,
          {
            headers: {
              Authorization: localStorage.getItem("nzanzi"),
              "Content-Type": "multipart/form-data"
            },
          }
        )
        if (data.success) {
          setImgUrl(data.result)
        }
        else {
          toast.error("Failed to upload Image");
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to upload Image");
      }
    }
  };
  console.log(imgUrl)
  const updatePair = async (details) => {
    try {
      const { data } = await Axios.post(
        `/edittradepair`, { id: spotCurrencyDetail?._id, updateData: { ...details, type: "SPOT", icon: imgUrl || spotCurrencyDetail?.icon } },
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),

          },
        }
      );
      if (data?.success == true) {
        toast.success("Successfully updated currency Pair.");
        navigate(-1);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    }
  }

  const CreatePair = async (details) => {
    try {
      const { data } = await Axios.post(
        `/addtradepair`, { ...details, type: "SPOT", icon: imgUrl != "" && imgUrl },
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data?.success == true) {
        toast.success("Successfully updated currency Pair.");
        navigate(-1);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error.status == 400) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Something went wrong.");
        console.log(error);
      }
    }
  }

  const onSubmit = (data) => {
    // e.preventDefault();
    console.log(data)
    if (spotCurrencyDetail) {
      updatePair(data);
    } else {
      CreatePair(data);
    }
  }


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
                  onClick={() => {
                    ;
                    navigate(-1);
                  }}
                />
                <h2>Currency Pair Create</h2>
              </div>
            </Grid2>
          </Grid2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Base Asset Name'
                    variant='outlined'
                    // required
                    fullWidth
                    {...register('base_asset_name')}
                    error={errors.base_asset_name}
                    helperText={errors.base_asset_name?.message}
                    name="base_asset_name"
                    defaultValue={spotCurrencyDetail && spotCurrencyDetail?.base_asset_name}
                  // onChange={handleInputChange}
                  />
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Market Asset Name'
                    variant='outlined'
                    fullWidth
                    // onChange={handleInputChange}
                    name="market_asset_name"
                    {...register("market_asset_name")}
                    error={errors.market_asset_name}
                    helperText={errors.market_asset_name?.message}
                    defaultValue={spotCurrencyDetail && spotCurrencyDetail?.market_asset_name}
                  />
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Point Filter'
                    variant='outlined'
                    fullWidth
                    // onChange={handleInputChange}
                    {...register('pointFilter')}
                    error={errors.pointFilter}
                    helperText={errors.pointFilter?.message}
                    name="pointFilter"
                    defaultValue={spotCurrencyDetail && spotCurrencyDetail?.pointFilter}
                  />
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Minimum Notation'
                    variant='outlined'
                    fullWidth
                    // onChange={handleInputChange}
                    {...register('minNotional')}
                    error={errors.minNotional}
                    helperText={errors.minNotional?.message}
                    name="minNotional"
                    defaultValue={spotCurrencyDetail && spotCurrencyDetail?.minNotional}
                  />
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Maximum Notation'
                    variant='outlined'
                    fullWidth
                    // onChange={handleInputChange}
                    {...register('maxNotional')}
                    error={errors.maxNotional}
                    helperText={errors.maxNotional?.message}
                    name="maxNotional"
                    defaultValue={spotCurrencyDetail && spotCurrencyDetail?.maxNotional}
                  />
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Withdrawal Limit'
                    variant='outlined'
                    fullWidth
                    // onChange={handleInputChange}
                    {...register('withdraw_limit')}
                    error={errors.withdraw_limit}
                    helperText={errors.withdraw_limit?.message}
                    name="withdraw_limit"
                    defaultValue={spotCurrencyDetail && spotCurrencyDetail?.withdraw_limit}
                  />
                </div>
              </Grid2>

              <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Buy Trade Commission Type'
                    variant='outlined'
                    fullWidth
                    // onChange={handleInputChange}
                    {...register('buy_trade_commission_type')}
                    error={errors.buy_trade_commission_type}
                    helperText={errors.buy_trade_commission_type?.message}
                    name="buy_trade_commission_type"
                    defaultValue={spotCurrencyDetail && spotCurrencyDetail?.buy_trade_commission_type}
                  />
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Sell Trade Commission Type'
                    variant='outlined'
                    fullWidth
                    // onChange={handleInputChange}
                    {...register('sell_trade_commission_type')}
                    error={errors.sell_trade_commission_type}
                    helperText={errors.sell_trade_commission_type?.message}
                    name="sell_trade_commission_type"
                    defaultValue={spotCurrencyDetail && spotCurrencyDetail?.sell_trade_commission_type}
                  />
                </div>
              </Grid2>

              <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Buy Trade Commission'
                    variant='outlined'
                    fullWidth
                    // onChange={handleInputChange}
                    {...register('buy_trade_commission')}
                    error={errors.buy_trade_commission}
                    helperText={errors.buy_trade_commission?.message}
                    name="buy_trade_commission"
                    defaultValue={spotCurrencyDetail && spotCurrencyDetail?.buy_trade_commission}
                  />
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Sell Trade Commission'
                    variant='outlined'
                    fullWidth
                    // onChange={handleInputChange}
                    {...register('sell_trade_commission')}
                    error={errors.sell_trade_commission}
                    helperText={errors.sell_trade_commission?.message}
                    name="sell_trade_commission"
                    defaultValue={spotCurrencyDetail && spotCurrencyDetail?.sell_trade_commission}
                  />
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
                <div className="upload">
                  <div className="img">
                    <img
                      src={

                        imgUrl != "" && imgUrl || spotCurrencyDetail?.icon && spotCurrencyDetail?.icon || d1
                      }
                      alt="img"
                    />
                  </div>
                  <div className="upimg">
                    <svg
                      width="83"
                      height="137"
                      viewBox="0 0 83 137"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M39.1685 19.2212L13.8332 51.7062C12.9007 52.7942 11.5018 52.9497 10.5692 52.1725C9.48119 51.3953 9.32575 49.841 10.1029 48.9085L39.4793 11.1388C39.9456 10.5171 40.7228 10.0508 41.4999 10.0508C42.2771 10.0508 43.0542 10.5171 43.5205 11.1388L72.8969 48.9085C73.6741 49.841 73.5186 51.3953 72.4306 52.1725C71.498 52.9497 70.0992 52.7942 69.1666 51.7062L43.8314 19.2212V133.774C43.8314 135.017 42.7434 136.105 41.4999 136.105C40.2565 136.105 39.1685 135.017 39.1685 133.774V19.2212Z"
                        fill="black"
                      />
                      <path
                        d="M2.33146 5.05062C1.08801 5.05062 0 3.9626 0 2.71916C0 1.47571 1.08801 0.387695 2.33146 0.387695H80.6685C81.912 0.387695 83 1.47571 83 2.71916C83 3.9626 81.912 5.05062 80.6685 5.05062H2.33146Z"
                        fill="black"
                      />
                    </svg>
                    <input type="file" onChange={(e) => handleImageUpload(e)} />
                    {/*<img
                      src={spotCurrencyDetail?.icon ? spotCurrencyDetail?.icon : d1}
                      alt="img"
                    />*/}
                  </div>
                </div>
                {/* <div className='add-suer-input'>
                <InputLabel id="icon">Upload Icon</InputLabel>
                <TextField
                  id='outlined-basic'
                  // label='Upload Icon'
                  variant='outlined'
                  fullWidth
                  type="file"
                  onChange={handleInputChange}
                  name="icon"
                />
              </div> */}
              </Grid2>
            </Grid2>
            <Grid2 container spacing={2}>
              <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
                <FormControlLabel control={<Switch
                  defaultChecked={spotCurrencyDetail ? spotCurrencyDetail?.status : false}
                  // onChange={handleInputChange}
                  {...register('status')}
                />}
                  name="status"

                  label='Status' />
              </Grid2>



              {/* <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <FormControlLabel control={<Switch />} label='Is Default' />
            </Grid2>
            <Grid2 item size={{ xs: 12, md: 6, lg: 4 }}>
              <FormControlLabel control={<Switch />} label='Is Highlight' />
            </Grid2> */}
            </Grid2>
            <div className='display-1 mt-20'>
              <Button variant='contained' color='primary'
                type='submit' className="action-btn"
              >
                {spotCurrencyDetail ? "Update" : "Create"}
              </Button>
            </div>
          </form>

        </Box>
      </Box>
    </div>
  );
};

export default CreateSpotCurrencyPair;
