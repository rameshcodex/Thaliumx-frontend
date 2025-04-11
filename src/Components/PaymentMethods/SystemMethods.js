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
import { Close } from "@mui/icons-material";
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
const SystemMethods = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("all");
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [network, setNetwork] = useState("all");

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
  const createModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <FormControl fullWidth>
          <InputLabel id='system_method'>Create System Method</InputLabel>
          <Select
            labelId='system_method'
            id='system_method'
            label='Create System Method'
          >
            <MenuItem value={"all"}>USDT</MenuItem>
          </Select>
        </FormControl>
      </Grid2>
      <Button variant='contained' className='action-btn'>
        Create
      </Button>
    </Grid2>
  );
  const editModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <TextField label='Method' fullWidth disabled />
      </Grid2>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <TextField label='UPI Id' fullWidth disabled />
      </Grid2>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <TextField
          label='More Information (Optional)'
          row={4}
          multiline={true}
          fullWidth
        />
      </Grid2>
      <Grid2 item size={{ xs: 12, lg: 12 }}>
        <FormControl>
          <FormControlLabel control={<Switch />} label='Status' />
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
        { Header: "Method", accessor: "Method", align: "left" },
        { Header: "Type", accessor: "type", align: "left" },
        { Header: "Details", accessor: "details", align: "left" },
        {
          Header: "Supported Currencies",
          accessor: "SupportedCurrencies",
          align: "left",
        },
        { Header: "Status", accessor: "status", align: "left" },
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
                <h2 style={{ margin: 0 }}>System Methods List</h2>
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
              onClick={() => handleOpen(1)}
            >
              Edit/View
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

        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <div className='display-2 mb-10'>
              <h3>
                {modelDetail === 0
                  ? "Create System Method "
                  : modelDetail === 1
                  ? "Update Method"
                  : ""}
              </h3>
              <Close onClick={handleClose} className='cursor' />
            </div>
            {modelDetail === 0
              ? createModel
              : modelDetail === 1
              ? editModel
              : deleteModel}
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default SystemMethods;
