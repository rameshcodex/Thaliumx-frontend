import React, { useEffect, useState } from "react";
import "./Withdraw.css";
import {

  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Avatar, Box, Grid2 } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useForm } from "react-hook-form";
import { red } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import ReusableTable from "../ReuseTable/ReuseTable";


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

const Withdraw = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const navigate = useNavigate()


  const {
    register: addUser,
    handleSubmit: handleAddUser,
    formState: { errors: errorsAddUser },
  } = useForm();

  const {
    register: editUsr,
    handleSubmit: handleEditUser,
    setValue,
    getValues:blockUser,
    formState: { errors: errorsEditUser },
  } = useForm();

  const { setValue:setDeleteUser, getValues } = useForm();

  const onSubmitUser = (data) => {
    console.log(data);
  };

  const onSubmitEditUser = (data) => {
    console.log(data);
  };


  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = (val) => {
    setOpenEdit(true);
    setValue("name",val.name);
    setValue("email",val.email);
    setValue("country",val.country);
    setValue("phone",val.phone);

  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const [OpenDeleteUser,setOpenDeleteUser]=useState(false)

  const handleOpenDelete = (val) => {
    setOpenDeleteUser(true);
    setDeleteUser("name",val.name)
  
  }
  const handleCloseDelete = () => setOpenDeleteUser(false);

  const [check,setCheck]=useState(false)

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

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

  
const [collections,setCollections]=useState({columns:[],row:[]})


useEffect(()=>{
  
setCollections({
  columns:[
    {Header:'Sno',accessor:'sno',align:'left'},
    {Header:'Date & Time',accessor:'date',align:'left'},
    {Header:'First Name	',accessor:'fname',align:'left'},
    {Header:'Last Name',accessor:'lname',align:'left'},
    {Header:'Email',accessor:'email',align:'left'},
    {Header:'Gender',accessor:'gender',align:'left'},
    {Header:'DOB',accessor:'dob',align:'left'},
  ],
  row:[
    {
      sno:(<div>
      1
      </div>),
       date:(<div>
        7/2/2025, 6:44:44 pm	
        </div>),
      fname:(<div>
        Sankar
        </div>),
          lname:(<div>
            Sankar
            </div>),
         dob:(
          <div>
            1986-02-16	
          </div>
        ),
        gender:(
          <div>
            Male	
          </div>
        ),
      email:(<div>
       mymail@mailinator.com	
        </div>),
        
     
    }
  ],
  // row:[]
})
  },[])


  return (
    <div className="users-container">
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
              <div className="display-2">
                <h2>Withdraw History</h2>
                <div className="display-1">
                <div class="group">
  <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
    <g>
      <path
        d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
      ></path>
    </g>
  </svg>
  <input class="input2" type="search" placeholder="Search" />
</div>
<Button
                  variant="contained"
                  color="primary"
                  // onClick={handleOpen}
                >
                  Search
                </Button>
<Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Add User
                </Button>
                </div>
               
              </div>

              {/* <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Country</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user,i) => (
                      <TableRow key={user.id} sx={{td:{color: (check && user.name === blockUser("name"))&& '#ccc'}}}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.country}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              // handleOpenEdit(user);
                              navigate("/thaliumxAdmin/userlist");
                            }}
                            // disabled={check && user.name === blockUser("name")}
                          >
                            View
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            style={{ marginLeft: "8px" }}
                            onClick={()=>{handleOpenDelete(user)}}
                            disabled={check && user.name === blockUser("name")}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer> */}
              <ReusableTable collections={collections}   />
            </Grid2>
          </Grid2>
        </Box>
        </Box>
         
      
     

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
          <h2 className="text-center">ADD USER</h2>
          <form
            onSubmit={() => {
              addUser(onSubmitUser);
            }}
          >
            <div className="add-suer-input">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                sx={{
                  width: "100%",
                  input: { padding: "13px" },
                  label: { top: "-3px" },
                  marginTop: "15px",
                }}
                {...addUser("name", { required: "Name is required" })}
                error={!!errorsAddUser.name}
                helperText={errorsAddUser.name?.message}
              />
            </div>
            <div className="add-suer-input">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{
                  width: "100%",
                  input: { padding: "13px" },
                  label: { top: "-3px" },
                  marginTop: "15px",
                }}
                {...addUser("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errorsAddUser.email}
                helperText={errorsAddUser.email?.message}
              />
            </div>
            <div className="add-suer-input">
              <TextField
                id="outlined-basic"
                label="Country"
                variant="outlined"
                sx={{
                  width: "100%",
                  input: { padding: "13px" },
                  label: { top: "-3px" },
                  marginTop: "15px",
                }}
                {...addUser("country", { required: "Country is required" })}
                error={!!errorsAddUser.country}
                helperText={errorsAddUser.country?.message}
              />
            </div>
            <div className="add-suer-input">
              <TextField
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                type="number"
                sx={{
                  width: "100%",
                  input: { padding: "13px" },
                  label: { top: "-3px" },
                  marginTop: "15px",
                }}
                {...addUser("phone", { required: "Phone Number is required" })}
                error={!!errorsAddUser.phone}
                helperText={errorsAddUser.phone?.message}
              />
            </div>
            <div className="add-suer-input">
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                sx={{
                  width: "100%",
                  input: { padding: "13px" },
                  label: { top: "-3px" },
                  marginTop: "15px",
                }}
                {...addUser("paswd", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]+$/,
                    message:
                      "Password must contain upper, lower, number & special char",
                  },
                })}
                error={!!errorsAddUser.paswd}
                helperText={errorsAddUser.paswd?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className="display-3 mt-20">
              <Button variant="contained" color="primary" type="submit">
                Add
              </Button>
              <Button
                variant="contained"
                color="error"
                style={{ marginLeft: "8px" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

    

      {/*Delete User */}
      <Modal
        open={OpenDeleteUser}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-right cursor">
            <HighlightOffIcon onClick={handleCloseDelete} />
          </div>
          <h2 className="text-center">Aare yo Sure you want to Delete {getValues("name")}</h2>
          <div className="display-3 mt-20">
              <Button variant="contained" color="primary" type="submit">
                Delete
              </Button>
              <Button
                variant="contained"
                color="error"
                style={{ marginLeft: "8px" }}
                onClick={()=>{handleCloseDelete()}}
              >
                Cancel
              </Button>
            </div>
          </Box>
          </Modal>
          
    </div>
  );
};

export default Withdraw;
