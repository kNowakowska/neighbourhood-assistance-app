import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const StyledCard = styled(Card)({
  width: "95%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const StyledTextField = styled(TextField)({
  width: "70%",
});

const CommentInput = ({ onSave }) => {
  const { t } = useTranslation("core");
  const [rate, setRate] = useState(5);
  const [comment, setComment] = useState("");

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleChangeRate = (_e, newValue) => {
    setRate(newValue);
  };

  const handleSave = () => {
    onSave({ rate, comment });
  };

  return (
    <StyledCard sx={{ mb: 2, mt: 2, p: 3 }}>
      <StyledTextField value={comment} onChange={handleChangeComment} multiline />
      <Rating name="read-only" value={rate} onChange={handleChangeRate} precision={0.5} />
      <Button variant="contained" color="secondary" disabled={!comment} onClick={handleSave}>
        {t("profile.save")}
      </Button>
    </StyledCard>
  );
};

export default CommentInput;
