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
import Axios from "../../Axios";
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ConvertHistory = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [cryptoType, setCryptoType] = useState("all");
  const [collections, setCollections] = useState({
    columns: [
      { Header: "User Name", accessor: "username", align: "left" },
      { Header: "From Type", accessor: "from", align: "left" },
      { Header: "To Type", accessor: "to", align: "left" },
      { Header: "Amount", accessor: "amount", align: "left" },
      { Header: "Date", accessor: "createdAt", align: "left" },
    ], row: []
  });


  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // Update debouncedTerm after user stops typing for 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(handler); // Clear timeout if user types again
    };
  }, [searchTerm]);

  // Call the search function when debouncedTerm updates
  useEffect(() => {
    if (debouncedTerm) {
      console.log("Searching for:", debouncedTerm);
      getHistoryDetails(1, debouncedTerm);
    }
  }, [debouncedTerm]);




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

  const getHistoryDetails = async (pgs, search) => {
    console.log(pgs, search, "pgs, search")
    try {
      const { data } = await Axios.post(`/admin/getConvertList?page=${pgs ? pgs : page}&limit=10`, {
        from: walletType == "all" ? "" : walletType,
        name: search ? search == "empty" ? "" : search : debouncedTerm
      }, {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('nzanzi')}` }
      })
      if (data?.success == true && data?.result?.docs?.length > 0) {
        var dts = data?.result?.docs
        var totalCount = data?.result?.totalPages
        var formattedRows = []
        for (let i = 0; i < dts.length; i++) {
          const element = dts[i];
          var obj = {}
          obj.username = (<div>{element?.users?.name ? element?.users?.name : "-"}</div>)
          obj.from = (<div>{element?.from ? element?.from : "-"}</div>)
          obj.to = (<div>{element?.to ? element?.to : "-"}</div>)
          obj.amount = (<div>{element?.Amount ? `${element?.Amount} ${element?.Currency}` : "-"}</div>)
          obj.createdAt = (<div>{element?.createdAt ? element?.createdAt?.split("T")[0] : "-"}</div>)
          formattedRows.push(obj)
        }
        setCollections(prevState => ({
          ...prevState,
          row: formattedRows,
          pagecount: totalCount
        }));
      } else {
        setCollections(prevState => ({
          ...prevState,
          row: [],
          pagecount: 0
        }));
      }
    } catch (error) {
      console.log(error, "error")
      setCollections(prevState => ({
        ...prevState,
        row: [],
        pagecount: 0
      }));
    }
  }


  useEffect(() => {
    getHistoryDetails()
  }, [walletType]);

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
                  <Tab label='All' {...a11yProps(0)} className='tab-title' />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className='display-4'>
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
                        placeholder='name'
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          if (e.target.value == "") {
                            getHistoryDetails(1, "empty");
                            setPage(1)
                          }
                        }}
                      />
                    </div>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='wallet'>From Type</InputLabel>
                      <Select
                        labelId='wallet'
                        id='wallet'
                        value={walletType}
                        label='Wallet Type'
                        size='small'
                        onChange={handleWalletTypeChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"SPOT"}>SPOT</MenuItem>
                        <MenuItem value={"MARGIN"}>MARGIN</MenuItem>
                        <MenuItem value={"FUTURE"}>FUTURE</MenuItem>
                        <MenuItem value={"FUNDING"}>FUNDING</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  {/* <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='crypto'>Crypto</InputLabel>
                      <Select
                        labelId='crypto'
                        id='crypto'
                        value={cryptoType}
                        label='Crypto'
                        size='small'
                        onChange={handleCryptoChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </Box> */}
                </div>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </CustomTabPanel>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default ConvertHistory;
