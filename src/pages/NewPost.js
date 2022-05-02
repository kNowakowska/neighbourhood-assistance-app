import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import {
  Typography,
  Rating,
  Paper,
  Box,
  TextField,
  IconButton,
  Toolbar,
  Tooltip,
  Button,
  Icon,
  Select,
  Autocomplete,
  MenuItem,
  Input,
  InputAdornment,
} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";
import no_photo from "../assets/no-photo.png";

import withNavBar from "../hoc/WithNavBar";
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";
import { currencies } from "../utils";

const initialPost = {
  id: 1,
  title: "Sprzedam samochód",
  craeted: new Date(),
  city: "Kraków",
  price: 100,
  currency: "PLN",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas iste, provident quis at magnam harum commodi, quas atque, dicta possimus cum. Placeat veritatis at odio aspernatur praesentium atque minima! Quisquam?",
  photo: null,
  views: 70,
  author: {
    name: "Jane",
    last_name: "Smith",
    id: 1,
    phone_number: "123456123",
    photo: null,
    last_active: new Date(),
    created: new Date(),
    avg_rate: 4.5,
  },
};

const NewPost = () => {
  const confirm = useConfirm();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState(currencies[0]);
  const [photo, setPhoto] = useState(null);

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
    setTitle("")
    setDescription("")
    setPrice(0)
    setCurrency(currencies[0])
    setPhoto(null)
  }

  return (
    <Container component="main">
      <CssBaseline />
      <Grid container sx={{ marginTop: "100px" }}>
        <Paper>
          <Grid container sx={{ p: 3 }} justifyContent="center" alignItems="center">
            <Typography variant="h6" sx={{ mb: 5 }}>
              Add new post
            </Typography>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              required
              fullWidth
              sx={{ mb: 4 }}
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              variant="outlined"
              sx={{ width: "45%", mb: 4, mr: 1 }}
              required
            />
            <Autocomplete
              options={currencies}
              value={currency}
              onChange={(e, newValue) => setCurrency(newValue)}
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
                <input type="file" hidden onChange={uploadPhoto} accept="image/jpeg,image/png"/>
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
      </Grid>
    </Container>
  );
};

export default withNavBar(NewPost);
