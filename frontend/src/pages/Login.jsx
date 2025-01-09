// src/components/LogIn.js
import React, { useRef, useReducer, useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
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
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const LogInContainer = styled(Stack)(({ theme }) => ({
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

export default function LogIn() {
  const [formErrors, dispatch] = useReducer(errorReducer, {});
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  const validateInputs = () => {
    let isValid = true;

    if (!/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      isValid = false;
      dispatch({
        type: "SET_ERROR",
        field: "email",
        payload: "Please enter a valid email address.",
      });
    }

    if (!passwordRef.current.value || passwordRef.current.value.length < 6) {
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
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      try {
        const response = await authenticate(email, password);
        if (response.token) {
          navigate("/profile");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
      }
    }
  };

  return (
    <LogInContainer direction="column" justifyContent="space-between">
      <CssBaseline />
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Log in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              inputRef={emailRef}
              error={Boolean(formErrors.email)}
              helperText={formErrors.email}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              inputRef={passwordRef}
              error={Boolean(formErrors.password)}
              helperText={formErrors.password}
              name="password"
              placeholder="••••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Log in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Card>
    </LogInContainer>
  );
}
