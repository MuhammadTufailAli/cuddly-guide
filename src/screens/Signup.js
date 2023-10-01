import React, { useState } from "react";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";
import { css } from "@emotion/react";
import signupImage from "../assets/images/1.png";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(false);
  };

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

    let hasError = false;
    if (name.trim() === "") {
      setNameError(true);
      hasError = true;
    }
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
      const userData = {
        name: name,
        email: email,
        password: password,
      };

      try {
        const result = await axios.post(
          "http://localhost:3000/users/signup",
          userData
        );

        toast.success(result?.data?.message);

        setName("");
        setEmail("");
        setPassword("");
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    }
  };

  return (
    <div>
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
          marginTop: 50,
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
              marginTop: 30,
              textAlign: "center",
              fontSize: 30,
              fontWeight: "500",
              color: "#212A3E",
            }}>
            Create an Account
          </Typography>
          <TextField
            style={{
              marginTop: 60,
              width: 350,
              borderRadius: 10,
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            label="Name"
            margin="normal"
            value={name}
            onChange={handleNameChange}
            error={nameError}
            helperText={nameError ? "Please enter your name" : ""}
          />
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
            Sign up
          </Button>
          <Button
            onClick={() => navigate("/login")}
            style={{
              textAlign: "center",
              display: "flex",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 10,
              fontSize: 12,
            }}>
            Already have an account?
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

export default SignUpPage;
