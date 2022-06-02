import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

import { currencies } from "../utils";

function FiltersModal({ open, onClose, cities, applyFilters, filters, categories }) {
  const { t, i18n } = useTranslation("core");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);

  useEffect(() => {
    if (!filters) {
      setMinPrice("");
      setMaxPrice("");
      setSelectedCategories([]);
      setSelectedCities([]);
      setSelectedCurrencies([]);
    }
  }, [filters]);

  const cancelFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategories([]);
    setSelectedCities([]);
    setSelectedCurrencies([]);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("home.filters")}</DialogTitle>
      <DialogContent sx={{ m: 3 }}>
        <Grid container direction="column" spacing={2}>
          <Grid item container justifyContent="space-around" alignItems="center">
            <Typography variant="subtitle1" sx={{ width: "25%" }}>
              {t("home.price")}
            </Typography>
            <TextField
              sx={{ width: "30%" }}
              label={t("home.minPrice")}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              type="number"
              variant="outlined"
            />
            <TextField
              sx={{ width: "30%" }}
              label={t("home.maxPrice")}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              type="number"
              variant="outlined"
            />
          </Grid>
          <Grid item container justifyContent="space-around" alignItems="center">
            <Typography variant="subtitle1" sx={{ width: "25%" }}>
              {t("home.currencies")}
            </Typography>
            <FormControl sx={{ width: "60%" }}>
              <InputLabel id="currency-filter-label">{t("home.currencies")}</InputLabel>
              <Select
                labelId="currency-filter-label"
                value={selectedCurrencies}
                label={t("home.currencies")}
                onChange={(e) => setSelectedCurrencies(e.target.value)}
                multiple
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={currencies.find((item) => item.id === value)?.curr || ""} />
                    ))}
                  </Box>
                )}
                displayEmpty
              >
                {currencies.map((curr) => (
                  <MenuItem key={curr.id} value={curr.id}>
                    <Checkbox checked={selectedCurrencies.includes(curr.id)} />
                    <ListItemText primary={`${curr.symbol} ${curr.curr}`} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item container justifyContent="space-around" alignItems="center">
            <Typography variant="subtitle1" sx={{ width: "25%" }}>
              {t("home.categories")}
            </Typography>
            <FormControl sx={{ width: "60%" }}>
              <InputLabel id="categories-filter-label">{t("home.categories")}</InputLabel>
              <Select
                labelId="categories-filter-label"
                value={selectedCategories}
                label={t("home.categories")}
                onChange={(e) => setSelectedCategories(e.target.value)}
                multiple
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          i18n.language === "pl"
                            ? categories.find((item) => item.id === value)?.namePl
                            : categories.find((item) => item.id === value)?.nameEng
                        }
                      />
                    ))}
                  </Box>
                )}
                displayEmpty
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    <Checkbox checked={selectedCategories.includes(cat.id)} />
                    <ListItemText primary={i18n.language === "pl" ? cat.namePl : cat.nameEng} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item container justifyContent="space-around" alignItems="center">
            <Typography variant="subtitle1" sx={{ width: "25%" }}>
              {t("home.cities")}
            </Typography>
            <FormControl sx={{ width: "60%" }}>
              <InputLabel id="cities-filter-label">{t("home.cities")}</InputLabel>
              <Select
                labelId="cities-filter-label"
                value={selectedCities}
                label={t("home.cities")}
                onChange={(e) => setSelectedCities(e.target.value)}
                multiple
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                displayEmpty
              >
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    <Checkbox checked={selectedCities.includes(city)} />
                    <ListItemText primary={city} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Grid container justifyContent="space-between">
          <Button onClick={cancelFilters} variant="outlined" color="primary">
            {t("home.cancel")}
          </Button>
          <Button
            onClick={() => applyFilters(minPrice, maxPrice, selectedCurrencies, selectedCities, selectedCategories)}
            variant="contained"
            color="primary"
          >
            {t("home.applyFilters")}
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(FiltersModal);
