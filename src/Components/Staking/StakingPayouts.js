import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";
import ReusableTable from "../ReuseTable/ReuseTable";
import { Close } from "@mui/icons-material";
const drawerWidth = 260;
const fieldStyle = {
  width : 150 ,
  '@media(max-width:767.98px)': {
      width: '45%'
    },
    '@media(max-width:425.98px)': {
      width: '100%'
    },
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  "@media(max-width:767.98px)": {
    width: "95%",
  },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const StakingPayouts = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        { Header: "Coin", accessor: "coin", align: "left" },
        { Header: "User", accessor: "user", align: "left" },
        { Header: "Offer Type", accessor: "offer_type", align: "left" },
        { Header: "Amount", accessor: "amount", align: "left" },
        {
          Header: "Investment Amount",
          accessor: "invest_amount",
          align: "left",
        },
        { Header: "Total Earning", accessor: "total_earnings", align: "left" },
        { Header: "Investment ID", accessor: "invest_id", align: "left" },
        { Header: "Investment Status", accessor: "status", align: "left" },

        { Header: "Created At", accessor: "createdAt", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: [{
        action : <Button variant="contained" className="action-btn" onClick={handleOpen}>Action</Button>
      }],
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
                <h2 style={{ margin: 0 }}>Payout History</h2>
              </div>

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
              <div className='mt-10'>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </div>
            </Grid2>
          </Grid2>
          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <div className='display-2 mb-10'>
                <h3>Payout Details</h3>
                <Close onClick={handleClose} className='cursor' />
              </div>
              <Grid2
                container
                spacing={2}
                sx={{ height: 500, overflowY: "scroll" }}
              >
                <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Box>
                    <div className='p2p-user-head'>Payout Info</div>
                    <div className='mt-10 p2p-user'>
                      <div>
                        <strong>Currency:</strong> USDT (Tether USD)
                      </div>
                      <div>
                        <strong>Amount:</strong> 0.1424397
                      </div>
                      <div>
                        <strong>Investment Amount: </strong> 173.30163039
                      </div>
                      <div>
                        <strong>Wallet Type: </strong> Spot Wallet
                      </div>
                      <div>
                        <strong>Investment ID: </strong>
                        cm7irbyir2iwhzcwqnsozuvka
                      </div>
                      <div>
                        <strong>Investment Status: </strong>
                        <span className='badge'>Running</span>
                      </div>
                    </div>
                  </Box>
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Box>
                    <div className='p2p-user-head'>Offer Info</div>
                    <div className='mt-10 p2p-user'>
                      <div>
                        <strong>Offer APR: </strong>30%
                      </div>
                      <div>
                        <strong>Offer Type: </strong>
                        <span className='badge'>Flexible</span>
                      </div>
                      <div>
                        <strong>Period: </strong>Flexible
                      </div>
                      <div>
                        <strong>Min. Maturity Period: </strong> N/A
                      </div>
                    </div>
                  </Box>
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Box>
                    <div className='p2p-user-head'>Dates</div>
                    <div className='mt-10 p2p-user'>
                      <div>
                        <strong>Created At: </strong>28 Mar, 2025 05:30 am
                      </div>
                      <div>
                        <strong>Investment End Date: </strong> Invalid date
                      </div>
                      <div>
                        <strong>Min. Maturity Date: </strong> Invalid date
                      </div>
                    </div>
                  </Box>
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Box>
                    <div className='p2p-user-head'>User</div>
                    <div className='mt-10 p2p-user'>
                      <div>
                        <strong>Email: </strong> namlo.m51@gmail.com
                      </div>
                      <div>
                        <strong>Full Name:</strong>N/A
                      </div>
                      <div>
                        <strong>Nickname: </strong> N/A
                      </div>
                      <div>
                        <strong>Usercode: </strong> u-1740327461142
                      </div>
                    </div>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          </Modal>
        </Box>
      </Box>
    </div>
  );
};

export default StakingPayouts;
