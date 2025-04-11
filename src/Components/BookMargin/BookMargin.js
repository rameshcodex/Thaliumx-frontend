
// import './UserWithdrawHistry.css';
import React, { useState, useEffect } from 'react';
// import './Dashboard.css';
import { Avatar, Box, Button, Grid2 } from '@mui/material';
import Header from '../Header/Header';
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import consts from "../../constant";
import Axios from "axios";
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ToastContainer, toast } from "react-toastify";
import './BookMargin.css';
import { useLocation } from 'react-router-dom';


const drawerWidth = 260;

const BookMargin = () => {


  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState([]);
  const navigate = useNavigate()
  const [loader, setloader] = useState(true)
  const [addpage, setaddpage] = useState(false)

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  
  const [orderStatus, setOrderStatus] = useState('all');

const {pathname} = useLocation()

console.log(orderStatus,pathname,'orderStatus');

useEffect(() => {
if(pathname === '/marginfxadmin/abookmargin'){
  setOrderStatus('a Book Margin')
}else {
  setOrderStatus('b Book Margin')
}
},[pathname])

  // const Navigate=useNavigate();
  const tabelHeader = ["User ID", "Customer Name", "Account ID", "Fund", "Balance", 'Equity',"Margin Level", "Group Name", "Total PNL", "Details",
    //  "Action"
  ];
  return (
    <div className="BookMargin">
      <Box sx={{ display: lg ? 'flex' : 'block' }}>
        <Header />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 5, width: { lg: `calc(100% - ${drawerWidth}px)` }, marginTop: '50px' }}
        >
          <Grid2 container spacing={2}>

            <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <div className="text-center clr-white">
                {orderStatus} 
              </div>
              <div className="custom_table">
                <TableContainer >
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        {tabelHeader.map((val, index) => {
                          return (
                            <TableCell align='center'>{val}</TableCell>
                          )
                         
                        })}

                      </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow
                        
                        >
                          <TableCell component="th" scope="row" align='center'>
                          45
                          </TableCell>
                          <TableCell component="th" scope="row" align='center'>
                          Venkataramanan
                          </TableCell>
                          <TableCell component="th" scope="row" align='center'>
                          10045
                          </TableCell>
                          <TableCell component="th" scope="row" align='center'>
                          1483.04
                          </TableCell>
                          <TableCell component="th" scope="row" align='center'>
                          1490.90
                          </TableCell>

                          <TableCell component="th" scope="row" align='center'>
                          1490.90
                          </TableCell>
                          <TableCell component="th" scope="row" align='center'>
                          18938.68%
                          </TableCell>
                          <TableCell component="th" scope="row" align='center'>
                          Standard
                          </TableCell>
                          <TableCell component="th" scope="row" align='center'>
                          199.14
                          </TableCell>
                          <TableCell component="th" scope="row" align='center'>
                      <div className="sho-d">
                      Show Details
                      </div>
                          </TableCell>
                         </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination className='pagnation'
                  //  count={Math.ceil(result?.length / limit)}
                  //  page={page}
                  //  onChange={(event, value) => {
                  //    setPage(value);
                  //  }}
                  // color='primary'
                  shape="rounded" />
              </div>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default BookMargin;
  