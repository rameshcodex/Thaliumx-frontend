// import './UserWithdrawHistry.css';
import React, { useState, useEffect, useContext, useRef } from 'react';
// import './Dashboard.css';
import { Avatar, Box, Button, FormControlLabel, Grid2, InputLabel, TextField } from '@mui/material';
import Header from '../Header/Header';
import Modal from "@mui/material/Modal";
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ToastContainer, toast } from "react-toastify";
import ReusableTable from '../ReuseTable/ReuseTable';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Reusemodel from '../ReuseModel/Reusemodel';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { red } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { AuthContext } from '../../Authprovider';
import consts from "../../constant";
import Axios from '../../Axios';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  '@media(max-width:767.98px)': {
    width: '95%'
  },
  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const PinkSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red[600],
    '&:hover': {
      backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: red[600],
  },
}));

const label = { inputProps: { 'aria-label': 'Color switch demo' } };

const drawerWidth = 260;


const Asset = () => {
  const [open, setOpen] = React.useState(false);
  const { auth, toggleAuth } = useContext(AuthContext);
  const [status, setStatus] = useState("All")
  const navigate = useNavigate()

  const [imageUrl, setImageUrl] = useState(null);

  const handleStatusChange = (event) => {
    setPage(1);
    setStatus(event.target.value)
  }
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    console.log(reader, "result of file");

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  const [check, setCheck] = useState(false)

  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const searchRef = useRef();
  const [searchTrack, setSearchTrack] = useState("");
  const [search, setSearch] = useState("");
  const [assets, setAssets] = useState({});
  const [buysell, setBuySell] = useState(10);

  const [page, setPage] = useState(1);

  const paginationChange = (val) => {
    if (page !== val) {
      setPage(val);
    }
  };

  const handleChangeTradeBuySell = (event) => {
    setBuySell(event.target.value);
  };

  const handleSearch = () => {
    setSearch(searchRef.current?.value)
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTrack(e.target.value);
  }

  const getAssets = async () => {
    try {
      const { data } = await Axios.post(
        `/admin/getallownassets?limit=10&page=${page}`,
        { status: status, search: search },
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data?.success == true) {
        setAssets(data?.result)
      } else {
        setAssets({});
      }
    } catch (error) {
      setAssets({});
      console.log(error);
    }
  }

  useEffect(() => {
    getAssets();
  }, [ page, status, search])

  useEffect(() => {
    if (searchRef.current?.value == "") {
      setSearch("")
      setPage(1);
    }
  }, [searchTrack])

  const statusDropdown = ["All", "Active", "In Active"];



  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      country: "India",
      phone: "7806939332",
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      country: "USA",
      phone: "45698727",
    },
  ]);

  const [collections, setCollections] = useState({ columns: [], row: [] });

  const [modelData, setModelData] = useState({ columns: [], row: [] });

  useEffect(() => {
    const formattedRow = assets?.docs?.map((item,index)=>(
      {
        ...item,
        status: item.status == true ? 'Active' : "In Active",
        createdAt:item.createdAt.split('T')[0],
        updatedAt:item.updatedAt.split('T')[0],
        image: (<img src={item.image} width={40} height={40} alt="img"/>),
        action: (
          <Button
            onClick={() => {
              navigate(`/${consts.route + "/createasset"}`,
                {state:{assetDetails:{
                  ...item,
                  createdAt:item.createdAt.split('T')[0],
                  updatedAt:item.updatedAt.split('T')[0],
                  // image: (<img src={item.image} width={40} height={40} alt="img"/>),
                }}}
              );
            }}
            variant='contained'
            className='action-btn'
          >
            Update
          </Button>
        )
      }));
    setCollections({
      columns: [
        { Header: "Logo", accessor: "image", align: "left" },
        { Header: "Currency", accessor: "symbol", align: "left" },
        // { Header: "Network", accessor: "network", align: "left" },
        { Header: "Status", accessor: "status", align: "left" },
        { Header: "Created At", accessor: "createdAt", align: "left" },
        { Header: "Updated At", accessor: "updatedAt", align: "left" },
        { Header: "Action", accessor: "action", align: "left" },

      ],
      row: formattedRow,
      pagecount: assets?.totalPages
      // row:[]
    });
  }, [assets]);



  return (
    <div className="Asset">
      <Box sx={{ display: lg ? 'flex' : 'block' }}>
        <Header />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 5, width: { lg: `calc(100% - ${drawerWidth}px)` }, marginTop: '50px' }}
        >
          <Grid2 container spacing={2}>
            <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <div className="display-2">
                <h2>Asset</h2>
                <div className='display-1'>
                  <Box sx={{ minWidth: 150 }}>
                    <div class="group">
                      <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
                        <g>
                          <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                          ></path>
                        </g>
                      </svg>
                      <input class="input2"
                        type="search"
                        placeholder="name or address"
                        ref={searchRef}
                        onChange={handleSearchChange}
                      />
                      <Button variant="contained" className="action-btn"
                        onClick={handleSearch}>
                        Search
                      </Button>
                    </div>
                  </Box>
                  <Box sx={{ minWidth: 150 }}>
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
                        {statusDropdown.map((status, statusIndex) => <MenuItem key={statusIndex} value={status}>{status}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    // onClick={handleOpen}
                    onClick={(() => { navigate(`/${consts.route + auth + '/createasset'}`) })}
                  >
                    Create
                  </Button>
                </div>
              </div>

            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <ReusableTable 
              collections={collections}
              paginationChange={paginationChange}
              page={page}
              />
            </Grid2>

            <Reusemodel />
          </Grid2>

          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="text-right cursor">
                <HighlightOffIcon onClick={handleClose} />
              </div>
              <h2 className="text-center">Edit Asset</h2>
              <div className="display-1">
                <Avatar alt="Remy Sharp" src={imageUrl} sx={{ width: 56, height: 56 }} />
                <div className="">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                  >
                    Upload
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleImageUpload}
                      multiple
                    />
                  </Button>
                </div>
              </div>
              <div className="add-suer-input">
                <TextField
                  id="outlined-basic"
                  label="Max Withdraw"
                  variant="outlined"
                  sx={{
                    width: "100%",

                    input: { padding: "13px" },
                    label: { top: "-3px" },
                    marginTop: "15px",
                  }}
                />
              </div>
              <div className="add-suer-input">
                <TextField
                  id="outlined-basic"
                  label="Withdraw Commission"
                  variant="outlined"
                  sx={{
                    width: "100%",

                    input: { padding: "13px" },
                    label: { top: "-3px" },
                    marginTop: "15px",
                  }}
                />
              </div>
              <Box
                sx={{
                  width: "100%",
                  "@media (max-width: 600px)": {
                    width: "100%",
                  },
                }}
                className="mt-20"
              >
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={buysell}
                    //   label="Age"
                    onChange={handleChangeTradeBuySell}
                  >
                    {" "}
                    <MenuItem value={0}>Type</MenuItem>
                    <MenuItem value={10}>Coin</MenuItem>
                    <MenuItem value={20}>Token</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <div className="add-suer-input">
                <TextField
                  id="outlined-basic"
                  label="Min Withdraw"
                  variant="outlined"
                  sx={{
                    width: "100%",

                    input: { padding: "13px" },
                    label: { top: "-3px" },
                    marginTop: "15px",
                  }}
                />
              </div>
              <Box
                sx={{
                  width: "100%",
                  "@media (max-width: 600px)": {
                    width: "100%",
                  },
                }}
                className="mt-20"
              >
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={buysell}
                    //   label="Age"
                    onChange={handleChangeTradeBuySell}
                  >
                    {" "}
                    <MenuItem value={0}>Network Type</MenuItem>
                    <MenuItem value={10}>BNB</MenuItem>
                    <MenuItem value={20}>ETH</MenuItem>
                    <MenuItem value={30}>TEST</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <div className='display-1'>
                <PinkSwitch {...label} defaultChecked onChange={(() => { setCheck(!check) })} />
                <div>
                  {check ? 'Enabled' : 'Disabled'}
                </div>
              </div>

              <div className="display-1 mt-20">
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Box>
          </Modal>
        </Box>
      </Box>
    </div>
  );
};

export default Asset;
