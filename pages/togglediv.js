import Image from "next/image";
import React, { useState } from "react";
import BookYourRide from "../components/BookYourRide";
import CheckBox from "../components/CheckBox";
import ConfirmRide from "../components/ConfirmRide";
import LoginComp from "../components/LoginComp";
import NavBar from "../components/NavBar";

export default function Togglediv() {
  const [checkedOne, setCheckedOne] = useState("Book");

  const handleChangeOne = (a) => {
    setCheckedOne(a);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ zIndex: 1 }}
    >
      <CheckBox
        label="Login Section"
        value={checkedOne === "Login" ? true : false}
        onChange={() => handleChangeOne("Login")}
        id="s1"
        Comp={<LoginComp />}
      />
      <CheckBox
        label="Book Your Ride"
        value={checkedOne === "Book" ? true : false}
        onChange={() => handleChangeOne("Book")}
        id="s2"
        Comp={<BookYourRide />}
      />
      <CheckBox
        label="Confirm Your Ride"
        value={checkedOne === "Confirm" ? true : false}
        onChange={() => handleChangeOne("Confirm")}
        id="s3"
        Comp={<ConfirmRide />}
      />
    </div>
  );
}
