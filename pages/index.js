import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  selectValue,
} from "../store/slices/counterSlice";
import Head from "next/head";
import Image from "next/image";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const CarTypes = ["Sedan", "SUV", "Van", "Magic"];

export default function Home() {
  const [pickup, setPickup] = useState("Kharagpur, India");
  const [destination, setDestination] = useState("Kolkata, India");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [noofPersons, setNoofPersons] = useState(1);
  const [carType, setCarType] = useState("Sedan");
  const [emailId, setEmailId] = useState("g@gmail.com");
  const [mobileNumber, setMobileNumber] = useState("1234567891");

  const [d, setD] = useState(new Date());

  const [modalShow, setModalShow] = useState(false);
  const count = useSelector(selectValue);
  const dispatch = useDispatch();

  const pad = (p) => (p < 10 ? "0" : "") + p;

  useEffect(() => {
    setPickupTime(`${pad(d.getHours())}:${pad(d.getMinutes())}`);
    setPickupDate(
      `${pad(d.getFullYear())}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    );
  }, [d]);

  function MyVerticallyCenteredModal(props) {
    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {otpVerified ? "OTP Verified" : "verifying OTP"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <div className="d-flex flex-row align-items-center justify-content-center lh-sm">
              <Form
                className="card p-2 text-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  setOtpVerified(true);
                }}
              >
                <h6 className="text-danger">
                  Please enter the one time password <br /> to verify your
                  account
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
                    onChange={(e) => {
                      setOtp(
                        e.target.value.toString().length <= 4
                          ? e.target.value
                          : otp
                      );
                    }}
                  />
                </div>
                <div className="card-2">
                  <div className="content d-flex justify-content-center align-items-center">
                    <span>Didn&#39;t get the code</span>
                    <button className="btn btn-outline-danger ms-3">
                      Resend(1/3)
                    </button>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-danger px-4 validate"
                  >
                    Validate
                  </button>
                </div>
              </Form>
            </div>
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
            <div className="d-flex flex-row align-items-center justify-content-center lh-sm">
              <div className="card p-2 text-center lh-sm">
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
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <p className="fw-bold fst-italic m-0">Email Id: </p>
                  <p className="text-muted ms-1 m-0">{emailId}</p>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <p className="fw-bold fst-italic m-0">Mobile Number: </p>
                  <p className="text-muted ms-1 m-0">{mobileNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Edit Booking</Button>
          <Button onClick={props.onHide} disabled={!otpVerified}>
            Conform Booking
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Image
        src="/car-gray-2.jpg"
        layout="fill"
        objectFit="cover"
        style={{ filter: "blur(2px)" }}
        alt="background-image"
      />
      <div className="min-vh-100 d-flex align-items-center justify-content-center flex-column">
        <div
          style={{ zIndex: 1, backdropFilter: "blur(14px)", padding: "1rem" }}
        >
          <div className="mb-3 d-flex flex-row">
            <Image
              src="/carbuk_logo.png"
              layout="fixed"
              width={80}
              height={40}
              alt="logo"
              style={{ background: "black" }}
            />
            <h1 className="text-white user-select-none">Welcome to Carbuk</h1>
          </div>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setD(new Date());
              setModalShow(true);
            }}
          >
            <div className="mb-3 d-flex flex-row">
              <FloatingLabel
                controlId="pickupInput"
                label="Enter Pickup Location"
                className="w-50"
              >
                <Form.Control
                  type="text"
                  placeholder="kgp"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className={`bg-gradient ${!pickup && "bg-secondary"}`}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="destinationInput"
                label="Enter Destination"
                className="w-50"
              >
                <Form.Control
                  type="text"
                  placeholder="kolkata"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className={`bg-gradient ${!destination && "bg-secondary"}`}
                />
              </FloatingLabel>
            </div>
            <div className="mb-3 d-flex flex-row">
              <FloatingLabel
                controlId="pickupTimeInput"
                label="Select Pickup Time"
                className="w-50"
              >
                <Form.Control
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  required
                  className={`bg-gradient ${
                    !pickupTime ? "bg-secondary" : "bg-light"
                  }`}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="pickupDateInput"
                label="Select pickup Date"
                className="w-50"
              >
                <Form.Control
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                  className={`bg-gradient ${
                    !pickupDate ? "bg-secondary" : "bg-light"
                  }`}
                />
              </FloatingLabel>
            </div>

            <div className="mb-3 d-flex">
              <div className="text-white me-2 user-select-none">
                Select number of persons
              </div>
              <button
                type="button"
                className="btn btn-danger btn-circle btn-sm bg-gradient"
                onClick={() =>
                  setNoofPersons(noofPersons > 1 ? noofPersons - 1 : 1)
                }
              >
                <h2
                  style={{
                    position: "relative",
                    top: "-14px",
                  }}
                >
                  -
                </h2>
              </button>
              <button
                type="button"
                className="btn btn-primary bg-gradient btn-sm px-4 mx-1"
              >
                {noofPersons}
              </button>
              <button
                type="button"
                className="btn btn-success btn-circle btn-sm bg-gradient"
                onClick={() =>
                  setNoofPersons(noofPersons <= 50 ? noofPersons + 1 : 50)
                }
              >
                <h4
                  style={{
                    position: "relative",
                    top: "-8px",
                  }}
                >
                  +
                </h4>
              </button>
            </div>
            <div className="mb-3 d-flex">
              <div className="text-white me-2 user-select-none">Car Type</div>
              {CarTypes.map((carName, index) => (
                <button
                  type="button"
                  className={`btn btn-sm bg-gradient ms-1 px-3 ${
                    carName === carType ? "btn-primary" : "btn-secondary"
                  }`}
                  key={index}
                  onClick={() => setCarType(carName)}
                >
                  {carName}
                </button>
              ))}
            </div>

            <FloatingLabel
              controlId="carNameInput"
              label="Type Car Name for any Specific Type(Optional)"
              className="mb-2"
            >
              <Form.Control
                type="text"
                placeholder="Password"
                value={CarTypes.includes(carType) ? "" : carType}
                onChange={(e) => setCarType(e.target.value)}
                className={`bg-gradient ${
                  (CarTypes.includes(carType) || carType === "") &&
                  "bg-secondary"
                }`}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="emailInput"
              label="Enter Email Id"
              className="mb-2"
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className={`bg-gradient ${!emailId && "bg-secondary"}`}
              />
            </FloatingLabel>

            <FloatingLabel controlId="mobileInput" label="Enter Mobile Number">
              <Form.Control
                type="number"
                placeholder="0000-000-000"
                value={mobileNumber}
                required
                onChange={(e) =>
                  setMobileNumber(
                    e.target.value.toString().length <= 10
                      ? e.target.value
                      : mobileNumber
                  )
                }
                className={`bg-gradient ${!mobileNumber && "bg-secondary"}`}
              />
            </FloatingLabel>
            <div className="text-center small text-muted mb-3">
              (We will send OTP to the mobile number)
            </div>

            <button className="w-100 btn btn-primary" type="submit">
              verify OTP
            </button>
          </Form>
        </div>
      </div>
    </main>
  );
}
