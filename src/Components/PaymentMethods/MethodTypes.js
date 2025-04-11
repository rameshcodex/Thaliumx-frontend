import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
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

const MethodTypes = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("all");
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [network, setNetwork] = useState("all");
  const [open, setOpen] = useState(true);

  const handleOpen = (event) => {
    setOpen(true);
  };
  const handleClose = (event) => {
    setOpen(false);
  };
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
  const detailsModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <TextField label='Name' fullWidth />
      </Grid2>
      <Grid2 item size={{ xs: 12, lg: 12 }} sx={{ padding: "10px" }}>
        <InputLabel>Select Features : </InputLabel>
        <FormControl>
          <FormControlLabel
            control={<CheckBox color='success' />}
            label='Fiat Withdrawal'
          />
          <FormControlLabel
            control={<CheckBox color='success' />}
            label='P2P'
          />
        </FormControl>
        <div className='margin-top'>
          <FormControl>
            <FormControlLabel
              control={<Switch color='success' />}
              label='Status'
            />
          </FormControl>
        </div>
      </Grid2>
      <Button variant='contained' className='action-btn'>
        Update
      </Button>
    </Grid2>
  );
  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Name", accessor: "Name", align: "left" },
        {
          Header: "Allowed Features",
          accessor: "Allowed_Features",
          align: "left",
        },
        { Header: "Status", accessor: "Status", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: [
        {
          action: (
            <Button
              onClick={handleOpen}
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
                <h2 style={{ margin: 0 }}>Payment Method Types List</h2>
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
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='display-2 mb-10'>
            <h3>Update Method Type</h3>
            <Close onClick={handleClose} className='cursor' />
          </div>
          {detailsModel}
        </Box>
      </Modal>
    </div>
  );
};

export default MethodTypes;
