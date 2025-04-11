import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Popover,
  Select,
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
import { Close } from "@mui/icons-material";
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
const fieldStyle = {
  width: 150,
  "@media(max-width:767.98px)": {
    width: "45%",
  },
  "@media(max-width:425.98px)": {
    width: "45%",
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

const InvestmentList = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
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
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };
  const detailsModel = (
    <Grid2 container spacing={2} sx={{ height: 500, overflowY: "scroll" }}>
      <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Investment Info</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>ID : </strong>
              cm8x3atpvba5lzcoo64446551
            </div>
            <div>
              <strong>Currency : </strong>
              USDT (Tether USD)
            </div>
            <div>
              <strong>Amount : </strong>
              173.30163039
            </div>
            <div>
              <strong>Daily Rewards : </strong>0.1424397
            </div>
            <div>
              <strong>Total Earning : </strong> 4.98538937
            </div>
            <div>
              <strong>Due Earning : </strong> 4.98538937
            </div>
            <div>
              <strong>Wallet Type : </strong> Spot Wallet
            </div>
            <div>
              <strong>Status : </strong>
              <span className='badge'>Running</span>
            </div>
            <div>
              <strong>Auto Renewal: </strong> N/A
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'> Offer Info</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Offer APR : </strong>
              30%
            </div>
            <div>
              <strong>Offer Type : </strong>
              Flexible
            </div>
            <div>
              <strong>Period : </strong>Flexible
            </div>
            <div>
              <strong>Min. Maturity Period : </strong>Flexible
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>Dates</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Created At : </strong>
              24 Feb, 2025 01:19 pm
            </div>{" "}
            <div>
              <strong>Updated At : </strong>
              24 Feb, 2025 01:19 pm
            </div>
            <div>
              <strong>Min. Maturity Date : </strong>
              24 Feb, 2025 01:19 pm
            </div>
            <div>
              <strong>End Date :</strong>
              24 Feb, 2025 01:19 pm
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
        <Box>
          <div className='p2p-user-head'>User</div>
          <div className='mt-10 p2p-user'>
            <div>
              <strong>Email : </strong>
              namlo.m51@gmail.com
            </div>
            <div>
              <strong>Full Name : </strong>
              N/A
            </div>
            <div>
              <strong>Nickname : </strong> N/A
            </div>
            <div>
              <strong>Usercode : </strong>u-1740327461142
            </div>
          </div>
        </Box>
      </Grid2>
      <Grid2 item size={{ xs: 12, sm: 12 }}>
        <Box>
          <h4>Payout History</h4>
          <ReusableTable
            collections={{
              columns: [{ Header: "Time" }, { Header: "Amount" }],
              row: [],
            }}
          />
        </Box>
      </Grid2>
    </Grid2>
  );
  const securityModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12, md: 12 }}>
        <Box>
          <TextField multiline rows={2} fullWidth label='Reason (Optional)' />
        </Box>
      </Grid2>
      <Button variant='contained' className='action-btn'>
        Close
      </Button>
    </Grid2>
  );
  useEffect(() => {
    setCollections({
      columns: [
        { Header: "ID", accessor: "id", align: "left" },
        { Header: "User", accessor: "user", align: "left" },
        { Header: "Coin", accessor: "coin", align: "left" },
        { Header: "Offer Type", accessor: "offer_type", align: "left" },
        { Header: "Period", accessor: "period", align: "left" },
        { Header: "Offer APR", accessor: "offer_apr", align: "left" },
        { Header: "Amount", accessor: "amount", align: "left" },
        { Header: "Status", accessor: "status", align: "left" },
        { Header: "Created At", accessor: "createdAt", align: "left" },
        { Header: "End At", accessor: "endAt", align: "left" },
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
              <div className='display-2 mb-10'>
                <h2 style={{ margin: 0 }}>Investments List</h2>
              </div>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab
                    label='Pending'
                    {...a11yProps(0)}
                    className='tab-title'
                  />
                  <Tab label='All' {...a11yProps(1)} className='tab-title' />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className='display-4  wrap-field'>
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
                      <InputLabel id='sort'>Sort</InputLabel>
                      <Select
                        labelId='sort'
                        id='sort'
                        label='Sort'
                        size='small'
                        value={"last"}
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
                    <FormControl fullWidth>
                      <InputLabel id='type'>Type</InputLabel>
                      <Select
                        labelId='type'
                        id='type'
                        label='Type'
                        size='small'
                        value={"all"}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
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
                </div>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className='display-4  wrap-field'>
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
                      <InputLabel id='sort'>Sort</InputLabel>
                      <Select
                        labelId='sort'
                        id='sort'
                        label='Sort'
                        size='small'
                        value={"last"}
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
                    <FormControl fullWidth>
                      <InputLabel id='type'>Type</InputLabel>
                      <Select
                        labelId='type'
                        id='type'
                        label='Type'
                        size='small'
                        value={"all"}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id='status'>Status</InputLabel>
                      <Select
                        labelId='status'
                        id='status'
                        label='Status'
                        size='small'
                        value={"all"}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"runnig"}>Running</MenuItem>
                        <MenuItem value={"redeemed"}>Redeemed</MenuItem>
                        <MenuItem value={"completed"}>Completed</MenuItem>
                        <MenuItem value={"closed"}>Closed</MenuItem>
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
              Details
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
          <Box sx={{ ...style, width: modelDetail === 1 ? 500 : 700 }}>
            <div className='display-2 mb-10'>
              <h3>
                {modelDetail === 0 ? "Investment Details" : "Close Investment"}
              </h3>
              <Close onClick={handleClose} className='cursor' />
            </div>
            {modelDetail === 0 ? detailsModel : securityModel}
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default InvestmentList;
