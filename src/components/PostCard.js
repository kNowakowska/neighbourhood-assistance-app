import React from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import no_photo from "../assets/no-photo.png";

const StyledCard = styled(Card)({
  width: 275,
  display: "inline-block",
  "&:hover": { cursor: "pointer" },
});

const StyledCardContent = styled(CardContent)({
  backgroundColor: (theme) => theme.palette.background.paper,
});

const StyledTypography = styled(Typography)({
  width: "50%",
});

const PostCard = ({ title, created, city, price, currency, photo, id }) => {
  const navigate = useNavigate();

  const selectPost = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <StyledCard onClick={selectPost} sx={{m:2}}>
      <CardMedia component="img" height="140" image={no_photo} alt="post-photo" />
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Grid container>
          <StyledTypography variant="body2">{`${created.toDateString()}, ${city}`}</StyledTypography>
          <StyledTypography variant="body2">{`${price} ${currency}`}</StyledTypography>
        </Grid>
      </StyledCardContent>
    </StyledCard>
  );
};

export default PostCard;
