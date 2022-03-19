


import React, { useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import logo_small from "../assets/logo_small.png"

// const StyledTypography = styled(Typography)(({ theme }) => ({
//     textAlign: "center",
//         fontWeight: "bold",
//         letterSpacing: 1,
//         marginBottom: 30
//   }));

const StyledCardContent = styled(CardContent)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "30px 50px",
    textAlign: "center"
})

const StyledTextField = styled(TextField)({
    marginBottom: 15,
})

const StyledButton = styled(Button)({
    margin: 10,
    float: "right"
})

const SignUp = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeLastName = (e) => {
        setLastName(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangeRepeatedPassword = (e) => {
        setRepeatedPassword(e.target.value)
    }

    const handleChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const handleChangeCity = (e) => {
        setCity(e.target.value)
    }

    const validation = () => {
        //processing the login response
    };
    

    const signUp = () => {
        //sending request to server
    }
    
    return (
        <Container component="main">
            <CssBaseline />
            <Card>
                <StyledCardContent component={Paper}>
                    <img src={logo_small} alt="logo"/>
                    <Grid container spacing={2}>
                        <Grid item xs>
                        <StyledTextField value={name} label="Name" onChange={handleChangeName}  fullWidth required variant="outlined" error={false}/>
                        </Grid>
                        <Grid item xs>
                        <StyledTextField value={lastName} label="Last name" onChange={handleChangeLastName}  fullWidth required variant="outlined" error={false}/>
                            </Grid>
                    </Grid>
                    <StyledTextField value={email} type="email" label="Email" onChange={handleChangeEmail}  fullWidth required variant="outlined" error={false}/>
                    <StyledTextField value={password} type="password" label="Password" onChange={handleChangePassword}  fullWidth required variant="outlined" error={false}/>
                    <StyledTextField value={repeatedPassword} type="password" label="Repeat Password" onChange={handleChangeRepeatedPassword}  fullWidth required variant="outlined" error={false}/>
                    <Grid container spacing={2}>
                        <Grid item xs>
                        <StyledTextField value={phoneNumber} type="tell" label="Phone number" onChange={handleChangePhoneNumber}  fullWidth required variant="outlined" error={false}/>
                        </Grid>
                        <Grid item xs>
                        <StyledTextField value={city} label="City" onChange={handleChangeCity}  fullWidth required variant="outlined" error={false}/>
                            </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                        {"Already have an account? "}
                            <Link href="#" sx={{fontWeight: 900, fontSize: 18, textDecoration: "none"}}>
                            { "Sign In"}
                            </Link>
                        </Grid>
                        <StyledButton onClick={signUp} variant="contained">Sign up</StyledButton>
                        </Grid>
                </StyledCardContent>
            </Card>
        </Container>
    )
}

export default SignUp;