import React from "react";
import { BsBasketFill } from "react-icons/bs";
import profile from "../../assets/Images/apples.png";
import { makeStyles } from "@mui/styles";
// import "./my.css";
const useStyles = makeStyles(() => ({
  productCard: {
    width: "252px",
    margin: "20px",
    padding: "10px",
    position: "relative",
    background: "#f9f9f9",
    border: "1.5px solid #325240",
    borderRadius: "10px",
    boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    transform: "scale(1)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.02)",
      boxShadow: "0 20px 20px 0 rgba(0, 0, 0, 0.2)",
    },
  },
  badge: {
    position: "absolute",
    right: "0",
    top: "0",
    margin: "25px",
    fontSize: "13px",
    padding: "10px",
    borderRadius: "50%",
    background: "#f9f9f9",
    color: "#325240",
    border: "1px solid #325240",
    zIndex: "2",
    overflow: "hidden",
    transform: "scale(1)",
    "&:hover": {
      border: "3px solid #325240",
      transform: "scale(1.01)",
      /* box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2)", */
    },
  },
  productTumb: {
    width: "100%",
    height: "270px",
    borderRadius: "5%",
    boxShadow: "0 8px 8px 0 rgba(0, 0, 0, 0.2)",
    border: "2px solid #325240",
    overflow: "hidden",
    "& img": {
      width: "100%",
      height: "100%",
      /* transform: scale(1)',
      transition: all 0.3s ease-in-out', */
    },
    /* .product-tumb img:hover {
      transform: scale(1.5)',
    } */
  },
  productDetails: {
    padding: "10px",
    "& h2": {
      fontWeight: "600",
      marginBottom: "18px",
      textAlign: "center",
      textTransform: "capitalize",
      color: "#325240",
      textDecoration: "none",
      transition: "0.3s",
    },
    "& p": {
      fontSize: "15px",
      lineHeight: "22px",
      marginBottom: "18px",
      color: "#325240",
    },
  },

  productBottomDetails: {
    overflow: "hidden",
    borderTop: "2px solid #325240",
    paddingTop: "10px",
    "& div": {
      float: "left",
      width: "50%",
    },
    "& small": {
      textAlign: "center",
      color: "#325240",
      fontSize: "80%",
      fontWeight: "600",
    },
  },

  productPrice: {
    fontSize: "18px",
    color: "#325240",
    fontWeight: "600",
    "& small": {
      marginLeft: "5px",
      fontSize: "80%",
      fontWeight: "400",
      textDecoration: "line-through",
      display: "inline-block",
    },
  },

  productLinks: {
    textAlign: "right",
    color: "#325240",
  },
}));
const Auction = () => {
  const classes = useStyles();
  const data = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
    { id: 3, name: "Jane Doe" },
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
    { id: 1, name: "John Doe" },
    { id: 2, name: "Victor Wayne" },
    { id: 3, name: "Jane Doe" },
  ];
  return (
    <>
      <div>products display box </div>
      <div
        style={{
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {data.map((data) => (
          <div className={classes.productCard}>
            <div className={classes.badge}>
              <BsBasketFill size="20" />
            </div>
            <div className={classes.productTumb}>
              <img src={profile} alt="" />
            </div>
            <div className={classes.productDetails}>
              <h2>{data.name}</h2>

              <div className={classes.productBottomDetails}>
                <div className={classes.productPrice}>
                  PRICE :-₹230.99<small>₹96.00</small>
                </div>
                <div className={classes.productLinks}>Kg</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Auction;
