/* eslint-disable no-unused-vars, eqeqeq */
import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import SellIcon from "@mui/icons-material/Sell";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PersonIcon from "@mui/icons-material/Person";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import GroupIcon from "@mui/icons-material/Group";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useParams } from "react-router-dom";
import { CellTower } from "@mui/icons-material";
// Create Context
const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [userRole, setUserRole] = useState([]); // Get from auth API

    const [brokers, setBrokers] = useState()

    // Sidebar Data
    const drawerDatas = [
        {
            Name: "Dashboard",
            Icon: <SpaceDashboardIcon style={{ fill: "#fff" }} />,
            Link: "/dashboard",
            Access: true,
            subDir: []
        },
        {
            Name: "Profile",
            Icon: <PersonIcon style={{ fill: "#fff" }} />,
            Link: "/profile",
            Access: true,
            subDir: []
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
                }
            ]
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
            ]
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
                }
            ]
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
            ]
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
            ]
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

            ]
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
            ]
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
            ]
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
            ]
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
            ]
        },
        {
            Name: "Staff",
            Icon: <CurrencyBitcoinIcon style={{ fill: "#fff" }} />,
            Link: "/staff",
            Access: true,
            subDir: []
        },
        {
            Name: "Broker Management",
            Icon: <GroupIcon style={{ fill: "#fff" }} />,
            Link: "",
            Access: true,
            subDir: [
                {
                    Name: "Broker Creation",
                    Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
                    Link: "/addbroker",
                },
                {
                    Name: "Brokers List",
                    Icon: <SubdirectoryArrowRightIcon sx={{ fill: "#fff" }} />,
                    Link: "/broker",
                },
            ]
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
            ]
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
            ]
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
            ]
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
            ]
        },
        {
            Name: "Asset",
            Icon: <LocalAtmIcon style={{ fill: "#fff" }} />,
            Link: "/asset",
            Access: true,
            subDir: []
        },
        {
            Name: "Networks",
            Icon: <CellTower style={{ fill: "#fff" }} />,
            Link: "/networks",
            Access: true,
            subDir: []
        },
        {
            Name: "Support",
            Icon: <SupportAgentIcon style={{ fill: "#fff" }} />,
            Link: "/support",
            Access: true,
            subDir: []
        },
    ]

    const [filteredDrawerData, setFilteredDrawerData] = useState(drawerDatas);

    useEffect(() => {
        if (userRole?.length === 0) {
            setFilteredDrawerData(drawerDatas);
        } else {
            setFilteredDrawerData(drawerDatas.filter(item => {
                if (item?.Name == "Dashboard") {
                    return true
                } else if (item?.Name == "Profile") {
                    return true
                } else {
                    return userRole?.includes(item?.Name)
                }
            }));
        }
    }, [userRole]);

    useEffect(() => {
        if (brokers == "broker") {
            setFilteredDrawerData(drawerDatas.filter(item => {
                if (item?.Name == "Broker Management") {
                    return false
                } else {
                    return true
                }
            }));
        }
    }, [brokers])

    return (
        <SidebarContext.Provider value={{ filteredDrawerData, userRole, setUserRole, brokers, setBrokers }}>
            {children}
        </SidebarContext.Provider>
    );
};

// Custom Hook to use Sidebar Context
export const useSidebar = () => useContext(SidebarContext);
