import React, { useState } from "react";
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
  backgroundColor: "rgba(71,101,127,0.45)",
});

const StyledTextField = styled(TextField)({
  marginBottom: 15,
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

const SignUp = () => {
  const { t } = useTranslation("core");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");

  const ifAnyEmptyField = !name || !lastName || !email || !password || !repeatedPassword || !phoneNumber || !city;

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeRepeatedPassword = (e) => {
    setRepeatedPassword(e.target.value);
  };

  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const signUp = () => {
    //sending request to server
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Card>
        <StyledCardContent component={Paper}>
          <img src={logo_small} alt="logo" />
          <Grid container spacing={2}>
            <Grid item xs>
              <StyledTextField
                value={name}
                label={t("profile.name")}
                onChange={handleChangeName}
                fullWidth
                required
                variant="outlined"
                error={false}
              />
            </Grid>
            <Grid item xs>
              <StyledTextField
                value={lastName}
                label={t("profile.lastName")}
                onChange={handleChangeLastName}
                fullWidth
                required
                variant="outlined"
                error={false}
              />
            </Grid>
          </Grid>
          <StyledTextField
            value={email}
            type="email"
            label={t("profile.email")}
            onChange={handleChangeEmail}
            fullWidth
            required
            variant="outlined"
            error={false}
          />
          <StyledTextField
            value={password}
            type="password"
            label={t("profile.password")}
            onChange={handleChangePassword}
            fullWidth
            required
            variant="outlined"
            error={false}
          />
          <StyledTextField
            value={repeatedPassword}
            type="password"
            label={t("profile.repeatPassword")}
            onChange={handleChangeRepeatedPassword}
            fullWidth
            required
            variant="outlined"
            error={repeatedPassword !== password}
            helperText={repeatedPassword !== password ? t("profile.differentPassword") : ""}
          />
          <Grid container spacing={2}>
            <Grid item xs>
              <StyledTextField
                value={phoneNumber}
                type="tel"
                label={t("profile.phoneNumber")}
                onChange={handleChangePhoneNumber}
                fullWidth
                required
                variant="outlined"
                error={false}
              />
            </Grid>
            <Grid item xs>
              <StyledTextField
                value={city}
                label={t("profile.city")}
                onChange={handleChangeCity}
                fullWidth
                required
                variant="outlined"
                error={false}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between">
            <Grid item>
              {t("profile.haveAnAccount")}
              <StyledLink href="/">{t("login.signIn")}</StyledLink>
            </Grid>
            <StyledButton onClick={signUp} variant="contained" disabled={ifAnyEmptyField}>
              {t("login.signUp")}
            </StyledButton>
          </Grid>
        </StyledCardContent>
      </Card>
    </Container>
  );
};

export default SignUp;
