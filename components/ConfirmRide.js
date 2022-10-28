import Image from "next/image";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectAll } from "../store/slices/bookingInfoSlice";

export default function ConfirmRide() {
  const {
    name,
    pickup,
    destination,
    pickupTime,
    pickupDate,
    noofPersons,
    carType,
    emailId,
    mobileNumber,
    otp,
    otpGenerate,
    otpVerified,
    currentDate,
  } = useSelector(selectAll);

  const setOtpVerified = (a) => {
    otpVerified = a;
  };
  const setOtp = (a) => {
    otp = a;
  };

  return (
    <div>
      <Form
        className="card p-2 text-center"
        onSubmit={(e) => {
          e.preventDefault();
          if (Number(otp) === otpGenerate) {
            setOtpVerified(true);
            enqueueSnackbar("otp verified", {
              variant: "success",
            });
          } else {
            enqueueSnackbar(" incorrect otp", {
              variant: "error",
            });
            setOtpVerified(false);
          }
        }}
      >
        <h6 className="text-danger">
          Please enter the one time password <br /> to verify booking
        </h6>
        <div>
          <span>A code has been sent to{"  "}</span>
          <small>*******{mobileNumber % 10000}</small>
        </div>
        <div
          id="otp"
          className="inputs d-flex flex-row justify-content-center mt-2"
        >
          <Form.Control
            type="number"
            placeholder="0000"
            className="text-center w-50 mb-2"
            value={otp}
            required
            onChange={(e) => {
              setOtp(
                e.target.value.toString().length <= 4 ? e.target.value : otp
              );
            }}
          />
        </div>
        <div className="card-2">
          <div className="content d-flex justify-content-center align-items-center">
            <span>Didn&#39;t get the code</span>
            <Button variant="outline-danger ms-3">Resend(1/3)</Button>
          </div>
        </div>
        <div className="mt-4">
          <Button type="submit" variant="danger" className="px-4 validate">
            Validate
          </Button>
        </div>
      </Form>
      <div className="d-flex flex-column align-items-center">
        <Image
          src={
            otpVerified
              ? "/green-checkmark.png"
              : "/loading-loading-forever.gif"
          }
          width={50}
          height={50}
          alt="loading"
        />
        <p className="fw-bold m-0">Booking Details</p>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-center lh-sm">
        <div className="card p-2 text-center lh-sm">
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="fw-bold fst-italic m-0">Name: </p>
            <p className="text-muted ms-1 m-0">{name}</p>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="fw-bold fst-italic m-0">Email Id: </p>
            <p className="text-muted ms-1 m-0">{emailId}</p>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="fw-bold fst-italic m-0">Mobile Number: </p>
            <p className="text-muted ms-1 m-0">{mobileNumber}</p>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="fw-bold fst-italic m-0">Pickup: </p>
            <p className="text-muted ms-1 m-0">{pickup}</p>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="fw-bold fst-italic m-0">Destination: </p>
            <p className="text-muted ms-1 m-0">{destination}</p>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="fw-bold fst-italic m-0">pickupTime: </p>
            <p className="text-muted ms-1 m-0">
              {pickupTime}__
              {pickupDate}
            </p>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="fw-bold fst-italic m-0">number of Person: </p>
            <p className="text-muted ms-1 m-0">{noofPersons}</p>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <p className="fw-bold fst-italic m-0">Car Type: </p>
            <p className="text-muted ms-1 m-0">{carType}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
