import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

import logo_small from "../assets/logo_small.png";

const StyledCardContent = styled(CardContent)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "30px 50px",
  textAlign: "center",
});

const StyledTextField = styled(TextField)({
  marginBottom: 15,
  textTransform: "capitalize",
});

const StyledButton = styled(Button)({
  margin: 10,
  float: "right",
});

const StyledLink = styled(Link)({
  fontWeight: 900,
  fontSize: 18,
  textDecoration: "none",
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation("core");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    //sending request to server
    navigate("/home");
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Card>
        <StyledCardContent component={Paper}>
          <img src={logo_small} alt="logo" />
          <StyledTextField
            value={email}
            type="email"
            label={t("login.email")}
            onChange={handleChangeEmail}
            fullWidth
            required
            variant="outlined"
            error={false}
          />
          <StyledTextField
            value={password}
            type="password"
            label={t("login.password")}
            onChange={handleChangePassword}
            fullWidth
            required
            variant="outlined"
            error={false}
          />
          <Grid container justifyContent="space-between">
            <Grid item>
              {t("login.noAccount")}
              <StyledLink href="/sign_up">{t("login.signUp")}</StyledLink>
            </Grid>
            <StyledButton onClick={login} variant="contained" disabled={!email || !password}>
              {t("login.signIn")}
            </StyledButton>
          </Grid>
        </StyledCardContent>
      </Card>
    </Container>
  );
};

export default Login;
