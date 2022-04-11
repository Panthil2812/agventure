export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
export const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
export const deleteCookie = (name) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

//cart add infomation in cookie
export const addInfoToCart = (cartinfo) => {
  let cookie = getCart();
  if (cookie.length) {
    // console.log("calling");
    let data = cookie;
    data = data
      .filter((e) => e._id === cartinfo._id)
      .map((item) => {
        item.pro_qty = item.pro_qty + 1;
        setCookie("cart", JSON.stringify(data), 1);
      });
    if (data.length === 0) {
      // console.log("efrgegret");
      setCookie("cart", JSON.stringify([cartinfo, ...cookie]), 1);
      // console.log("panthil ", getCart());
    }
  } else {
    setCookie("cart", JSON.stringify([cartinfo, ...cookie]), 1);
  }
};
export const editCartProducts = (cartinfo, type) => {
  let cookie = getCart();
  // console.log({ cartinfo, cookie });
  if (cookie.length) {
    let data = cookie;
    data = data
      .filter((e) => e._id === cartinfo._id)
      .map((item) => {
        if (type) {
          item.pro_qty = item.pro_qty + 1;
          setCookie("cart", JSON.stringify(data), 1);
        } else {
          item.pro_qty = item.pro_qty - 1;
          if (item.pro_qty) {
            setCookie("cart", JSON.stringify(data), 1);
          } else {
            deleteCartProduct(cartinfo._id);
          }
        }
      });
    // if (data.length === 0) {
    //   setCookie("cart", JSON.stringify([cartinfo, ...cookie]), 1);
    // }
  }
};
export const deleteCartProduct = (id) => {
  let data = getCart();
  // console.log("info : ", data);
  data = data.filter((e) => e._id != id);
  // console.log("delete info : ", data);
  setCookie("cart", JSON.stringify(data), 1);
};
export const getCart = () => {
  let cookie = getCookie("cart");
  if (!cookie) cookie = "[]";
  return JSON.parse(cookie);
};
export const addInfoTowishlist = (wishlistinfo) => {
  let cookie = getwishlist();
  if (cookie.length) {
    // console.log("calling");
    let data = cookie;
    data = data.filter((e) => e._id === wishlistinfo._id);
    if (data.length === 0) {
      // console.log("efrgegret");
      setCookie("wishlist", JSON.stringify([wishlistinfo, ...cookie]), 1);
      // console.log("panthil ", getwishlist());
    }
  } else {
    setCookie("wishlist", JSON.stringify([wishlistinfo, ...cookie]), 1);
  }
};
export const deletewishlistProduct = (id) => {
  let data = getwishlist();
  // console.log("info : ", data);
  data = data.filter((e) => e._id != id);
  // console.log("delete info : ", data);
  setCookie("wishlist", JSON.stringify(data), 1);
};
export const getwishlist = () => {
  let cookie = getCookie("wishlist");
  if (!cookie) cookie = "[]";
  return JSON.parse(cookie);
};
//   const login = { name: "John", age: 30, city: "New York" };
//   // document.cookie = "login=" + JSON.stringify(login);
//   // setCookie("login", JSON.stringify(login), 1);
//  const login = getCookie("keyname")
// let obj = JSON.parse(text);
