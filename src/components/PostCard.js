import React from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";

import no_photo from "../assets/no-photo.png";
import { categories as categoriesList } from "../utils";

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

const PostCard = ({ title, created, city, price, currency, photo, id, categories }) => {
  const navigate = useNavigate();

  const selectPost = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <StyledCard onClick={selectPost} sx={{ m: 2 }}>
      <CardMedia component="img" height="140" image={no_photo} alt="post-photo" />
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Grid container alignItems="center" justifyContent="space-between">
          <StyledTypography variant="caption">{`${created.toDateString()}, ${city}`}</StyledTypography>
          <StyledTypography variant="body1">{`${price} ${currency}`}</StyledTypography>
        </Grid>
        <Grid container alignItems="center" justifyContent="space-around" sx={{ mt: 2 }}>
          {categories.map((category) => (
            <Chip key={category} label={categoriesList.find((item) => item.id === category)?.name_pl} sx={{ mt: 1 }} />
          ))}
        </Grid>
      </StyledCardContent>
    </StyledCard>
  );
};

export default PostCard;
