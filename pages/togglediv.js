import Image from "next/image";
import React, { useState } from "react";
import BookYourRide from "../components/BookYourRide";
import CheckBox from "../components/CheckBox";
import ConfirmRide from "../components/ConfirmRide";
import LoginComp from "../components/LoginComp";
import NavBar from "../components/NavBar";

export default function togglediv() {
  const [checkedOne, setCheckedOne] = useState("Book");

  const handleChangeOne = (a) => {
    setCheckedOne(a);
  };

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Image
        src="/car-gray-2.jpg"
        layout="fill"
        objectFit="cover"
        // style={{ filter: "blur(2px)" }}
        style={{ zIndex: -1000 }}
        alt="background-image"
      />
      {/* <NavBar /> */}
      <div
      // style={{ backdropFilter: "blur(14px)" }}
      >
        <div className="container main">
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
      </div>
    </main>
  );
}
