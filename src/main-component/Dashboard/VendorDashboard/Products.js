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
  Autocomplete,
  FormControl,
  createTheme,
  TextField,
  Grid,
  Chip,
  Snackbar,
  Pagination,
  ThemeProvider,
  styled,
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
import { makeStyles } from "@mui/styles";
import { BsPlusLg } from "react-icons/bs";

import axios from "axios";
import qs from "query-string";
import profile from "../../../assets/Images/profile.png";
import nofound from "../../../assets/Images/nofound.png";
import { storage }from "../../../Firebase/index"; 
import { getCookie } from "../../Validator/CookieFunction";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { BiRupee } from "react-icons/bi";
import ValidatorProduct from "../../Validator/ValidatorProduct";
import capitalizeFirstLetter from "../../Validator/capitalizeFirstLetter";
const useStyles = makeStyles(() => ({
  avatarUpload: {
    position: "relative",
    margin: "auto",
  },
  avatarEdit: {
    position: "absolute",
    right: "12px",
    zIndex: "12",
    top: "10px",
  },
  cinput: {
    display: "none",
  },
  clabel: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    padding: "5px",
    backgroundColor: "#f9f9f9",
    borderRadius: "100%",
    textAlign: "center",
    border: "2px solid #325240",
    boxShadow: "0px 8px 8px 0px rgba(0, 0, 0, 0.12)",

    "&:hover": {
      background: "#f1f1f1",
      borderColor: "#d6d6d6",
    },
  },
  avatarPreview: {
    width: "132px",
    height: "132px",
    position: "relative",
    borderRadius: "8%",
    border: "2px solid #325240",
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
  },
  cdiv: {
    width: " 100%",
    height: "100%",
    borderRadius: "6%",
    backgroundPosition: "center",
  },
}));
const theme = createTheme();
const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#325240",
  },
  "& .MuiInput-underline:after": {
    borderWidth: "2px",
    borderBottomColor: "#325240",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "2px",
      borderColor: "#325240",
    },
    "&:hover fieldset": {
      borderWidth: "2px",
      borderColor: "#325240",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px",
      borderColor: "#325240",
    },
  },
});
const CssFormControl = styled(FormControl)({
  "& .MuiFormControlLabel-label": {
    color: "#325240",
  },
  "::-webkit-scrollbar": {
    display: "none",
  },
  "& label.Mui-focused": {
    color: "#325240",
  },
  "& .MuiInput-underline:after": {
    borderWidth: "2px",
    borderBottomColor: "#325240",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: "2px",
      borderColor: "#325240",
    },
    "&:hover fieldset": {
      borderWidth: "2px",
      borderColor: "#325240",
    },
    "&.Mui-focused fieldset": {
      borderWidth: "2px",
      borderColor: "#325240",
    },
  },
});
const categoryName = [
  { label: "Dairy Products" },
  { label: "Fruits & Vegetables" },
  { label: "Grain" },
  { label: "nuts" },
  { label: "pluses" },
  { label: "Spices and condiments" },
];
const unitName = [
  { label: "Piece" },
  { label: "Kg" },
  { label: "Gram" },
  { label: "Liter" },
  { label: "Mm" },
  { label: "Ml" },
  { label: "Packet" },
  { label: "Box" },
  { label: "Pound" },
  { label: "Dozen" },
  { label: "Ton" },
];
const Stock = [{ label: "In Stock" }, { label: "Out of Stock" }];
const Products = () => {
  const classes = useStyles();
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
  const [imagefile, setImagefile] = React.useState();
  const [editinformation, setEditinformation] = React.useState({
    pro_id: "",
    pro_image: "",
    pro_name: "",
    pro_category: "",
    pro_sell_price: 0,
    pro_unit: "",
    pro_stock: "",
    pro_mrp: 0,
    pro_hsn: "",
    sdescription: "",
    ldescription: "",
  });
  const [page, setPage] = React.useState(0);
  const [editdialog, setEditdialog] = React.useState(false);
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
  const handleClose = () => {
    setFlag(false);
    setState({
      ...state,
      open1: false,
    });
  };

  const errorFunction = () => {
    if (isLogged) {
      return (
        <div>
          <Snackbar
            open={open1}
            sx={{ width: "50%", zIndex: 9999 }}
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
            sx={{ width: "50%", zIndex: 9999 }}
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
  const handleDeleteDialogSubmit = () => {
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
          setTimeout(() => {
            setFlag(false);
            setOpen(false);
          }, 2000);
          // window.location.replace("/dashboard");
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
    // console.log(string, results);
    setSearchItem(string);
  };
  const handleOnSelect = (item) => {
    setSearchItem(item.pro_name);
  };
  const handleEditDialogSubmit = () => {
    const info = {
      pro_id: editinformation.pro_id,
      pro_image: imagefile ? imagefile : editinformation.pro_image,
      pro_name: capitalizeFirstLetter(editinformation.pro_name),
      pro_category: editinformation.pro_category,
      pro_unit: editinformation.pro_unit,
      pro_mrp: editinformation.pro_mrp,
      pro_sell_price: editinformation.pro_sell_price,
      pro_stock: editinformation.pro_stock,
      pro_hsn: editinformation.pro_hsn,
      sdescription: editinformation.sdescription,
      ldescription: editinformation.ldescription,
    };
    //console.log("update data : ", info);
    const errorMessage = ValidatorProduct(info);
    console.log(errorMessage);
    // console.log(typeof info.pro_image);
    if (!errorMessage.flag) {
      setState({
        open1: true,
        message: errorMessage.message,
      });
    } else {
      if (typeof info.pro_image === "string") {
        setFlag(true);
        axios({
          method: "post",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
          data: qs.stringify(info),
          url: `${process.env.REACT_APP_BASEURL}products/edit_product`,
        })
          .then(function (response) {
            if (response.data.status === 200) {
              setState({
                isLogged: true,
                open1: true,
                message: "You have Successfully Edit Product",
              });
              //console.log("sssssssssssssssssssssssssssssssssss");
              // window.location.replace("/dashboard/VendorDashboard/2");
              vendorProducts();
              setTimeout(() => {
                setEditdialog(false);
                setFlag(false);
              }, 2000);
            }
          })
          .catch(function (error) {
            setState({
              open1: true,
              message: "Please Try again!",
            });
          });
      } else {
        setFlag(true);
        const d = new Date();
        let time = d.getTime();
        const uploadTask = storage
          .ref(`images/products/${account._id}_${time}_${imagefile.name}`)
          .put(imagefile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            console.log("calling function ...");
            storage
              .ref("images/products/")
              .child(`${account._id}_${time}_${imagefile.name}`)
              .getDownloadURL()
              .then((url) => {
                console.log("main : ", url);
                info.pro_image = url;
                axios({
                  method: "post",
                  headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                  },
                  data: qs.stringify(info),
                  url: `${process.env.REACT_APP_BASEURL}products/edit_product`,
                })
                  .then(function (response) {
                    if (response.data.status === 200) {
                      setState({
                        isLogged: true,
                        open1: true,
                        message: "You have Successfully Added New Products",
                      });
                      // setcurrentpageDate([]);
                      // vendorProducts();

                      setTimeout(() => {
                        setEditdialog(false);
                        setFlag(false);
                      }, 2000);
                    }
                  })
                  .catch(function (error) {
                    setState({
                      open1: true,
                      message: "Please Try again!",
                    });
                  });
              });
          }
        );
      }
    }
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
  }, [page, searchitem, ProductData]);

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
          borderRadius: "9px",
          boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
          border: "3px solid #325240",
          // height: "7vh",
          marginBottom: "7vh",
          placeholderFontSize: "2.5vh",
          fontSize: "2.5vh",
          color: "#325240",
          backgroundColor: "#f9f9f9",
        }}
      />
    </React.Fragment>
  );
  const deleteDialogBox = (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ bgcolor: "#f9f9f9", color: "#325240", textAlign: "center" }}
        >
          {"Delete Products"}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#f9f9f9", color: "#325240" }}>
          <DialogContentText>
            Once you delete a Product, there is no going back. Please be
            certain.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f9f9f9", color: "#325240" }}>
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
            onClick={() => {
              setOpen(false);
              setDid("");
            }}
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
            onClick={handleDeleteDialogSubmit}
          >
            Delete Product
          </Button>
          <div>
            {errorFunction()}
            {backDrop()}
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );

  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (editdialog) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [editdialog]);

  const editDialogBox = (
    <React.Fragment>
      <Dialog
        open={editdialog}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{ bgcolor: "#f9f9f9", textAlign: "center", color: "#325240" }}
        >
          Edit Product
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#f9f9f9", color: "#325240" }}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Box
              sx={{
                margin: "auto",
                width: "50%",
                marginTop: 1,
                padding: "20px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Box sx={{ alignContent: "center", alignItems: "center" }}>
                <div className={classes.avatarUpload}>
                  <div className={classes.avatarEdit}>
                    <input
                      className={classes.cinput}
                      type="file"
                      id="imageUpload1"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => {
                        var pro_image1 = document.getElementById("pro_image1");

                        pro_image1.src = URL.createObjectURL(e.target.files[0]);
                        setImagefile(e.target.files[0]);
                      }}
                    />

                    <label className={classes.clabel} htmlFor="imageUpload1">
                      <BsPlusLg />
                    </label>
                  </div>
                  <div className={classes.avatarPreview}>
                    <img
                      className={classes.cdiv}
                      id="pro_image1"
                      alt="pro_image1"
                      src={editinformation.pro_image}
                    />
                  </div>
                </div>
              </Box>
            </Box>
            <Box
              component="form"
              noValidate
              // onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <CssTextField
                    name="pro_name"
                    required
                    fullWidth
                    type="name"
                    id="pro_name"
                    label="Product Name"
                    value={editinformation.pro_name}
                    onChange={(e) => {
                      setEditinformation({
                        ...editinformation,
                        pro_name: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box CssTextField sx={{ minWidth: 120 }}>
                    <CssFormControl
                      fullWidth
                      required
                      name="pro_category"
                      label="Category"
                      type="name"
                      id="pro_category"
                    >
                      <Autocomplete
                        required
                        disableClearable
                        id="combo-box-category"
                        options={categoryName}
                        value={editinformation.pro_category}
                        onChange={(event, value) => {
                          setEditinformation({
                            ...editinformation,
                            pro_category: value.label,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label="Category"
                            name="pro_category"
                            id="pro_category"
                          />
                        )}
                      />
                    </CssFormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box CssTextField sx={{ minWidth: 120 }}>
                    <CssFormControl
                      fullWidth
                      required
                      name="pro_unit"
                      label="Unit"
                      type="name"
                      id="pro_unit"
                    >
                      <Autocomplete
                        required
                        disableClearable
                        id="combo-box-unit"
                        options={unitName}
                        value={editinformation.pro_unit}
                        onChange={(event, value) => {
                          setEditinformation({
                            ...editinformation,
                            pro_unit: value.label,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label="Unit"
                            id="pro_unit"
                            name="pro_unit"
                          />
                        )}
                      />
                    </CssFormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    required
                    fullWidth
                    id="pro_mrp"
                    label="MRP"
                    type="number"
                    name="pro_mrp"
                    value={editinformation.pro_mrp}
                    onChange={(e) => {
                      setEditinformation({
                        ...editinformation,
                        pro_mrp: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    required
                    fullWidth
                    type="number"
                    name="pro_sell_price"
                    label="Selling Price"
                    id="pro_sell_price"
                    value={editinformation.pro_sell_price}
                    onChange={(e) => {
                      setEditinformation({
                        ...editinformation,
                        pro_sell_price: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box CssTextField sx={{ minWidth: 120 }}>
                    <CssFormControl
                      fullWidth
                      required
                      name="pro_stock"
                      label="Stock"
                      type="Stock"
                      id="pro_stock"
                    >
                      <Autocomplete
                        required
                        disableClearable
                        id="combo-box-stock"
                        options={Stock}
                        value={editinformation.pro_stock}
                        onChange={(event, value) => {
                          setEditinformation({
                            ...editinformation,
                            pro_stock: value.label,
                          });
                        }}
                        renderInput={(params) => (
                          <TextField
                            required
                            {...params}
                            label="Stock"
                            id="pro_stock"
                            name="pro_stock"
                          />
                        )}
                      />
                    </CssFormControl>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CssTextField
                    required
                    fullWidth
                    name="pro_hsn"
                    label="HSN Code"
                    type="name"
                    id="pro_hsn"
                    value={editinformation.pro_hsn}
                    onChange={(e) => {
                      setEditinformation({
                        ...editinformation,
                        pro_hsn: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    required
                    multiline
                    fullWidth
                    maxRows={2}
                    minRows={1}
                    id="sdescription"
                    label="Short Description"
                    name="sdescription"
                    value={editinformation.sdescription}
                    onChange={(e) => {
                      setEditinformation({
                        ...editinformation,
                        sdescription: e.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CssTextField
                    required
                    multiline
                    fullWidth
                    minRows={1}
                    id="ldescription"
                    label="Long Description"
                    name="ldescription"
                    value={editinformation.ldescription}
                    onChange={(e) => {
                      setEditinformation({
                        ...editinformation,
                        ldescription: e.target.value,
                      });
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#f9f9f9", color: "#325240" }}>
          <Button
            onClick={() => {
              setImagefile();
              setEditdialog(false);
            }}
            sx={{
              color: "#f9f9f9",
              backgroundColor: "#B10000",
              "&:hover": {
                backgroundColor: "#B10000",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: "#f9f9f9",
              backgroundColor: "#325240",
              "&:hover": {
                backgroundColor: "#325240",
              },
            }}
            onClick={() => {
              handleEditDialogSubmit();
            }}
          >
            Save
          </Button>
          <div>
            {errorFunction()}
            {backDrop()}
          </div>
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
        <Box
          sx={{
            padding: "10px",
          }}
        >
          {DisplayProducts.map((data) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  bgcolor: "#f9f9f9",
                  border: "2px solid #325240",
                  borderRadius: "10px",
                  margin: 3,
                  padding: 1,
                  boxShadow: "0px 16px 16px 0px rgba(0, 0, 0, 0.2)",
                  transform: "scale(1)",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.04)",
                    boxShadow: "0 20px 20px 0 rgba(0, 0, 0, 0.2)",
                  },
                }}
                key={data._id}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={1} sx={{ alignSelf: "center" }}>
                      <img
                        style={{
                          width: "75px",
                          height: "70px",
                          borderRadius: "10px",
                        }}
                        src={data.pro_image ? data.pro_image : profile}
                        alt="crat products image"
                      />
                    </Grid>
                    <Grid item xs={4} sx={{ alignSelf: "center" }}>
                      <Box
                        sx={{
                          alignSelf: "center",
                          marginLeft: "20px",
                        }}
                      >
                        <Typography
                          sx={{
                            color: "#325240",
                            fontSize: "18px",
                            fontWeight: "bold",
                          }}
                        >
                          {data.pro_name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#325240",
                            fontSize: "14px",
                          }}
                        >
                          Price : ₹ {data.pro_sell_price} /{data.pro_unit}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3} sx={{ alignSelf: "center" }}>
                      <Typography
                        sx={{
                          color: "#325240",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        <Chip
                          label={data.pro_category}
                          sx={{ bgcolor: "#325240", color: "#fff" }}
                        />
                      </Typography>
                    </Grid>
                    <Grid item xs={2} sx={{ alignSelf: "center" }}>
                      <Typography
                        sx={{
                          color: "#325240",
                          fontSize: "18px",
                          fontWeight: "bold",
                          alignSelf: "center",
                          // marginRight: 5,
                          textAlign: "justify",
                        }}
                      >
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
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      sx={{ alignSelf: "center", display: "flex" }}
                    >
                      <IconButton
                        sx={{
                          bgcolor: "blue",
                          padding: "5px",
                          borderRadius: "10px",
                          color: "#f0f0f0",
                          alignSelf: "center",
                          "&:hover": {
                            color: "blue",
                            border: "1px solid blue",
                          },
                        }}
                        onClick={() => {
                          {
                            setEditinformation({
                              ...editinformation,
                              pro_id: data._id,
                              pro_image: data.pro_image,
                              pro_name: data.pro_name,
                              pro_category: data.pro_category,
                              pro_sell_price: data.pro_sell_price,
                              pro_unit: data.pro_unit,
                              pro_stock: data.pro_stock,
                              pro_mrp: data.pro_mrp,
                              pro_hsn: data.pro_hsn,
                              sdescription: data.sdescription,
                              ldescription: data.ldescription,
                            });
                            setEditdialog(true);
                          }
                        }}
                      >
                        <ModeEditIcon size="20" />
                      </IconButton>

                      <IconButton
                        sx={{
                          bgcolor: "#B10000",
                          padding: "5px",
                          marginLeft: "20px",
                          borderRadius: "10px",
                          color: "#f0f0f0",
                          alignSelf: "center",
                          "&:hover": {
                            color: "#B10000",
                            border: "1px solid #B10000",
                          },
                        }}
                        onClick={() => {
                          setDid(data._id);
                          setOpen(true);
                        }}
                      >
                        <DeleteIcon size="20" />
                      </IconButton>
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
          PRODUCTS
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
        {deleteDialogBox}
        {editDialogBox}
        {backDrop()}
        {errorFunction()}
      </Box>
    </>
  );
};
export default Products;
