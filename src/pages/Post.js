import React, { useState } from "react";
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteIcon from "@mui/icons-material/Delete";

import withNavBar from "../hoc/WithNavBar";
import no_photo from "../assets/no-photo.png";

const initialPost = {
  id: 1,
  title: "Sprzedam samochód",
  created: new Date(),
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

const StyledContainer = styled(Grid)({
  marginTop: "100px",
});

const StyledAvatar = styled(Avatar)({
  width: 200,
  height: 200,
  "&:hover": { cursor: "pointer" },
});

const StyledAuthorData = styled(Typography)({
  width: "75%",
});

const StyledItalicAuthorData = styled(Typography)({
  width: "75%",
  fontStyle: "italic",
});

const StyledRating = styled(Rating)({
  width: "75%",
});

const StyledPhotoBox = styled(Box)({
  maxHeight: 400,
  width: "100%",
});

const StyledPostDetails = styled(Typography)({
  width: "50%",
});

const StyledPostTitle = styled(Typography)({
  width: "100%",
});

const Post = () => {
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [post, setPost] = useState(initialPost);

  const reportPost = () => {};

  const deletePost = () => {
    confirm({
      title: "Delete post",
      description: "This action in permanent! Are you sure you want to delete this post?",
      confirmationText: "Delete",
    })
      .then(() => {
        console.log("deleted");
      })
      .catch(() => {
        console.log("cancelled");
      });
  };

  const showProfile = () => {
    navigate(`/profile/${post.author.id}`);
  };

  return (
    <Container component="main">
      <CssBaseline />
      <StyledContainer container>
        <Grid item xs={3} container flexDirection="column" justifyContent="center">
          <StyledAvatar
            alt={`${post.author.name} ${post.author.last_name} avatar`}
            src={post.author.photo}
            onClick={showProfile}
          />
          <StyledAuthorData
            variant="h5"
            align="center"
            sx={{ mt: 3 }}
          >{`${post.author.name} ${post.author.last_name}`}</StyledAuthorData>
          <StyledAuthorData variant="h6" align="center" sx={{ mt: 3 }}>{`${post.author.phone_number}`}</StyledAuthorData>
          <StyledItalicAuthorData
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >{`Registered ${post.author.created.toDateString()}`}</StyledItalicAuthorData>
          <StyledItalicAuthorData
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >{`Last seen ${post.author.last_active.toDateString()}`}</StyledItalicAuthorData>
          <StyledRating name="read-only" value={post.author.avg_rate} readOnly precision={0.5} sx={{ mt: 3, ml: 4 }} />
        </Grid>
        <Grid item container xs={9}>
          <Paper>
            <Grid container sx={{ p: 3 }}>
              <StyledPostDetails>{`${post.created.toDateString()}, ${post.city}`}</StyledPostDetails>
              <StyledPostDetails>{`${post.price} ${post.currency}`}</StyledPostDetails>
              <StyledPostTitle variant="h3" sx={{ m: 2 }}>
                {post.title}
              </StyledPostTitle>
              <StyledPhotoBox component="img" alt="photo" src={no_photo} sx={{ m: 2 }} />
              <Typography variant="body1" sx={{ m: 4 }}>
                {post.description}
              </Typography>
              <Grid item container justifyContent="space-between" alignItems="center">
                <Typography variant="caption" sx={{ fontSize: 14 }}>{`Views: ${post.views}`}</Typography>
                <Box>
                  <Tooltip title="Delete post">
                    <IconButton onClick={deletePost} disabled={false}>
                      {/* nie mozna usunąć nie swojego posta */}
                      <DeleteIcon color="primary" />
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
      </StyledContainer>
    </Container>
  );
};

export default withNavBar(Post);
