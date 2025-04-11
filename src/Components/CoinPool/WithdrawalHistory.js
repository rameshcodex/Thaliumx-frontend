import React, { useEffect, useState } from "react";
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

import "./CoinPool.css";
import ReusableTable from "../ReuseTable/ReuseTable";
import { Close } from "@mui/icons-material";
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
  width: 150,
  "@media(max-width:767.98px)": {
    width: "45%",
  },
  "@media(max-width:425.98px)": {
    width: "100%",
  },
};
const WithdrawalHistory = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("all");
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [status, setStatus] = useState("all");
  const [modelDetail , setModelDetails] = useState("")

  const [open, setOpen] = useState(false);

  const handleOpen = (detail) => {
    setOpen(true);
    setModelDetails(detail)
  };
  const handleClose = () => {
    setOpen(false);
    setModelDetails('')
  };
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopOverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const popOverOpen = Boolean(anchorEl);
  const id = popOverOpen ? "simple-popover" : undefined;
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };
  const detailsModel = (
    <Grid2 container spacing={2} sx={{ height: 500, overflowY: "scroll" }}>
      <Grid2 container spacing={2}>
        <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box>
            <div className='p2p-user-head'> Withdrawal Details</div>
            <div className='mt-10 p2p-user'>
              <div>
                <strong>Withdrawal ID : </strong>
                cm7vuqjb693tyzc7onfeez14r
              </div>
              <div>
                <strong>Created By : </strong>
                staff1
              </div>
              <div>
                <strong>Created at : </strong>25 Mar, 2025 05:19 pm
              </div>
              <div>
                <strong>Updated By: </strong>
                staff1
              </div>
              <div>
                <strong>Updated at : </strong> 25 Mar, 2025 05:19 pm
              </div>

              <div>
                <strong>Status : </strong> <span className='badge'>Active</span>
              </div>
            </div>
          </Box>
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box>
            <div className='p2p-user-head'>Amount</div>
            <div className='mt-10 p2p-user'>
              <div>
                <strong>Payment Amount : </strong>
                1000 USD
              </div>
              <div>
                <strong>Converted Total Amount : </strong>
                1000 USDT
              </div>
              <div>
                <strong>Fee : </strong>990 USDT
              </div>
            </div>
          </Box>
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box>
            <div className='p2p-user-head'>To User</div>

            <div className='mt-10 p2p-user'>
              <div>
                <strong> Nick Name : </strong>N/A
              </div>
              <div>
                <strong>User Code : </strong> u-1742903121600
              </div>
              <div>
                <strong>Email : </strong>decimal_issue@yopmail.com
              </div>
              <div>
                <strong>Phone: </strong> N/A
              </div>
            </div>
          </Box>
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Box>
            <div className='p2p-user-head'> Tx Info & Others</div>
            <div className='mt-10 p2p-user'>
              <div>
                <strong>Network : </strong>
                Tron Nile Testnet
              </div>
              <div>
                <strong>Destination: </strong>
                TRsWEW6wjuhmB4vnskQRQhWKGyouCNSxxg
              </div>
              <div>
                <strong>TxID : </strong>
                TThPbxxP7HgQwKvk9UrzDYZ9gbwPAmehZX
              </div>
            </div>
            <Button
              className='action-btn'
              color='error'
              variant='contained'
              onClick={()=>handleOpen()}
            >
              Make Fail
            </Button>
          </Box>
        </Grid2>
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
        <Button variant='contained' color='warning' className='action-btn'>
          Cancel
        </Button>
        <Button variant='contained' color='error' className='action-btn'>
          Confirm
        </Button>
      </div>
    </div>
  );
  useEffect(() => {
    setCollections({
      columns: [
        { Header: "ID", accessor: "id", align: "left" },
        { Header: "Crypto", accessor: "crypto", align: "left" },
        { Header: "Network", accessor: "Network", align: "left" },
        { Header: "Destination", accessor: "Destination", align: "left" },
        { Header: "Amount", accessor: "Amount", align: "left" },
        { Header: "Status", accessor: "Status", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: [
        {
          action: (
            <Button
              onClick={handlePopOverClick}
              variant='contained'
              className='action-btn'
            >
              Action
            </Button>
          ),
        },
      ],
    });
  }, []);

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
              <h2 style={{ margin: 0 }}>Network Balance</h2>

              <div className='display-4 mt-20 flex-wrap'>
                <Box sx={fieldStyle}>
                  <FormControl fullWidth>
                    <InputLabel id='status'>Status</InputLabel>
                    <Select
                      labelId='status'
                      id='status'
                      value={status}
                      label='Status'
                      size='small'
                      onChange={handleStatusChange}
                    >
                      <MenuItem value={"all"}>All</MenuItem>
                      <MenuItem value={"pending"}>Pending</MenuItem>
                      <MenuItem value={"complete"}>Completed</MenuItem>
                      <MenuItem value={"cancel"}>Cancelled</MenuItem>
                      <MenuItem value={"failed"}>Failed</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={fieldStyle}>
                  <FormControl fullWidth>
                    <InputLabel id='sort'>Sort</InputLabel>
                    <Select
                      labelId='sort'
                      id='sort'
                      value={sort}
                      label='Sort'
                      onChange={handleSort}
                      size='small'
                    >
                      <MenuItem value={"all"}>All</MenuItem>
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
                  </div>
                </Box>
                <Button variant='contained' className='action-btn'>
                  Export
                </Button>
              </div>
              <div className='mt-10'>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </div>
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
              onClick={()=>handleOpen("CoinPool Withdrawal Details")}
            >
              View Details
            </Button>
            <Button
              className='action-btn'
              sx={{ width: "150px" }}
              onClick={()=>handleOpen("")}
            >
              Make Fail
            </Button>
          </Box>
        </Popover>
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={{...style , width : modelDetail === "" ? 500 : 700}}>
            <div className='display-2 mb-10'>
              <h3>{modelDetail}</h3>
              <Close onClick={handleClose} className='cursor' />
            </div>
            {modelDetail === "CoinPool Withdrawal Details" ? detailsModel : securityModel}
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default WithdrawalHistory;
