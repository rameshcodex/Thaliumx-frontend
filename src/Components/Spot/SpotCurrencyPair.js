/* eslint-disable no-unused-vars, eqeqeq */
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Popover,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import ReusableTable from "../ReuseTable/ReuseTable";
import consts from "../../constant";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authprovider";
import { Close } from "@mui/icons-material";
import Axios from "../../Axios";
const drawerWidth = 260;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  "@media(max-width:767.98px)": {
    width: "95%",
  },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
const fieldStyle = {
  width: 250,
  "@media(max-width:767.98px)": {
    width: "45%",
  },
  "@media(max-width:425.98px)": {
    width: "100%",
  },
};

const SpotCurrencyPair = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("All");
  const [collections, setCollections] = useState({
    columns: [
      { Header: "Symbol", accessor: "Symbol", align: "left" },
      { Header: "Base Currency", accessor: "BaseCurrency", align: "left" },
      { Header: "Trade Currency", accessor: "TradeCurrency", align: "left" },
      { Header: "Status", accessor: "Status", align: "left" },
      { Header: "Created At", accessor: "CreatedAt", align: "left" },
      { Header: "Action", accessor: "action", align: "left" },
    ], row: []
  });
  const [network, setNetwork] = useState("all");
  const [currency, setCurrency] = useState("all");
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [modelDetail, setModelDetails] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const searchRef = useRef();

  const [search, setSearch] = useState("");
  const [searchTrack, setSearchTrack] = useState("");
  const [spotCurrencyDetail, setSpotCurrencyDetail] = useState({});

  const handleSearch = () => {
    setSearch(searchRef.current?.value)
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTrack(e.target.value);
  }

  const handleOpen = (detail) => {
    setOpen(true);
    setModelDetails(detail);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePopOverClick = (event, data) => {

    setSpotCurrencyDetail(data);
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const popOverOpen = Boolean(anchorEl);
  const id = popOverOpen ? "simple-popover" : undefined;
  const handleNetworkChange = (event) => {
    setNetwork(event.target.value);
  };
  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };
  const handleSort = (event) => {
    setPage(1);
    setSort(event.target.value);
  };

  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };


  const botModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ sm: 12 }}>
        <TextField label='Order Place Time Interval (In second)' fullWidth />
      </Grid2>
      <Grid2 item size={{ sm: 12 }}>
        <FormControl>
          <FormControlLabel control={<Switch />} label='Status' />
        </FormControl>
      </Grid2>
      <Button className='action-btn' variant='contained'>
        Save
      </Button>
    </Grid2>
  );


  const deleteModel = (
    <div className='display-1' style={{ flexDirection: "column" }}>
      <div className='text-center'>
        <h3>Are You sure?</h3>
        <p className='text-muted'>Do you really want to change this?</p>
      </div>
      <div className='display-3'>
        <Button variant='contained' className='action-btn'>
          Cancel
        </Button>
        <Button variant='contained' className='action-btn'>
          Confirm
        </Button>
      </div>
    </div>
  );

  const getPermissionList = async () => {

    try {
      const { data } = await Axios.post(`/getallownpairs?page=${page}&limit=10`, {
        Name: search,
        status: sort
      }, {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('nzanzi')}` }
      })
      if (data?.success == true && data?.result?.docs?.length > 0) {
        var dts = data?.result?.docs
        var totalCount = data?.result?.totalPages
        var formattedRows = []
        for (let i = 0; i < dts.length; i++) {
          const element = dts[i];
          var obj = {}
          obj.sno = (<div>{i + 1}</div>)
          obj.Symbol = (<div>{element?.pair_symbol ? element?.pair_symbol : "-"}</div>)
          obj.BaseCurrency = (<div>{element?.base_asset_name ? element?.base_asset_name : "-"}</div>)
          obj.TradeCurrency = (<div>{element?.market_asset_name ? element?.market_asset_name : "-"}</div>)
          obj.Status = (<div>{element?.status?.toString() ? element?.status?.toString() == "true" ? "Active" : "De-Active" : "-"}</div>)
          obj.CreatedAt = (<div>{element?.createdAt ? `${element?.createdAt?.split("T")[0]}  ${element?.createdAt?.split('T')[1]?.split(":")?.slice(0, 2)?.join(":")}` : "-"}</div>)
          obj.action = (
            <Button
              onClick={(e) => handlePopOverClick(e, dts[i])}
              variant='contained'
              className='action-btn'
            >
              Action
            </Button>
          )
          formattedRows.push(obj)
        }
        setCollections(prevState => ({
          ...prevState,
          row: formattedRows,
          pagecount: totalCount
        }));
      } else {
        setCollections(prevState => ({
          ...prevState,
          row: [],
          pagecount: 0
        }));
      }
    } catch (error) {
      console.log(error, "error")
      setCollections(prevState => ({
        ...prevState,
        row: [],
        pagecount: 0
      }));
    }
  }

  useEffect(() => {
    getPermissionList()
  }, [page, sort, search]);

  useEffect(() => {
    if (searchRef.current?.value == "") {
      setSearch("")
      setPage(1);
    }
  }, [searchTrack])

  const statusDropdown = ["All", "Active", "In Active"];

  return (
    <div className='blog'>
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
              <div className='m-10'>
                <div>
                  <h2 style={{ margin: 0 }}>Currency Pair Management</h2>
                </div>
                <div className='display-4 mt-20 wrap-field'>
                  <Box sx={fieldStyle}>
                    <div class='group'>
                      <svg viewBox='0 0 24 24' aria-hidden='true' class='icon'>
                        <g>
                          <path d='M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z'></path>
                        </g>
                      </svg>
                      <input
                        class='input2'
                        type='search'
                        placeholder='Search for Currency or Symbol'
                        ref={searchRef}
                        onChange={handleSearchChange}
                      />
                      <Button variant="contained" className="action-btn"
                        onClick={handleSearch}>
                        Search
                      </Button>
                    </div>
                  </Box>
                  {/* <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='network'>Base Currency</InputLabel>
                      <Select
                        labelId='network'
                        id='network'
                        value={network}
                        label='Base Currency'
                        size='small'
                        onChange={handleNetworkChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='currency'>Trade Currency</InputLabel>
                      <Select
                        labelId='currency'
                        id='currency'
                        value={currency}
                        label='Trade Currency'
                        size='small'
                        onChange={handleCurrencyChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </Box> */}
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='status'>Status</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        value={sort}
                        label='Status'
                        onChange={handleSort}
                        size='small'
                      >
                        {statusDropdown.map((status, index) => <MenuItem key={index} value={status}>{status}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>
                  {/* <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='status'>Bot Status</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        value={sort}
                        label='Bot Status'
                        onChange={handleSort}
                        size='small'
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"active"}>Active</MenuItem>
                        <MenuItem value={"inactive"}>In Active</MenuItem>
                      </Select>
                    </FormControl>
                  </Box> */}
                  <Button
                    variant='contained'
                    className='action-btn'
                    onClick={() =>
                      navigate(
                        `/${consts.route + auth + "/spot/create/currency-pairs"
                        }`
                      )
                    }
                  >
                    Create
                  </Button>
                </div>
              </div>
              <ReusableTable
                collections={collections}
                paginationChange={paginationChange}
                page={page}
              />
            </Grid2>
          </Grid2>
        </Box>
        <Popover
          id={id}
          open={popOverOpen}
          anchorEl={anchorEl}
          onClose={handlePopOverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box
            component={"div"}
            className='display-1 p-10'
            flexDirection={"column"}
          >
            <Button
              className='action-btn'
              sx={{ width: "150px" }}
              onClick={() =>
                navigate(

                  `/${consts.route + auth + "/spot/create/currency-pairs"}`,
                  { state: { spotCurrencyDetail } }
                )
              }
            >
              Edit
            </Button>
            <Button
              className='action-btn'
              sx={{ width: "200px" }}
              onClick={() => handleOpen(0)}
            >
              System Trading Bots
            </Button>
            <Button
              className='action-btn'
              sx={{ width: "150px" }}
              onClick={() => handleOpen(1)}
            >
              Close
            </Button>
          </Box>
        </Popover>

        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <div className='display-2 mb-10'>
              <h3>{modelDetail === 0 ? "System Bot Settings" : ""}</h3>
              <Close onClick={handleClose} className='cursor' />
            </div>
            {modelDetail === 0 ? botModel : deleteModel}
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default SpotCurrencyPair;
