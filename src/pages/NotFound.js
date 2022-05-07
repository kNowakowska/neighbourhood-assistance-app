import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation("core");
  return (
    <div className="App">
      <Typography variant="h1" color="primary" sx={{ mt: "100px" }}>
        {t("errors.notFound")}
      </Typography>
    </div>
  );
}

export default NotFound;
