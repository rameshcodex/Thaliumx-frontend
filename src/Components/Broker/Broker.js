// import './UserWithdrawHistry.css';
import React, { useState, useEffect, useContext } from "react";
// import './Dashboard.css';
import { Avatar, Box, Button, Grid2, TextField } from "@mui/material";
import Header from "../Header/Header";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Toaster, toast } from "react-hot-toast";
import ReusableTable from "../ReuseTable/ReuseTable";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Reusemodel from "../ReuseModel/Reusemodel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { red } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import consts from "../../constant";
import { AuthContext } from "../../Authprovider";
import Axios from "axios";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { CopyToClipboard } from "react-copy-to-clipboard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  "@media(max-width:767.98px)": {
    width: "95%",
  },

  bgcolor: "background.paper",
  // border: '2px solid #000',
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: red[600],
    "&:hover": {
      backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: red[600],
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

const drawerWidth = 260;

const Broker = () => {
  const [open, setOpen] = React.useState(false);
  const [result, setResult] = useState([]);
  const navigate = useNavigate();
  const { auth, toggleAuth } = useContext(AuthContext);
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

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [check, setCheck] = useState(false);
  const [res, setRes] = useState("");
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));

  const handleOpen = (user) => {
    console.log(user, "loguser");
    setRes(user);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [buysell, setBuySell] = useState(10);

  const handleChangeTradeBuySell = (event) => {
    setBuySell(event.target.value);
  };

  // const Navigate=useNavigate();
  const tabelHeader = [
    "S.no",
    "Coin Name",
    "Deposit Status",
    "Withdraw Status",
    "Trading Status",
    //  "Action"
  ];

  const [users, setUsers] = useState([]);

  const [collections, setCollections] = useState({ columns: [], row: [] });

  const [modelData, setModelData] = useState({ columns: [], row: [] });

  const [textCopy, setTextCopy] = useState("");

  //   const handleCopy = async () => {
  //     try {
  //         console.log("cpy");

  //         const text = `Name: ${res?.name}\nSite Name: ${res?.sitename}\nSite Url: ${consts.MainUrl}${consts.route}/${res?.sitename}/login`;

  //         const permissionStatus = await navigator.permissions.query({ name: "clipboard-write" });

  //         if (permissionStatus.state === "granted" || permissionStatus.state === "prompt") {
  //             await navigator.clipboard.writeText(text);
  //             toast.success("Copied to clipboard!");
  //             console.log("Copied text:", text);
  //         } else {
  //             throw new Error("Clipboard permission denied");
  //         }
  //     } catch (err) {
  //         console.error("Failed to copy:", err);
  //         toast.error("Failed to copy!");
  //     }
  // };

  const getbroker = async () => {
    try {
      const data = await Axios.post(
        `${consts.BackendUrl}/getsubadmin`,
        {},
        {
          headers: {
            Authorization: window.localStorage.getItem("nzanzi"),
          },
        }
      );
      if (data) {
        console.log(data?.data?.result, "data");
        setUsers(data?.data?.result);
      } else {
        toast.error("No Data Found");
        setUsers([]);
        setCollections((prevState) => ({
          ...prevState,
          row: [],
          pagecount: 0,
        }));
      }
    } catch (error) {
      console.log(error, "err");
      setUsers([]);
      setCollections((prevState) => ({
        ...prevState,
        row: [],
        pagecount: 0,
      }));
    }
  };

  useEffect(() => {
    if (users?.length > 0) {
      var formattedRows = [];
      for (let i = 0; i < users?.length; i++) {
        var obj = {};
        const user = users[i];
        obj.sno = <div>{i + 1}</div>;
        obj.name = <div>{user?.name ? user?.name : "-"}</div>;
        obj.email = <div>{user?.email}</div>;
        obj.role = <div>{user?.role ? user?.role : "-"}</div>;
        obj.siteurl = <div>{user?.siteurl ? user?.siteurl : "-"}</div>;
        obj.sitename = <div>{user?.sitename ? user?.sitename : "-"}</div>;
        obj.logo = (
          <img
            src={user?.logo ? user?.logo : "-"}
            alt={user?.logo ? user?.logo : "-"}
            width={"100px"}
            height={"100px"}
          />
        );
        obj.view = (
          <div>
            <Button
              variant="contained"
              onClick={() => {
                handleOpen(user);
              }}
            >
              View
            </Button>
          </div>
        );
        formattedRows.push(obj);
      }
      setCollections((prevState) => ({
        ...prevState,
        row: formattedRows,
      }));
    }
  }, [users]);

  useEffect(() => {
    getbroker();
  }, []);

  useEffect(() => {
    setCollections({
      columns: [
        { Header: "Sno", accessor: "sno", align: "left" },
        { Header: "Name", accessor: "name", align: "left" },
        { Header: "Email", accessor: "email", align: "left" },
        { Header: "role", accessor: "role", align: "left" },
        { Header: "site url", accessor: "siteurl", align: "left" },
        { Header: "site name", accessor: "sitename", align: "left" },
        { Header: "Logo", accessor: "logo", align: "left" },
        { Header: "Action", accessor: "view", align: "left" },
      ],
      row: [],
      // row:[]
    });
  }, []);

  useEffect(() => {
    if (res && consts) {
      setTextCopy(
        `Site Url: ${consts.MainUrl}/${consts.route}/${res?.sitename || "N/A"}/login`
      );
    }
  }, [res, consts]); // Runs whenever res or consts change

  return (
    <div className="Trade Pair">
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
                <h2>Broker</h2>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleOpen}
                  onClick={() => {
                    navigate(`/${consts.route + "/addbroker"}`);
                  }}
                >
                  Add Broker
                </Button>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <ReusableTable collections={collections} />
            </Grid2>

            <Reusemodel />
          </Grid2>

          {/* <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="text-right cursor">
                <HighlightOffIcon onClick={handleClose} />
              </div>
              <h2 className="text-center">Edit Broker</h2>
              <h3 className='text-center'>Site Logo</h3>
              <div className="display-1 flex-c">

                <div className="upl-logo">

                  {imageUrl ? <img src={imageUrl} alt="imageUrl" /> : <div className="sixe-must">
                    Size Must be:
                    <div>
                      100px X 100px
                    </div>
                  </div>}
                </div>
                <div className="">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                  >
                    {imageUrl ? 'Re-Upload' : 'Upload'}
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
                  label="Name"
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
                  label="Email"
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
                  label="Password"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    input: { padding: "13px" },
                    label: { top: "-3px" },
                    marginTop: "15px",
                  }}
                //   type="password"
                />
              </div>
              <div className="add-suer-input">
                <TextField
                  id="outlined-basic"
                  label="Site Name"
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
                  label="Site Url"
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
                    <MenuItem value={10}>User</MenuItem>
                    <MenuItem value={20}>Subadmiin</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <div className="display-1 mt-20">
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Box>
          </Modal> */}

          <Modal
            open={open}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="text-right cursor">
                <HighlightOffIcon
                  onClick={() => {
                    setRes("");
                    handleClose();
                  }}
                />
              </div>
              <h2 className="text-center">Site Details</h2>
              {/* <h3 className='text-center'>Site Logo</h3> */}

              <div className="p-20 bx-shw">
                <div className="text-right pa-r">
                  <CopyToClipboard
                    text={textCopy}
                    onCopy={() => toast.success("Copied to clipboard!")}
                  >
                    <ContentPasteIcon
                      className="cursor"
                    //  onClick={handleCopy}
                    />
                  </CopyToClipboard>
                </div>
                <div>Name: {res?.name}</div>
                <div>Site Name: {res?.sitename}</div>
                <div style={{ wordBreak: "break-all" }}>
                  Site Url:{" "}
                  <a
                    style={{ color: "#000" }}
                    href={`${consts.MainUrl}/${consts.route}/${res?.sitename}/login`}
                  >{`${consts.MainUrl}/${consts.route}/${res?.sitename}/login`}</a>
                </div>
              </div>
              <div className="display-3 mt-20">
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  onClick={() => {
                    setRes("");
                    handleClose();
                  }}
                >
                  Yes i Saved It
                </Button>
              </div>
            </Box>
          </Modal>
        </Box>
      </Box>
    </div>
  );
};

export default Broker;
