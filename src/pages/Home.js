import React, {useEffect, useState} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import PostCard from "../components/PostCard"

import withNavBar from "../hoc/WithNavBar";
import { TextField, Button, InputAdornment, Icon } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const initialPosts = [
  {
    id: 1,
    title: "Układam płytki",
    created: new Date(),
    city: "Kielce",
    price: 100,
    currency: "PLN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 1,
      phone_number: "123456123",
      photo: null,
    },
  },
  {
    id: 2,
    title: "Układam płytki",
    created: new Date(),
    city: "Kielce",
    price: 100,
    currency: "PLN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 1,
      phone_number: "123456123",
      photo: null,
    },
  },
  {
    id: 3,
    title: "Układam płytki",
    created: new Date(),
    city: "Kielce",
    price: 100,
    currency: "PLN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 1,
      phone_number: "123456123",
      photo: null,
    },
  },
  {
    id: 4,
    title: "Układam płytki",
    created: new Date(2021,11,5),
    city: "Kielce",
    price: 100,
    currency: "PLN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 2,
      phone_number: "123456123",
      photo: null,
    },
  },
  {
    id: 5,
    title: "Układam panele",
    created: new Date(),
    city: "Kielce",
    price: 100,
    currency: "PLN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 2,
      phone_number: "123456123",
      photo: null,
    },
  },
  {
    id: 6,
    title: "Układam płytki",
    created: new Date(),
    city: "Kielce",
    price: 200,
    currency: "EUR",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 2,
      phone_number: "123456123",
      photo: null,
    },
  },
  {
    id: 7,
    title: "Układam płytki",
    created: new Date(),
    city: "Warszawa",
    price: 100,
    currency: "PLN",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nobis velit quas voluptatibus cupiditate, odit iure et minus aliquam at!",
    photo: null,
    views: 50,
    author: {
      name: "John",
      last_name: "Smith",
      id: 1,
      phone_number: "123456123",
      photo: null,
    },
  },
];

function Home() {
  const [ search, setSearch] = useState("")
  const [ posts, setPosts] = useState(initialPosts);
  const [onlyMyPosts, setOnlyMyPosts] = useState(false)

  const showMyPosts = (userId) => {
    if(!onlyMyPosts)
      setPosts(initialPosts.filter(post => post.author.id === userId))
    else
      setPosts(initialPosts)
    setOnlyMyPosts(prevState => !prevState)

  }

  const handleSearch = e => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    setPosts(initialPosts.filter(post => post.title.includes(search) || post.city.includes(search) || post.created.toDateString().includes(search) || post.price.toString().includes(search) || post.currency.includes(search)))

  }, [search])
  return (
    <main style={{maxWidth: "80%", marginLeft: "auto", marginRight: "auto"}}>
      <CssBaseline />
      <Grid container sx={{ marginTop: "100px", justifyContent: "center"}}>   
      <Grid item container justifyContent="space-between" mb={4}>
      <Button variant="contained" size="large" onClick={() => showMyPosts(1)} color="secondary"  sx={{width: 250, fontSize: 20, ml:3}}>{onlyMyPosts ? "All posts" : "My posts"}</Button>
      <TextField 
      label="Search"
        value={search}
        type="search"
        variant="outlined"
        InputProps={{
          endAdornment:<InputAdornment position="end"><SearchIcon/></InputAdornment>
        }}
        onChange={handleSearch}
        sx={{mr: 3, width: 250}}
      /> 

      </Grid> 
      {posts.map(post => <PostCard key={post.id} {...post} />)}
      </Grid>
    </main>
  );
}

export default withNavBar(Home);
