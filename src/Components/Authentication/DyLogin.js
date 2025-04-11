import React from "react";
import { useParams, useLocation } from "react-router-dom";

const DYLogin = () => {
  const { dynamicValue } = useParams();  // Get dynamic URL value
  const location = useLocation();

  return (
    <div>
      <h2>Login Page</h2>
      <p>Dynamic Segment: <strong>{dynamicValue}</strong></p>
      <p>Current URL: <strong>{location.pathname}</strong></p>
    </div>
  );
};

export default DYLogin;
