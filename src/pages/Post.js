import React, { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import { Typography, Rating, Paper, Box, TextField, IconButton, Toolbar, Tooltip } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";
import no_photo from "../assets/no-photo.png";

import withNavBar from "../hoc/WithNavBar";
import { useConfirm } from "material-ui-confirm";
import {useNavigate } from "react-router-dom"


const initialPost = {
  id: 1,
  title: "Sprzedam samochód",
  date: new Date(),
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

const Post = () => {
  const confirm = useConfirm();
  const navigate = useNavigate();


  const [post, setPost] = useState(initialPost);

  const reportPost = () => {};

  const deletePost = () => {
    confirm({ title: "Post deletion", description: "This action in permanent!", confirmationText: "Delete" })
      .then(() => {
        console.log("deleted");
      })
      .catch(() => {
        console.log("cancelled");
      });
  };

  const showProfile = () => {
    navigate(`/profile/${post.author.id}`)

  }
  return (
    <Container component="main">
      <CssBaseline />
      <Grid container sx={{ marginTop: "100px" }}>
        <Grid item xs={3} container flexDirection="column" justifyContent="center">
          <Avatar
            alt={`${post.author.name} ${post.author.last_name} avatar`}
            src={post.author.photo}
            sx={{ width: 200, height: 200, "&:hover": {cursor: "pointer"} }}
            onClick={showProfile}
          />
          <Typography
            variant="h5"
            sx={{ mt: 3, width: "75%" }}
            align="center"
          >{`${post.author.name} ${post.author.last_name}`}</Typography>
          <Typography variant="h6" sx={{ mt: 3, width: "75%" }} align="center">{`${post.author.phone_number}`}</Typography>
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", mt: 3, width: "75%" }}
            align="center"
          >{`Registered ${post.author.created.toDateString()}`}</Typography>
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", mt: 1, width: "75%" }}
            align="center"
          >{`Last seen ${post.author.last_active.toDateString()}`}</Typography>
          <Rating name="read-only" value={post.author.avg_rate} readOnly precision={0.5} sx={{ mt: 3, ml:4, width: "75%" }}/>
        </Grid>
        <Grid item container xs={9}>
          <Paper >
          <Grid container sx={{p: 3}}>
            <Typography sx={{ width: "50%" }}>{`${post.date.toDateString()}, ${post.city}`}</Typography>
            <Typography sx={{ width: "50%" }}>{`${post.price} ${post.currency}`}</Typography>
            <Typography variant="h3" sx={{width: "100%", m:2}}>{post.title}</Typography>
            <Box
              component="img"
              sx={{
                maxHeight: 400,
                width: "100%",
                m: 2,
              }}
              alt="photo"
              src={no_photo}
            />
            <Typography variant="body1" sx={{m:4}}>{post.description}</Typography>
            <Grid item container justifyContent="space-between" alignItems="center">
            <Typography variant="caption" sx={{fontSize: 14}}>{`Views: ${post.views}`}</Typography>
            <Box>
            <Tooltip title="Delete post">
            <IconButton onClick={deletePost} disabled={false} >
              {/* nie mozna usunąć nie swojego posta */}
              <DeleteIcon color="primary"/>
            </IconButton>
            </Tooltip>
            <Tooltip title="Report post">
            <IconButton onClick={reportPost} disabled={false}>
              {/* nie mozna zgłosić własnego posta */}
              <FlagIcon />
            </IconButton>
            </Tooltip>
            </Box>
            </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withNavBar(Post);
