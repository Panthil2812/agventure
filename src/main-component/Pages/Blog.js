import { Button } from "@mui/material";
import React from "react";
import {
  getCookie,
  setCookie,
  deleteCookie,
} from "../Validator/CookieFunction";
const data = [
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

const addInfoToCart = (cartinfo) => {
  let cookie = getCookie("cart");
  if (getCookie("cart")) {
    let data = getCart();
    console.log("cookie data : ", data);
    data = data
      .filter((e) => e.id === cartinfo.id)
      .map((item) => {
        // console.log("call");
        // if (item.id === cartinfo.id) {
        item.info.qty = item.info.qty + 1;
        setCookie("cart", JSON.stringify(data), 1);
        // } else {
        //   console.log("calling");
        //   const d = getCart();
        //   return setCookie(
        //     "cart",
        //     JSON.stringify([cartinfo, ...JSON.parse(d)]),
        //     1
        //   );
        // }
      });
    console.log("match data : ", data.length);
    if (data.length === 0) {
      console.log("efrgegret");
      setCookie("cart", JSON.stringify([cartinfo, ...JSON.parse(cookie)]), 1);
    }
    // if (matchdata.length === 1) {
    //   console.log("index : ", typeof data);
    // }
    // console.log("filter data : ", matchdata);
  } else {
    if (!cookie) cookie = "[]";
    return setCookie(
      "cart",
      JSON.stringify([cartinfo, ...JSON.parse(cookie)]),
      1
    );
  }
};
const deleteCartProduct = (id) => {
  let data = getCart();
  console.log("info : ", data);
  data = data.filter((e) => e.id != id);
  console.log("delete info : ", data);
  setCookie("cart", JSON.stringify(data), 1);
};
const getCart = () => {
  let cookie = getCookie("cart");
  if (!cookie) cookie = "[]";
  return JSON.parse(cookie);
};

const Blog = () => {
  // setCookie("cart", data, 2);
  const infomation = {
    id: "6241aa0e7ffbbadb6c1a2643",
    info: {
      categories: "sssss",
      name: "ssssssss",
      qty: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/265px-Red_Apple.jpg",
      price: 140,
      stock: 30,
    },
  };
  const infomation2 = {
    id: "6241aa0e7ffbbadb6c1a2644",
    info: {
      categories: "dscsdsssss",
      name: "sssssssscsdc",
      qty: 2,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/265px-Red_Apple.jpg",
      price: 35,
      stock: 30,
    },
  };
  const infomation3 = {
    id: "6241aa0e7ffbbadb6c1a2645",
    info: {
      categories: "dscsdsssss",
      name: "sssssssscsdc",
      qty: 1,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/265px-Red_Apple.jpg",
      price: 35,
      stock: 30,
    },
  };

  // const cookiedate = JSON.parse(getCookie("cart"));
  // const test = JSON.parse(JSON.stringify(cookiedate));
  // console.log("cookie get for push data ", test);
  // const addjson = test.dump(infomation);
  // setCookie("cart", JSON.stringify(addjson), 2);
  // // const aa = data.filter((item) => {
  // //   if (item.id === "5") {
  // //     return item.pop(item.id === "5");
  // //   }
  // // });
  // deleteCookie("cart");
  // // data.pop();
  // const data1 = JSON.parse(getCookie("cart"));
  // console.log("CART : ", JSON.parse(JSON.stringify(data1)));
  // if (getCookie("cart")) {
  //   const indo = JSON.parse(getCookie("cart"));
  // } else {
  //   const indo = "";
  // }
  return (
    <>
      <Button
        sx={{ bgcolor: "#325240", color: "#fff", margin: "20px" }}
        onClick={() => {
          // addInfoToCart(infomation2);
          deleteCartProduct("6241aa0e7ffbbadb6c1a2643");
        }}
      >
        CLick
      </Button>
      <p>{JSON.stringify(getCart())}</p>
    </>
  );
};

export default Blog;
