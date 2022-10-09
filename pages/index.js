import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  selectValue,
} from "../store/slices/counterSlice";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import NavBar from "../components/NavBar";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import db from "../firebaseConfig";
import IconButton from "@mui/material/IconButton";

const bookingsRef = collection(db, "bookings");

const CarTypes = ["Sedan", "SUV", "Van", "Magic"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Home() {
  const [name, setName] = useState("Guest User");
  const [pickup, setPickup] = useState("Kharagpur, India");
  const [destination, setDestination] = useState("Kolkata, India");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [noofPersons, setNoofPersons] = useState(1);
  const [carType, setCarType] = useState("Sedan");
  const [emailId, setEmailId] = useState("g@gmail.com");
  const [mobileNumber, setMobileNumber] = useState("1234567891");
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [register, setRegister] = useState(false);

  const [d, setD] = useState(new Date());

  const [modalShow, setModalShow] = useState(false);
  const [loginModalShow, setLoginModalShow] = useState(true);

  const addBooking = async () => {
    const bookingNumber = 1;
    if (
      carType &&
      destination &&
      emailId &&
      mobileNumber &&
      name &&
      noofPersons &&
      pickup &&
      pickupDate &&
      pickupTime
    ) {
      const querySnapshot = await getDocs(bookingsRef);
      bookingNumber =
        Math.max(...querySnapshot.docs.map((doc) => doc.data().bookingNumber)) +
        1;

      await setDoc(doc(bookingsRef), {
        bookingNumber,
        carType,
        destination,
        emailId,
        mobileNumber,
        name,
        noofPerson: noofPersons,
        pickup,
        pickupDate,
        pickupTime,
        servedBy: "ABCD",
      }).then(() => setModalShow(false));
    } else {
      alert(
        `${
          !carType
            ? "Car Type"
            : !destination
            ? "Destination"
            : !emailId
            ? "Email Id"
            : !mobileNumber
            ? "Mobile Number"
            : !name
            ? "Name"
            : !noofPersons
            ? "No of Persons"
            : !pickup
            ? "Pickup"
            : !pickupDate
            ? "pickupDate"
            : !pickupTime
            ? "pickupTime"
            : "all"
        } field is empty`
      );
    }
  };

  const handleClickOpen = () => {
    setModalShow(true);
  };

  const handleLoginOpen = () => {
    setLoginModalShow(true);
  };

  const handleClose = () => {
    setModalShow(false);
    setLoginModalShow(false);
  };

  const count = useSelector(selectValue);
  const dispatch = useDispatch();

  const pad = (p) => (p < 10 ? "0" : "") + p;

  useEffect(() => {
    setPickupTime(`${pad(d.getHours())}:${pad(d.getMinutes())}`);
    setPickupDate(
      `${pad(d.getFullYear())}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
    );
  }, [d]);

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Dialog
        open={modalShow}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {otpVerified ? "OTP Verified" : "verifying OTP"}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Form
            className="card p-2 text-center"
            onSubmit={(e) => {
              e.preventDefault();
              setOtpVerified(true);
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
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Edit Booking
          </Button>
          <Button onClick={() => addBooking()}>Confirm Booking</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={loginModalShow} onClose={handleClose}>
        <DialogTitle>{register ? "Register" : "Login"}</DialogTitle>
        <DialogContent>
          <div className="d-flex flex-column align-items-center">
            <div className="d-flex mb-1 justify-content-between w-100">
              <Button
                variant={`${!register ? "outline-primary" : "primary"}`}
                onClick={() => setRegister(false)}
                disabled={!register}
              >
                Login
              </Button>
              <Button
                variant={`${register ? "outline-primary" : "primary"}`}
                onClick={() => setRegister(true)}
                disabled={register}
              >
                Register
              </Button>
            </div>
            <hr className="style1 w-100" />
            {!register && (
              <TextField
                margin="dense"
                id="name"
                label="Name"
                type="text"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <TextField
              margin="dense"
              id="mobile"
              label="Mobile Number"
              variant="outlined"
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
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              variant="outlined"
              type="email"
              placeholder="name@example.com"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              variant="outlined"
            />
          </div>
        </DialogContent>
        <DialogActions>
          {!register ? (
            <Button className="w-100" onClick={handleClose}>
              Login
            </Button>
          ) : (
            <Button className="w-100" onClick={handleClose}>
              Register
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Image
        src="/car-gray-2.jpg"
        layout="fill"
        objectFit="cover"
        style={{ filter: "blur(2px)" }}
        alt="background-image"
      />
      <NavBar handleLoginOpen={() => handleLoginOpen()} />
      <div
        className="d-flex align-items-center justify-content-center flex-column"
        style={{ zIndex: 1 }}
      >
        <div style={{ backdropFilter: "blur(14px)", padding: "1rem" }}>
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

            <div className="mb-3 d-flex align-items-center justify-content-center">
              <div className="text-white me-2 user-select-none">
                Select number of persons
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="bg-gradient d-flex align-items-center justify-content-center"
                onClick={() =>
                  setNoofPersons(noofPersons > 1 ? noofPersons - 1 : 1)
                }
              >
                <RemoveIcon style={{ fontSize: "20px" }} />
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="bg-gradient px-4 mx-1"
              >
                {noofPersons}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="bg-gradient d-flex align-items-center justify-content-center"
                onClick={() =>
                  setNoofPersons(noofPersons <= 50 ? noofPersons + 1 : 50)
                }
              >
                <AddIcon style={{ fontSize: "20px" }} />
              </Button>
            </div>
            <div className="mb-3 d-flex align-items-center justify-content-center">
              <div className="text-white me-2 user-select-none">Car Type</div>
              {CarTypes.map((carName, index) => (
                <Button
                  type="button"
                  variant={carName === carType ? "primary" : "secondary"}
                  size="sm"
                  className="bg-gradient ms-1 px-3"
                  key={index}
                  onClick={() => setCarType(carName)}
                >
                  {carName}
                </Button>
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

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              onClick={handleClickOpen}
            >
              verify OTP
            </Button>
          </Form>
        </div>
      </div>
    </main>
  );
}
