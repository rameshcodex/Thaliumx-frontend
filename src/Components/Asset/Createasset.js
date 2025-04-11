/* eslint-disable no-unused-vars, eqeqeq */
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
const Createasset = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate();

  const [buysell, setBuySell] = useState("Type");


  const handleChangeTradeBuySell = (event) => {
    setSelectedValues(event.target.value);
  };

  const [imageUrl, setImageUrl] = useState(null);

  const [networks, setNetworks] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  // const FILE_SIZE = 2 * 1024 * 1024;
  // const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp'];

  const location = useLocation();
  const { assetDetails } = location.state || {};

  const schema = yup.object().shape({
    image: yup.mixed().required('Image is required').test('fileExists', 'Image is required', value => {
      return !assetDetails?.image ? value && value.length > 0 : true;
    }),
    min_withdraw: yup.number().typeError("Enter a valid number").required("Minimum Withdrawal is required"),
    max_withdraw: yup.number().typeError("Enter a valid number").required("Maximum Withdrawal is required"),
    assetname: yup.string().required("Asset Name is required"),
    symbol: yup.string().matches(/[A-Z\s]+/, "Enter in Upper case").required("Symbol is required"),
    type: yup.string().required(" Type is required"),
    min_deposit: yup.number().typeError("Enter a valid number").required(" Type is required"),
    status: yup.boolean(),
    DepositStatus: yup.boolean(),
    WithdrawStatus: yup.boolean(),
  })

  const { register, handleSubmit, watch, formState: { errors } } = useForm({ resolver: yupResolver(schema) })

  const fileWatch = watch('image');

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
          setImageUrl(data.result)
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

  const getAllNetworks = async () => {
    try {
      const { data } = await Axios.get(
        `/admin/getallnetworks`,
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data?.success == true) {
        setNetworks(data.result)
      } else {
        setNetworks([]);
      }
    } catch (error) {
      setNetworks([]);
      console.log(error);
    }
  }

  useEffect(() => {
    getAllNetworks();

  }, [])

  const createOwnAsset = async (details) => {
    try {
      const { data } = await Axios.post(`/admin/createownasset`,
        details,
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data.success) {
        toast.success("Asset Created Successfully");
        navigate(-1);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  const updateOwnAsset = async (details) => {
    try {
      const { data } = await Axios.post(`/admin/updateownasset`,
        details,
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data.success) {
        toast.success("Asset Updated Successfully");
        navigate(-1);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const onSubmit = (details) => {
    const selected = selectedValues.map(sym => {
      const item = networks.find(obj => obj.Network_symbol === sym);
      return item ? { Network_id: item._id } : null;
    });
    console.log(details)
    if (!assetDetails) {
      createOwnAsset({
        ...details,
        type: details.type.toLowerCase(),
        Network_ids: selected,
        image: imageUrl ? imageUrl : assetDetails.image
      })
    } else {
      updateOwnAsset({
        ...details,
        type: details.type.toLowerCase() != 'type' ? details.type.toLowerCase() : assetDetails?.type,
        Network_ids: selectedValues.length > 0 ? selected : assetDetails?.Network_ids.map(id => ({ Network_id: id.Network_id })),
        image: imageUrl ? imageUrl : assetDetails.image,
        assetId: assetDetails?._id
      })
    }

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
                <h2>Create asset or update asset</h2>
              </div>
            </Grid2>
          </Grid2>
          <Grid2 item size={{ xs: 12, md: 6, lg: 6 }}>
            <FormHelperText error={errors.image}>{errors.image?.message}</FormHelperText>
            <div className="upload">
              <div className="img">
                <img
                  src={
                    imageUrl || assetDetails?.image || logo
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
                <input type="file" {...register('image')} onChange={(e) => handleImageUpload(e)} />

              </div>
            </div>
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
              {/* <Grid2 item size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      width: "500px",
                      "@media (max-width: 600px)": {
                        width: "90%",
                      },
                    }}
                    className='mt-20'
                  >
                    <FormControl fullWidth>
                      <InputLabel>Network Type</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={buysell}
                        label='Network Type'
                        onChange={handleChangeTradeBuySell}
                      >
                        {" "}
                        <MenuItem value={0}>Network Type</MenuItem>

                      </Select>
                    </FormControl>
                  </Box>
                </Grid2>{" "} */}

              <Grid2 item size={{ xs: 12, md: 6 }}>
                {/* <Box
                  sx={{
                    width: "500px",
                    "@media (max-width: 600px)": {
                      width: "90%",
                    },
                  }}
                  className='mt-20'
                > */}
                <FormControl fullWidth>
                  <InputLabel id='demo-multiple-checkbox-label'>
                    Select Network Type
                  </InputLabel>
                  <Select
                    labelId='demo-multiple-checkbox-label'
                    id='demo-multiple-checkbox'
                    multiple
                    label='Select Network Type'
                    defaultValue={assetDetails ? assetDetails?.symbol_details.map(net => net.Network_symbol) : selectedValues}
                    // {...register('min_withdraw')}
                    // error={errors.networks}
                    // helperText={errors.networks?.message}
                    onChange={handleChangeTradeBuySell}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {
                      networks?.map((itm, i) => {
                        return (
                          <MenuItem value={itm.Network_symbol} key={i}>
                            <Checkbox
                              checked={selectedValues.indexOf(itm) > -1}
                              sx={{ display: "none" }}
                            />
                            <ListItemText primary={itm.Network_symbol} />
                          </MenuItem>
                        )
                      })
                    }

                  </Select>
                </FormControl>
                {/* </Box> */}
              </Grid2>
              {/* <Grid2 item size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      width: "500px",
                      "@media (max-width: 600px)": {
                        width: "90%",
                      },
                    }}
                    className='mt-20'
                  >
                    <FormControl fullWidth>
                      <InputLabel>Curency</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={buysell}
                        label='Curency'
                        onChange={handleChangeTradeBuySell}
                      >
                        {" "}
                        <MenuItem value={0}>Currency</MenuItem>
                        <MenuItem value={10}>Bitcoin</MenuItem>
                        <MenuItem value={20}>ETH</MenuItem>
                        <MenuItem value={30}>TEST</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid2> */}
              {/* <Grid2 item size={{ xs: 12, md: 6 }}>
                  <div className='add-suer-input'>
                    <TextField
                      id='outlined-basic'
                      label='Maximum Withdrawal'
                      variant='outlined'
                      sx={{
                        width: "500px",
                        "@media (max-width: 600px)": {
                          width: "90%",
                        },
                        input: { padding: "13px" },
                        label: { top: "-3px" },
                      }}
                    />
                  </div>
                </Grid2> */}
              <Grid2 item size={{ xs: 12, md: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Minimum Withdrawal'
                    variant='outlined'
                    fullWidth
                    defaultValue={assetDetails?.min_withdraw}
                    {...register('min_withdraw')}
                    error={errors.min_withdraw}
                    helperText={errors.min_withdraw?.message}
                  // sx={{
                  //   width: "500px",
                  //   "@media (max-width: 600px)": {
                  //     width: "90%",
                  //   },
                  //   input: { padding: "13px" },
                  //   label: { top: "-3px" },
                  // }}
                  />
                </div>
              </Grid2>

              <Grid2 item size={{ xs: 12, md: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Maximum Withdrawal'
                    variant='outlined'
                    fullWidth
                    defaultValue={assetDetails?.max_withdraw}
                    {...register('max_withdraw')}
                    error={errors.max_withdraw}
                    helperText={errors.max_withdraw?.message}
                  // sx={{
                  //   width: "500px",
                  //   "@media (max-width: 600px)": {
                  //     width: "90%",
                  //   },
                  //   input: { padding: "13px" },
                  //   label: { top: "-3px" },
                  // }}
                  />
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Minimum Deposit'
                    variant='outlined'
                    fullWidth
                    defaultValue={assetDetails?.min_deposit}
                    {...register('min_deposit')}
                    error={errors.min_deposit}
                    helperText={errors.min_deposit?.message}
                  // sx={{
                  //   width: "500px",
                  //   "@media (max-width: 600px)": {
                  //     width: "90%",
                  //   },
                  //   input: { padding: "13px" },
                  //   label: { top: "-3px" },
                  // }}
                  />
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6 }}>
                <div className='add-suer-input'>
                  <TextField
                    id='outlined-basic'
                    label='Asset Name'
                    variant='outlined'
                    fullWidth
                    defaultValue={assetDetails?.assetname}
                    {...register('assetname')}
                    error={errors.assetname}
                    helperText={errors.assetname?.message}
                  // sx={{
                  //   width: "500px",
                  //   "@media (max-width: 600px)": {
                  //     width: "90%",
                  //   },
                  //   input: { padding: "13px" },
                  //   label: { top: "-3px" },
                  // }}
                  />
                </div>
              </Grid2>
              <Grid2 item size={{ xs: 12, md: 6 }}>
                <Box
                // sx={{
                //   width: "500px",
                //   "@media (max-width: 600px)": {
                //     width: "90%",
                //   },
                // }}
                >
                  <FormControl fullWidth>
                    <InputLabel>Coin Type</InputLabel>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      defaultValue={assetDetails?.type == 'coin' ? 'Coin' : assetDetails?.type == 'token' ? 'Token' : "Type"}
                      label='Coin Type'
                      {...register('type')}
                      error={errors?.type}
                      helperText={errors?.type?.message}
                      onChange={(e) => setBuySell(e.target.value)}
                    >
                      {typeDropdown.map((item, ind) => <MenuItem key={ind} value={item}>{item}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Box>
              </Grid2>
              {/* <Grid2 item size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      width: "500px",
                      "@media (max-width: 600px)": {
                        width: "90%",
                      },
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel>Withdrawal Fee Type</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={buysell}
                        label='Withdrawal Fee Type'
                        onChange={handleChangeTradeBuySell}
                      >
                        <MenuItem value={0}>Type</MenuItem>
                        <MenuItem value={10}>Fixed</MenuItem>
                        <MenuItem value={20}>Percentage</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid2> */}
              <Grid2 item size={{ xs: 12, md: 6 }}>
                <div>
                  <TextField
                    id='outlined-basic'
                    label='Symbol'
                    variant='outlined'
                    fullWidth
                    defaultValue={assetDetails?.symbol}
                    {...register('symbol')}
                    error={errors.symbol}
                    helperText={errors.symbol?.message}
                  // sx={{
                  //   width: "500px",
                  //   "@media (max-width: 600px)": {
                  //     width: "90%",
                  //   },
                  //   input: { padding: "13px" },
                  //   label: { top: "-3px" },
                  // }}
                  />
                </div>
              </Grid2>

              {/* <Grid2 item size={{ xs: 12, md: 6 }}>
                  <div>
                    <TextField
                      id='outlined-basic'
                      label='Daily Withdrawal Limit'
                      variant='outlined'
                      sx={{
                        width: "500px",
                        "@media (max-width: 600px)": {
                          width: "90%",
                        },
                        input: { padding: "13px" },
                        label: { top: "-3px" },
                      }}
                    />
                  </div>
                </Grid2> */}
              <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                // sx={{
                //   width: "500px",
                //   "@media (max-width: 600px)": {
                //     width: "90%",
                //   },
                // }}
                >
                  <FormControlLabel control={<Switch
                    defaultChecked={assetDetails?.status}
                    {...register('status')}
                  />} label='Status' />
                </Box>
              </Grid2>


              <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                // sx={{
                //   width: "500px",
                //   "@media (max-width: 600px)": {
                //     width: "90%",
                //   },
                // }}
                >
                  <FormControlLabel
                    control={<Switch
                      defaultChecked={assetDetails?.DepositStatus}
                      {...register('DepositStatus')}
                    />}
                    label='Deposit Status'
                  />
                </Box>
              </Grid2>
              <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                // sx={{
                //   width: "500px",
                //   "@media (max-width: 600px)": {
                //     width: "90%",
                //   },
                // }}
                >
                  <FormControlLabel
                    control={<Switch
                      defaultChecked={assetDetails?.WithdrawStatus}
                      {...register('WithdrawStatus')}
                    />}
                    label='Withdrawal Status'
                  />
                </Box>
              </Grid2>
              {/* <Grid2 item size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box
                    sx={{
                      width: "500px",
                      "@media (max-width: 600px)": {
                        width: "90%",
                      },
                    }}
                  >
                    <FormControlLabel
                      control={<Switch />}
                      label='Approval For Withdrawal Enable/Disable'
                    />
                  </Box>
                </Grid2>
                <Grid2 item size={{ xs: 12, md: 6 }}>
                  <div>
                    <TextField
                      id='outlined-basic'
                      label='Maximum Auto Approved Amount'
                      variant='outlined'
                      sx={{
                        width: "500px",
                        "@media (max-width: 600px)": {
                          width: "90%",
                        },
                        input: { padding: "13px" },
                        label: { top: "-3px" },
                      }}
                    />
                  </div>
                </Grid2> */}
            </Grid2>
            <div className='display-1 mt-20'>
              <Button variant='contained' color='primary' type='submit'>
                {assetDetails ? "Update" : "Create"}
              </Button>
            </div>
          </form>

        </Box>
      </Box>
    </div >
  );
};

export default Createasset;
