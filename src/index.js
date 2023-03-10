import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css";
import { HomeHook } from "./templates/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HomeHook />
  </React.StrictMode>
);
