import React from "react";
import {
  useMediaQuery,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  IconButton,
  Dialog,
  Button,
  Grid,
  Chip,
  Snackbar,
  Pagination,
  Alert,
  Card,
  CardMedia,
  Avatar,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  useTheme,
} from "@mui/material";
import axios from "axios";
import qs from "query-string";
import profile from "../../../assets/Images/profile.png";
import nofound from "../../../assets/Images/nofound.png";
import { getCookie } from "../../Validator/CookieFunction";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { BiRupee } from "react-icons/bi";
const Products = () => {
  const account = JSON.parse(getCookie("account"));
  const token = getCookie("token");
  const [state, setState] = React.useState({
    open1: false,
    isLogged: false,
    message: "",
  });
  const { isLogged, open1, message } = state;
  const [ProductData, setproductData] = React.useState([]);
  const [currentpageData, setcurrentpageDate] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [DataperPage, setDataperPage] = React.useState(10);
  const [searchitem, setSearchItem] = React.useState("");
  const [flag, setFlag] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [Did, setDid] = React.useState();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleChangePage = (event, value) => {
    console.log(value);
    setPage(value);
  };
  const handleClickOpen = (name) => {
    setDid(name);
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
    setDid("");
  };
  const handleClose = () => {
    setFlag(false);
  };
  const errorFunction = () => {
    if (isLogged) {
      return (
        <div>
          <Snackbar
            open={open1}
            sx={{ width: "50%" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              variant="filled"
              onClose={handleClose}
              sx={{ width: "100%", bgcolor: "#325240" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      );
    } else {
      return (
        <div>
          <Snackbar
            open={open1}
            sx={{ width: "50%" }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              variant="filled"
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {message}
            </Alert>
          </Snackbar>
        </div>
      );
    }
  };
  const handleDialogSubmit = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}products/delete_products/${Did}`,
    })
      .then(function (response) {
        // handle success
        // const infomation = qs.stringify(response);
        console.log(response.data);
        if (response.data.status === 500) {
          setState({
            open1: true,
            message: "User does not deleted.",
          });
          setFlag(false);
        }
        if (response.data.status === 200) {
          setState({
            isLogged: true,
            open1: true,
            message:
              "Congratulation,You have Successfully logged out,Redirecting....",
          });
          setFlag(false);
          window.location.replace("/dashboard");
        }
      })
      .catch(function (error) {
        setState({
          open1: true,
          message: "Please Try again!",
        });
      });
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
  const vendorProducts = () => {
    setFlag(true);
    axios({
      method: "get",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${token}`,
      },
      url: `${process.env.REACT_APP_BASEURL}products/list_products/${account._id}`,
    })
      .then(function (response) {
        if (response.data.status === 504) {
          console.log("error");
          setFlag(false);
        }
        if (response.data.status === 200) {
          setproductData(response.data.data);
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
    console.log(string, results);
    setSearchItem(string);
  };
  const handleOnSelect = (item) => {
    // setSearchItem(item);
  };
  React.useEffect(() => {
    vendorProducts();
  }, []);
  React.useEffect(() => {
    setcurrentpageDate(
      ProductData.filter(
        (e) =>
          e.pro_name.toLowerCase().includes(searchitem.toLowerCase()) ||
          e.pro_category.toLowerCase().includes(searchitem.toLowerCase())
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
          keys: ["pro_name", "pro_category"],
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
  const dialogBox = (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ color: "#325240" }}>
          {"Delete Products"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "#325240" }}>
            Once you delete a Product, there is no going back. Please be
            certain.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            align="right"
            sx={{
              color: "#f9f9f9",
              backgroundColor: "#325240",
              "&:hover": {
                backgroundColor: "#325240",
              },
            }}
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            variant="contained"
            color="success"
            align="right"
            sx={{
              color: "#f9f9f9",
              backgroundColor: "#B10000",
              "&:hover": {
                backgroundColor: "#B10000",
              },
            }}
            onClick={handleDialogSubmit}
          >
            Delete Product
          </Button>
        </DialogActions>
      </Dialog>
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
                    <Grid item xs={5}>
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
                    <Grid item xs={1} sx={{ marginTop: "5px" }}>
                      <IconButton
                        sx={{ color: "blue" }}
                        onClick={() => {
                          // handleClickOpen("q2q2q");
                        }}
                      >
                        <ModeEditIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={1} sx={{ marginTop: "5px" }}>
                      <IconButton
                        color="error"
                        onClick={() => {
                          handleClickOpen(data._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
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
          PRODUCTS
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
          <Box sx={{ mt: 7 }}> {showProducts()}</Box>
        </Box>

        {dialogBox}
        {backDrop()}
        {errorFunction()}
      </Box>
    </>
  );
};
export default Products;
