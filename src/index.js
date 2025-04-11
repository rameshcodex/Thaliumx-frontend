import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./Authprovider";
import { BrowserRouter as Router } from "react-router-dom";
import { SidebarProvider } from "./SidebarContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <Router>
      <SidebarProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </SidebarProvider>
    </Router>
  </AuthProvider>

);
