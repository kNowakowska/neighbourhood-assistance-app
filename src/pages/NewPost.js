import React, { useEffect, useState } from "react";
import { useConfirm } from "material-ui-confirm";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import withNavBar from "../hoc/WithNavBar";
import { currencies } from "../utils";
import { createPost } from "../redux/actions/posts";
import { getCategories } from "../redux/actions/categories";
import { API_URL, API_KEY } from "../conf";

const StyledContainer = styled(Grid)({
  marginTop: "100px",
});

const NewPost = ({ categories, createPost, loggedUser, getCategories }) => {
  const { t, i18n } = useTranslation("core");
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState(currencies[0]);
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (!categories.length) {
      getCategories();
    }
  }, []);

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

  const handleChangeCategory = (e) => {
    const {
      target: { value },
    } = e;
    setCategory(typeof value === "string" ? value.split(",") : value);
  };

  const savePost = () => {
    confirm({
      title: t("newPost.createPost"),
      description: t("newPost.createConfirmationDesc"),
      confirmationText: t("newPost.create"),
      cancellationText: t("newPost.cancel"),
    }).then(() => {
      const post = {
        title,
        description,
        price: +price,
        currency: currency.curr,
        photoUrl: photoUrl,
        city: loggedUser.city,
        authorId: loggedUser.id,
        categories: category.map((selected) => categories.find((item) => item.id === selected)?.id),
        created: new Date(),
      };
      createPost(post, (responseData) => {
        navigate(`/posts/${responseData.id}`);
      });
    });
  };

  const uploadPhoto = (e) => {
    if (e.target.files?.length) {
      if (e.target.files.length) {
        const file = e.target.files[0];
        setPhoto(file);

        const formData = new FormData();
        formData.append("image", file);

        axios
          .post(API_URL, formData, {
            headers: {
              Authorization: "Client-ID " + API_KEY,
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            setPhotoUrl(response.data.data.link);
          })
          .catch((error) => {
            setPhoto(null);
          });
      }
    }
  };

  const clearFields = () => {
    setTitle("");
    setDescription("");
    setPrice(0);
    setCurrency(currencies[0]);
    setPhoto(null);
    setPhotoUrl("");
    setCategory([]);
  };

  const fieldsNotEmpty = () => title && description && price > 0 && category.length;

  return (
    <Container component="main">
      <CssBaseline />
      <StyledContainer container>
        <Paper>
          <Grid container sx={{ p: 3 }} justifyContent="center" alignItems="center">
            <Typography variant="h6" sx={{ mb: 5 }}>
              {t("newPost.addNewPost")}
            </Typography>
            <TextField
              label={t("newPost.title")}
              value={title}
              onChange={handleChangeTitle}
              variant="outlined"
              required
              fullWidth
              sx={{ mb: 4 }}
            />
            <TextField
              label={t("newPost.description")}
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
              label={t("newPost.price")}
              value={price}
              onChange={handleChangePrice}
              type="number"
              variant="outlined"
              sx={{ width: "45%", mb: 4, mr: 1 }}
              required
              error={price < 0}
            />
            <Autocomplete
              options={currencies}
              value={currency}
              onChange={handleChangeCurrency}
              renderInput={(params) => <TextField {...params} label={t("newPost.currency")} />}
              getOptionLabel={(option) => `${option.symbol} ${option.curr}`}
              variant="outlined"
              required
              sx={{ width: "45%", mb: 4, ml: 1 }}
            />
            <FormControl sx={{ width: "90%", mb: 4, ml: 1 }}>
              <InputLabel>{t("newPost.category")}</InputLabel>
              <Select
                required
                value={category}
                onChange={handleChangeCategory}
                variant="outlined"
                label={t("newPost.category")}
                multiple
                fullWidth
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          i18n.language === "pl"
                            ? categories.find((item) => item.id === value)?.namePl
                            : categories.find((item) => item.id === value)?.nameEng
                        }
                      />
                    ))}
                  </Box>
                )}
              >
                {categories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <Checkbox checked={category.includes(item.id)} />
                    <ListItemText primary={i18n.language === "pl" ? item.namePl : item.nameEng} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Grid item container justifyContent="space-between" sx={{ width: "80%" }}>
              <Button
                component="label"
                size="large"
                variant="contained"
                color="secondary"
                onClick={uploadPhoto}
                startIcon={<Icon>add_a_photo</Icon>}
              >
                {photo ? photo.name : t("newPost.uploadPhoto")}
                <input type="file" hidden onChange={uploadPhoto} accept="image/jpeg,image/png" />
              </Button>
              <Box>
                <Button size="large" variant="contained" sx={{ mr: 2 }} onClick={clearFields}>
                  {t("newPost.clear")}
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  onClick={savePost}
                  sx={{ ml: 2 }}
                  disabled={!fieldsNotEmpty}
                >
                  {t("newPost.save")}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </StyledContainer>
    </Container>
  );
};

const mapDispatchToProps = {
  createPost,
  getCategories,
};
const mapStateToProps = (state) => ({
  categories: state.categories,
  loggedUser: state.system,
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavBar(NewPost));
