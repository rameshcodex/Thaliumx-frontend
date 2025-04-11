// import './UserWithdrawHistry.css';
import React, { useState, useEffect, useContext } from 'react';
// import './Dashboard.css';
import { Avatar, Box, Button, Grid2, TextField } from '@mui/material';
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
import {AuthContext}  from '../../Authprovider';
import consts from "../../constant";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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


const TradePair = () => {
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState([]);
  const navigate = useNavigate()
  const {auth, toggleAuth } = useContext(AuthContext);
  
  const [imageUrl, setImageUrl] = useState(null);

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


  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
    const [check,setCheck]=useState(false)

  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));

  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [buysell, setBuySell] = useState(10);
  
    const handleChangeTradeBuySell = (event) => {
      setBuySell(event.target.value);
    };
  

  // const Navigate=useNavigate();
  const tabelHeader = ["S.no", "Coin Name", "Deposit Status", "Withdraw Status", "Trading Status",
    //  "Action"
  ];

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
      setCollections({
        columns: [
          { Header: "Sno", accessor: "sno", align: "left" },
          { Header: "Name", accessor: "name", align: "left" },
          { Header: "Email", accessor: "email", align: "left" },
          { Header: "Phone", accessor: "phone", align: "left" },
          { Header: "Action", accessor: "view", align: "left" },
        ],
        row: [
          {
            sno: <div>1</div>,
            name: <div>Sankar</div>,
            phone: <div>1234567890</div>,
            email: <div>Sankar</div>,
            view: <div>
              <Button variant='contained' onClick={handleOpen}>
                View/Edit
              </Button>
            </div>,
           
          },
        ],
        // row:[]
      });
    }, []);

    

  return (
    <div className="Trade Pair">
      <Box sx={{ display: lg ? 'flex' : 'block' }}>
        <Header />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 5, width: { lg: `calc(100% - ${drawerWidth}px)` }, marginTop: '50px' }}
        >
          <Grid2 container spacing={2}>
          <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <div className="display-2">
            <h2>Trade Pair</h2>
              <Button
                                variant="contained"
                                color="primary"
                                // onClick={handleOpen}
                                onClick={(()=>{navigate(`/${consts.route + auth +'/createpair'}`)})}
                              >
                                Create
                              </Button>
            </div>
     
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
         <ReusableTable collections={collections} />
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
          <h2 className="text-center">Edit Pair</h2>
           <div className="display-1">
                        <Avatar alt="Remy Sharp" src={imageUrl}   sx={{ width: 56, height: 56 }} />
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
              <PinkSwitch {...label} defaultChecked  onChange={(()=>{setCheck(!check)})}/>
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

export default TradePair;
