/* eslint-disable no-unused-vars, eqeqeq */
import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Popover,
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
  width: 500,
  "@media(max-width:767.98px)": {
    width: "95%",
  },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
const SystemWallet = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [modelDetail, setModelDetails] = useState("");
  const [page, setPage] = useState(1);
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

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };
  const createModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, md: 12 }}>
        <FormControl fullWidth>
          <InputLabel id='network'>Network</InputLabel>
          <Select labelId='network' id='network' label='Network'>
            <MenuItem value={""}>Select Network</MenuItem>
            <MenuItem value={"ethereum_classic"}>Ethereum Classic</MenuItem>
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 12 }}>
        <Button variant='contained' className='action-btn'>
          Create
        </Button>
      </Grid2>
    </Grid2>
  );
  const syncModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, md: 12 }}>
        <FormControl fullWidth>
          <InputLabel id='coin'>Coin</InputLabel>
          <Select labelId='coin' id='coin' label='Coin'>
            <MenuItem value={""}>Select Network</MenuItem>
            <MenuItem value={"ethereum_classic"}>Ethereum Classic</MenuItem>
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 12 }}>
        <Button variant='contained' className='action-btn'>
          Sync
        </Button>
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
        { Header: "Currency", accessor: "currency", align: "left" },
        { Header: "Address", accessor: "address", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: [
        {
          currency: "fantom Fantom Mainnet",
          address: "0x256C6...f10D2cb",
          action: (
            <Button
              className='action-btn'
              variant='contained'
              aria-describedby={id}
              onClick={handlePopOverClick}
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
              <div className='m-10'>
                <div>
                  <h2 style={{ margin: 0 }}>System Wallet Management</h2>
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
                  <Button
                    variant='contained'
                    className='action-btn'
                    onClick={() => handleOpen(0)}
                  >
                    Create
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
          <Modal
            open={open}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <div className='display-2 mb-10'>
                <div>
                  {modelDetail === 0 ? (
                    <h3>Create Wallet</h3>
                  ) : modelDetail === 1 ? (
                    <>
                      <h3>Sync Balance</h3>
                      <p> (Don't use it UNNECESSARILY!!)</p>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <Close onClick={handleClose} className='cursor' />
              </div>
              {modelDetail === 0
                ? createModel
                : modelDetail === 1
                  ? syncModel
                  : securityModel}
            </Box>
          </Modal>

          <Popover
            id={id}
            open={popOverOpen}
            anchorEl={anchorEl}
            onClose={handlePopOverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            className='popover'
          >
            <Box
              component={"div"}
              className='display-1 p-10'
              flexDirection={"column"}
            >
              <Button className='action-btn' sx={{ width: "150px" }}>
                View Balance
              </Button>
              <Button className='action-btn' sx={{ width: "150px" }}>
                Deposit History
              </Button>
              <Button
                className='action-btn'
                sx={{ width: "150px" }}
                onClick={() => handleOpen(1)}
              >
                Sync Balance
              </Button>
              <Button
                className='action-btn'
                sx={{ width: "150px" }}
                onClick={() => handleOpen(2)}
              >
                Delete
              </Button>
            </Box>
          </Popover>
        </Box>
      </Box>
    </div>
  );
};

export default SystemWallet;
