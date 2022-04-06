import React from "react";

const Auction = () => {
  return <div>Auction</div>;
};

export default Auction;
// import { Button } from "@mui/material";
// import React from "react";
// import {
//   getCookie,
//   setCookie,
//   deleteCookie,
// } from "../Validator/CookieFunction";

// const addInfoToCart = (cartinfo) => {
//   let cookie = getCookie("cart");
//   if (getCookie("cart")) {
//     let data = getCart();
//     console.log("cookie data : ", data);
//     data = data
//       .filter((e) => e.id === cartinfo.id)
//       .map((item) => {
//         // console.log("call");
//         // if (item.id === cartinfo.id) {
//         item.qty = item.qty + 1;
//         setCookie("cart", JSON.stringify(data), 1);
//         // } else {
//         //   console.log("calling");
//         //   const d = getCart();
//         //   return setCookie(
//         //     "cart",
//         //     JSON.stringify([cartinfo, ...JSON.parse(d)]),
//         //     1
//         //   );
//         // }
//       });
//     console.log("match data : ", data.length);
//     if (data.length === 0) {
//       console.log("efrgegret");
//       setCookie("cart", JSON.stringify([cartinfo, ...JSON.parse(cookie)]), 1);
//     }
//     // if (matchdata.length === 1) {
//     //   console.log("index : ", typeof data);
//     // }
//     // console.log("filter data : ", matchdata);
//   } else {
//     if (!cookie) cookie = "[]";
//     return setCookie(
//       "cart",
//       JSON.stringify([cartinfo, ...JSON.parse(cookie)]),
//       1
//     );
//   }
// };
// const deleteCartProduct = (id) => {
//   let data = getCart();
//   console.log("info : ", data);
//   data = data.filter((e) => e.id != id);
//   console.log("delete info : ", data);
//   setCookie("cart", JSON.stringify(data), 1);
// };
// const getCart = () => {
//   let cookie = getCookie("cart");
//   if (!cookie) cookie = "[]";
//   return JSON.parse(cookie);
// };

// const Blog = () => {
//   // setCookie("cart", data, 2);
//   const infomation = {
//     id: "6241aa0e7ffbbadb6c1a2643",
//     categories: "sssss",
//     name: "ssssssss",
//     qty: 1,
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/265px-Red_Apple.jpg",
//     price: 140,
//     stock: 30,
//   };
//   const infomation2 = {
//     id: "6241aa0e7ffbbadb6c1a2644",

//     categories: "dscsdsssss",
//     name: "sssssssscsdc",
//     qty: 2,
//     image:
//       "https://firebasestorage.googleapis.com/v0/b/agventure-ibid.appspot.com/o/images%2Fproducts%2F6241aa0e7ffbbadb6c1a2643_1649131637681_chili.png?alt=media&token=4512cf1d-740b-4120-9edd-af05c3873e42",
//     price: 35,
//     stock: 30,
//   };
//   const infomation3 = {
//     id: "6241aa0e7ffbbadb6c1a2645",

//     categories: "dscsdsssss",
//     name: "sssssssscsdc",
//     qty: 1,
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/265px-Red_Apple.jpg",
//     price: 35,
//     stock: 30,
//   };

//   // const cookiedate = JSON.parse(getCookie("cart"));
//   // const test = JSON.parse(JSON.stringify(cookiedate));
//   // console.log("cookie get for push data ", test);
//   // const addjson = test.dump(infomation);
//   // setCookie("cart", JSON.stringify(addjson), 2);
//   // // const aa = data.filter((item) => {
//   // //   if (item.id === "5") {
//   // //     return item.pop(item.id === "5");
//   // //   }
//   // // });
//   // deleteCookie("cart");
//   // // data.pop();
//   // const data1 = JSON.parse(getCookie("cart"));
//   // console.log("CART : ", JSON.parse(JSON.stringify(data1)));
//   // if (getCookie("cart")) {
//   //   const indo = JSON.parse(getCookie("cart"));
//   // } else {
//   //   const indo = "";
//   // }
//   const dd = getCart();
//   return (
//     <>
//       <Button
//         sx={{ bgcolor: "#325240", color: "#fff", margin: "20px" }}
//         onClick={() => {
//           addInfoToCart(infomation2);
//           // deleteCartProduct("6241aa0e7ffbbadb6c1a2644");
//         }}
//       >
//         CLick
//       </Button>
//       <p>{JSON.stringify(dd)}</p>
//       <p>{JSON.stringify(dd[0].image)}</p>
//       <img
//         src={dd[0].image.replace("/products/", "%2Fproducts%2F")}
//         alt="cartimage"
//       />
//     </>
//   );
// };

// export default Blog;
