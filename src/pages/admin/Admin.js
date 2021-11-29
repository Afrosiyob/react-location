import React from "react";
import { Link, Outlet } from "react-location";

const Admin = () => {
  return (
    <div>
      <Link to="./page-one"> page one </Link>
      <Link to="./page-two"> page two </Link>
      <Outlet />
    </div>
  );
};

export default Admin;
