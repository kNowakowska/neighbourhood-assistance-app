import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";

const Comment = ({ comment, created, author, rate }) => {
  return (
    <Card sx={{ mb: 2, mt: 2, width: "95%" }}>
      <Box sx={{ display: "flex", alignItems: "center", padding: 2, justifyContent: "space-between" }}>
        <Typography>{`${author.name} ${author.last_name} - ${created.toDateString()}`}</Typography>
        <Rating name="read-only" value={rate} readOnly precision={0.5} />
      </Box>
      <Typography sx={{ width: "80%", mr: "auto", ml: "auto", mt: 2, mb: 2, fontStyle: "italic" }}>{comment}</Typography>
    </Card>
  );
};

export default Comment;
