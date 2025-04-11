/* eslint-disable no-unused-vars, eqeqeq */
import React, { useEffect, useState } from "react";
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
import "./P2P.css";
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
const P2PReasons = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [status, setStatus] = useState("all");
  const [modelDetail, setModelDetails] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

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
  const handelStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  const createModel = (
    <div
      className='display-1'
      style={{
        flexDirection: "column",
        gap: "20px",
        alignItems: "start",
      }}
    >
      <FormControl fullWidth>
        <InputLabel id='event'>Event</InputLabel>
        <Select labelId='event' id='event' label='Event'>
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"cancel"}>Order Cancel</MenuItem>
          <MenuItem value={"dispute"}>Order Dispute</MenuItem>
          <MenuItem value={"dispute"}>Order Report</MenuItem>
          <MenuItem value={"block"}>Block User</MenuItem>
        </Select>
      </FormControl>
      <TextField label='Description' multiline rows={4} fullWidth />
      <FormControl>
        <FormControlLabel
          control={<Switch />}
          label='Status'
          labelPlacement='start'
        />
      </FormControl>
      <Button variant='contained' className='action-btn'>
        Create
      </Button>
    </div>
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
  useEffect(() => {
    setCollections({
      columns: [
        { Header: "ID", accessor: "id", align: "left" },
        { Header: "Event", accessor: "event", align: "left" },
        { Header: "Created At", accessor: "createdAt", align: "left" },
        { Header: "Updated At", accessor: "updatedAt", align: "left" },
        { Header: "Description", accessor: "description", align: "left" },
        { Header: "Status", accessor: "status", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: [
        {
          id: "clgev34ux0000u92aww337j6i",
          event: "Order Cancel",
          createdAt: "30 Nov, 2023 01:07 pm",
          updatedAt: "30 Nov, 2023 01:07 pm",
          description: "I do not want to trade anymore",
          status: <div className='badge'>Active</div>,
          action: (
            <Button
              variant='contained'
              className='action-btn'
              size='small'
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
              <div className='display-2 mb-10'>
                <h2 style={{ margin: 0 }}>P2P Reasons List</h2>
              </div>

              <div className='display-4 wrap-field'>
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
                      value={status}
                      label='Status'
                      onChange={handelStatusChange}
                      size='small'
                    >
                      <MenuItem value={"all"}>All</MenuItem>
                      <MenuItem value={"cancel"}>Order Cancel</MenuItem>
                      <MenuItem value={"dispute"}>Order Dispute</MenuItem>
                      <MenuItem value={"dispute"}>Order Report</MenuItem>
                      <MenuItem value={"block"}>Block User</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Button
                  variant='contained'
                  className='action-btn'
                  onClick={() => handleOpen(0)}
                >
                  Create
                </Button>
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
              View Details
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
              <h3>{modelDetail === 0 ? "Create a Reason" : ""}</h3>
              <Close onClick={handleClose} className='cursor' />
            </div>
            {modelDetail === 0 ? createModel : deleteModel}
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default P2PReasons;
