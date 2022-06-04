import React from "react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const StyledCard = styled(Card)({
  width: "95%",
});

const StyledBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const StyledComment = styled(Typography)({
  width: "80%",
  fontStyle: "italic",
});

const Comment = ({ comment, created, rate, author }) => {
  return (
    <StyledCard sx={{ mb: 2, mt: 2 }}>
      <StyledBox sx={{ p: 2 }}>
        <Typography>{`${author.name} ${author.lastName} - ${created ? new Date(created).toDateString() : ""}`}</Typography>
        <Rating name="read-only" value={rate || 0} readOnly precision={0.5} />
      </StyledBox>
      <StyledComment sx={{ mr: "auto", ml: "auto", mt: 2, mb: 2 }}>{comment || ""}</StyledComment>
    </StyledCard>
  );
};

export default Comment;
