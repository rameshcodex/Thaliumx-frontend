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

import ReusableTable from "../ReuseTable/ReuseTable";
import { CheckBox, Close } from "@mui/icons-material";
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
  width: 150,
  "@media(max-width:767.98px)": {
    width: "45%",
  },
  "@media(max-width:425.98px)": {
    width: "100%",
  },
};
const AllowedMethods = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("all");
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [network, setNetwork] = useState("all");
  const [anchorEl, setAnchorEl] = useState(null);
  const [dynamicInput, setInput] = useState([]);
  const [modelDetail, setModelDetails] = useState("");
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
  const handleNetworkChange = (event) => {
    setNetwork(event.target.value);
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
  const editModel = (
    <Grid2 container spacing={2} sx={{ height: 400, overflowY: "scroll" }}>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <FormControl fullWidth>
          <InputLabel id='method'>Method Type</InputLabel>
          <Select labelId='method' id='method' label='Method Type'>
            <MenuItem value={"all"}>Mobile Banking</MenuItem>
            <MenuItem value={"fiat"}>Bank</MenuItem>
            <MenuItem value={"p2p"}>Digital Wallet</MenuItem>
            <MenuItem value={"p2p"}>Others</MenuItem>
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <TextField label='Name' fullWidth />
      </Grid2>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <FormControl fullWidth>
          <InputLabel id='Currency'>Select Currency</InputLabel>
          <Select labelId='Currency' id='Currency' label='Select Currency'>
            <MenuItem value={"all"}>USDT</MenuItem>
          </Select>
        </FormControl>
      </Grid2>
      {dynamicInput.map((value, index) => (
        <Grid2 item size={{ xs: 12, lg: 12 }} key={index}>
          {value}
        </Grid2>
      ))}
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <div className='display-1'>
          <Button
            variant='contained'
            className='action-btn'
            color='success'
            onClick={() => {
              setInput((prev) => {
                prev.push(<TextField label={`Input`} fullWidth />);
                return prev;
              });
            }}
          >
            Add Input
          </Button>
          <Button
            variant='contained'
            className='action-btn'
            color='error'
            onClick={() => setInput([])}
          >
            Delete All Inputs
          </Button>
        </div>
      </Grid2>
      <Grid2 item size={{ xs: 12, lg: 6 }}>
        <FormControl>
          <FormControlLabel control={<Switch />} label='Status' />
        </FormControl>
      </Grid2>
      <Grid2 item size={{ xs: 12, lg: 6 }}>
        <FormControl>
          <FormControlLabel control={<Switch />} label='Optional Input' />
        </FormControl>
      </Grid2>
      <Grid2 item size={{ xs: 12, lg: 6 }}>
        <Button variant='contained' className='action-btn'>
          Update
        </Button>
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
  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Name", accessor: "Name", align: "left" },
        { Header: "	Method Type", accessor: "MethodType", align: "left" },
        { Header: "Currency", accessor: "currency", align: "left" },
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
              <div className='display-2 m-10'>
                <h2 style={{ margin: 0 }}>Methods List</h2>
                <div className='display-4 mt-20 wrap-field'>
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
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"active"}>Active</MenuItem>
                        <MenuItem value={"inactive"}>In Active</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='network'>Feature</InputLabel>
                      <Select
                        labelId='network'
                        id='network'
                        value={network}
                        label='Feature'
                        size='small'
                        onChange={handleNetworkChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"fiat"}>Fiat Withdrawal</MenuItem>
                        <MenuItem value={"p2p"}>P2P</MenuItem>
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
                  <Button
                    variant='contained'
                    onClick={() => handleOpen(0)}
                    className='action-btn'
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
            Edit/View
          </Button>
          <Button
            className='action-btn'
            sx={{ width: "150px" }}
            onClick={() => handleOpen(1)}
          >
            Delete
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
            <h3>{modelDetail === 0 ? "Update Upi Payment" : ""}</h3>
            <Close onClick={handleClose} className='cursor' />
          </div>
          {modelDetail === 0 ? editModel : deleteModel}
        </Box>
      </Modal>
    </div>
  );
};

export default AllowedMethods;
