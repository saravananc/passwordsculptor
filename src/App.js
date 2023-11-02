import "./styles.css";
import * as React from "react";
import { Box } from "@mui/material";
import PasswordGenerator from "./PasswordGenerator";

export default function App() {
  return (
    <>
      <Box textAlign="center">
        <h1>Password Sculptor</h1>
      </Box>
      <PasswordGenerator />
    </>
  );
}
