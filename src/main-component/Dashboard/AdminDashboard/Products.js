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
  Pagination,
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
  const [currentpageData, setcurrentpageDate] = React.useState([]);
  const [searchitem, setSearchItem] = React.useState("");
  const [flag, setFlag] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [DataperPage, setDataperPage] = React.useState(10);

  const token = getCookie("token");

  // console.log({ page, currentpageData });

  const handleChangePage = (event, value) => {
    console.log(value);
    setPage(value);
  };
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
          setPage(1);
          return 0;
        }
      })
      .catch(function (error) {
        setFlag(false);
      });
  };
  const handleOnSearch = (string, results) => {
    // console.log(string, results);
    setSearchItem(string);
  };
  const handleOnSelect = (item) => {
    setSearchItem(item.pro_name);
  };
  React.useEffect(() => {
    allProducts();
  }, []);
  React.useEffect(() => {
    setcurrentpageDate(
      ProductData.filter(
        (e) =>
          e.pro_name.toLowerCase().includes(searchitem.toLowerCase()) ||
          e.vendor_email_id.toLowerCase().includes(searchitem.toLowerCase())
      )
    );
  }, [page, searchitem]);

  const DisplayProducts = React.useMemo(() => {
    const indexOfLastPost = page * DataperPage;
    const indexOfFirstPost = indexOfLastPost - DataperPage;
    return currentpageData.slice(indexOfFirstPost, indexOfLastPost);
  }, [page, currentpageData]);

  const SearchBar = (
    <React.Fragment>
      <ReactSearchAutocomplete
        items={[{ pro_name: searchitem }, ...ProductData]}
        maxResults={6}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        placeholder="Search Products"
        resultStringKeyName="pro_name"
        fuseOptions={{
          keys: ["pro_name", "vendor_email_id"],
        }}
        styling={{
          zIndex: "50",
          borderRadius: "9px",
          boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
          border: "3px solid #325240",
          // height: "7vh",
          // marginBottom: "7vh",
          placeholderFontSize: "2.5vh",
          fontSize: "2.5vh",
          color: "#325240",
          backgroundColor: "#f9f9f9",
        }}
      />
    </React.Fragment>
  );
  const showProducts = () => {
    if (currentpageData.length === 0) {
      return (
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
      );
    } else {
      return (
        <Box>
          {DisplayProducts.map((data) => {
            return (
              <Box
                sx={{
                  bgcolor: "#f9f9f9",
                  margin: 3,
                  padding: 1,
                  alignItem: "center",
                  border: "2px solid #325240",
                  borderRadius: "10px",
                  boxShadow: "0px 16px 16px 0px rgba(0, 0, 0, 0.2)",
                  transform: "scale(1)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.04)",
                    boxShadow: "0 20px 20px 0 rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={1.5} sx={{ alignSelf: "center" }}>
                      <img
                        style={{
                          width: "70px",
                          height: "65px",
                          borderRadius: "10px",
                        }}
                        src={data.pro_image ? data.pro_image : profile}
                        alt="crat products image"
                      />
                    </Grid>
                    <Grid item xs={2.5} sx={{ alignSelf: "center" }}>
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

                    <Grid item xs={3} sx={{ alignSelf: "center" }}>
                      <Chip
                        label={data.vendor_email_id}
                        sx={{ bgcolor: "#325240", color: "#fff" }}
                      />
                    </Grid>
                    <Grid item xs={2} sx={{ alignSelf: "center" }}>
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
                    <Grid item xs={2} sx={{ alignSelf: "center" }}>
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
              </Box>
            );
          })}
          <Box sx={{ mt: 7, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={Math.ceil(currentpageData.length / DataperPage)}
              variant="outlined"
              sx={{
                "& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
                  {
                    backgroundColor: "#325240",
                    color: "#fff",
                  },
                "& .css-lqq3n7-MuiButtonBase-root-MuiPaginationItem-root": {
                  backgroundColor: "#f9f9f9",
                  color: "#325240",
                  border: "1px solid #325240",
                },
              }}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </Box>
      );
    }
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
          ALL PRODUCTS
        </Typography>
        <Box
          sx={{
            bgcolor: "#f0f0f0",
            boxShadow: "0px 16px 16px 0px rgba(0, 0, 0, 0.2)",
            border: "1px solid #325240",
            borderRadius: "8px",
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              marginLeft: "30px",
              marginRight: "30px",
            }}
          >
            <h3 style={{ color: "#325240" }}>
              Showing {DisplayProducts.length} Results
            </h3>

            <Box
              sx={{
                minWidth: 420,
                borderRadius: "18px",
                boxShadow: "0 16px 16px 0 rgba(0, 0, 0, 0.2)",
                zIndex: 999,
              }}
            >
              {SearchBar}
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 7 }}>{showProducts()}</Box>
        {backDrop()}
      </Box>
    </>
  );
};
export default Products;
