/* eslint-disable no-unused-vars, eqeqeq */
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import consts from "./constant";

function PrivateRoute() {
  const { dynamicValue } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const user = dynamicValue ? "broker" : "admin";

  useEffect(() => {
    let token = localStorage.getItem("nzanzi");
    let brokerToken = localStorage.getItem("nzanzi");
    if (user === "admin" && token) {
      setIsAuthenticated(true);
    } else if (user === "broker" && brokerToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated ? (
    <Outlet />
  ) : dynamicValue != undefined ? (
    <Navigate to={`/${consts.route}/${dynamicValue}/login`} />
  ) : (
    <Navigate to={`/${consts.route}`} />
  );
}

export default PrivateRoute;
