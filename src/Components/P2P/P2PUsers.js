/* eslint-disable no-unused-vars, eqeqeq */
import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";

import ReusableTable from "../ReuseTable/ReuseTable";
import consts from "../../constant";
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
  '@media(max-width:767.98px)': {
    width: '45%'
  },
  '@media(max-width:425.98px)': {
    width: '100%'
  },
}
const P2PUsers = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([
    {
      usercode: "ABCDEF",
      nick_name: "Sankar",
      p2p_name: "Babu",
      email: "sbsankar.80710@gmail.com",
      phone: "9876543210",
      status: true,
    },
  ]);
  const [userDetails, setUserDetails] = useState({});
  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };
  const handleOpen = (user) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Usercode", accessor: "usercode", align: "left" },
        { Header: "Nickname", accessor: "nick_name", align: "left" },
        { Header: "P2P Nickname", accessor: "p2p_name", align: "left" },
        { Header: "Email", accessor: "email", align: "left" },
        { Header: "Phone", accessor: "phone", align: "left" },
        { Header: "Status", accessor: "status", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },
      ],
      row: [
        {
          usercode: "ABCDEF",
          nick_name: "Sankar",
          p2p_name: "Babu",
          email: "sbsankar.80710@gmail.com",
          phone: "9876543210",
          status: (
            <div>
              <FormControlLabel control={<Switch />} />
            </div>
          ),
          action: (
            <div>
              <Button
                variant='contained'
                className='action-btn'
                onClick={() => {
                  handleOpen(users[0]);
                }}
              >
                Action
              </Button>
            </div>
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
                  <h2 style={{ margin: 0 }}>P2P User Profile</h2>
                </div>
                <div className='display-4 mt-20 wrap-field'>
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
          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <div className='display-2 mb-10'>
                <h3>User Details</h3>
                <Close onClick={handleClose} className='cursor' />
              </div>
              <Grid2 container spacing={2}>
                <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Box>
                    <div className='p2p-user-head'>Basic Info</div>
                    <div className='mt-10 p2p-user'>
                      <div>
                        <strong>Nick Name : </strong>boss
                      </div>
                      <div>
                        <strong>Full Name : </strong> N/A
                      </div>
                      <div>
                        <strong>Usercode : </strong>u-1710224257717
                      </div>
                      <div>
                        <strong>Email : </strong> demouser@yopmail.com
                      </div>
                      <div>
                        <strong>Phone : </strong> 9876543210
                      </div>
                      <div>
                        <strong>Status : </strong>{" "}
                        <span className='badge'>Active</span>
                      </div>
                      <div>
                        <strong>Exchange App URL : </strong>view
                      </div>
                    </div>
                  </Box>
                </Grid2>
                <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
                  <Box>
                    <div className='p2p-user-head'>P2P Info</div>
                    <div className='mt-10 p2p-user'>
                      <div>
                        <strong>Nick Name : </strong>boss
                      </div>
                      <div>
                        <strong>Created At : </strong>21 Oct, 2024 09:46 pm
                      </div>
                      <div>
                        <strong>Average Payment Time : </strong>0.5 Minutes
                      </div>
                      <div>
                        <strong>Average Release Time : </strong> 0 Minutes
                      </div>
                      <div>
                        <strong>30d Trade(s) : </strong> 0
                      </div>
                      <div>
                        <strong>Total Trade(s) : </strong> 0
                      </div>
                      <div>
                        <strong>30d Completion Rate : </strong> 0%
                      </div>
                      <div>
                        <strong>Total Completion Rate : </strong> 0%
                      </div>
                      <div>
                        <strong>Total Feedback : </strong> 0
                      </div>
                      <div>
                        <strong>Positive Feedback : </strong>{" "}
                        <span style={{ color: "green" }}>0 (0.00%)</span>
                      </div>
                      <div>
                        <strong>Negative Feedback : </strong>{" "}
                        <span style={{ color: "red" }}>0 (0.00%)</span>
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

export default P2PUsers;
