import React, { useEffect, useState } from "react";
import { useConfirm } from "material-ui-confirm";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

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
import { deletePost, getPosts, reportPost } from "../redux/actions/posts";
import { getUsers } from "../redux/actions/users";

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

const Post = ({ posts, deletePost, loggedUser, getPosts, users, getUsers, reportPost }) => {
  const { t } = useTranslation("core");
  const confirm = useConfirm();
  const navigate = useNavigate();
  const params = useParams();

  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (!posts.length) {
      getPosts();
    }
    if (!users.length) {
      getUsers();
    }
  }, []);

  useEffect(() => {
    const post = posts.find((post) => post.id === +params.id);
    setPost({ ...post });
    setAuthor(users.find((user) => user.id === post.author.id));
  }, [params]);

  const handleReportPost = () => {
    reportPost(post.id, (responseData) => {
      setPost(responseData);
    });
  };

  const handleDeletePost = () => {
    confirm({
      title: t("post.deletePost"),
      description: t("post.deletePostConfirmationDesc"),
      confirmationText: t("post.delete"),
      cancellationText: t("post.cancel"),
    }).then(() => {
      deletePost(post.id);
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
          <StyledAvatar alt={`${author?.name} ${author?.lastName} avatar`} src={author?.photo} onClick={showProfile} />
          <StyledAuthorData
            variant="h5"
            align="center"
            sx={{ mt: 3 }}
          >{`${author?.name} ${author?.lastName}`}</StyledAuthorData>
          <StyledAuthorData variant="h6" align="center" sx={{ mt: 3 }}>{`${author?.phoneNumber}`}</StyledAuthorData>
          <StyledItalicAuthorData variant="body2" align="center" sx={{ mt: 3 }}>
            {t("profile.registered", { date: author?.created ? new Date(author?.created).toDateString() : "" })}
          </StyledItalicAuthorData>
          <StyledItalicAuthorData variant="body2" align="center" sx={{ mt: 3 }}>
            {t("profile.lastSeen", { date: author ? new Date(author?.lastActive).toDateString() : "" })}
          </StyledItalicAuthorData>
          <StyledRating name="read-only" value={author?.averageRate} readOnly precision={0.5} sx={{ mt: 3, ml: 4 }} />
        </Grid>
        <Grid item container xs={9}>
          <Paper>
            <Grid container sx={{ p: 3 }}>
              <StyledPostDetails>{`${post?.created ? new Date(post.created).toDateString() : ""}, ${
                post?.city
              }`}</StyledPostDetails>
              <StyledPostDetails>{`${post?.price || 0} ${post?.currency || ""}`}</StyledPostDetails>
              <StyledPostTitle variant="h3" sx={{ m: 2 }}>
                {post?.title || ""}
              </StyledPostTitle>
              <StyledPhotoBox component="img" alt="photo" src={no_photo} sx={{ m: 2 }} />
              <Typography variant="body1" sx={{ m: 4 }}>
                {post?.description || ""}
              </Typography>
              <Grid item container justifyContent="space-between" alignItems="center">
                <Typography variant="caption" sx={{ fontSize: 14 }}>
                  {t("post.reported", { count: post?.reportCount })}
                </Typography>
                <Box>
                  {post && loggedUser.id === post.author.id && (
                    <Tooltip title={t("post.deletePost")}>
                      <IconButton onClick={handleDeletePost} disabled={false}>
                        <DeleteIcon color="primary" />
                      </IconButton>
                    </Tooltip>
                  )}
                  {post && loggedUser.id !== post.author.id && (
                    <Tooltip title={t("post.reportPost")}>
                      <IconButton onClick={handleReportPost} disabled={false}>
                        <FlagIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </StyledContainer>
    </Container>
  );
};

const mapDispatchToProps = {
  deletePost,
  getPosts,
  getUsers,
  reportPost,
};
const mapStateToProps = (state) => ({
  categories: state.categories,
  loggedUser: state.system,
  posts: state.posts,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavBar(Post));
