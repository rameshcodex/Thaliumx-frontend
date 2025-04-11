import React, { useEffect, useState } from "react";
import { Button, FormControlLabel, InputLabel, Switch, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../Header/Header";
import { Box, Grid2 } from "@mui/material";
import Modal from "@mui/material/Modal";
import SaveIcon from "@mui/icons-material/Save";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ReusableTable from "../ReuseTable/ReuseTable";
import Axios from "axios";
import consts from "../../constant";
import './Blog.css'
const drawerWidth = 260;

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: "12px",
    boxShadow: 24,
    p: 4,
};

const Blog = () => {
    const theme = useTheme();
    const lg = useMediaQuery(theme.breakpoints.up("lg"));
    const [category, setCategory] = useState("all")


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [collections, setCollections] = useState({ columns: [], row: [] });

    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }
    const handleCategoryChange = (event) => {
        setCategory(event.target.value)
    }
    const [status, setStatus] = useState("all")
    const [page, setPage] = useState(1)

    const paginationChange = (val) => {
        if (page !== val) {
            setPage(val)
        }
    }

    useEffect(() => {

        setCollections({
            columns: [
                { Header: "Title", accessor: "title", align: "left" },
                { Header: "Category", accessor: "category", align: "left" },
                { Header: "Status", accessor: "category", align: "left" },
                { Header: "CreatedAt", accessor: "createdAt", align: "left" },
                { Header: "UpdatedAt", accessor: "updatedAt", align: "left" },
                { Header: "Action", accessor: "action", align: "left" },
            ], row: []
        })
    }, [])

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
                                <div>
                                    <h2 style={{ margin: 0 }}>Blog List</h2>
                                    <div className="txt-muted">Here goes the list of blogs</div>
                                </div>
                                <div className="display-2">
                                    <Box sx={{ minWidth: 150 }}>
                                        <div class="group">
                                            <svg viewBox="0 0 24 24" aria-hidden="true" class="icon">
                                                <g>
                                                    <path
                                                        d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                                                    ></path>
                                                </g>
                                            </svg>
                                            <input class="input2" type="search" placeholder="name or address" />
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
                                                <MenuItem value={"all"} >All</MenuItem>
                                                <MenuItem value={"active"}>Active</MenuItem>
                                                <MenuItem value={"inactive"}>In Active</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ minWidth: 150 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="category">Category</InputLabel>
                                            <Select
                                                labelId="category"
                                                id="category"
                                                value={category}
                                                label="Category"
                                                onChange={handleCategoryChange}
                                                size="small"
                                            >
                                                <MenuItem value={"all"} >All</MenuItem>
                                                <MenuItem value={"p2p"} >P2P</MenuItem>
                                                <MenuItem value={"trade"}>Trade</MenuItem>
                                                <MenuItem value={"coin"}>Coin</MenuItem>
                                                <MenuItem value={"wallet"}>Wallet</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Button variant="contained" onClick={handleOpen}>Create</Button>
                                </div>
                            </div>

                            <ReusableTable collections={collections} paginationChange={paginationChange} page={page} />
                        </Grid2>
                    </Grid2>
                </Box>
            </Box>

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="display-2">
                        <h2>Create a new blog</h2>
                        <div className="text-right cursor">
                            <HighlightOffIcon onClick={handleClose} />
                        </div>
                    </div>
                    <div className="display-2" style={{ flexDirection: "column" , alignItems : "start" }}>
                        <TextField fullWidth label="Blog Title" />
                        <TextField fullWidth label="Blog Category" />
                        <TextField fullWidth label="Short Description" multiline rows={5} />
                        <TextField fullWidth label="Tags" />
                        <FormControlLabel control={<Switch/>} label="Status" labelPlacement="start"/>
                        <Button variant="contained" startIcon={<SaveIcon/>} className="save-btn">Create</Button>
                    </div>
                </Box>
            </Modal>



        </div >
    );
};

export default Blog;
