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
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Axios from "../../Axios";
import ReusableTable from "../ReuseTable/ReuseTable";
import { Close, Height } from "@mui/icons-material";
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
      role="tabpanel"
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: "600px !important",
  overflowY: "scroll",
  "@media(max-width:767.98px)": {
    width: "95%",
  },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
const KYCVerify = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({
    columns: [
      { Header: "First Name", accessor: "fName", align: "left" },
      { Header: "Email", accessor: "email", align: "left" },
      { Header: "Postalcode", accessor: "postalcode", align: "left" },
      { Header: "City", accessor: "city", align: "left" },
      { Header: "StateOrProvince", accessor: "stateOrProvince", align: "left" },
      { Header: "Action", accessor: "action", align: "left" },
    ],
    row: [],
  });
  const [value, setValue] = useState(0);
  const [status, setStatus] = useState("all");

  const [open, setOpen] = useState(false);
  const [fullDetail, setFullDetail] = useState([]);

  const handleOpen = (user) => {
    setOpen(true);
    setFullDetail(user);
    console.log(fullDetail, "fullDetail");
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  // useEffect(() => {
  //   setCollections({
  //     columns: [
  //       { Header: "Image", accessor: "image", align: "left" },
  //       { Header: "Request Id", accessor: "request_id", align: "left" },
  //       { Header: "Name", accessor: "name", align: "left" },
  //       { Header: "Usercode", accessor: "usercode", align: "left" },
  //       { Header: "Status", accessor: "status", align: "left" },
  //       { Header: "Action", accessor: "action", align: "left" },
  //     ],
  //     row: [
  //       {
  //         action: (
  //           <Button
  //             onClick={handleOpen}
  //             variant='contained'
  //             className='action-btn'
  //           >
  //             Action
  //           </Button>
  //         ),
  //       },
  //     ],
  //   });
  // }, []);

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
      getKycList(1, debouncedTerm);
      setPage(1);
    }
  }, [debouncedTerm]);

  const getKycList = async (pgs, search) => {
    try {
      const { data } = await Axios.get(
        `/kycsList?page=${pgs ? pgs : page}&limit=10`,
        { email: search },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("nzanzi")}`,
          },
        }
      );
      console.log(data, "data");

      if (data?.success == true && data?.result?.docs?.length > 0) {
        var dts = data?.result?.docs;
        var totalCount = data?.result?.totalPages;
        var formattedRows = [];
        for (let i = 0; i < dts.length; i++) {
          const element = dts[i];
          var obj = {};
          obj.sno = <div>{i + 1}</div>;
          obj.fName = (
            <div>{element?.Firstname ? element?.Firstname : "-"}</div>
          );
          obj.postalcode = (
            <div>{element?.postalcode ? element?.postalcode : "-"}</div>
          );
          obj.email = <div>{element?.email ? element?.email : "-"}</div>;
          obj.city = <div>{element?.city ? element?.city : "-"}</div>;
          obj.stateOrProvince = (
            <div>
              {element?.stateOrProvince ? element?.stateOrProvince : "-"}
            </div>
          );
          obj.action = (
            <div className="display-1">
              <Button
                variant="contained"
                onClick={() => {
                  //  setSelcId(element?._id)
                  //  setName(element?.name);
                  //  setUserName(element?.username);
                  //  setEmail(element?.email);
                  //  setPhone(element?.phone);
                  //  setPermission(element?.permission?._id);
                  //  setStatus(element?.verified);
                  //  handleOpen(0);
                  handleOpen(element);
                }}
              >
                Action
              </Button>
            </div>
          );
          formattedRows.push(obj);
        }
        setCollections((prevState) => ({
          ...prevState,
          row: formattedRows,
          pagecount: totalCount,
        }));
      } else {
        setCollections((prevState) => ({
          ...prevState,
          row: [],
          pagecount: 0,
        }));
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getKycList();
  }, [page]);

  return (
    <div className="blog">
      <Box sx={{ display: lg ? "flex" : "block" }}>
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 5,
            width: { lg: `calc(100% - ${drawerWidth}px)` },
            marginTop: "50px",
          }}
        >
          <Grid2 container spacing={2}>
            <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <div className="display-2 mb-10">
                <h2 style={{ margin: 0 }}>
                  KYC Verification Request Management
                </h2>
              </div>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="Pending"
                    {...a11yProps(0)}
                    className="tab-title"
                  />
                  <Tab label="All" {...a11yProps(1)} className="tab-title" />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <div className="display-4 mb-10  wrap-field">
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id="sort">Sort</InputLabel>
                      <Select
                        labelId="sort"
                        id="sort"
                        label="Sort"
                        size="small"
                        value={"new"}
                      >
                        <MenuItem value={"new"}>Newest </MenuItem>
                        <MenuItem value={"old"}>Oldest</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <div class="group">
                      <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
                        <g>
                          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                      </svg>
                      <input
                        class="input2"
                        type="search"
                        placeholder="name or address"
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          if (e.target.value == "") {
                            getKycList(1, "");
                            setPage(1);
                          }
                        }}
                      />
                    </div>
                  </Box>
                </div>
                <ReusableTable
                  collections={collections}
                  paginationChange={paginationChange}
                  page={page}
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <div className="display-4 mb-10  wrap-field">
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id="status">Status</InputLabel>
                      <Select
                        labelId="status"
                        id="status"
                        value={status}
                        label="Status"
                        size="small"
                        onChange={handleStatusChange}
                      >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"pending"}>Pending</MenuItem>
                        <MenuItem value={"open"}>Open</MenuItem>
                        <MenuItem value={"complete"}>Completed</MenuItem>
                        <MenuItem value={"cancel"}>Cancelled</MenuItem>
                        <MenuItem value={"expired"}>Expired</MenuItem>
                        <MenuItem value={"failed"}>Failed</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <FormControl fullWidth>
                      <InputLabel id="sort">Sort</InputLabel>
                      <Select
                        labelId="sort"
                        id="sort"
                        value={"new"}
                        label="Sort"
                        size="small"
                      >
                        <MenuItem value={"new"}>Newest </MenuItem>
                        <MenuItem value={"old"}>Oldest</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={fieldStyle}>
                    <div class="group">
                      <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
                        <g>
                          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                      </svg>
                      <input
                        class="input2"
                        type="search"
                        placeholder="name or address"
                      />
                    </div>
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
          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="display-2 mb-10">
                <h3>User Kyc Verification Request Details</h3>
                <Close onClick={handleClose} className="cursor" />
              </div>

              <Box>
                <div className="mt-10 p2p-user x-mod">
                  <div className="display-2">
                    <strong> ID : </strong>{" "}
                    {fullDetail?.id ? fullDetail?.id : "N/A"}
                  </div>
                  <div className="display-2">
                    <strong>Firstname: </strong>
                    {fullDetail?.Firstname ? fullDetail?.Firstname : "N/A"}
                  </div>
                  <div className="display-2">
                    <strong>Lastname: </strong>
                    {fullDetail?.Lastname ? fullDetail?.Lastname : "N/A"}
                  </div>
                  <div className="display-2">
                    <strong>Email : </strong>
                    {fullDetail?.email ? fullDetail?.email : "N/A"}
                  </div>
                  <div className="display-2">
                    <strong>Phone : </strong>
                    {fullDetail?.phone ? fullDetail?.phone : "N/A"}
                  </div>
                  <div className="display-2">
                    <strong>ID_Image_front : </strong>
                    {fullDetail?.ID_Image_front ? (
                      <img
                        src={fullDetail?.ID_Image_front}
                        style={{ width: "100px" }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </div>
                  <div className="display-2">
                    <strong>ID_Image_back : </strong>
                    {fullDetail?.ID_Image_Back ? (
                      <img
                        src={fullDetail?.ID_Image_Back}
                        style={{ width: "100px" }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </div>
                  <div className="display-2">
                    <strong>FacialImage : </strong>
                    {fullDetail?.LivenessDatas?.Id_card_result?.FacialImage ? (
                      <img
                        src={`data:image/png;base64,${fullDetail?.LivenessDatas?.Id_card_result?.FacialImage}`}
                        style={{ width: "100px" }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </div>
                  <div className="display-2">
                    <strong>ID_Number : </strong>
                    {fullDetail?.ID_Number ? fullDetail?.ID_Number : "N/A"}
                  </div>
                  <div className="display-2">
                    <strong>ID_country : </strong>
                    {fullDetail?.ID_country ? fullDetail?.ID_country : "N/A"}
                  </div>
                  <div className="display-2">
                    <strong>ID_type : </strong>
                    {fullDetail?.ID_type ? fullDetail?.ID_type : "N/A"}
                  </div>
                  <div className="display-2">
                    <strong>address_line1 : </strong>
                    {fullDetail?.address_line1
                      ? fullDetail?.address_line1
                      : "N/A"}
                  </div>
                  <div className="display-2">
                    <strong>address_line2 : </strong>
                    {fullDetail?.address_line2
                      ? fullDetail?.address_line2
                      : "N/A"}
                  </div>
                  <div className="display-2">
                    <strong>Address_proof : </strong>
                    {fullDetail?.address_proof ? (
                      <img
                        src={fullDetail?.address_proof}
                        style={{ width: "100px" }}
                      />
                    ) : (
                      "N/A"
                    )}
                  </div>
                  <div className="display-2">
                    <strong>City : </strong>
                    {fullDetail?.city ? fullDetail?.city : "N/A"}
                  </div>
                  <div className="display-2">
                    <strong>Postalcode : </strong>
                    {fullDetail?.postalcode ? fullDetail?.postalcode : "N/A"}
                  </div>
                  <div className="display-2">
                    <strong>StateOrProvince : </strong>{" "}
                    {fullDetail?.stateOrProvince
                      ? fullDetail?.stateOrProvince
                      : "N/A"}
                  </div>
                  <div className="display-2">
                    <strong>Created at : </strong>{" "}
                    {fullDetail?.createdAt ? fullDetail?.createdAt : "N/A"}
                  </div>

                  <div className="display-2">
                    <strong>Address_line1 : </strong>{" "}
                    {fullDetail?.address_line1
                      ? fullDetail?.address_line1
                      : "N/A"}
                  </div>
                  {/* <div>
                    <strong> Doument Validation (From Third Party): </strong>{" "}
                    <span className="badge">Completed</span>
                  </div>
                  <div>
                    <strong>Status : </strong>
                    <span className="badge">pending</span>
                  </div> */}
                  {/* <div className="display-1 margin-top">
                    <Button
                      variant="contained"
                      className="action-btn"
                      size="small"
                      color="success"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      className="action-btn"
                      size="small"
                      color="error"
                    >
                      Reject
                    </Button>
                  </div> */}
                </div>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </div>
  );
};

export default KYCVerify;
