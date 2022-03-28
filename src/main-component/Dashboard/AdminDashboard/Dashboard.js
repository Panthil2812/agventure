import React, { useState } from "react";
import {
  useMediaQuery,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  IconButton,
  Dialog,
  Snackbar,
  Alert,
  Button,
  Grid,
  Chip,
  Card,
  CardMedia,
  Avatar,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  useTheme,
} from "@mui/material";
import profile from "../../../assets/Images/profile.png";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const CityName = [
  {
    categories: "fruits",
    name: "Apple",
    id: "1",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/265px-Red_Apple.jpg",
    price: 35,
    stock: 30,
  },
  {
    categories: "fruits",
    name: "Banana",
    id: "2",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/320px-Bananas_white_background_DS.jpg",
    price: 12,
    stock: 25,
  },
  {
    categories: "fruits",
    name: "Grapes",
    id: "3",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Table_grapes_on_white.jpg/320px-Table_grapes_on_white.jpg",
    weight: 0.1,
    price: 45,
    stock: 150,
  },
  {
    categories: "fruits",
    name: "Pineapple",
    id: "4",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Pineapple_and_cross_section.jpg/286px-Pineapple_and_cross_section.jpg",
    price: 200,
    stock: 20,
  },

  {
    categories: "vegetables",
    name: "Cabbage",
    image: "https://www.freepngimg.com/thumb/categories/2970.png",
    quantity: "One Unit",
    id: "5",
    price: 30,
    stock: 30,
  },
  {
    categories: "vegetables",
    name: "Capsicum",
    image:
      "https://www.nicepng.com/png/detail/52-525615_green-bell-pepper-png-green-capsicum-png.png",
    quantity: "One Unit",
    id: "6",
    price: 5,
    stock: 50,
  },
  {
    categories: "vegetables",
    name: "Garlic",
    image:
      "https://www.freepngimg.com/thumb/garlic/2-2-garlic-transparent-thumb.png",
    quantity: "One Unit",
    id: "7",
    price: 20,
    stock: 55,
  },
  {
    categories: "vegetables",
    name: "Beetroot",
    image: "https://pngimg.com/uploads/beet/beet_PNG28.png",
    quantity: "One Unit",
    id: "8",
    price: 20,
    stock: 28,
  },
  {
    categories: "vegetables",
    name: "Tomatoes",
    image: "https://www.freepngimg.com/thumb/categories/2985.png",
    quantity: "One Unit",
    id: "9",
    price: 5,
    stock: 100,
  },
  {
    categories: "vegetables",
    name: "Celeriac",
    image:
      "https://w7.pngwing.com/pngs/252/146/png-transparent-celeriac-leaf-vegetable-food-celery-herbes-leaf-vegetable-food-plant-stem-thumbnail.png",
    quantity: "One Bunch",
    id: "10",
    price: 5,
    stock: 250,
  },
  {
    categories: "vegetables",
    name: "Carrots",
    image: "https://www.freepngimg.com/thumb/categories/2971.png",
    quantity: "One Kg",
    id: "11",
    price: 60,
    stock: 60,
  },
  {
    categories: "vegetables",
    name: "Onions",
    image:
      "https://www.freepngimg.com/thumb/onion/10-red-onion-png-image-thumb.png",
    quantity: "One Kg",
    id: "12",
    price: 120,
    stock: 55,
  },
  {
    categories: "vegetables",
    name: "Potatoes",
    image:
      "https://www.freepngimg.com/thumb/potato/7-potato-png-images-pictures-download-thumb.png",
    quantity: "One container",
    id: "13",
    price: 80,
    stock: 300,
  },
];
const data = [
  {
    _id: "623786ec31827b688d533853",
    user_name: "Panthil Malaviya",
    full_name: "panthil malaviya",
    email_id: "pmalaviya@rku.ac.in",
    type: 1,
    city: "surat",
    state: "gujarat",
    address: "47,harikrishna sco,katragram,surat,gujarat",
    phone: 6353980453,
    profile_pic:
      "https://firebasestorage.googleapis.com/v0/b/agventure-ibid.appspot.com/o/623786ec31827b688d533853?alt=media&token=e72b2089-4a9f-4293-a0bc-e6d75838ed65",
  },
  {
    _id: "623784ef34fa4290d1df3d96",
    user_name: "customer",
    full_name: "customer",
    email_id: "customer123@gmail.com",
    type: 0,
    city: "Mumbai",
    state: "Mumbai",
    address: "",
    phone: 9876543210,
    profile_pic:
      "https://firebasestorage.googleapis.com/v0/b/agventure-ibid.appspot.com/o/623784ef34fa4290d1df3d96?alt=media&token=f0ed7a40-86d0-4c6f-8d88-538c48cf9661",
  },
  {
    _id: "623f474c78d8b624fde5a2de",
    user_name: "qwe123@gmail.com",
    full_name: "qwe123@gmail.com",
    email_id: "qwe123@gmail.com",
    type: 1,
    city: "Chennai",
    state: "Karnataka",
    address: "qwe123@gmail.com",
    phone: 1234567890,
  },
];
const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const onDelete = (cards) => {
    console.log("deleted", cards);
  };
  const [searchitem, setSearchItem] = useState("");
  const handleOnSearch = (string, results) => {
    console.log(string, results);
    setSearchItem("");
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    setSearchItem(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };
  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {item.user_name}
        </span>
      </>
    );
  };
  return (
    <>
      <Box sx={{ marginTop: 4 }}>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            color: "#325240",
            fontWeight: "bold",
            margin: "0 auto 32px auto",
            width: "fit-content",
            borderBottom: "2px outset #325240",
            textAlign: "center",
          }}
        >
          DASHBOARD
        </Typography>
      </Box>
      <ReactSearchAutocomplete
        items={data}
        maxResults={6}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        placeholder="Search for product, brands and more"
        // onClear={handleOnClear}
        resultStringKeyName="user_name"
        fuseOptions={{
          keys: ["user_name", "email_id", "phone"],
        }} 
        styling={{
          zIndex: 100,
          borderRadius: "9px",
          boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
          border: "1px solid #325240",
          height: "7vh",
          placeholderFontSize: "2.5vh",
          fontSize: "2.5vh",
        }}
      />
      <Box sx={{ mt: 7 }}>
        {searchitem && (
          <Card
            sx={{
              bgcolor: "#f9f9f9",
              margin: "8px",
              padding: "10px",
              alignItem: "center",
              border: "0.5px solid #325240",
              boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2)",
              "&:hover": {
                bgcolor: "#f1f1f1",
                boxShadow: "0 16px 16px 4px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <Box sx={{ flexGrow: 1 }} key={data._id}>
              <Grid container spacing={3}>
                <Grid item xs={1}>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      searchitem.profile_pic ? searchitem.profile_pic : profile
                    }
                    sx={{ height: "50px", width: "50px" }}
                  />
                </Grid>
                <Grid item xs={7}>
                  <Typography
                    sx={{
                      color: "#325240",
                      fontSize: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    {searchitem.user_name}
                    <br />
                    <Typography>{searchitem.email_id}</Typography>
                  </Typography>
                </Grid>
                <Grid item xs={3} sx={{ marginTop: "8px" }}>
                  {searchitem.type ? (
                    <Chip
                      label="Vendor"
                      color="warning"
                      sx={{ width: "100px" }}
                    />
                  ) : (
                    <Chip
                      label="Customer"
                      sx={{
                        width: "100px",
                        bgcolor: "#325240",
                        color: "#fff",
                      }}
                    />
                  )}
                  {/* <Chip label="Vendor" color="warning" />
                   */}
                </Grid>
                <Grid item xs={1} sx={{ marginTop: "5px" }}>
                  <IconButton
                    color="error"
                    onClick={() => {
                      // handleClickOpen(searchitem._id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Card>
        )}
      </Box>
    </>
  );
};
export default Dashboard;
