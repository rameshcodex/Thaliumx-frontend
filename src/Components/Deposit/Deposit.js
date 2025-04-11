import React, { useEffect, useState } from "react";
import "./Deposit.css";
import {
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";
import { useForm } from "react-hook-form";
import { red } from '@mui/material/colors';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import ReusableTable from "../ReuseTable/ReuseTable";
import Axios from "axios";
import consts from "../../constant";


const drawerWidth = 260;

const Deposit = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const [collections, setCollections] = useState({ columns: [], row: [] })

  const [search, setSearch] = useState("")

  const [depositHistory, setDepositHistory] = useState([])

  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)

  const depositandWithdrawHistory = async (type, search, page) => {
    try {
      setCollections(
        {
          columns: [
            { Header: 'Sno', accessor: 'sno', align: 'left' },
            { Header: 'Date', accessor: 'date', align: 'center' },
            { Header: 'Name', accessor: 'name', align: 'center' },
            { Header: 'Asset', accessor: 'asset', align: 'center' },
            { Header: 'From', accessor: 'from', align: 'center' },
            { Header: 'Amount', accessor: 'amount', align: 'center' },
            // { Header: 'Contract Address', accessor: 'contractAddress', align: 'center' },
            { Header: 'Status', accessor: 'status', align: 'center' },
          ]
        }
      )
      const { data } = await Axios.post(
        `${consts.BackendUrl}/wallet/adminGetDepositHistory?page=${page}&limit=10`,
        {
          type: type,
          search: search
        },
        {
          headers: {
            Authorization: localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data?.success == true) {
        if (data?.result?.docs?.length > 0) {
          setDepositHistory(data?.result?.docs)
          setTotalCount(data?.result?.totalPages)
        }
      } else {
        setDepositHistory([])
        setCollections(prevState => (
          {
            ...prevState,
            row: [],
            pagecount: 0
          }
        ))
      }
    } catch (error) {
      setDepositHistory([])
      setCollections(prevState => (
        {
          ...prevState,
          row: [],
          pagecount: 0
        }
      ))
      console.log(error, "error")
    }
  }

  useEffect(() => {
    depositandWithdrawHistory("deposit", search, 1)
  }, [])


  useEffect(() => {
    if (depositHistory?.length > 0) {
      var formattedRows = []
      for (let i = 0; i < depositHistory?.length; i++) {
        var obj = {}
        const users = depositHistory[i];
        obj.sno = (<div>{i + 1}</div>)
        obj.date = (<div>{users?.createdAt?.split("T")[0]} : {users?.createdAt?.split("T")[1]?.split(".")[0]}</div>)
        obj.name = (<div>{users?.user_id?.name ? users?.user_id?.name : "-"}</div>)
        obj.asset = (<div>{users?.asset ? users?.asset : "-"}</div>)
        obj.from = (<div>{users?.from ? users?.from : "-"}</div>)
        obj.amount = (<div>{users?.amount}</div>)
        // obj.contractAddress = (<div>{users?.contractAddress ? users?.contractAddress : "-"}</div>)
        obj.status = (<div>{users?.status}</div>)
        formattedRows.push(obj)
      }
      setCollections(prevState => ({
        ...prevState,
        row: formattedRows,
        pagecount: totalCount
      }));
    }
  }, [depositHistory])

  const paginationChange = (val) => {
    if (page !== val) {
      depositandWithdrawHistory("deposit", search, val);
      setPage(val)
    }
  }
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
                <h2>Deposit History</h2>
                <div className="display-1">
                  <div class="group">
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
                      <g>
                        <path
                          d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                        ></path>
                      </g>
                    </svg>
                    <input class="input2" type="search" placeholder="name or address" onChange={(e) => {
                      setSearch(e.target.value)
                      if (e.target.value == "") {
                        depositandWithdrawHistory("deposit", "", 1)
                        setPage(1)
                      }
                    }} />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => { depositandWithdrawHistory("deposit", search, 1); setPage(1) }}
                  >
                    Search
                  </Button>
                </div>
              </div>
              <ReusableTable collections={collections} paginationChange={paginationChange} page={page} />
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </div>
  );
};

export default Deposit;
