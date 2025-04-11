import React, { useState, useRef, useEffect } from "react";
import { Avatar, Box, Button, Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import "./Broker.css";
import { Toaster, toast } from "react-hot-toast";

import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import consts from "../../constant";

const drawerWidth = 260;

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

const Addbroker = () => {
  const [name, setName] = useState("");
  const [sitename, setSitename] = useState("");
  const [county, setCountry] = useState("");
  const [siteurl, setSiteurl] = useState("");
  const email = useRef(null);
  const pswdref = useRef(null);
  const theme = useTheme(null);
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();
  const [buysell, setBuySell] = useState(10);
  const [imageUrl, setImageUrl] = useState(null);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameerror, setNameErroe] = useState("");
  const [img, setImg] = useState("");
  const [res, setRes] = useState("");
  const [open, setOpen] = React.useState(false);

  const [password, savedData] = useState("");

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

  const handleChangeTradeBuySell = (event) => {
    setBuySell(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    console.log(reader, "result of file");

    reader.onloadend = () => {
      setImg(file);
      setImageUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePasswordChange = () => {
    try {
      const strongPasswordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      // const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
      // setHasSymbol(symbolRegex.test(pswdref.current.value));

      if (
        strongPasswordRegex.test(pswdref.current.value) ||
        pswdref.current.value === ""
      ) {
        setPasswordError("");
      } else {
        setPasswordError("Password Must Contain 8 characters Ex:Test@123");
      }
    } catch (error) {
      console.log(error, "err");
    }
  };

  const [textCopy, setTextCopy] = useState("");
  // const handleCopy = async () => {
  //   try {
  //     console.log("cpy");

  //     const text = `Name: ${res?.name}\nSite Name: ${res?.sitename}\nSite Url: ${consts.MainUrl}${consts.route}/${res?.sitename}/login`;

  //     // Check clipboard permission
  //     const permissionStatus = await navigator.permissions.query({
  //       name: "clipboard-write",
  //     });

  //     if (
  //       permissionStatus.state === "granted" ||
  //       permissionStatus.state === "prompt"
  //     ) {
  //       await navigator.clipboard.writeText(text);
  //       toast.success("Copied to clipboard!");
  //       console.log("Copied text:", text);
  //     } else {
  //       throw new Error("Clipboard permission denied");
  //     }
  //   } catch (err) {
  //     console.error("Failed to copy:", err);
  //     toast.error("Failed to copy!");
  //   }
  // };

  const handleemailChange = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(email.current.value) || email.current.value === "") {
      setEmailError("");
    } else {
      setEmailError("Invalid Email");
    }
  };

  const submit = async () => {
    try {
      console.log(email.current.value, "viojauy");

      if (name === "") {
        console.log("hai");
        toast.error("Name Must Not be Empty");
      } else if (email.current.value === "") {
        toast.error("Email Must Not Be Empty");
      } else if (pswdref === "") {
        toast.error("Password Must Not Be Empty");
      } else if (passwordError) {
        toast.error(passwordError);
      } else if (emailError) {
        toast.error(emailError);
      } else if (sitename === "") {
        toast.error("Site Name Must Not Be empty");
      } else if (siteurl === "") {
        toast.error("Site Url Must Not Be empty");
      } else if (county === "") {
        toast.error("county Must Not Be empty");
      } else if (imageUrl === null) {
        toast.error("Image Must Not Be Empty");
      } else {
        const formdata = new FormData();
        formdata.append("image", img);
        const imageup = await Axios.post(
          `${consts.BackendUrl}/users/imageUpload`,
          formdata,
          {
            headers: {
              Authorization: window.localStorage.getItem("nzanzi"),
            },
          }
        );
        console.log(imageup, "image");
        if (imageup?.data?.success === true) {
          let payload = {
            email: email.current.value,
            name: name,
            country: county,
            siteurl: siteurl,
            sitename,
            sitename,
            password: pswdref.current.value,
            logo: imageup?.data?.result,
          };
          const data = await Axios.post(
            `${consts.BackendUrl}/createsubadmin`,
            payload,
            {
              headers: {
                Authorization: window.localStorage.getItem("nzanzi"),
              },
            }
          );
          if (data) {
            toast.success(data?.data?.message);
            setRes(data?.data?.result);
            console.log(data?.data?.result, "datares");

            setName("");
            email.current.value = "";
            pswdref.current.value = "";
            setImageUrl(null);
            setImg("");
            setSitename("");
            setSiteurl("");
            setCountry("");
            setBuySell(10);
            // navigate(-1)
            setOpen(true);
          }
        }
        console.log(
          name,
          email,
          pswdref,
          sitename,
          siteurl,
          county,
          buysell,
          imageUrl,
          "inputdatsijhvb"
        );
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error, "err");
    }
  };

  // useEffect(() => {
  //  setRes('')
  // }, []);

  useEffect(() => {
    if (res && consts) {
      setTextCopy(

        `Site Url: ${consts.MainUrl}/${consts.route}/${res?.sitename || "N/A"}/login`
      );
    }
  }, [res, consts]); // Runs whenever res or consts change

  return (
    <div className="Addbroker">
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
              <div className="display-1">
                <ArrowBackIosIcon
                  className="cursor"
                  onClick={() => navigate(-1)}
                />
                <h2>Add Broker</h2>
              </div>
            </Grid2>
            <Grid2 item size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
              <h3>Site Logo</h3>
              <div className="display-1">
                <div className="upl-logo">
                  {imageUrl ? (
                    <img src={imageUrl} alt="imageUrl" />
                  ) : (
                    <div className="sixe-must">
                      Size Must be:
                      <div>100px X 100px</div>
                    </div>
                  )}
                </div>
                <div className="">
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                  >
                    {imageUrl ? "Re-Upload" : "Upload"}
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameErroe("");
                  }}
                  sx={{
                    width: "500px",
                    "@media (max-width: 600px)": {
                      width: "90%",
                    },
                    input: { padding: "13px" },
                    label: { top: "-3px" },
                    marginTop: "15px",
                  }}
                />
                <p>{nameerror != "" ? nameerror : nameerror}</p>
              </div>
              <div className="add-suer-input">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  onChange={handleemailChange}
                  inputRef={email}
                  sx={{
                    width: "500px",
                    "@media (max-width: 600px)": {
                      width: "90%",
                    },
                    input: { padding: "13px" },
                    label: { top: "-3px" },
                    marginTop: "15px",
                  }}
                />
              </div>
              {emailError !== "" ? emailError : ""}

              <div className="add-suer-input">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  onChange={handlePasswordChange}
                  inputRef={pswdref}
                  sx={{
                    width: "500px",
                    "@media (max-width: 600px)": {
                      width: "90%",
                    },
                    input: { padding: "13px" },
                    label: { top: "-3px" },
                    marginTop: "15px",
                  }}
                //   type="password"
                />
              </div>
              {passwordError !== "" ? passwordError : ""}
              <div className="add-suer-input">
                <TextField
                  id="outlined-basic"
                  label="Site Name"
                  variant="outlined"
                  value={sitename}
                  onChange={(e) => {
                    setSitename(e.target.value.toLowerCase());
                  }}
                  sx={{
                    width: "500px",
                    "@media (max-width: 600px)": {
                      width: "90%",
                    },
                    input: { padding: "13px" },
                    label: { top: "-3px" },
                    marginTop: "15px",
                  }}
                />
              </div>
              <div className="add-suer-input">
                <TextField
                  id="outlined-basic"
                  label="country"
                  variant="outlined"
                  value={county}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  sx={{
                    width: "500px",
                    "@media (max-width: 600px)": {
                      width: "90%",
                    },
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
                  value={siteurl}
                  onChange={(e) => {
                    setSiteurl(e.target.value);
                  }}
                  sx={{
                    width: "500px",
                    "@media (max-width: 600px)": {
                      width: "90%",
                    },
                    input: { padding: "13px" },
                    label: { top: "-3px" },
                    marginTop: "15px",
                  }}
                />
              </div>

              <Box
                sx={{
                  width: "500px",
                  "@media (max-width: 600px)": {
                    width: "90%",
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
                    {/* <MenuItem value={0}>Type</MenuItem> */}
                    <MenuItem value={10}>broker</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <div className="display-1 mt-20">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={submit}
                >
                  Submit
                </Button>
              </div>
            </Grid2>
          </Grid2>
        </Box>

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
                  // onClick={handleCopy}
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
    </div>
  );
};

export default Addbroker;
