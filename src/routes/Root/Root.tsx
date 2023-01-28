import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../../components/Navbar";

function Root() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Box component="main">
        <Toolbar />
        <Box sx={{ px: "32px", py: "16px" }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export { Root };
