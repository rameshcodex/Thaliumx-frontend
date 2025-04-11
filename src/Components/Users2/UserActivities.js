import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import {
  Box,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReusableTable from "../ReuseTable/ReuseTable";
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
const UserActivities = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({ columns: [], row: [] });
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Device", accessor: "device", align: "left" },
        { Header: "Date", accessor: "date", align: "left" },
        { Header: "Source", accessor: "source", align: "left" },
        { Header: "Activity", accessor: "activity", align: "left" },
        { Header: "Status", accessor: "status", align: "left" },
        { Header: "Location", accessor: "Location", align: "left" },
        { Header: "IP Address", accessor: "IP_Address", align: "left" },
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
              <div className='display-1 mb-10'>
                <ArrowBackIosIcon
                  className='cursor'
                  onClick={() => navigate(-1)}
                />
                <h2 style={{ margin: 0 }}>Activities</h2>
              </div>
              <div className='display-4 mb-10  wrap-field'>
                <Box sx={fieldStyle}>
                  <FormControl fullWidth>
                    <InputLabel id='activity'>Activity</InputLabel>
                    <Select
                      labelId='activity'
                      id='activity'
                      label='Activity'
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
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default UserActivities;
