import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAll } from "../store/slices/bookingInfoSlice";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import EditIcon from "@mui/icons-material/Edit";
import Button from "react-bootstrap/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CarTypes = ["Sedan", "SUV", "Van", "Magic"];

export default function BookYourRide() {
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
  const [d, setD] = useState(new Date());
  const dispatch = useDispatch();
  dispatch({ type: "add Name", name: "sitaram" });
  console.log(name);

  const pad = (p) => (p < 10 ? "0" : "") + p;

  // useEffect(() => {
  //   setPickupTime(`${pad(d.getHours())}:${pad(d.getMinutes())}`);
  //   setPickupDate(
  //     `${pad(d.getFullYear())}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
  //   );
  // }, []);

  return (
    <div style={{ backdropFilter: "blur(14px)", padding: "1rem" }}>
      <Form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3 d-flex flex-row">
          <FloatingLabel
            controlId="pickupInput"
            label="Enter Pickup Location"
            className="w-50 d-flex align-items-center me-2 relative"
          >
            <Form.Control
              type="text"
              placeholder="kgp"
              value="{pickup}"
              // onChange={(e) => setPickup(e.target.value)}
              // className={`bg-gradient ${!pickup && "bg-secondary"}`}
              style={{ color: "white", background: "transparent" }}
            />
            <EditIcon
              style={{
                color: "white",
                height: "3.5rem",
                right: 0,
                position: "absolute",
                zIndex: -1,
              }}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="destinationInput"
            label="Enter Destination"
            className="w-50 d-flex align-items-center"
          >
            <Form.Control
              type="text"
              placeholder="kolkata"
              value={destination}
              // onChange={(e) => setDestination(e.target.value)}
              // className={`bg-gradient ${!destination && "bg-secondary"}`}
              style={{ color: "white", background: "transparent" }}
            />
            <EditIcon
              style={{
                color: "white",
                right: 0,
                position: "absolute",
                zIndex: -1,
              }}
            />
          </FloatingLabel>
        </div>
        <div className="mb-3 d-flex flex-row">
          <FloatingLabel
            controlId="pickupTimeInput"
            label="Select Pickup Time"
            className="w-50 d-flex align-items-center me-2"
          >
            <Form.Control
              type="time"
              value={pickupTime}
              // min={`${pad(d.getHours())}:${pad(d.getMinutes())}`}
              // onChange={(e) => setPickupTime(e.target.value)}
              required
              // className={`bg-gradient ${
              //   !pickupTime ? "bg-secondary" : "bg-light"
              // }`}
              style={{ color: "white", background: "transparent" }}
            />
            <EditIcon
              style={{
                color: "white",
                right: 0,
                position: "absolute",
                zIndex: -1,
              }}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="pickupDateInput"
            label="Select pickup Date"
            className="w-50 d-flex align-items-center"
          >
            <Form.Control
              type="date"
              value={pickupDate}
              min={`${pad(d.getFullYear())}-${pad(d.getMonth() + 1)}-${pad(
                d.getDate()
              )}`}
              // onChange={(e) => setPickupDate(e.target.value)}
              required
              // className={`bg-gradient ${
              //   !pickupDate ? "bg-secondary" : "bg-light"
              // }`}
              style={{ color: "white", background: "transparent" }}
            />
            <EditIcon
              style={{
                color: "white",
                right: 0,
                position: "absolute",
                zIndex: -1,
              }}
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
            // onClick={() =>
            //   setNoofPersons(noofPersons > 1 ? noofPersons - 1 : 1)
            // }
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
            // onClick={() =>
            //   setNoofPersons(noofPersons <= 50 ? noofPersons + 1 : 50)
            // }
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
              // onClick={() => setCarType(carName)}
            >
              {carName}
            </Button>
          ))}
        </div>

        <FloatingLabel
          controlId="carNameInput"
          label="Type Car Name for any Specific Type(Optional)"
          className="mb-2 d-flex align-items-center"
        >
          <Form.Control
            type="text"
            placeholder="carType"
            value={CarTypes.includes(carType) ? "" : carType}
            // onChange={(e) => setCarType(e.target.value)}
            // className={`bg-gradient ${
            //   (CarTypes.includes(carType) || carType === "") && "bg-secondary"
            // }`}
            style={{ color: "white", background: "transparent" }}
          />
          <EditIcon
            style={{
              color: "white",
              right: 0,
              position: "absolute",
              zIndex: -1,
            }}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="emailInput"
          label="Enter Email Id"
          className="mb-2 d-flex align-items-center"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={emailId}
            // onChange={(e) => setEmailId(e.target.value)}
            // className={`bg-gradient ${!emailId && "bg-secondary"}`}
            style={{ color: "white", background: "transparent" }}
          />
          <EditIcon
            style={{
              color: "white",
              right: 0,
              position: "absolute",
              zIndex: -1,
            }}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="mobileInput"
          label="Enter Mobile Number"
          className="d-flex align-items-center"
        >
          <Form.Control
            type="number"
            placeholder="0000-000-000"
            value={mobileNumber}
            required
            // onChange={(e) =>
            //   setMobileNumber(
            //     e.target.value.toString().length <= 10
            //       ? e.target.value
            //       : mobileNumber
            //   )
            // }
            // className={`bg-gradient ${!mobileNumber && "bg-secondary"}`}
            style={{ color: "white", background: "transparent" }}
          />
          <EditIcon
            style={{
              color: "white",
              right: 0,
              position: "absolute",
              zIndex: -1,
            }}
          />
        </FloatingLabel>
        <div className="text-center small text-muted mb-3">
          (We will send OTP to the mobile number)
        </div>

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          // onClick={handleClickOpen}
        >
          verify OTP
        </Button>
      </Form>
    </div>
  );
}
