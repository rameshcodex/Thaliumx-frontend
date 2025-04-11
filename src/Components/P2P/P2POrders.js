/* eslint-disable no-unused-vars, eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ReusableTable from "../ReuseTable/ReuseTable";
import { useNavigate } from "react-router-dom";
import consts from "../../constant";
import Axios from "../../Axios";

const drawerWidth = 260;
const fieldStyle = {
  width: 250,
  "@media(max-width:767.98px)": {
    width: "45%",
  },
  "@media(max-width:425.98px)": {
    width: "100%",
  },
};
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const P2POrders = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [value, setValue] = useState(0);
  const [buyStatus, setBuyStatus] = useState("All");
  const navigate = useNavigate();

  const searchRef = useRef();

  const [p2pOrders, setP2pOrders] = useState({});
  const [type, setType] = useState("All");
  const [asset, setAsset] = useState("");
  const [searchTrack, setSearchTrack] = useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBuyStatusChange = (event) => {
    setBuyStatus(event.target.value);
  };

  const handleType = (event) => {
    setType(event.target.value);
  };

  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  const handleSearch = () => {
    setAsset(searchRef.current?.value)
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTrack(e.target.value);
  }

  const getP2POrders = async () => {
    try {
      const { data } = await Axios.post(
        `/admin/getp2porders?limit=10&page=${page}`,
        { type: type, status: buyStatus, search: asset },
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data?.success == true) {
        setP2pOrders(data?.result)
      } else {
        setP2pOrders({});
      }
    } catch (error) {
      setP2pOrders({});
      console.log(error);
    }
  }

  useEffect(() => {
    getP2POrders();
  }, [type, page, buyStatus, asset])

  useEffect(() => {
    if (searchRef.current?.value == "") {
      setAsset("")
      setPage(1);
    }
  }, [searchTrack])

  const typeDropdown = ["All", "BUY", "SELL"];
  const statusDropdown = ["All", "Cancelled", "Open", "Pending"];


  useEffect(() => {
    const formattedRow = p2pOrders?.docs?.map((item, index) => (
      {
        ...item,
        createdAt: item.createdAt.split('T')[0],
        action: (
          <Button
            onClick={() => {
              navigate(`/${consts.route + "/p2p/order-details"}`,
                {
                  state: {
                    p2pOrderDetails: {
                      ...item,
                      createdAt: item.createdAt.split('T')[0],
                      updatedAt: item.updatedAt.split('T')[0],
                    }
                  }
                }
              );
            }}
            variant='contained'
            className='action-btn'
          >
            Action
          </Button>
        )
      }
    ))
    setCollections({
      columns: [
        { Header: "ID", accessor: "txId", align: "left" },
        { Header: "Asset", accessor: "asset", align: "left" },
        { Header: "Fiat", accessor: "fiat", align: "left" },
        { Header: "Buyer", accessor: "buyerName", align: "left" },
        { Header: "Seller", accessor: "userName", align: "left" },
        { Header: "Type", accessor: "type", align: "left" },
        { Header: "Order Amount", accessor: "quantity", align: "left" },
        { Header: "Payment Amount", accessor: "price", align: "left" },
        { Header: "Status", accessor: "status", align: "left" },
        { Header: "Created At", accessor: "createdAt", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: formattedRow,
      pagecount: p2pOrders?.totalPages
    });
  }, [p2pOrders]);

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
              <div className='display-2 mb-10'>
                <h2 style={{ margin: 0 }}>P2P Order List</h2>
              </div>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab label='All' {...a11yProps(0)} className='tab-title' />
                  <Tab
                    label='Disputed (Not Assigned)'
                    {...a11yProps(1)}
                    className='tab-title'
                  />
                  <Tab
                    label='Disputed (Assigned)'
                    {...a11yProps(2)}
                    className='tab-title'
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className='display-4 wrap-field'>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='status'>Status</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        value={buyStatus}
                        label='Status'
                        size='small'
                        onChange={handleBuyStatusChange}
                      >
                        {statusDropdown.map((status, statusIndex) => <MenuItem key={statusIndex} value={status}>{status}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='assets'>Type</InputLabel>
                      <Select
                        labelId='assets'
                        id='assets'
                        value={type}
                        label='Assets'
                        onChange={handleType}
                        size='small'
                      >
                        {typeDropdown.map((type, typeIndex) => <MenuItem key={typeIndex} value={type}>{type}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>
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
                        placeholder='name or address'
                        ref={searchRef}
                        onChange={handleSearchChange}
                      />
                      <Button variant="contained" className="action-btn"
                        onClick={handleSearch}>
                        Search
                      </Button>
                    </div>
                  </Box>
                </div>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className='display-4 wrap-field'>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='assets'>Type</InputLabel>
                      <Select
                        labelId='assets'
                        id='assets'
                        value={type}
                        label='Assets'
                        onChange={handleType}
                        size='small'
                      >
                        {typeDropdown.map((type, typeIndex) => <MenuItem key={typeIndex} value={type}>{type}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>
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
                        placeholder='name or address'
                      />
                      <Button variant="contained" className="action-btn"
                        onClick={handleSearch}>
                        Search
                      </Button>
                    </div>
                  </Box>
                </div>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </CustomTabPanel>{" "}
              <CustomTabPanel value={value} index={2}>
                <div className='display-4 wrap-field'>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='assets'>Type</InputLabel>
                      <Select
                        labelId='assets'
                        id='assets'
                        value={type}
                        label='Assets'
                        onChange={handleType}
                        size='small'
                      >
                        {typeDropdown.map((type, typeIndex) => <MenuItem key={typeIndex} value={type}>{type}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>
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
                        placeholder='name or address'
                      />
                      <Button variant="contained" className="action-btn"
                        onClick={handleSearch}>
                        Search
                      </Button>
                    </div>
                  </Box>
                </div>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </CustomTabPanel>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default P2POrders;
