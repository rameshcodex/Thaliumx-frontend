
/* eslint-disable no-unused-vars, eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";
import PropTypes from "prop-types";

import ReusableTable from "../ReuseTable/ReuseTable";
import consts from "../../constant";
import { AuthContext } from "../../Authprovider";
import { useNavigate } from "react-router-dom";
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

const FiatCurrency = () => {
  const theme = useTheme();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [sort, setSort] = useState("last");
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("all");
  const [currency, setCurrency] = useState("all");
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

  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Logo", accessor: "logo", align: "left" },
        { Header: "Name", accessor: "name", align: "left" },
        { Header: "Code", accessor: "Code", align: "left" },
        { Header: "Symbol", accessor: "Symbol", align: "left" },
        { Header: "Sync Rate", accessor: "USD Rate", align: "left" },
        { Header: "Status", accessor: "Status", align: "left" },
        { Header: "Wallet Status", accessor: "Wallet_Status", align: "left" },
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
                <h2 style={{ margin: 0 }}>Fiat Currency Management</h2>
              </div>
              <div className='display-4 mt-20 wrap-field'>
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
                      <MenuItem value={"last"}>Last Modified</MenuItem>
                      <MenuItem value={"new"}>Newest </MenuItem>
                      <MenuItem value={"old"}>Oldest</MenuItem>
                      <MenuItem value={"a_z"}>Name(A to Z)</MenuItem>
                      <MenuItem value={"z_a"}>Name (Z to A)</MenuItem>
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
                  Sync USD Rate
                </Button>
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
            <Button className='action-btn' sx={{ width: "150px" }}>
              Edit
            </Button>
            <Button className='action-btn' sx={{ width: "150px" }}>
              Payment Settings
            </Button>
            <Button className='action-btn' sx={{ width: "150px" }}>
              P2P Settings
            </Button>
          </Box>
        </Popover>
      </Box>
    </div>
  );
};

export default FiatCurrency;
