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
import { useState } from "react";

const CarTypes = ["Sedan", "SUV", "Van", "Magic"];

export default function Home() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [noofPersons, setNoofPersons] = useState(1);
  const [carType, setCarType] = useState("Sedan");
  const [emailId, setEmailId] = useState("");
  const [mobileNumber, setMobileNumber] = useState(null);

  const [modalShow, setModalShow] = useState(false);
  const count = useSelector(selectValue);
  const dispatch = useDispatch();

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            verifying OTP
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <Image src="/loading-loading-forever.gif" width={50} height={50} />
            <Image src="/green-checkmark.png" width={50} height={50} />
            <div className="d-flex flex-row align-items-center justify-content-center lh-sm">
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
                {pickupTime}
                {pickupDate}
              </p>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="fw-bold fst-italic m-0">number of Persons: </p>
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Edit Booking</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center flex-column">
      <main>
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
        <div
          style={{ zIndex: 1, backdropFilter: "blur(14px)", padding: "1rem" }}
        >
          <div className="mb-3 d-flex flex-row">
            <Image
              src="/carbuk_logo.png"
              layout="fixed"
              width={70}
              height={40}
              alt="logo"
              style={{ background: "black" }}
            />
            <h1 className="text-white">Welcome to Carbuk</h1>
          </div>
          <form>
            <div className="mb-3 d-flex flex-row">
              <div className="form-floating mb-3 w-50">
                <input
                  type="text"
                  className={`form-control ${!pickup && "bg-secondary"}`}
                  id="pickupInput"
                  placeholder="Kharagpur"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
                <label htmlFor="pickupInput">Enter Pickup Location</label>
              </div>
              <div className="form-floating mb-3 w-50">
                <input
                  type="text"
                  className={`form-control ${!destination && "bg-secondary"}`}
                  id="destinationInput"
                  placeholder="Kolkata"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
                <label htmlFor="destinationInput">Enter Destination</label>
              </div>
            </div>
            <div className="mb-3 d-flex flex-row">
              <div className="form-floating w-50">
                <input
                  type="time"
                  className={`form-control ${!pickupTime && "bg-secondary"}`}
                  id="pickupTimeInput"
                  placeholder="13:21"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                />
                <label htmlFor="pickupTimeInput">Select Pickup Time</label>
              </div>
              <div className="form-floating w-50">
                <input
                  type="date"
                  className={`form-control ${!pickupDate && "bg-secondary"}`}
                  id="pickupDateInput"
                  placeholder="2022-01-01"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
                <label htmlFor="pickupDateInput">Select Pickup Date</label>
              </div>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label text-white"
              >
                Select number of persons
              </label>
              <button
                type="button"
                className="btn btn-secondary btn-sm ms-4 px-3"
                onClick={() => setNoofPersons(noofPersons - 1)}
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm px-4 mx-1"
              >
                {noofPersons}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm px-3"
                onClick={() => setNoofPersons(noofPersons + 1)}
              >
                +
              </button>
            </div>
            <div className="mb-3">
              <label htmlFor="carType" className="form-label text-white me-2">
                Car Type
              </label>
              {CarTypes.map((carName, index) => (
                <button
                  type="button"
                  className={`btn btn-sm ms-1 px-3 ${
                    carName === carType ? "btn-primary" : "btn-secondary"
                  }`}
                  key={index}
                  onClick={() => setCarType(carName)}
                >
                  {carName}
                </button>
              ))}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${
                  (CarTypes.includes(carType) || carType === "") &&
                  "bg-secondary"
                }`}
                id="carNameInput"
                placeholder="carName"
                value={CarTypes.includes(carType) ? "" : carType}
                onChange={(e) => setCarType(e.target.value)}
              />
              <label htmlFor="carNameInput">
                Type Car Name for any Specific Type
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${!emailId && "bg-secondary"}`}
                id="emailInput"
                placeholder="name@example.com"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
              <label htmlFor="emailInput">Your email id is:</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className={`form-control ${!mobileNumber && "bg-secondary"}`}
                id="mobileInput"
                placeholder="0000-000-000"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              <label htmlFor="mobileInput">Mobile number</label>
              <div className="text-center small text-muted">
                (We will send OTP to the mobile number)
              </div>
            </div>
            <Button
              type="submit"
              className="w-100"
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                setModalShow(true);
              }}
            >
              verify OTP
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
