/* eslint-disable no-unused-vars, eqeqeq */
import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import ReusableTable from "../ReuseTable/ReuseTable";
const drawerWidth = 260;
const fieldStyle = {
  width: 150,
  '@media(max-width:767.98px)': {
    width: '45%'
  },
  '@media(max-width:425.98px)': {
    width: '100%'
  },
}
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const FuturePositionProcess = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [cryptoType, setCryptoType] = useState("all");
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [value, setValue] = useState(0);
  const [walletType, setWalletType] = useState("all");
  const [convertType, setConvertType] = useState("all");
  const [status, setStatus] = useState("all");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const handleCryptoChange = (event) => {
    setCryptoType(event.target.value);
  };
  const handleWalletTypeChange = (event) => {
    setWalletType(event.target.value);
  };
  const handelCovertTypeChange = (event) => {
    setConvertType(event.target.value);
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
        { Header: "ID", accessor: "id", align: "left" },
        { Header: "Code", accessor: "Code", align: "left" },
        { Header: "Amount", accessor: "Amount", align: "left" },
        { Header: "Status", accessor: "Status", align: "left" },
        { Header: "Created At", accessor: "CreatedAt", align: "left" },
        { Header: "Updated At", accessor: "UpdatedAt", align: "left" },
        { Header: "Actions", accessor: "actions", align: "left" },
      ],
      row: [],
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
                <h2 style={{ margin: 0 }}>Convert History List</h2>
              </div>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab label='Open' {...a11yProps(0)} className='tab-title' />
                  <Tab label='All' {...a11yProps(1)} className='tab-title' />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className='display-4 mb-10 wrap-field'>
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
                      <InputLabel id='Convert'>Symbols</InputLabel>
                      <Select
                        labelId='Convert'
                        id='Convert'
                        value={convertType}
                        label='Symbols'
                        size='small'
                        onChange={handelCovertTypeChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"market"}>Market</MenuItem>
                        <MenuItem value={"limit"}>Limit</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='sort'>Sort</InputLabel>
                      <Select
                        labelId='sort'
                        id='sort'
                        value={walletType}
                        label='Sort'
                        size='small'
                        onChange={handleWalletTypeChange}
                      >
                        <MenuItem value={"all"}>Last Modified</MenuItem>
                        <MenuItem value={"new"}>Newest </MenuItem>
                        <MenuItem value={"old"}>Oldest</MenuItem>
                        <MenuItem value={"a_z"}>Name(A to Z)</MenuItem>
                        <MenuItem value={"z_a"}>Name (Z to A)</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div className='mt-20'>
                  <ReusableTable
                    collections={collections}
                    paginationChange={paginationChange}
                    page={page}
                  />
                </div>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className='display-4 mb-10 wrap-field'>
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
                      <InputLabel id='Convert'>Symbols</InputLabel>
                      <Select
                        labelId='Convert'
                        id='Convert'
                        value={convertType}
                        label='Symbols'
                        size='small'
                        onChange={handelCovertTypeChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"market"}>Market</MenuItem>
                        <MenuItem value={"limit"}>Limit</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

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
                        <MenuItem value={""}>Start</MenuItem>
                        <MenuItem value={""}>Finished</MenuItem>
                        <MenuItem value={""}>Failed</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='sort'>Sort</InputLabel>
                      <Select
                        labelId='sort'
                        id='sort'
                        value={walletType}
                        label='Sort'
                        size='small'
                        onChange={handleWalletTypeChange}
                      >
                        <MenuItem value={"all"}>Last Modified</MenuItem>
                        <MenuItem value={"new"}>Newest </MenuItem>
                        <MenuItem value={"old"}>Oldest</MenuItem>
                        <MenuItem value={"a_z"}>Name(A to Z)</MenuItem>
                        <MenuItem value={"z_a"}>Name (Z to A)</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div className="mt-20">
                  <ReusableTable
                    collections={collections}
                    paginationChange={paginationChange}
                    page={page}
                  />
                </div>
              </CustomTabPanel>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default FuturePositionProcess;
