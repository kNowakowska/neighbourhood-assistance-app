import CssBaseline from "@mui/material/CssBaseline";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"

import withNavBar from "../hoc/WithNavBar"
function Home() {
  return (
    <Container component="main">
    <CssBaseline />  
    <Grid container sx={{ marginTop: "100px" }}>

        Home app
        </Grid>
    </Container>
  );
}

export default withNavBar(Home);
