import * as React from "react";
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
import axios from "axios";
import qs from "query-string";
import nofound from "../../../assets/Images/nofound.png";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { getCookie } from "../../Validator/CookieFunction";
const Products = () => {
  const theme = useTheme();
  const [ProductData, setProductData] = React.useState([]);
  const [searchitem, setSearchItem] = React.useState("");
  const [flag, setFlag] = React.useState(false);

  const token = getCookie("token");

  const backDrop = () => {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={flag}
          onClick={handleClose}
        >
          <CircularProgress sx={{ color: "#325240" }} />
        </Backdrop>
      </>
    );
  };
  const handleClose = () => {
    setFlag(false);
  };
  const allProducts = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}products/fetch_all_products`,
    })
      .then(function (response) {
        if (response.data.status === 504) {
          console.log("error");
          setFlag(false);
        }
        if (response.data.status === 200) {
          const ff = response.data.data;
          setProductData(response.data.data);
          console.log("ProductData : ", ProductData);
          setFlag(false);
          return 0;
        }
      })
      .catch(function (error) {
        setFlag(false);
      });
  };
  const handleOnSearch = (string, results) => {
    console.log(string, results);
    setSearchItem("");
  };
  const handleOnSelect = (item) => {
    setSearchItem(item);
  };
  React.useEffect(() => {
    allProducts();
  }, []);
  const SearchBar = (
    <React.Fragment>
      <ReactSearchAutocomplete
        items={ProductData}
        maxResults={6}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        placeholder="Search Products"
        resultStringKeyName="pro_name"
        fuseOptions={{
          keys: ["pro_name"],
        }}
        styling={{
          zIndex: "50",
          borderRadius: "9px",
          boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
          border: "3px solid #325240",
          height: "7vh",
          marginBottom: "7vh",
          placeholderFontSize: "2.5vh",
          fontSize: "2.5vh",
          color: "#325240",
          backgroundColor: "#f9f9f9",
        }}
      />
    </React.Fragment>
  );
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
          ALL PRODUCTS
        </Typography>
        <Box>
          <Box
            sx={{
              boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2)",
              marginLeft: "25%",
              marginRight: "25%",
            }}
          >
            {SearchBar}
          </Box>
          <Box sx={{ mt: 7 }}>
            {!ProductData.length && (
              <Box sx={{ textAlign: "center" }}>
                <img alt="image" src={nofound} />
                <Typography
                  component="h1"
                  variant="h5"
                  sx={{
                    color: "#325240",
                    fontWeight: "bold",
                    margin: "0 auto 32px auto",
                    width: "fit-content",
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                    }}
                  >
                    No Products Found!
                  </span>
                  <span>Ready to start selling something awesome?</span>
                </Typography>
              </Box>
            )}
            {!searchitem &&
              ProductData.length &&
              ProductData.map((data) => {
                return (
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
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={1}>
                          <Avatar
                            alt="Remy Sharp"
                            src={data.pro_image ? data.pro_image : profile}
                            sx={{ height: "56px", width: "56px" }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Typography
                            sx={{
                              color: "#325240",
                              fontSize: "18px",
                              fontWeight: "bold",
                            }}
                          >
                            {data.pro_name}
                            <br />
                            <Typography>
                              ₹ {data.pro_sell_price} /{data.pro_unit}
                            </Typography>
                          </Typography>
                        </Grid>

                        <Grid item xs={3} sx={{ marginTop: "5px" }}>
                          <Chip
                            label={data.vendor_email_id}
                            sx={{ bgcolor: "#325240", color: "#fff" }}
                          />
                        </Grid>
                        <Grid item xs={2} sx={{ marginTop: "8px" }}>
                          {data.pro_category === "Vegetables" && (
                            <Chip
                              label={data.pro_category}
                              sx={{ bgcolor: "#D4AC0D", color: "#fff" }}
                            />
                          )}
                          {data.pro_category === "Dairy Products" && (
                            <Chip
                              label={data.pro_category}
                              sx={{ bgcolor: "#B9770E", color: "#fff" }}
                            />
                          )}
                          {data.pro_category === "Fruits" && (
                            <Chip
                              label={data.pro_category}
                              sx={{ bgcolor: "#2874A6", color: "#fff" }}
                            />
                          )}
                          {data.pro_category === "Grocery" && (
                            <Chip
                              label={data.pro_category}
                              sx={{ bgcolor: "#A04000", color: "#fff" }}
                            />
                          )}
                        </Grid>
                        <Grid item xs={2} sx={{ marginTop: "8px" }}>
                          {data.pro_stock === "In Stock" && (
                            <Chip
                              label={data.pro_stock}
                              sx={{ bgcolor: "#325240", color: "#fff" }}
                            />
                          )}
                          {data.pro_stock === "Out of Stock" && (
                            <Chip
                              label={data.pro_stock}
                              sx={{ bgcolor: "#B10000", color: "#fff" }}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                );
              })}
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
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={1}>
                      <Avatar
                        alt="Remy Sharp"
                        src={
                          searchitem.pro_image ? searchitem.pro_image : profile
                        }
                        sx={{ height: "56px", width: "56px" }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        sx={{
                          color: "#325240",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {searchitem.pro_name}
                        <br />
                        <Typography>
                          ₹ {searchitem.pro_sell_price} /{searchitem.pro_unit}
                        </Typography>
                      </Typography>
                    </Grid>

                    <Grid item xs={3} sx={{ marginTop: "5px" }}>
                      <Chip
                        label={searchitem.vendor_email_id}
                        sx={{ bgcolor: "#325240", color: "#fff" }}
                      />
                    </Grid>
                    <Grid item xs={2} sx={{ marginTop: "8px" }}>
                      {searchitem.pro_category === "Vegetables" && (
                        <Chip
                          label={searchitem.pro_category}
                          sx={{ bgcolor: "#D4AC0D", color: "#fff" }}
                        />
                      )}
                      {searchitem.pro_category === "Dairy Products" && (
                        <Chip
                          label={searchitem.pro_category}
                          sx={{ bgcolor: "#B9770E", color: "#fff" }}
                        />
                      )}
                      {searchitem.pro_category === "Fruits" && (
                        <Chip
                          label={searchitem.pro_category}
                          sx={{ bgcolor: "#2874A6", color: "#fff" }}
                        />
                      )}
                      {searchitem.pro_category === "Grocery" && (
                        <Chip
                          label={searchitem.pro_category}
                          sx={{ bgcolor: "#A04000", color: "#fff" }}
                        />
                      )}
                    </Grid>
                    <Grid item xs={2} sx={{ marginTop: "8px" }}>
                      {searchitem.pro_stock === "In Stock" && (
                        <Chip
                          label={searchitem.pro_stock}
                          sx={{ bgcolor: "#325240", color: "#fff" }}
                        />
                      )}
                      {searchitem.pro_stock === "Out of Stock" && (
                        <Chip
                          label={searchitem.pro_stock}
                          sx={{ bgcolor: "#B10000", color: "#fff" }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            )}

          </Box>
        </Box>
        {backDrop()}
      </Box>
    </>
  );
};
export default Products;
