import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Snackbar
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy"; // Import the copy icon

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const generatePassword = () => {
    // Define character sets based on user selections
    let charset = "";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSpecialChars) charset += "!@#$%^&*";

    if (charset === "") {
      setPassword("Select at least one character set.");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }

    setPassword(newPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      const textField = document.createElement("textarea");
      textField.innerText = password;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Password copied to clipboard!"
      />
      <Box mt={2} textAlign="center">
        <h3>Generated Password</h3>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Box
            sx={{
              width: "300px",
              height: "30px",
              border: "2px solid gray",
              padding: "10px"
            }}
          >
            {password}
          </Box>
          <IconButton color="primary" onClick={copyToClipboard}>
            <FileCopyIcon />
          </IconButton>
        </Box>
      </Box>
      <Box mt={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Password Length"
              type="number"
              size="small"
              value={passwordLength}
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={generatePassword}
            >
              Generate Password
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeLowercase}
                  onChange={() => setIncludeLowercase(!includeLowercase)}
                  color="primary"
                />
              }
              label="Include lowercase letters"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeUppercase}
                  onChange={() => setIncludeUppercase(!includeUppercase)}
                  color="primary"
                />
              }
              label="Include uppercase letters"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                  color="primary"
                />
              }
              label="Include numbers"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeSpecialChars}
                  onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
                  color="primary"
                />
              }
              label="Include special characters"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PasswordGenerator;
