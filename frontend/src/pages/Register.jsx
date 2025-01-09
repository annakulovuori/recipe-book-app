// src/components/Register.js
import React, { useState, useRef, useReducer } from "react";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
  Card as MuiCard,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Hook/AuthProvider";


const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const RegisterContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const errorReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, [action.field]: action.payload };
    case "CLEAR_ERRORS":
      return {};
    default:
      return state;
  }
};

export default function Register() {
  const [formErrors, dispatch] = useReducer(errorReducer, {});
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { register } = useAuth();
  const navigate = useNavigate();


  const validateInputs = () => {
    let isValid = true;

    if (!nameRef.current.value) {
      isValid = false;
      dispatch({
        type: "SET_ERROR",
        field: "name",
        payload: "Name is required.",
      });
    }

    if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      isValid = false;
      dispatch({
        type: "SET_ERROR",
        field: "email",
        payload: "Please enter a valid email address.",
      });
    }

    if (passwordRef.current.value.length < 6) {
      isValid = false;
      dispatch({
        type: "SET_ERROR",
        field: "password",
        payload: "Password must be at least 6 characters long.",
      });
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "CLEAR_ERRORS" });

    if (validateInputs()) {
        const nickname = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

      try {
        const response = await register(nickname, email, password);
        if (response.token) {
          navigate("/profile");
        }
      } catch (error) {
        console.error("Registeration failed:", error);
      }
    }
  };

  return (
    <RegisterContainer direction="column" justifyContent="space-between">
      <CssBaseline enableColorScheme />
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="name">Nickname</FormLabel>
            <TextField
              inputRef={nameRef}
              name="name"
              required
              fullWidth
              id="name"
              placeholder="johnny54"
              error={Boolean(formErrors.name)}
              helperText={formErrors.name}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              inputRef={emailRef}
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              error={Boolean(formErrors.email)}
              helperText={formErrors.email}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              inputRef={passwordRef}
              required
              fullWidth
              name="password"
              placeholder="••••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              error={Boolean(formErrors.password)}
              helperText={formErrors.password}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Register
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/" variant="body2">
              Log in
            </Link>
          </Typography>
        </Box>
      </Card>
    </RegisterContainer>
  );
}
