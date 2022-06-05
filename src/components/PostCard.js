import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";

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

const PostCard = ({ title, created, city, price, currency, photoUrl, id, categories = [], reportCount, categoriesList }) => {
  const { i18n, t } = useTranslation("core");
  const navigate = useNavigate();

  const selectPost = () => {
    navigate(`/posts/${id}`);
  };

  return (
    <StyledCard onClick={selectPost} sx={{ m: 2 }}>
      <CardMedia component="img" height="140" image={photoUrl || no_photo} alt="post-photo" />
      <StyledCardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Grid container alignItems="center" justifyContent="space-between">
          <StyledTypography variant="caption">{`${created ? new Date(created).toDateString() : ""}, ${
            city || ""
          }`}</StyledTypography>
          <StyledTypography variant="body1">{`${price} ${currency}`}</StyledTypography>
        </Grid>
        <Grid container alignItems="center" justifyContent="space-around" sx={{ mt: 2, mb: 2 }}>
          {categories.map((category) => (
            <Chip
              key={`${id}_${category.id}`}
              label={
                i18n.language === "pl"
                  ? categoriesList.find((item) => item.id === category.id)?.namePl
                  : categoriesList.find((item) => item.id === category.id)?.nameEng
              }
              sx={{ mt: 1 }}
            />
          ))}
        </Grid>
        <Grid container alignItems="center" justifyContent="center">
          <StyledTypography variant="caption">{t("post.reported", { count: reportCount })}</StyledTypography>
        </Grid>
      </StyledCardContent>
    </StyledCard>
  );
};

const mapStateToProps = (state) => ({
  categoriesList: state.categories,
});

export default connect(mapStateToProps)(PostCard);
