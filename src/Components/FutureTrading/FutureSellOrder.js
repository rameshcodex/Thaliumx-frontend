/* eslint-disable no-unused-vars, eqeqeq */
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Popover,
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
import { Close } from "@mui/icons-material";
import Axios from "../../Axios";
const drawerWidth = 260;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
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

const FutureSellOrder = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modelDetail, setModelDetails] = useState("");

  const [open, setOpen] = useState(false);
  const [futureSellOrders, setFutureSellOrders] = useState({});
  const [selectedData, setSelectedData] = useState({});
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("Newest First");
  const [search, setSearch] = useState("");
  const [searchTrack, setSearchTrack] = useState("");
  const [status, setStatus] = useState(0);

  const searchRef = useRef();

  const handleOpen = (detail) => {
    setOpen(true);
    setModelDetails(detail);
  };
  const handleClose = () => {
    setOpen(false);
    setModelDetails("");

  };
  const handlePopOverClick = (event, no) => {
    setSelectedData(futureSellOrders?.docs[no])
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = () => {
    setSearch(searchRef.current?.value)
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTrack(e.target.value);
  }

  const popOverOpen = Boolean(anchorEl);
  const id = popOverOpen ? "simple-popover" : undefined;
  const handleChange = (event, newValue) => {
    setStatus(newValue);
    setValue(newValue);
  };

  const handleCryptoChange = (event) => {
    setPage(1);
    setSort(event.target.value);
  };
  const handleWalletTypeChange = (event) => {
    setPage(1);
    setType(event.target.value);
  };

  const [page, setPage] = useState(1);
  const detailsModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Sell Order Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Order Id : </strong>
              {selectedData?.orderId}
            </div>
            <div>
              <strong>Code : </strong>
              {selectedData?.symbol}
            </div>
            {/* <div>
              <strong>Buyer : </strong>
              system-bot
            </div> */}
            <div>
              <strong>Created at : </strong>{selectedData?.createdAt}
            </div>
            <div>
              <strong>Updated at : </strong> {selectedData?.updatedAt}
            </div>
            <div>
              <strong>Order Type : </strong>
              <span className='badge'>{selectedData?.type}</span>
            </div>
            <div>
              <strong>Status : </strong>
              <span className='badge'>{selectedData?.status}</span>
            </div>
            {/* <div>
              <strong> Margin Mode : </strong> Cross
            </div> */}
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Amount Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Price : </strong>
              {selectedData?.price}
            </div>
            <div>
              <strong>Quantity : </strong>
              {selectedData?.quantity}
            </div>
            <div>
              <strong>Volume : </strong>
              {selectedData?.price * selectedData?.quantity}
            </div>
            {/* <div>
              <strong>Amount : </strong>
              8.19398998 ETH
            </div>
            <div>
              <strong>Total Price : </strong>14986.64 USDT
            </div>
            <div>
              <strong>Processed Amount : </strong> 2.53872955 ETH
            </div>
            <div>
              <strong>Pending Amount : </strong>5.65526043 ETH
            </div>
            <div>
              <strong>Stop Price : </strong>N/A
            </div>{" "}
            <div>
              <strong>Is Reduce Only :</strong>N/A
            </div>{" "}
            <div>
              <strong>Take Profit Price : </strong>N/A
            </div>{" "}
            <div>
              <strong>Stop Loss Pricec:</strong>N/A
            </div> */}
          </div>
        </Box>
      </Grid2>
    </Grid2>
  );
  const securityModel = (
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
  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  const getFutureSellOrders = async () => {
    try {
      const { data } = await Axios.post(
        `/admin/getfutureorders?limit=10&page=${page}&order=${sort === "Newest First" ? -1 : 1}`,
        {
          type: type, search: search,
          status: status == 0 ? "All" : "NEW",
          side: 'SELL'
        },
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data?.success == true) {
        setFutureSellOrders(data?.result)
      } else {
        setFutureSellOrders({});
      }
    } catch (error) {
      setFutureSellOrders({});
      console.log(error);
    }
  }

  useEffect(() => {
    getFutureSellOrders();
  }, [type, page, sort, search, status])

  useEffect(() => {
    if (searchRef.current?.value == "") {
      setSearch("")
      setPage(1);
    }
  }, [searchTrack])

  const typeDropdown = ["All", "LIMIT", "MARKET"];
  const sortDropdown = ["Newest First", "Oldest First"];

  useEffect(() => {
    const formattedRow = futureSellOrders?.docs?.map((item, index) => (
      {
        ...item,
        createdAt: item.createdAt.split('T')[0],
        action: (
          <Button
            onClick={(e) => handlePopOverClick(e, index)}
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
        { Header: "ID", accessor: "orderId", align: "left" },
        { Header: "Code", accessor: "symbol", align: "left" },
        // { Header: "Seller", accessor: "Seller", align: "left" },
        { Header: "Order Type", accessor: "type", align: "left" },
        { Header: "Price", accessor: "price", align: "left" },
        { Header: "Created At", accessor: "createdAt", align: "left" },
        // { Header: "Amount", accessor: "Amount", align: "left" },
        // { Header: "Total Price", accessor: "Total_Price", align: "left" },
        { Header: "Status", accessor: "status", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: formattedRow,
      pagecount: futureSellOrders?.totalPages
    });
  }, [futureSellOrders]);

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
                <h2 style={{ margin: 0 }}>Futures Sell Order Lists</h2>
              </div>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab label='All' {...a11yProps(0)} className='tab-title' />
                  <Tab label='Open' {...a11yProps(1)} className='tab-title' />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className='display-4 mt-20 warp-field'>
                  {/* <Box sx={fieldStyle}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label='Hide Bot Trade'
                    />
                  </Box> */}
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
                  {/* <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='wallet'>Symbols</InputLabel>
                      <Select
                        labelId='wallet'
                        id='wallet'
                        value={walletType}
                        label='Symbols'
                        size='small'
                        onChange={handleWalletTypeChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </Box> */}
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='wallet'>Order Limit Type</InputLabel>
                      <Select
                        labelId='wallet'
                        id='wallet'
                        value={type}
                        label='Order Limit Type'
                        size='small'
                        onChange={handleWalletTypeChange}
                      >
                        {typeDropdown.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='crypto'>Sort</InputLabel>
                      <Select
                        labelId='crypto'
                        id='crypto'
                        value={sort}
                        label='Sort'
                        size='small'
                        onChange={handleCryptoChange}
                      >
                        {sortDropdown.map((sort, index) => <MenuItem key={index} value={sort}>{sort}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div className='mt-20'>
                  <ReusableTable
                    collections={collections}
                    paginationChange={paginationChange}
                    page={page}
                  />
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className='display-4 mt-20 wrap-field'>
                  {/* <Box sx={fieldStyle}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label='Hide Bot Trade'
                    />
                  </Box> */}
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
                  {/* <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='wallet'>Symbols</InputLabel>
                      <Select
                        labelId='wallet'
                        id='wallet'
                        value={type}
                        label='Symbols'
                        size='small'
                        onChange={handleWalletTypeChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </Box> */}
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='wallet'>Order Limit Type</InputLabel>
                      <Select
                        labelId='wallet'
                        id='wallet'
                        value={type}
                        label='Order Limit Type'
                        size='small'
                        onChange={handleWalletTypeChange}
                      >
                        {typeDropdown.map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>
                  {/* <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='crypto'>Status</InputLabel>
                      <Select
                        labelId='crypto'
                        id='crypto'
                        value={type}
                        label='Status'
                        size='small'
                        onChange={handleCryptoChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </Box> */}
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='crypto'>Sort</InputLabel>
                      <Select
                        labelId='crypto'
                        id='crypto'
                        value={sort}
                        label='Sort'
                        size='small'
                        onChange={handleCryptoChange}
                      >
                        {sortDropdown.map((sort, index) => <MenuItem key={index} value={sort}>{sort}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div className='mt-20'>
                  <ReusableTable
                    collections={collections}
                    paginationChange={paginationChange}
                    page={page}
                  />
                </div>
              </CustomTabPanel>
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
              onClick={() => handleOpen(0)}
            >
              View
            </Button>
            <Button
              className='action-btn'
              sx={{ width: "150px" }}
              onClick={() => handleOpen(1)}
            >
              Cancel
            </Button>
          </Box>
        </Popover>

        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={{ ...style, width: modelDetail === 1 ? 500 : 700 }}>
            <div className='display-2 mb-10'>
              <h3>{modelDetail === 0 ? "Sell Order Details" : ""}</h3>
              <Close onClick={handleClose} className='cursor' />
            </div>
            {modelDetail === 0 ? detailsModel : securityModel}
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default FutureSellOrder;
