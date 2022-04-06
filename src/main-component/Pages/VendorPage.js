import React from "react";
import { useParams } from "react-router-dom";
const VendorPage = () => {
  const { id } = useParams();
  return <div>VendorPage : {id}</div>;
};

export default VendorPage;
