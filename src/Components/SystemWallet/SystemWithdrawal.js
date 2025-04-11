import React, {  useEffect, useState } from "react";
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

import ReusableTable from "../ReuseTable/ReuseTable";
import { Close } from "@mui/icons-material";
const drawerWidth = 260;
const fieldStyle = {
  width: 150,
  "@media(max-width:767.98px)": {
    width: "45%",
  },
  "@media(max-width:425.98px)": {
    width: "100%",
  },
};
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
const SystemWithdrawal = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [modelDetail, setModelDetails] = useState("");
  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };
  const handleOpen = (detail) => {
    setOpen(true);
    setModelDetails(detail);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlePopOverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopOverClose = () => {
    setAnchorEl(null);
  };

  const popOverOpen = Boolean(anchorEl);
  const id = popOverOpen ? "simple-popover" : undefined;
  const detailsModel = (
    <Grid2 container spacing={2} sx={{ height: 480, overflowY: "scroll" }}>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Withdrawal Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Withdrawal ID : </strong>
              cm7vunu72933zzc7oidlegx1v
            </div>
            <div>
              <strong>Created By : </strong> 05 Mar, 2025 05:13 pm
            </div>
            <div>
              <strong>Updated By: </strong>SYSTEM
            </div>
            <div>
              <strong>Updated at :</strong> 05 Mar, 2025 05:15 pm
            </div>

            <div>
              <strong>Status : </strong>{" "}
              <span className='badge'>Completed </span>
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Amount Details</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>currency : </strong>TRX Tron
            </div>
            <div>
              <strong>Amount : </strong>4 TRX
            </div>
            <div>
              <strong>Fee : </strong> 0 TRX
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>From Wallet</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Wallet Uid : </strong>cm3etv0tt1tn5zc9475cu20dn
            </div>
            <div>
              <strong>Wallet Address: </strong>
              TRsWEW6wjuhmB4vnskQRQhWKGyouCNSxxg
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <Box>
          <div className='p2p-user-head'>Tx Info & Others</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Network : </strong>Tron Nile Testnet
            </div>
            <div>
              <strong>Destination : </strong>
              TThPbxxP7HgQwKvk9UrzDYZ9gbwPAmehZX
            </div>
            <div>
              <strong>Txid : </strong>
              a925ab1ed285ad9caac32fe84cbf6fe82c442756a614da7d8b110be196b084e9
            </div>
            <div>
              <strong>Block No : </strong> 55002287
            </div>
            <div>
              <strong>Note : </strong>to coin pool for fee
            </div>
          </div>
          <Button variant='contained' color='error' className='action-btn'>
            Make Fail
          </Button>
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
  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Id", accessor: "id", align: "left" },
        { Header: "Currency", accessor: "currency", align: "left" },
        { Header: "Network", accessor: "network", align: "left" },
        { Header: "Destination", accessor: "destination", align: "left" },
        { Header: "Amount", accessor: "amount", align: "left" },
        { Header: "Status", accessor: "status", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: [
        {
          action: (
            <Button
              className='action-btn'
              variant='contained'
              onClick={handlePopOverClick}
            >
              Explore
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
              <div className='m-10'>
                <div>
                  <h2 style={{ margin: 0 }}>System Withdrawal Management</h2>
                </div>
                <div className='display-4 mt-20  wrap-field'>
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
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='status'>Status</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        label='Status'
                        size='small'
                        value={"all"}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"active"}>Active</MenuItem>
                        <MenuItem value={"inactive"}>In Active</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='sort'>Sort</InputLabel>
                      <Select
                        labelId='sort'
                        id='sort'
                        label='Sort'
                        size='small'
                        value={"last"}
                      >
                        <MenuItem value={"last"}>Last Modified</MenuItem>
                        <MenuItem value={"newest"}>Newest</MenuItem>
                        <MenuItem value={"oldest"}>Oldest</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Button variant='contained' className='action-btn'>
                    Export
                  </Button>
                </div>
              </div>
              <div className='margin-top'>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </div>
            </Grid2>
          </Grid2>
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
                View Details
              </Button>
              <Button
                className='action-btn'
                sx={{ width: "150px" }}
                onClick={() => handleOpen(1)}
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
            <Box sx={{ ...style, width: modelDetail === 0 ? 700 : 500 }}>
              <div className='display-2 mb-10'>
                <h3>{modelDetail === 0 ? "System Withdrawal Details" : ""}</h3>
                <Close onClick={handleClose} className='cursor' />
              </div>
              {modelDetail === 0 ? detailsModel : securityModel}
            </Box>
          </Modal>
        </Box>
      </Box>
    </div>
  );
};

export default SystemWithdrawal;
