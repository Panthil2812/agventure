import validator from "validator";

const ValidatorAuctionProducts = (info) => {
  if (info.pro_image === "") {
    return {
      open: true,
      message: "First product image is required",
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
  } else if (validator.isEmpty(info.pro_qty)) {
    return {
      flag: false,
      message: "Please Select a Product qty. ",
    };
  } else if (validator.isEmpty(info.pro_unit)) {
    return {
      flag: false,
      message: "Please Select a Product Unit. ",
    };
  } else if (validator.isEmpty(info.bid_start_amount)) {
    return {
      flag: false,
      message: "Please Enter a Product start bid.",
    };
  } else if (validator.isEmpty(info.bid_inc_amount)) {
    return {
      flag: false,
      message: "Please Enter a Product bid increment price.",
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
      message: "successfully added",
    };
  }
};
export default ValidatorAuctionProducts;
