import "./App.css";
import "./Media.css";
import "./Styles.css";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Authentication/Login/Login";
import Header from "./Components/Header/Header";
import Support from "./Components/Support/Support";

import Dashboard from "./Components/Dashboard/Dashboard";
import consts from "./constant";
import Kyc from "./Components/Kyc/Kyc";
import KycDetails from "./Components/Kyc/KycDetails";

import Asset from "./Components/Asset/Asset";
import TradePair from "./Components/TradePair/TradePair";
import OrderDetails from "./Components/OrderDetails/OrderDetails";

import Deposit from "./Components/Deposit/Deposit";
import { Toaster, toast } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import Users from "./Components/Users/Users";
import UserList from "./Components/Users/UserList";
import Withdraw from "./Components/Withdraw/Withdraw";
import Tradehistory from "./Components/TradeHistory/Tradehistory";
import Createasset from "./Components/Asset/Createasset";
import CraetePair from "./Components/TradePair/CreatePair";
import Broker from "./Components/Broker/Broker";
import Addbroker from "./Components/Broker/Addbroker";
import BrokerLogin from "./Components/Authentication/Login/BroketLogin";
import { AuthContext } from "./Authprovider";
import DYLogin from "./Components/Authentication/DyLogin";
import PrivateRoute from "./PrivateRoute";
import Profile from "./Components/Profile/Profile";
import Blog from "./Components/Blog/Blog";
import BuySell from "./Components/BuySell/BuySell";
import NetworkBalance from "./Components/CoinPool/NetworkBalance";
import WithdrawalHistory from "./Components/CoinPool/WithdrawalHistory";
import CoinpoolDashboard from "./Components/CoinPool/CoinpoolDashboard";
import ConvertHistory from "./Components/Convert/ConvertHistory";
import CryptoCurrency from "./Components/CryptoCurrency/CryptoCurency";
import CreateCryptoCurrency from "./Components/CryptoCurrency/CreateCryptoCurrency";
import FiatCurrency from "./Components/FiatCurrency/FiatCurrency";
import CurrencyPair from "./Components/FutureTrading/CurrencyPair";
import CreateCurrencyPair from "./Components/FutureTrading/CreateCurrencyPair";
import FutureBuyOrder from "./Components/FutureTrading/FutureBuyOrder";
import FutureSellOrder from "./Components/FutureTrading/FutureSellOrder";
import FutureTrade from "./Components/FutureTrading/FutureTrade";
import FutureTransaction from "./Components/FutureTrading/FutureTransactions";
import FuturePositions from "./Components/FutureTrading/FuturePositions";
import FuturePositionsHistory from "./Components/FutureTrading/FuturePositionHistory";
import FuturePositionProcess from "./Components/FutureTrading/FuturePositonProcess";
import MethodTypes from "./Components/PaymentMethods/MethodTypes";
import AllowedMethods from "./Components/PaymentMethods/AllowedMethods";
import SystemMethods from "./Components/PaymentMethods/SystemMethods";
import P2PAds from "./Components/P2P/P2PAds";
import P2POrders from "./Components/P2P/P2POrders";
import MyAssignedOrders from "./Components/P2P/MyAssignedOrders";
import P2PUsers from "./Components/P2P/P2PUsers";
import P2PReports from "./Components/P2P/P2PReports";
import P2PReasons from "./Components/P2P/P2PReasons";
import RoleList from "./Components/RoleManangement/RoleList";
import SpotCurrencyPair from "./Components/Spot/SpotCurrencyPair";
import CreateSpotCurrencyPair from "./Components/Spot/CreateSpotCurrencyPair";
import SpotBuyOrder from "./Components/Spot/SpotBuyOrders";
import SpotSellOrder from "./Components/Spot/SpotSellOrders";
import SpotTrade from "./Components/Spot/SpotTrade";
import Staff from "./Components/Staff/Staff";
import StakingDashboard from "./Components/Staking/StakingDashboard";
import StakingOffers from "./Components/Staking/StakingOffers";
import CreateInvestment from "./Components/Staking/CreateInvestment";
import InvestmentList from "./Components/Staking/InvestmentList";
import StakingPayouts from "./Components/Staking/StakingPayouts";
import SystemDeposit from "./Components/SystemWallet/SystemDeposit";
import SystemWallet from "./Components/SystemWallet/SystemWallet";
import SystemWithdrawal from "./Components/SystemWallet/SystemWithdrawal";
import AddressVerifcation from "./Components/Users2/AddressVerification";
import KYCVerify from "./Components/Users2/KYCVerify";
import UsersList from "./Components/Users2/UserList";
import SecurityReset from "./Components/Users2/SecurityReset";
import UserDeposit from "./Components/UserWallet/UserDeposit";
import UserIssue from "./Components/UserWallet/UserIssue";
import UserWallet from "./Components/UserWallet/UserWallet";
import UserWithdrawel from "./Components/UserWallet/UserWithdrawel";
import UserAddress from "./Components/UserWallet/UserAddress";
import P2PSettings from "./Components/CryptoCurrency/P2PSetitngs";
import FiatUpdate from "./Components/FiatCurrency/FiatUpdate";
import LeverageSettings from "./Components/FutureTrading/LeverageSettings";
import FundingRate from "./Components/FutureTrading/FundingRate";
import P2POrderDetails from "./Components/P2P/P2POrderDetails";
import P2PReportDetails from "./Components/P2P/P2PReportDetails";
import UserActivities from "./Components/Users2/UserActivities";
import UserDepositHistory from "./Components/Users2/UserDepositHistory";
import UserWalletManage from "./Components/UserWallet/UserWalletManage";
import WalletTransfer from "./Components/UserWallet/WalletTransfer";
import ForgotPassword from './Components/Authentication/ForgotPassword/ForgotPassword'
import ChangePassword from './Components/Authentication/ForgotPassword/ChangePassword'
import ForgotPasswordBroker from "./Components/Authentication/ForgotPasswordBroker/ForgotPasswordBroker";
import ChangePasswordBroker from "./Components/Authentication/ForgotPasswordBroker/ChangePasswordBroker";
import Networks from "./Components/Networks/Networks";
import CreateNetworks from "./Components/Networks/CreateNetworks";
// import FaitSettings from "./Components/FiatCurrency/FiatSettings";

function App() {


  return (
    <div className='App'>
      <>
        <Routes>
          {/* <Route path="/thaliumx/login" element={<Navigate to={`/admin/${Date.now()}/login`} replace />} /> */}
          {/* Handle dynamic login URLs */}
          <Route
            path={`/${consts.route}/:dynamicValue/login`}
            element={<BrokerLogin />}
          />

          <Route
            path={`/${consts.route}/:dynamicValue/forgotPassword`}
            element={<ForgotPasswordBroker />}
          />

          <Route
            path={`/${consts.route}/:dynamicValue/changePassword`}
            element={<ChangePasswordBroker />}
          />

          <Route path={`${consts.route + "/"}`} element={<Login />} />
          <Route path={`${consts.route + "/forgotPassword"}`} element={<ForgotPassword />} />
          <Route path={`${consts.route + "/changePassword"}`} element={<ChangePassword />} />
          <Route path={`${consts.route + "/broker"}`} element={<Broker />} />
          <Route path={`${consts.route + "/addbroker"}`} element={<Addbroker />} />
          {/* <Route path={`${consts.route + auth +"/login"}`} element={<BrokerLogin />} /> */}
          {/* <Route path="/" element={<Login />} /> */}

          <Route
            path={`/${consts.route}/:dynamicValue?`}
            element={<PrivateRoute />}
          >
            <Route path='support' element={<Support />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='kycdetails' element={<KycDetails />} />
            <Route path='asset' element={<Asset />} />
            <Route path='createasset' element={<Createasset />} />
            <Route path='networks' element={<Networks />} />
            <Route path='createnetworks' element={<CreateNetworks />} />
            <Route path='tradepair' element={<TradePair />} />
            <Route path='createpair' element={<CraetePair />} />
            <Route path='orderdetails/all' element={<OrderDetails />} />
            <Route path='orderdetails/open' element={<OrderDetails />} />
            <Route path='orderdetails/closed' element={<OrderDetails />} />
            <Route path='deposithistory' element={<Deposit />} />
            <Route path='withdrawhistory' element={<Withdraw />} />
            <Route path='tradehistory' element={<Tradehistory />} />
            <Route path='userlist' element={<UserList />} />


            <Route path='support' element={<Support />} />
            {/* <Route path='dashboard' element={<Dashboard />} /> */}
            <Route path='profile' element={<Profile />} />
            <Route path='kyc' element={<Kyc />} />
            <Route path='kycdetails' element={<KycDetails />} />
            <Route path='crypto-history' element={<BuySell />} />
            {/* <Route path="blog" element={<Blog/>}/> */}
            <Route path='asset' element={<Asset />} />
            <Route path='createasset' element={<Createasset />} />
            <Route path='tradepair' element={<TradePair />} />
            <Route path='createpair' element={<CraetePair />} />
            <Route path='coin-pool/dashboard' element={<CoinpoolDashboard />} />
            <Route
              path='coin-pool/network-balance'
              element={<NetworkBalance />}
            />
            <Route
              path='coin-pool/withdrawal'
              element={<WithdrawalHistory />}
            />
            <Route path='convert-history' element={<ConvertHistory />} />
            <Route path='crypto-currency' element={<CryptoCurrency />} />
            <Route
              path='crypto-currency/P2P-settings'
              element={<P2PSettings />}
            />

            <Route
              path='create/crypto-currency'
              element={<CreateCryptoCurrency />}
            />
            <Route path='fiat-currency' element={<FiatCurrency />} />
            <Route path='fiat-currency/update' element={<FiatUpdate />} />
            {/* <Route path='fiat-currency/payment-settings' element={<FaitSettings />} /> */}

            <Route
              path='futures-trade/currency-pairs'
              element={<CurrencyPair />}
            />
            <Route
              path='futures-trade/create/currency-pairs'
              element={<CreateCurrencyPair />}
            />
            <Route
              path='futures-trade/currency-pairs/funding-rate/'
              element={<FundingRate />}
            />
            <Route
              path='futures-trade/currency-pairs/leverage'
              element={<LeverageSettings />}
            />
            <Route
              path='futures-trade/buy-orders'
              element={<FutureBuyOrder />}
            />
            <Route
              path='futures-trade/sell-orders'
              element={<FutureSellOrder />}
            />
            <Route path='futures-trade/trade' element={<FutureTrade />} />
            <Route
              path='futures-trade/transactions'
              element={<FutureTransaction />}
            />
            <Route
              path='futures-trade/positions'
              element={<FuturePositions />}
            />
            <Route
              path='futures-trade/positions-histories'
              element={<FuturePositionsHistory />}
            />
            <Route
              path='futures-trade/processing-positions'
              element={<FuturePositionProcess />}
            />
            <Route
              path='payment-method/method-types'
              element={<MethodTypes />}
            />
            <Route
              path='payment-method/allowed-methods'
              element={<AllowedMethods />}
            />
            <Route
              path='payment-method/system-methods'
              element={<SystemMethods />}
            />
            <Route path='p2p/ads' element={<P2PAds />} />
            <Route path='p2p/orders' element={<P2POrders />} />
            <Route path='p2p/order-details' element={<P2POrderDetails />} />
            <Route path='p2p/report-details' element={<P2PReportDetails />} />

            <Route path='p2p/assigned-to-me' element={<MyAssignedOrders />} />
            <Route path='p2p/users' element={<P2PUsers />} />
            <Route path='p2p/reports' element={<P2PReports />} />
            <Route path='p2p/reasons' element={<P2PReasons />} />
            <Route path='role' element={<RoleList />} />
            <Route path='spot/currency-pair' element={<SpotCurrencyPair />} />
            <Route
              path='spot/create/currency-pairs'
              element={<CreateSpotCurrencyPair />}
            />
            <Route path='spot/buy-orders' element={<SpotBuyOrder />} />
            <Route path='spot/sell-orders' element={<SpotSellOrder />} />
            <Route path='spot/trade' element={<SpotTrade />} />

            <Route path='staff' element={<Staff />} />
            <Route path='staking/dashboard' element={<StakingDashboard />} />
            <Route path='staking/offers' element={<StakingOffers />} />
            <Route path='staking/create' element={<CreateInvestment />} />
            <Route path='staking/investments' element={<InvestmentList />} />
            <Route path='staking/payouts' element={<StakingPayouts />} />
            <Route path='system-wallet/deposit' element={<SystemDeposit />} />
            <Route path='system-wallet/wallet' element={<SystemWallet />} />
            <Route
              path='system-wallet/withdrawal'
              element={<SystemWithdrawal />}
            />
            <Route
              path='user/address-verification'
              element={<AddressVerifcation />}
            />
            <Route path='user/kyc-verification' element={<KYCVerify />} />
            <Route path='users' element={<UsersList />} />
            <Route path='users/activities' element={<UserActivities />} />
            <Route path='users/deposit-history' element={<UserDepositHistory />} />
            <Route path='user/security-reset' element={<SecurityReset />} />
            <Route path='user-wallet/deposit' element={<UserDeposit />} />
            <Route path='user-wallet/issues' element={<UserIssue />} />
            <Route path='user-wallets' element={<UserWallet />} />
            <Route path='user-wallet/withdrawal' element={<UserWithdrawel />} />
            <Route path='user-wallet/address' element={<UserAddress />} />
            <Route path='user-wallet/wallet-management' element={<UserWalletManage />} />
            <Route path='user-wallet/fund_transfer' element={<WalletTransfer />} />

            <Route path='orderdetails/all' element={<OrderDetails />} />
            <Route path='orderdetails/open' element={<OrderDetails />} />
            <Route path='orderdetails/closed' element={<OrderDetails />} />
            <Route path='deposithistory' element={<Deposit />} />
            <Route path='withdrawhistory' element={<Withdraw />} />
            <Route path='tradehistory' element={<Tradehistory />} />
            {/* <Route path="users" element={<Users />} /> */}
            <Route path='userlist' element={<UserList />} />

          </Route>

          {/* <Route
            path={`/${consts.route}/:dynamicValue`}
            element={<PrivateRoute user='broker' />}
          >
            <Route path='support' element={<Support />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='kycdetails' element={<KycDetails />} />
            <Route path='asset' element={<Asset />} />
            <Route path='createasset' element={<Createasset />} />
            <Route path='tradepair' element={<TradePair />} />
            <Route path='createpair' element={<CraetePair />} />
            <Route path='orderdetails/all' element={<OrderDetails />} />
            <Route path='orderdetails/open' element={<OrderDetails />} />
            <Route path='orderdetails/closed' element={<OrderDetails />} />
            <Route path='deposithistory' element={<Deposit />} />
            <Route path='withdrawhistory' element={<Withdraw />} />
            <Route path='tradehistory' element={<Tradehistory />} />
            <Route path='userlist' element={<UserList />} />
          </Route> */}
        </Routes>
      </>

      <Toaster />
    </div>
  );
}
export default App;
