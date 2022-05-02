import React, { useState } from "react";
import { useConfirm } from "material-ui-confirm";

import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import withNavBar from "../hoc/WithNavBar";
import { currencies } from "../utils";

const StyledContainer = styled(Grid)({
  marginTop: "100px",
});

const NewPost = () => {
  const confirm = useConfirm();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState(currencies[0]);
  const [photo, setPhoto] = useState(null);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleChangeCurrency = (e, newValue) => {
    setCurrency(newValue);
  };

  const savePost = () => {
    confirm({ title: "Create post", description: "Are you sure you want to add new post?", confirmationText: "Create" })
      .then(() => {
        console.log("created");
      })
      .catch(() => {
        console.log("cancelled");
      });
  };

  const uploadPhoto = (e) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setPhoto(file);
    }
  };

  const clearFields = () => {
    setTitle("");
    setDescription("");
    setPrice(0);
    setCurrency(currencies[0]);
    setPhoto(null);
  };

  return (
    <Container component="main">
      <CssBaseline />
      <StyledContainer container>
        <Paper>
          <Grid container sx={{ p: 3 }} justifyContent="center" alignItems="center">
            <Typography variant="h6" sx={{ mb: 5 }}>
              Add new post
            </Typography>
            <TextField
              label="Title"
              value={title}
              onChange={handleChangeTitle}
              variant="outlined"
              required
              fullWidth
              sx={{ mb: 4 }}
            />
            <TextField
              label="Description"
              value={description}
              onChange={handleChangeDescription}
              variant="outlined"
              sx={{ mb: 4 }}
              required
              fullWidth
              multiline
              minRows={5}
            />
            <TextField
              label="Price"
              value={price}
              onChange={handleChangePrice}
              type="number"
              variant="outlined"
              sx={{ width: "45%", mb: 4, mr: 1 }}
              required
            />
            <Autocomplete
              options={currencies}
              value={currency}
              onChange={handleChangeCurrency}
              renderInput={(params) => <TextField {...params} label="Currency" />}
              getOptionLabel={(option) => `${option.symbol} ${option.curr}`}
              variant="outlined"
              required
              sx={{ width: "45%", mb: 4, ml: 1 }}
            />
            <Grid item container justifyContent="space-between" sx={{ width: "80%" }}>
              <Button
                component="label"
                size="large"
                variant="contained"
                color="secondary"
                onClick={uploadPhoto}
                startIcon={<Icon>add_a_photo</Icon>}
              >
                {photo ? photo.name : "Upload photo"}
                <input type="file" hidden onChange={uploadPhoto} accept="image/jpeg,image/png" />
              </Button>
              <Box>
                <Button size="large" variant="contained" sx={{ mr: 2 }} onClick={clearFields}>
                  Clear
                </Button>
                <Button size="large" variant="contained" color="secondary" onClick={savePost} sx={{ ml: 2 }}>
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </StyledContainer>
    </Container>
  );
};

export default withNavBar(NewPost);
