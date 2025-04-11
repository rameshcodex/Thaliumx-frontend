/* eslint-disable no-unused-vars, eqeqeq */
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";

import ReusableTable from "../ReuseTable/ReuseTable";
import { useNavigate } from "react-router-dom";
import consts from "../../constant";
import { AuthContext } from "../../Authprovider";
import { Close, Delete, EditNote } from "@mui/icons-material";
import Axios from "../../Axios";
import Chip from '@mui/material/Chip';
import toast from "react-hot-toast";
import debounce from "lodash.debounce";

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

const RoleList = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const [collections, setCollections] = useState({
    columns: [
      // { Header: "Sno", accessor: "sno", align: "center" },
      { Header: "Name", accessor: "name", align: "center" },
      { Header: "Permission", accessor: "permission", align: "center" },
      { Header: "Action", accessor: "action", align: "left" },
    ], row: []
  });

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedValues, setSelectedValues] = useState([]);
  const [modelDetail, setModelDetails] = useState("");

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  const [Name, setName] = useState("")

  const [createMode, setCreateMode] = useState(false)
  const [loading, setLoading] = useState(false)


  const [selectedId, setSelectedId] = useState("")

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
      getPermissionList(1, debouncedTerm);
    }
  }, [debouncedTerm]);

  const handleOpen = (detail) => {
    setOpen(true);
    setModelDetails(detail);
  };
  const handleClose = () => {
    setOpen(false);
    setName("")
    setSelectedValues([])
    setSelectedId("")
    setCreateMode(false)
  };
  const handleSelectedValue = (event) => {
    setSelectedValues(event.target.value);
  };

  var PermissionsList = [
    'Buy Sell',
    'Coin Pool',
    'Convert',
    'Crypto Currency',
    'Fiat Currency',
    'Future Trading',
    'Payment Methods',
    'P2P',
    'Role Management',
    'Spot Trading',
    'Staff',
    'Staking',
    'System Wallet',
    'User',
    'User Wallet',
    'Asset',
    'Support'
  ]

  const createModel = (
    <Grid2 container spacing={2}>
      <Grid2 item size={{ xs: 12 }}>
        <TextField label='Name' fullWidth variant='outlined' value={Name} onChange={(e) => { setName(e.target.value) }} />
      </Grid2>
      <Grid2 item size={{ xs: 12 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-multiple-checkbox-label'>
            Select Permissions
          </InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            label='Select Permissions'
            value={selectedValues}
            onChange={handleSelectedValue}
            renderValue={(selected) => selected.join(", ")}
          >
            {
              PermissionsList?.map((itm, i) => {
                return (
                  <MenuItem value={itm} key={i}>
                    <Checkbox
                      checked={selectedValues.indexOf(itm) > -1}
                      sx={{ display: "none" }}
                    />
                    <ListItemText primary={itm} />
                  </MenuItem>
                )
              })
            }

          </Select>
        </FormControl>
      </Grid2>
      <Button variant='contained' className='action-btn' onClick={() => { CreatePermission() }} >
        {createMode == true ? 'Create' : "Update"}
      </Button>
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

  const getPermissionList = async (pgs, search) => {
    console.log(pgs, search, "pgs, search")
    try {
      const { data } = await Axios.post(`/admin/getPermissionsList?page=${pgs ? pgs : page}&limit=10`, {
        Name: search
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
          obj.sno = (<div>{i + 1}</div>)
          obj.name = (<div>{element?.Name ? element?.Name : "-"}</div>)
          obj.permission = (<div>
            {element?.Permission?.map((rw, i) => {
              return (
                <Chip label={rw} variant="outlined" />
              )
            })}
          </div>)
          obj.action = (
            <div className='display-1'>
              <IconButton color='primary' onClick={() => { handleOpen(0); setSelectedId(element?._id); setName(element?.Name); setSelectedValues(element?.Permission) }} >
                <EditNote />
              </IconButton>
              {/* <IconButton color='error' onClick={() => handleOpen(1)}>
                <Delete />
              </IconButton> */}
            </div>
          )
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
    getPermissionList()
  }, [page]);

  const CreatePermission = async () => {
    try {
      if (!Name) return toast.error("Please Enter Name")
      if (selectedValues?.length == 0) return toast.error("Please Select Anyone Permission")
      var paylod = {
        Name: Name,
        Permission: selectedValues
      }
      setLoading(true)
      var url = ""
      if (createMode == true) {
        url = '/admin/createPermission'
      } else {
        paylod.Id = selectedId
        url = '/admin/updatePermission'
      }
      const { data } = await Axios.post(url, paylod, {
        headers: { Authorization: `Bearer ${window.localStorage.getItem('nzanzi')}` }
      })
      if (data?.success == true) {
        toast.success(data?.message)
        getPermissionList(1)
        setPage(1)
        handleClose()
      } else {
        toast.error(data?.message)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error, "error")
    }
  }

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
                  <h2 style={{ margin: 0 }}>Roles & Permission</h2>
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
                        placeholder='Name'
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          if (e.target.value == "") {
                            getPermissionList(1, "");
                            setPage(1)
                          }
                        }}
                      />
                    </div>
                  </Box>
                  <Button
                    variant='contained'
                    className='action-btn'
                    disabled={loading}
                    onClick={() => { handleOpen(0); setCreateMode(true) }}
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
          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <div className='display-2 mb-10'>
                <h3>{modelDetail === 0 ? "Create a Reason" : ""}</h3>
                <Close onClick={() => { setCreateMode(false); handleClose(); }} className='cursor' />
              </div>
              {modelDetail === 0 ? createModel : deleteModel}
            </Box>
          </Modal>
        </Box>
      </Box>
    </div>
  );
};

export default RoleList;
