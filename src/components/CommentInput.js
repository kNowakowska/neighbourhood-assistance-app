import React, { useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const CommentInput = ({ onSave }) => {
  const [rate, setRate] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <Card sx={{ mb: 2, mt: 2, p: 3, width: "95%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <TextField value={comment} onChange={(e) => setComment(e.target.value)} multiline sx={{ width: "70%" }} />

      <Rating name="read-only" value={rate} onChange={(_e, newValue) => setRate(newValue)} precision={0.5} />
      <Button variant="contained" color="secondary" disabled={!comment} onClick={onSave}>
        Save
      </Button>
    </Card>
  );
};

export default CommentInput;
