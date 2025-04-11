import React, { useContext, useEffect, useState } from "react";
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
import consts from "../../constant";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Authprovider";
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
const StakingOffers = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [sort, setSort] = useState("all");
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
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

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };
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
        { Header: "Coin", accessor: "coin", align: "left" },
        { Header: "Type", accessor: "type", align: "left" },
        { Header: "Period", accessor: "period", align: "left" },
        { Header: "APR", accessor: "apr", align: "left" },
        { Header: "Min. Investment", accessor: "min_invest", align: "left" },
        { Header: "Max. Investment", accessor: "max_invest", align: "left" },
        { Header: "Created At", accessor: "createdAt", align: "left" },
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
              <div className='m-10'>
                <div>
                  <h2 style={{ margin: 0 }}>Offers List</h2>
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

                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='type'>Type</InputLabel>
                      <Select
                        labelId='type'
                        id='type'
                        label='type'
                        size='small'
                        value={"all"}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"flexible"}>Flexible</MenuItem>
                        <MenuItem value={"locked"}>Locked</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='coin'>Coin</InputLabel>
                      <Select
                        labelId='coin'
                        id='coin'
                        label='Coin'
                        size='small'
                        value={"all"}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Button
                    variant='contained'
                    className='action-btn'
                    onClick={() => {
                      navigate(`/${consts.route + auth + "/staking/create"}`);
                    }}
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
            onClick={() => {
              navigate(`/${consts.route + auth + "/staking/create"}`);
            }}
          >
            Edit /Details
          </Button>
          <Button
            className='action-btn'
            sx={{ width: "150px" }}
            onClick={handleOpen}
          >
            Delete
          </Button>
        </Box>
      </Popover>

      <Modal
        open={open}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className='display-4 mb-10'>
            <Close onClick={handleClose} className='cursor' />
          </div>
          {securityModel}
        </Box>
      </Modal>
    </div>
  );
};

export default StakingOffers;
