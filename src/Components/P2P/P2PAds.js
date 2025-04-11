import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  FormControl,
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

import ReusableTable from "../ReuseTable/ReuseTable";
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

const P2PAds = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [status, setStatus] = useState("All");
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [network, setNetwork] = useState("all");
  const [currency, setCurrency] = useState("All");

  const [modelDetail, setModelDetails] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [p2pAdds, setP2PAdds] = useState({});
  const [asset, setAsset] = useState("");
  const [selectedData, setSelectedData] = useState({});
  const [searchTrack, setSearchTrack] = useState("");

  const searchRef = useRef();


  const handleOpen = (detail) => {
    setOpen(true);
    setModelDetails(detail);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePopOverClick = (event,no) => {
    setSelectedData(p2pAdds?.docs[no])
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
    setPage(1);
    setCurrency(event.target.value);
  };
  const handleStatus = (event) => {
    setPage(1);
    setStatus(event.target.value);
  };

  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };
  const detailsModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, sm: 12 }}>
        <Box>
          <div className='p2p-user-head'>Transaction Details</div>

          <div className='mt-10 p2p-user'>
            <div>
              <strong> Transaction ID: </strong>
              {selectedData?.transactionId}
            </div>
            <div>
              <strong> User Name: </strong>
              {selectedData?.userName}
            </div>
            <div>
              <strong>Created at : </strong>{selectedData?.createdAt}
            </div>
            <div>
              <strong>Updated at : </strong> {selectedData?.updatedAt}
            </div>
            <div>
              <strong>Status: </strong>
              {selectedData?.status}
            </div>
            <div>
              <strong>Asset : </strong>
              {selectedData?.fromAsset}
            </div>
            <div>
              <strong>Currency : </strong>
              {selectedData?.toAsset}
            </div>
            <div>
              <strong>Price : </strong>
              {selectedData?.price}
            </div>
            <div>
              <strong>Volume : </strong>
              {selectedData?.volume}
            </div>
            <div>
              <strong>Available Amount : </strong>
              1000 USDT
            </div>
            <div>
              <strong>Minimum Limit : </strong>
              {selectedData?.minLimit}
            </div>
            <div>
              <strong>Maximum Limit : </strong>
              {selectedData?.maxLimit}
            </div>
            {/* <div>
              <strong>Order Limit : </strong>
              1000 USDT
            </div> */}
            <div>
              <strong>In Escrow Amount : </strong>
              {selectedData?.escrowVolume}
            </div>
            <div>
              <strong>Type : </strong>
              {selectedData?.type}
            </div>
            {/* <div>
              <strong>Completed Amount : </strong>
              1000 USDT
            </div>
            <div>
              <strong>Total Ad Amount : </strong>
              1000 USDT
            </div>

            <div>
              <strong>Fee : </strong>
              1000 USDT
            </div>
            <div>
              <strong>Fee Percentage : </strong>
              1000 USDT
            </div>
            <div>
              <strong>Completed Order(s) : </strong>
              1000 USDT
            </div> */}
            <div>
              <strong>Payment Method : </strong>
              {selectedData?.payments}
            </div>
            {/* <div>
              <strong> Payment Time Limit : </strong>
              30 minutes
            </div>
            <div>
              <strong> Region(s) : </strong>
              30 minutes
            </div> */}
          </div>
        </Box>
      </Grid2>
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

  const handleSearch = () => {
    setAsset(searchRef.current?.value)
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTrack(e.target.value);
  }

console.log(selectedData)
  const getP2PAdds = async () => {
    try {
      const { data } = await Axios.post(
        `/admin/getp2padds?limit=10&page=${page}`,
        { type: currency, status: status, asset: asset},
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data?.success == true) {
        setP2PAdds(data?.result)
      } else {
        setP2PAdds({});
      }
    } catch (error) {
      setP2PAdds({});
      console.log(error);
    }
  }

  useEffect(() => {
    getP2PAdds();
  }, [currency, page, status, asset])

  useEffect(() => {
    if (searchRef.current?.value == "") {
      setAsset("")
      setPage(1);
    }
  }, [searchTrack])

  const typeDropdown = ["All", "BUY", "SELL"];
  const statusDropdown = ["All", "Cancelled", "Open"];


  useEffect(() => {
    const formattedRow = p2pAdds?.docs?.map((item,index) => ({
        ...item,
        createdAt:item.createdAt.split('T')[0],
        action: (
          <Button
            onClick={(e)=>handlePopOverClick(e,index)}
            variant='contained'
            className='action-btn'
          >
            Action
          </Button>
        ),
      }
    ))
    setCollections({
      columns: [
        { Header: "Id", accessor: "transactionId", align: "left" },
        { Header: "Type", accessor: "type", align: "left" },
        { Header: "Created At", accessor: "createdAt", align: "left" },
        { Header: "Asset/Fiat", accessor: "asset_fiat", align: "left" },
        { Header: "User", accessor: "userName", align: "left" },
        { Header: "Status", accessor: "status", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: formattedRow,

      pagecount: p2pAdds?.totalPages
    });
  }, [p2pAdds]);

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
                  <h2 style={{ margin: 0 }}>P2P Ads List</h2>
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
                        placeholder='name or address'
                        onChange={handleSearchChange}
                        ref={searchRef}
                      />
                      <Button variant="contained" className="action-btn"
                        onClick={handleSearch}>
                        Search
                      </Button>
                    </div>
                  </Box>

                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='type'>Type</InputLabel>
                      <Select
                        labelId='type'
                        id='type'
                        value={currency}
                        label='Types'
                        size='small'
                        onChange={handleCurrencyChange}
                      >
                        {typeDropdown.map((type, typeIndex) => <MenuItem key={typeIndex} value={type}>{type}</MenuItem>)}

                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='status'>Status</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        value={status}
                        label='Status'
                        onChange={handleStatus}
                        size='small'
                      >
                        {statusDropdown.map((status, statusIndex) => <MenuItem key={statusIndex} value={status}>{status}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>
                  {/* <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='assets'>Assets</InputLabel>
                      <Select
                        labelId='assets'
                        id='assets'
                        value={network}
                        label='Assets'
                        size='small'
                        onChange={handleNetworkChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </Box> */}
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
              onClick={() => handleOpen(0)}
            >
              Close
            </Button>
            <Button
              className='action-btn'
              sx={{ width: "150px" }}
              onClick={() => handleOpen(1)}
            >
              Details
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
              <h3>{modelDetail === 1 ? "Ad Details" : ""}</h3>
              <Close onClick={handleClose} className='cursor' />
            </div>
            {modelDetail === 1 ? detailsModel : deleteModel}
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default P2PAds;
