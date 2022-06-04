import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import PostCard from "../components/PostCard";
import withNavBar from "../hoc/WithNavBar";
import { postsSortOptions, currencies } from "../utils";
import FiltersModal from "../components/FiltersModal";
import { getPosts } from "../redux/actions/posts";
import { getUsers } from "../redux/actions/users";

const StyledContainer = styled(Grid)({
  marginTop: "100px",
  justifyContent: "center",
});

const StyledButton = styled(Button)({
  width: 250,
  fontSize: 20,
});

const StyledTextField = styled(TextField)({
  width: 250,
});

function Home({ initialPosts, getPosts, getUsers }) {
  const { t } = useTranslation("core");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filtersModalOpen, isFiltersModalOpen] = useState(false);
  const [posts, setPosts] = useState(initialPosts);
  const [myPostsMode, setMyPostsMode] = useState(false);
  const [filters, setFilters] = useState(null);
  const userId = 1;

  let params = useParams();

  useEffect(() => {
    getPosts((responseData) => {
      setInitialPosts(responseData);
    });
    getUsers();
  }, []);

  useEffect(() => {
    if (initialPosts.length) {
      getPosts((responseData) => {
        setInitialPosts(responseData);
      });
    } else {
      setInitialPosts(initialPosts);
    }
  }, [params]);

  const showMyPosts = () => {
    let defaultPosts = [...initialPosts];
    if (params?.category) defaultPosts = defaultPosts.filter((post) => post.categories.includes(+params.category));

    if (!myPostsMode) setPosts(defaultPosts.filter((post) => post.author.id === userId));
    else setPosts(defaultPosts);
    setMyPostsMode((prevState) => !prevState);
    setSearch("");
    setSort("");
    setFilters(null);
  };

  const setInitialPosts = (initPosts) => {
    let defaultPosts = [...initPosts];

    if (myPostsMode) defaultPosts = defaultPosts.filter((post) => post.author.id === userId);

    if (params?.category) {
      setPosts(defaultPosts.filter((post) => post.categories.includes(+params.category)));
    } else {
      setPosts(defaultPosts);
    }
    setSearch("");
    setSort("");
    setFilters(null);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    setFilters(null);
    setSort("");
  };

  useEffect(() => {
    let defaultPosts = [...initialPosts];
    if (myPostsMode) defaultPosts = defaultPosts.filter((post) => post.author.id === userId);
    if (params?.category) defaultPosts = defaultPosts.filter((post) => post.categories.includes(+params.category));

    setPosts(
      defaultPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(search) ||
          post.city.toLowerCase().includes(search) ||
          post.created.toDateString().toLowerCase().includes(search) ||
          post.price.toString().includes(search) ||
          post.currency.toLowerCase().includes(search)
      )
    );
  }, [search]);

  useEffect(() => {
    let defaultPosts = [...initialPosts];
    if (myPostsMode) defaultPosts = defaultPosts.filter((post) => post.author.id === userId);
    if (params?.category) defaultPosts = defaultPosts.filter((post) => post.categories.includes(+params.category));
    if (filters) {
      if (filters.minPrice) {
        defaultPosts = defaultPosts.filter((post) => post.price >= filters.minPrice);
      }

      if (filters.maxPrice) {
        defaultPosts = defaultPosts.filter((post) => post.price <= filters.maxPrice);
      }

      if (filters.currencies.length) {
        defaultPosts = defaultPosts.filter((post) =>
          filters.currencies.includes(currencies.find((curr) => curr.curr === post.currency)?.id)
        );
      }

      if (filters.cities.length) {
        defaultPosts = defaultPosts.filter((post) => filters.cities.includes(post.city));
      }

      if (filters.categories.length) {
        defaultPosts = defaultPosts.filter((post) => filters.categories.some((category) => post.categories.includes(category)));
      }
    }

    const sortOption = postsSortOptions.find((item) => item.id === sort);
    switch (sortOption?.field) {
      case "title":
        defaultPosts = [...defaultPosts.sort(titleSort)];
        break;
      case "created":
        defaultPosts = [...defaultPosts.sort(createdSort)];
        break;
      case "price":
        defaultPosts = [...defaultPosts.sort(priceSort)];
        break;
      case "views":
        defaultPosts = [...defaultPosts.sort(viewsSort)];
        break;
      default:
        defaultPosts = [...defaultPosts];
    }

    if (sortOption?.direction === "desc") {
      defaultPosts = [...defaultPosts.reverse()];
    }

    setPosts(defaultPosts);
  }, [sort]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const titleSort = (a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase());

  const createdSort = (a, b) => a.created.valueOf() - b.created.valueOf();

  const priceSort = (a, b) => a.price - b.price;

  const viewsSort = (a, b) => a.views - b.views;

  const openFiltersModal = () => {
    isFiltersModalOpen(true);
  };

  const closeFiltersModal = () => {
    isFiltersModalOpen(false);
  };

  const applyFilters = (minPrice, maxPrice, selectedCurrencies, selectedCities, selectedCategories) => {
    let defaultPosts = [...initialPosts];

    if (sort) {
      const sortOption = postsSortOptions.find((item) => item.id === sort);
      switch (sortOption?.field) {
        case "title":
          defaultPosts = [...defaultPosts.sort(titleSort)];
          break;
        case "created":
          defaultPosts = [...defaultPosts.sort(createdSort)];
          break;
        case "price":
          defaultPosts = [...defaultPosts.sort(priceSort)];
          break;
        case "views":
          defaultPosts = [...defaultPosts.sort(viewsSort)];
          break;
        default:
          defaultPosts = [...defaultPosts];
      }

      if (sortOption?.direction === "desc") {
        defaultPosts = [...defaultPosts.reverse()];
      }
    }

    if (minPrice) {
      defaultPosts = defaultPosts.filter((post) => post.price >= minPrice);
    }

    if (maxPrice) {
      defaultPosts = defaultPosts.filter((post) => post.price <= maxPrice);
    }

    if (selectedCurrencies.length) {
      defaultPosts = defaultPosts.filter((post) =>
        selectedCurrencies.includes(currencies.find((curr) => curr.curr === post.currency)?.id)
      );
    }

    if (selectedCities.length) {
      defaultPosts = defaultPosts.filter((post) => selectedCities.includes(post.city));
    }

    if (selectedCategories.length) {
      defaultPosts = defaultPosts.filter((post) => selectedCategories.some((category) => post.categories.includes(category)));
    }

    setMyPostsMode(false);
    setSearch("");
    isFiltersModalOpen(false);
    setFilters({ minPrice, maxPrice, currencies: selectedCurrencies, cities: selectedCities, categories: selectedCategories });
    setPosts(defaultPosts);
  };

  return (
    <main style={{ maxWidth: "80%", marginLeft: "auto", marginRight: "auto" }}>
      <CssBaseline />
      <StyledContainer container>
        <Grid item container justifyContent="space-between" mb={4} alignItems="center">
          <Grid item xs={3}>
            <StyledButton variant="contained" size="large" onClick={showMyPosts} color="secondary" sx={{ ml: 3 }}>
              {myPostsMode ? t("home.allPosts") : t("home.myPosts")}
            </StyledButton>
          </Grid>
          <Grid item xs={9} container display="inline-flex" alignItems="center" justifyContent="flex-end">
            {!params?.category ? (
              <Button size="large" variant="contained" color="secondary" onClick={openFiltersModal} sx={{ mr: 1 }}>
                {t("home.filters")}
              </Button>
            ) : null}
            <FormControl sx={{ width: 250, mr: 1 }}>
              <InputLabel id="sort-select-label">{t("home.sort")}</InputLabel>
              <Select
                fullWidth
                labelId="sort-select-label"
                value={sort}
                label={t("home.sort")}
                onChange={handleSortChange}
                displayEmpty
                renderValue={(value) => {
                  const option = postsSortOptions.find((item) => item.id === value);
                  return option ? `${t(`home.sortFields.${option.field}`)} ${t(`home.sortFields.${option.direction}`)}` : "";
                }}
              >
                <MenuItem value="">{t("home.none")}</MenuItem>
                {postsSortOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>{`${t(`home.sortFields.${option.field}`)} ${t(
                    `home.sortFields.${option.direction}`
                  )}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <StyledTextField
              label={t("home.search")}
              value={search}
              type="search"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
              sx={{ mr: 3 }}
            />
          </Grid>
        </Grid>
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </StyledContainer>
      {closeFiltersModal ? (
        <FiltersModal
          filters={filters}
          onClose={closeFiltersModal}
          open={filtersModalOpen}
          cities={[...new Set(initialPosts.map((post) => post.city))]}
          applyFilters={applyFilters}
        />
      ) : null}
    </main>
  );
}

const mapDispatchToProps = {
  getPosts,
  getUsers,
};

const mapStateToProps = (state) => ({
  initialPosts: state.posts,
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavBar(Home));
