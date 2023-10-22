import React, { useState } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { css } from "@emotion/react";
import signupImage from "../assets/images/backgroundLogin.png";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
var url = process.env.REACT_APP_API_KEY;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform validation
    let hasError = false;

    if (email.trim() === "") {
      setEmailError(true);
      hasError = true;
    }
    if (password.trim() === "") {
      setPasswordError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    } else {
      const userCredentials = {
        email: email,
        password: password,
      };
      try {
        const result = await axios.post(`${url}users/signin`, userCredentials);
        toast.success(result?.data?.message);
        localStorage.setItem("userdetails", JSON.stringify(result?.data?.data));

        navigate("/chooseSubject");
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    }

    // Submit the form or perform further actions
    console.log("Form submitted:", email, password);

    // Reset the form

    // setEmail("");
    // setPassword("");
  };

  return (
    <div style={{ marginTop: 70 }}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          marginTop: 10,
        }}>
        <div
          style={{
            width: 550,
            height: 550,
            display: "block",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Typography
            style={{
              marginTop: 80,
              textAlign: "center",
              fontSize: 30,
              fontWeight: "500",
              color: "#212A3E",
            }}>
            Sign In
          </Typography>

          <TextField
            style={{
              marginTop: 30,
              maxWidth: 350,
              borderRadius: 10,
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            label="Email"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Please enter a valid email" : ""}
          />
          <TextField
            style={{
              marginTop: 30,
              width: 350,
              borderRadius: 10,
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            helperText={passwordError ? "Please enter a password" : ""}
          />
          <Button
            style={{
              display: "flex",
              marginLeft: "auto",
              marginRight: 100,
              marginTop: 10,
              fontSize: 10,
            }}>
            Forget Password?
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              width: 250,
              marginTop: 50,
              borderRadius: 20,
              backgroundColor: "#212A3E",
            }}>
            Sign In
          </Button>
          <Button
            onClick={() => navigate("/")}
            style={{
              textAlign: "center",
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              fontSize: 12,
            }}>
            Don't have an account?
          </Button>
        </div>

        <div
          style={{
            backgroundImage: `url(${signupImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",

            width: 650,
            height: 550,
          }}></div>
      </div>
    </div>
  );
};

export default Login;
