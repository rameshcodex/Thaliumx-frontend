import React, { useContext, useEffect, useMemo, useState } from "react";
// import PropTypes from 'prop-types';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import "./Header.css";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink, useParams } from "react-router-dom";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import Badge from "@mui/material/Badge";
import { useNavigate, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import { useState } from 'react';
import HistoryIcon from "@mui/icons-material/History";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import consts from "../../constant";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
// import Collapse from '@mui/material/Collapse';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsAccessibilityIcon from "@mui/icons-material/SettingsAccessibility";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { AuthContext } from "../../Authprovider";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, Collapse , Modal,} from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Axios from "../../Axios";
import { useSidebar } from "../../SidebarContext";
import { Close, Delete, EditNote } from "@mui/icons-material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import toast from "react-hot-toast";
import CircularProgress from '@mui/material/CircularProgress';


const drawerWidth = 260;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  "@media(max-width:767.98px)": {
    width: "95%",
  },
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

function ResponsiveDrawer(props) {
  const [open, setOpen] = useState(() => Number(localStorage.getItem("open")));

  const { dynamicValue } = useParams();
  const { auth, toggleAuth, brokerLogo } = useContext(AuthContext);
  const [logoUrl, setLogoUrl] = useState();
  const [tradeType, setTradeType] = useState(0);
  const [load,setLoad]=useState(false)

  console.log(tradeType, "tradeType");

  const handleTradeType = (e) => {
    setTradeType(e.target.value);
  };

  const { filteredDrawerData, setUserRole } = useSidebar();

  const handleClick = (val) => {
    if (open === val) {
      setOpen(null);
      localStorage.setItem("open", null);
    } else {
      setOpen(val);
    }
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // const [broker,setBroker] = useState(auth ? '/user' :'')

  const result = useLocation();
  const pathDate = result.pathname;

  // console.log(date, 'date');

   const [openModel, setOpenModel] = useState(false);

   const handleClose = () => {
    setOpenModel(false);
  };

 

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  useEffect(() => {
    localStorage.setItem("open", open);
  }, [open]);
  const navigate = useNavigate();

  const [initialDatas, setInitialDatas] = useState([
    {
      Name: "Dashboard",
      Icon: <SpaceDashboardIcon style={{ fill: "#fff" }} />,
      Link: "/dashboard",
      Access: true,
      subDir: [],
    },
    {
      Name: "Profile",
      Icon: <PersonIcon style={{ fill: "#fff" }} />,
      Link: "/profile",
      Access: true,
      subDir: [],
    },
    {
      Name: "Buy Sell",
      Icon: <SellIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "Crypto History",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/crypto-history",
        },
      ],
    },
    {
      Name: "Coin Pool",
      Icon: <PaidIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "Dashboard",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/coin-pool/dashboard",
        },
        {
          Name: "Network Balance",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/coin-pool/network-balance",
        },
        {
          Name: "Withdrawal History",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/coin-pool/withdrawal",
        },
      ],
    },
    {
      Name: "Convert",
      Icon: <CurrencyExchangeIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "History",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/convert-history",
        },
      ],
    },
    {
      Name: "Crypto Currency",
      Icon: <AttachMoneyIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "Create",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/create/crypto-currency",
        },
        {
          Name: "List",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/crypto-currency",
        },
      ],
    },
    {
      Name: "Fiat Currency",
      Icon: <CurrencyBitcoinIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "List",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/fiat-currency",
        },
      ],
    },
    {
      Name: "Future Trading",
      Icon: <CurrencyExchangeIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "Currency Pairs",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/futures-trade/currency-pairs",
        },
        {
          Name: "Buy Orders",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/futures-trade/buy-orders",
        },
        {
          Name: "Sell Orders",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/futures-trade/sell-orders",
        },
        {
          Name: "Trade",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/futures-trade/trade",
        },
        {
          Name: "Transactions",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/futures-trade/transactions",
        },
        {
          Name: "Positions",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/futures-trade/positions",
        },
        {
          Name: "Positions History",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/futures-trade/positions-histories",
        },
        {
          Name: "Processing Positions",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/futures-trade/processing-positions",
        },
      ],
    },
    {
      Name: "Payment Methods",
      Icon: <PaymentIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "Method Types",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/payment-method/method-types",
        },
        {
          Name: "Allowed Methods",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/payment-method/allowed-methods",
        },
        {
          Name: "System Methods",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/payment-method/system-methods",
        },
      ],
    },
    {
      Name: "P2P",
      Icon: <GroupIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "Ads",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/p2p/ads",
        },
        {
          Name: "Orders",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/p2p/orders",
        },
        {
          Name: "Assigned To Me",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/p2p/assigned-to-me",
        },
        {
          Name: "User Profile",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/p2p/users",
        },
        {
          Name: "Reports",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/p2p/reports",
        },
        {
          Name: "Reasons",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/p2p/reasons",
        },
      ],
    },
    {
      Name: "Role Management",
      Icon: <CurrencyBitcoinIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "List",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/role",
        },
      ],
    },
    {
      Name: "Spot Trading",
      Icon: <CurrencyExchangeIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "Currency Pairs",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/spot/currency-pair",
        },
        {
          Name: "Buy Orders",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/spot/buy-orders",
        },
        {
          Name: "Sell Orders",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/spot/sell-orders",
        },
        {
          Name: "Trades",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/spot/trade",
        },
      ],
    },
    {
      Name: "Staff",
      Icon: <CurrencyBitcoinIcon style={{ fill: "#fff" }} />,
      Link: "/staff",
      Access: true,
      subDir: [],
    },
    {
      Name: "Staking",
      Icon: <CurrencyBitcoinIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "Dashboard",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/staking/dashboard",
        },
        {
          Name: "Offers",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/staking/offers",
        },
        {
          Name: "Investments",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/staking/investments",
        },
        {
          Name: "Payouts",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/staking/payouts",
        },
      ],
    },
    {
      Name: "System Wallet",
      Icon: <AccountBalanceWalletIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "Deposit History",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/system-wallet/deposit",
        },
        {
          Name: "Wallet",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/system-wallet/wallet",
        },
        {
          Name: "Withdrawal History",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/system-wallet/withdrawal",
        },
      ],
    },
    {
      Name: "User",
      Icon: <GroupIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "Address Verification",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/user/address-verification",
        },
        {
          Name: "KYC",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/user/kyc-verification",
        },
        {
          Name: "Users list",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/users",
        },
        {
          Name: "Security reset",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/user/security-reset",
        },
      ],
    },
    {
      Name: "User Wallet",
      Icon: <AccountBalanceWalletIcon style={{ fill: "#fff" }} />,
      Link: "",
      Access: true,
      subDir: [
        {
          Name: "Deposit",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/user-wallet/deposit",
        },
        {
          Name: "Issues",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/user-wallet/issues",
        },
        {
          Name: "Wallet",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/user-wallets",
        },
        {
          Name: "Withdrawal",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/user-wallet/withdrawal",
        },
        {
          Name: "Address",
          Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
          Link: "/user-wallet/address",
        },
      ],
    },
    {
      Name: "Asset",
      Icon: <LocalAtmIcon style={{ fill: "#fff" }} />,
      Link: "/asset",
      Access: true,
      subDir: [],
    },
    {
      Name: "Networks",
      Icon: <LocalAtmIcon style={{ fill: "#fff" }} />,
      Link: "/networks",
      Access: true,
      subDir: []
    },
    {
      Name: "support",
      Icon: <SupportAgentIcon style={{ fill: "#fff" }} />,
      Link: "/support",
      Access: true,
      subDir: [],
    },
  ]);

  // const [drawerDatas, setDrawerDatas] = useState([])

  // const getPermissionList = async () => {
  //   try {
  //     const { data } = await Axios.post('/admin/subAdminPermissionList', {}, {
  //       headers: { Authorization: `Bearer ${window.localStorage.getItem('nzanzi')}` }
  //     })
  //     if (data?.success && data?.result?.permission?.Permission?.length > 0) {
  //       var dats = data?.result?.permission?.Permission
  //       console.log(dats, "dsahfuisad")
  //       var temp = []
  //       for (let i = 0; i < initialDatas.length; i++) {
  //         const element = initialDatas[i];
  //         if (dats?.includes(element?.Name)) {
  //           temp.push(element)
  //         }
  //       }
  //       setDrawerDatas(temp)
  //     }
  //   } catch (error) {
  //     setDrawerDatas(initialDatas)
  //     console.log(error, "error")
  //   }
  // }

  // useEffect(() => {
  //   getPermissionList()
  // }, [])

  const [permissions, setPermissions] = useState([]);
  const [drawerDatas, setDrawerDatas] = useState(filteredDrawerData);

  const getPermissionList = async () => {
    try {
      const { data } = await Axios.post(
        "/admin/subAdminPermissionList",
        {},
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("nzanzi")}`,
          },
        }
      );

      if (data?.success && data?.result?.permission?.Permission?.length > 0) {
        // setPermissions();
        var permis = data?.result?.permission?.Permission;
        console.log(permis, "permispermis");
        setUserRole(permis);
        // setDrawerDatas(initialDatas.filter(item => permis.includes(item.Name)))
      }
    } catch (error) {
      console.log(error, "error");
      setDrawerDatas([initialDatas]); // If error, reset permissions
    }
  };

  useEffect(() => {
    getPermissionList();
  }, []);

  const getTradeType = async () => {
    try {
      setLoad(true);
      const { data } = await Axios.post(
        "/admin/ChangeModeOfTrade",
        {
          type: tradeType
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("nzanzi")}`,
          },
        }
      );
      console.log(data, "data");

      if (data?.success == true) {
        // setTradeType(data?.result?.tradeType);
        toast.success(data?.message);
      setLoad(false);
        setOpenModel(false);
        
        
      }
    } catch (error) {
      console.log(error, "error");
      
    }
  }

  var drawer = (
    <div>
      {/* <div className="logo-h">
        <img src={logo} alt="logo" />
      </div> */}
      {/* {brokerLogo ? ( */}
      <div className="text-center mt-10">
        <img
          src={brokerLogo}
          alt="Thaliumx"
          style={{ width: "90px" }}
          className="log-logo"
        />
      </div>

      <Divider />
      <Box sx={{ height: "calc(100vh - 100px)", overflowY: "scroll" }}>
        {filteredDrawerData?.length > 0 &&
          filteredDrawerData?.map((item, i) => {
            if (item?.subDir?.length == 0 && item?.Access == true) {
              return (
                <div>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active" : "not-active"
                    }
                    to={`/${consts.route + auth + item?.Link}`}
                    onClick={() => {
                      setOpen(null);
                      localStorage.setItem("open", null);
                    }}
                  >
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>{item?.Icon}</ListItemIcon>
                          <ListItemText primary={item?.Name} />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </NavLink>
                </div>
              );
            } else if (item?.Access == true) {
              return (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "bg-non" : "not-active"
                  }
                >
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          handleClick(i);
                        }}
                      >
                        <ListItemIcon>{item?.Icon}</ListItemIcon>
                        <ListItemText primary={item?.Name} />
                        {open == i ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </ListItem>
                    <Collapse in={open == i} unmountOnExit>
                      {item?.subDir?.length > 0 &&
                        item?.subDir?.map((itm, ii) => {
                          return (
                            <NavLink
                              className={({ isActive }) =>
                                isActive ? "active" : "not-active"
                              }
                              to={`/${consts.route + auth + itm?.Link}`}
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent parent onClick event
                              }}
                            >
                              <List component="div" disablePadding>
                                <ListItemButton>
                                  <ListItemIcon>{itm?.Icon}</ListItemIcon>
                                  <ListItemText primary={itm?.Name} />
                                </ListItemButton>
                              </List>
                            </NavLink>
                          );
                        })}
                    </Collapse>
                  </List>
                </NavLink>
              );
            }
          })}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "active" : "not-active")}
          to={`/${consts.route + auth + "/dashboard"}`}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SpaceDashboardIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </ListItem>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "active" : "not-active")}
          to={`/${consts.route + auth + "/profile"}`}
        >
          <List>
            <ListItem component='div' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Profile"} />
              </ListItemButton>
            </ListItem>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(1);
                }}
              >
                <ListItemIcon>
                  <SellIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Buy Sell"} />
                {open === 1 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 1} unmountOnExit>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/crypto-history"}`}
              >
                <List component='div' disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary={"Crypto History"} />
                  </ListItemButton>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(2);
                }}
              >
                <ListItemIcon>
                  <PaidIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Coin Pool"} />
                {open === 2 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 2} unmountOnExit>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/coin-pool/dashboard"}`}
              >
                <List component='div' disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary='Dashboard' />
                  </ListItemButton>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/coin-pool/network-balance"}`}
              >
                <List component='div' disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary='Network Balance' />
                  </ListItemButton>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/coin-pool/withdrawal"}`}
              >
                <List component='div' disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary='Withdrawal History' />
                  </ListItemButton>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(3);
                }}
              >
                <ListItemIcon>
                  <CurrencyExchangeIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Convert"} />
                {open === 3 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 3}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/convert-history"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"History"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(4);
                }}
              >
                <ListItemIcon>
                  <AttachMoneyIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Crypto Currency"} />
                {open === 4 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 4}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/create/crypto-currency"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Create"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/crypto-currency"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"List"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(5);
                }}
              >
                <ListItemIcon>
                  <CurrencyBitcoinIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Fiat Currency"} />
                {open === 5 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 5}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/fiat-currency"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"List"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}
        {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(6);
                }}
              >
                <ListItemIcon>
                  <CurrencyExchangeIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Future Trading"} />
                {open === 6 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 6} unmountOnExit>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/currency-pairs"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Currency Pairs"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/buy-orders"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Buy Orders"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/sell-orders"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Sell Orders"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/trade"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Trade"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/transactions"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Transactions"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/positions"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Positions"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/positions-histories"
                  }`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Positions History"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/processing-positions"
                  }`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Processing Positions"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(7);
                }}
              >
                <ListItemIcon>
                  <PaymentIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Payment Methods"} />
                {open === 7 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 7}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/payment-method/method-types"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Method Types"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/payment-method/allowed-methods"
                  }`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Allowed Methods"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/payment-method/system-methods"
                  }`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"System Methods"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(8);
                }}
              >
                <ListItemIcon>
                  <GroupIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"P2P"} />
                {open === 8 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 8}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/p2p/ads"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Ads"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/p2p/orders"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Orders"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/p2p/assigned-to-me"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Assigned To Me"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/p2p/users"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"User Profile"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/p2p/reports"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"v"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/p2p/reasons"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Reasons"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(9);
                }}
              >
                <ListItemIcon>
                  <CurrencyBitcoinIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Role Management"} />
                {open === 9 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 9}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/role"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"List"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(10);
                }}
              >
                <ListItemIcon>
                  <CurrencyExchangeIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Spot Trading"} />
                {open === 10 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 10}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/spot/currency-pair"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Currency Pairs"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/spot/buy-orders"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Buy Orders"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/spot/sell-orders"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Sell Orders"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/spot/trade"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Trades"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "active" : "not-active")}
          to={`/${consts.route + auth + "/staff"}`}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CurrencyBitcoinIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Staff"} />
              </ListItemButton>
            </ListItem>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(11);
                }}
              >
                <ListItemIcon>
                  <CurrencyBitcoinIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Staking"} />
                {open === 11 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 11}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/staking/dashboard"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Dashboard"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/staking/offers"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Offers"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/staking/investments"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Investments"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/staking/payouts"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Payouts"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(12);
                }}
              >
                <ListItemIcon>
                  <AccountBalanceWalletIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"System Wallet"} />
                {open === 12 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 12}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/system-wallet/deposit"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Deposit History"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/system-wallet/wallet"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Wallet"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/system-wallet/withdrawal"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Withdrawal History"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(13);
                }}
              >
                <ListItemIcon>
                  <GroupIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"User"} />
                {open === 13 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 13}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user/address-verification"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Address Verification"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user/kyc-verification"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"KYC"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/users"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Users list"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user/security-reset"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Security reset"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(14);
                }}
              >
                <ListItemIcon>
                  <AccountBalanceWalletIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"User Wallet"} />
                {open === 14 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 14}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user-wallet/deposit"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Deposit"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user-wallet/issues"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon style={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Issues"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user-wallets"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Wallet"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user-wallet/withdrawal"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Withdrawal"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user-wallet/address"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Address"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

        {/* <NavLink
          className={({ isActive }) => (isActive ? "active" : "not-active")}
          to={`/${consts.route + auth + "/asset"}`}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LocalAtmIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Asset"} />
              </ListItemButton>
            </ListItem>
          </List>
        </NavLink> */}

        {/* <NavLink
          to={`/${consts.route + auth + "/support"}`}
          className={({ isActive }) => (isActive ? "active" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SupportAgentIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={`support`} />
              </ListItemButton>
            </ListItem>
          </List>
        </NavLink> */}
      </Box>
    </div>
  );

  const Logout = () => {
    // localStorage.removeItem("kaavi");
    if (localStorage.getItem("DyAuth")) {
      navigate(`/${consts.route}` + localStorage.getItem("DyAuth") + "/login");
      localStorage.clear();
      setUserRole([]);
    } else {
      navigate(`/${consts.route}` + "/");
      localStorage.clear();
      setUserRole([]);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
        className="appbar-head"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ color: "#fff" }}>Admin Panel</div>
          <div className="display-4 padding-10 gap-20">
            {/* <div>
              {tradeType === true ? 'Binance Trade' : "Own Trade"}
            </div>
            <div class="checkbox-wrapper-25">
              <input
                type="checkbox"
                onChange={(e) => setTradeType(e.target.checked)}
              />
            </div> */}
            <div className="tr-type">
            <Button variant="contained" onClick={() => setOpenModel(true)}>
              Trade Type
            </Button>
            </div>
          
            <Badge badgeContent={4} color="error">
              <NotificationsActiveIcon sx={{ color: "#FF7028" }} />
            </Badge>
            <div className="">
              <button
                class="Btn"
                onClick={() => {
                  Logout();
                }}
              >
                <div class="sign">
                  <svg viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>

                <div class="text">Logout</div>
              </button>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { md: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          className="drawer-head"
        >
          <div>
            {/* <div className="logo-h">
        <img src={logo} alt="logo" />
      </div> */}
            {/* {brokerLogo ? ( */}
            {/* <div className="text-center mt-10">
              <img
                src={brokerLogo}
                alt="Thaliumx"
                style={{ width: "90px" }}
                className="log-logo"
              />
            </div>

            <Divider /> */}
            <Box sx={{ height: "calc(100vh - 100px)", overflowY: "scroll" }}>
              {/* {drawerDatas?.length > 0 &&
                drawerDatas?.map((item, i) => {
                  if (item?.subDir?.length == 0 && item?.Access == true) {
                    return (
                      <div>
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "active" : "not-active"
                          }
                          to={`/${consts.route + auth + item?.Link}`}
                        >
                          <List>
                            <ListItem disablePadding>
                              <ListItemButton>
                                <ListItemIcon>{item?.Icon}</ListItemIcon>
                                <ListItemText primary={item?.Name} />
                              </ListItemButton>
                            </ListItem>
                          </List>
                        </NavLink>
                      </div>
                    );
                  } else if (item?.Access == true) {
                    return (
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "bg-non" : "not-active"
                        }
                      >
                        <List>
                          <ListItem disablePadding>
                            <ListItemButton
                              onClick={() => {
                                handleClick(i);
                              }}
                            >
                              <ListItemIcon>{item?.Icon}</ListItemIcon>
                              <ListItemText primary={item?.Name} />
                              {open == i ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                          </ListItem>
                          <Collapse in={open == i} unmountOnExit>
                            {item?.subDir?.length > 0 &&
                              item?.subDir?.map((itm, ii) => {
                                return (
                                  <NavLink
                                    className={({ isActive }) =>
                                      isActive ? "active" : "not-active"
                                    }
                                    to={`/${consts.route + auth + itm?.Link}`}
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent parent onClick event
                                    }}
                                  >
                                    <List component="div" disablePadding>
                                      <ListItemButton>
                                        <ListItemIcon>{itm?.Icon}</ListItemIcon>
                                        <ListItemText primary={itm?.Name} />
                                      </ListItemButton>
                                    </List>
                                  </NavLink>
                                );
                              })}
                          </Collapse>
                        </List>
                      </NavLink>
                    );
                  }
                })} */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "active" : "not-active")}
          to={`/${consts.route + auth + "/dashboard"}`}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SpaceDashboardIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Dashboard"} />
              </ListItemButton>
            </ListItem>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "active" : "not-active")}
          to={`/${consts.route + auth + "/profile"}`}
        >
          <List>
            <ListItem component='div' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Profile"} />
              </ListItemButton>
            </ListItem>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(1);
                }}
              >
                <ListItemIcon>
                  <SellIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Buy Sell"} />
                {open === 1 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 1} unmountOnExit>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/crypto-history"}`}
              >
                <List component='div' disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary={"Crypto History"} />
                  </ListItemButton>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(2);
                }}
              >
                <ListItemIcon>
                  <PaidIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Coin Pool"} />
                {open === 2 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 2} unmountOnExit>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/coin-pool/dashboard"}`}
              >
                <List component='div' disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary='Dashboard' />
                  </ListItemButton>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/coin-pool/network-balance"}`}
              >
                <List component='div' disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary='Network Balance' />
                  </ListItemButton>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/coin-pool/withdrawal"}`}
              >
                <List component='div' disablePadding>
                  <ListItemButton sx={{ pl: 2 }}>
                    <ListItemIcon>
                      <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText primary='Withdrawal History' />
                  </ListItemButton>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(3);
                }}
              >
                <ListItemIcon>
                  <CurrencyExchangeIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Convert"} />
                {open === 3 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 3}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/convert-history"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"History"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(4);
                }}
              >
                <ListItemIcon>
                  <AttachMoneyIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Crypto Currency"} />
                {open === 4 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 4}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/create/crypto-currency"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Create"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/crypto-currency"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"List"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(5);
                }}
              >
                <ListItemIcon>
                  <CurrencyBitcoinIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Fiat Currency"} />
                {open === 5 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 5}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/fiat-currency"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"List"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}
              {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(6);
                }}
              >
                <ListItemIcon>
                  <CurrencyExchangeIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Future Trading"} />
                {open === 6 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 6} unmountOnExit>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/currency-pairs"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Currency Pairs"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/buy-orders"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Buy Orders"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/sell-orders"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Sell Orders"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/trade"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Trade"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/transactions"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Transactions"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/positions"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Positions"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/positions-histories"
                  }`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Positions History"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/futures-trade/processing-positions"
                  }`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Processing Positions"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(7);
                }}
              >
                <ListItemIcon>
                  <PaymentIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Payment Methods"} />
                {open === 7 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 7}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/payment-method/method-types"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Method Types"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/payment-method/allowed-methods"
                  }`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Allowed Methods"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/payment-method/system-methods"
                  }`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"System Methods"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(8);
                }}
              >
                <ListItemIcon>
                  <GroupIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"P2P"} />
                {open === 8 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 8}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/p2p/ads"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Ads"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/p2p/orders"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Orders"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/p2p/assigned-to-me"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Assigned To Me"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/p2p/users"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"User Profile"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/p2p/reports"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"v"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/p2p/reasons"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Reasons"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(9);
                }}
              >
                <ListItemIcon>
                  <CurrencyBitcoinIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Role Management"} />
                {open === 9 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 9}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/role"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"List"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(10);
                }}
              >
                <ListItemIcon>
                  <CurrencyExchangeIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Spot Trading"} />
                {open === 10 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 10}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/spot/currency-pair"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Currency Pairs"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/spot/buy-orders"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Buy Orders"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/spot/sell-orders"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Sell Orders"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/spot/trade"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Trades"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "active" : "not-active")}
          to={`/${consts.route + auth + "/staff"}`}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <CurrencyBitcoinIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Staff"} />
              </ListItemButton>
            </ListItem>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(11);
                }}
              >
                <ListItemIcon>
                  <CurrencyBitcoinIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Staking"} />
                {open === 11 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 11}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/staking/dashboard"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Dashboard"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/staking/offers"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Offers"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/staking/investments"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Investments"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/staking/payouts"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Payouts"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(12);
                }}
              >
                <ListItemIcon>
                  <AccountBalanceWalletIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"System Wallet"} />
                {open === 12 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 12}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/system-wallet/deposit"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Deposit History"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/system-wallet/wallet"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Wallet"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/system-wallet/withdrawal"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Withdrawal History"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(13);
                }}
              >
                <ListItemIcon>
                  <GroupIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"User"} />
                {open === 13 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 13}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user/address-verification"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Address Verification"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user/kyc-verification"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"KYC"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/users"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Users list"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user/security-reset"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Security reset"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "bg-non" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick(14);
                }}
              >
                <ListItemIcon>
                  <AccountBalanceWalletIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"User Wallet"} />
                {open === 14 ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open === 14}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user-wallet/deposit"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Deposit"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user-wallet/issues"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon style={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Issues"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user-wallets"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Wallet"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user-wallet/withdrawal"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Withdrawal"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
                to={`/${consts.route + auth + "/user-wallet/address"}`}
              >
                <List>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />
                      </ListItemIcon>
                      <ListItemText primary={"Address"} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </NavLink>
            </Collapse>
          </List>
        </NavLink> */}

              {/* <NavLink
          className={({ isActive }) => (isActive ? "active" : "not-active")}
          to={`/${consts.route + auth + "/asset"}`}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LocalAtmIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={"Asset"} />
              </ListItemButton>
            </ListItem>
          </List>
        </NavLink> */}

              {/* <NavLink
          to={`/${consts.route + auth + "/support"}`}
          className={({ isActive }) => (isActive ? "active" : "not-active")}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SupportAgentIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary={`support`} />
              </ListItemButton>
            </ListItem>
          </List>
        </NavLink> */}
        {drawer}
            </Box>
          </div>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
          className="drawer-head"
        >
          {drawer}
        </Drawer>
      </Box>
      <Modal
            open={openModel}
            // onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <div className='display-2 mb-10'>
                <h3>{ "Change Trade Type"}</h3>
                <Close onClick={() => {  handleClose(); }} className='cursor' />
              </div>
              <FormControl fullWidth>
  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={tradeType}
    // label="Age"
    onChange={(e) => { setTradeType(e.target.value) }}
  >
    <MenuItem value={1}>Binance Trade</MenuItem>
    <MenuItem value={0}>Own Trade</MenuItem>
  </Select>
</FormControl>
<div className="display-3 mt-20">
  {load ?
    <CircularProgress /> :
    <Button variant="contained" onClick={()=>getTradeType()}>
    Submit
  </Button>
  }
  
</div>
            </Box>
          </Modal>
    </Box>
  );
}

export default ResponsiveDrawer;
