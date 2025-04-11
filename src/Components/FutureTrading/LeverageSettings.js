/* eslint-disable no-unused-vars, eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import { IconButton, Modal, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";
import "./FutureTrade.css";
import ReusableTable from "../ReuseTable/ReuseTable";
import consts from "../../constant";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authprovider";
import { Close, Delete, EditNote } from "@mui/icons-material";
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
const LeverageSettings = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [modelDetail, setModelDetails] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = (detail) => {
    setOpen(true);
    setModelDetails(detail);
  };
  const handleClose = () => {
    setOpen(false);
    setModelDetails("");
  };
  const [page, setPage] = useState(1);
  const editModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, md: 6 }}>
        <TextField label='Min Position Amount' type='number' fullWidth />
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 6 }}>
        <TextField label='Max Position Amount' type='number' fullWidth />
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 6 }}>
        <TextField label='Maintenance Margin Rate' type='number' fullWidth />
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 6 }}>
        <TextField label='Maintenance Amount' type='number' fullWidth />
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 6 }}>
        <TextField label='Max Leverage' type='number' fullWidth />
      </Grid2>
      <Grid2 item size={{ xs: 12, md: 12, lg: 12 }}>
        <Button variant='contained'>Save</Button>
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
        <Button variant='contained' color='warning' className='action-btn'>
          Cancel
        </Button>
        <Button variant='contained' color='error' className='action-btn'>
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

  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Tier", accessor: "Tier", align: "left" },
        {
          Header: "Position Bracket (Notional Value in USDT)",
          accessor: "position",
          align: "left",
        },
        { Header: "Max Leverage", accessor: "TradeCurrency", align: "left" },
        {
          Header: "Maintenance Margin Rate",
          accessor: "IsDefault",
          align: "left",
        },
        {
          Header: "Maintenance Amount (USDT)",
          accessor: "Status",
          align: "left",
        },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: [
        {
          action: (
            <div>
              <IconButton
                color='primary'
                variant='contained'
                className='action-btn'
                onClick={() => handleOpen(0)}
              >
                <EditNote />
              </IconButton>
              <IconButton
                color='error'
                variant='contained'
                className='action-btn'
                onClick={() => handleOpen(1)}
              >
                <Delete />
              </IconButton>
            </div>
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
                <h2 style={{ margin: 0 }}>Currency Pair Leverage</h2>
              </div>
              <div className='mt-20'>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </div>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{ ...style, width: modelDetail === 0 ? 700 : 500 }}>
          <div className='display-2 mb-10'>
            <h3>{modelDetail === 0 ? "Leverage Settings for TRXUSDT" : ""}</h3>
            <Close onClick={handleClose} className='cursor' />
          </div>
          {modelDetail === 0 ? editModel : deleteModel}
        </Box>
      </Modal>
    </div>
  );
};

export default LeverageSettings;
