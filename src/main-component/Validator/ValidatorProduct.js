import validator from "validator";

const ValidatorProduct = (info) => {
  console.log(
    info.pro_mrp,
    info.pro_sell_price,
    info.pro_mrp < info.pro_sell_price
  );
  if (info.pro_image === null) {
    return {
      open: true,
      message: "First product image is required",
    };
  } else if (!info.pro_image && info.pro_image.size > 10001) {
    return {
      flag: false,
      message: "Fist Product image is too large,Allowed maximum size is 1MP.",
    };
  } else if (validator.isEmpty(info.pro_name)) {
    return {
      flag: false,
      message: "Please Enter a Product Name",
    };
  } else if (validator.isEmpty(info.pro_category)) {
    return {
      flag: false,
      message: "Please Select Product Category. ",
    };
  } else if (validator.isEmpty(info.pro_unit)) {
    return {
      flag: false,
      message: "Please Select a Product Unit. ",
    };
  } else if (validator.isEmpty(info.pro_mrp)) {
    return {
      flag: false,
      message: "Please Enter a Product MRP.",
    };
  } else if (validator.isEmpty(info.pro_sell_price)) {
    return {
      flag: false,
      message: "Please Enter a Product Selling price.",
    };
  } else if (info.pro_mrp < info.pro_sell_price) {
    return {
      flag: false,
      message: "Please Enter a Product Selling price less than Product MRP.",
    };
  } else if (validator.isEmpty(info.pro_stock)) {
    return {
      flag: false,
      message: "Please Select a Stock Status.",
    };
  } else if (validator.isEmpty(info.pro_hsn)) {
    return {
      flag: false,
      message: "Please Enter a HSN Code.",
    };
  } else if (validator.isEmpty(info.sdescription)) {
    return {
      flag: false,
      message: "Please Enter a Short Description.",
    };
  } else if (validator.isEmpty(info.ldescription)) {
    return {
      flag: false,
      message: "Please Enter a Long Description.",
    };
  } else {
    return {
      flag: true,
      message: "panthil",
    };
  }
};
export default ValidatorProduct;
