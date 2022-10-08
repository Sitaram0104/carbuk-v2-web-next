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

export default function Home() {
  const [modalShow, setModalShow] = useState(false);
  const count = useSelector(selectValue);
  const dispatch = useDispatch();

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
            />
            <h1 className="text-white">Welcome to Carbuk</h1>
          </div>
          <form>
            <div className="mb-3 d-flex flex-row">
              <div className="form-floating mb-3 w-50">
                <input
                  type="search"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Enter Pickup Location</label>
              </div>
              <div className="form-floating mb-3 w-50">
                <input
                  type="search"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Enter Destination</label>
              </div>
            </div>
            <div className="mb-3 d-flex flex-row">
              <div className="form-floating w-50">
                <input
                  type="time"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value="13:21"
                />
                <label htmlFor="floatingInput">Select Pickup Time</label>
              </div>
              <div className="form-floating w-50">
                <input
                  type="date"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value="2022-09-08"
                />
                <label htmlFor="floatingInput">Select Pickup Date</label>
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
              >
                -
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm px-4 mx-1"
              >
                1
              </button>
              <button type="button" className="btn btn-secondary btn-sm px-3">
                +
              </button>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleInputPassword1"
                className="form-label text-white"
              >
                Car Type
              </label>
              <button
                type="button"
                className="btn btn-secondary btn-sm ms-2 px-4"
              >
                Sedan
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm px-4 mx-1"
              >
                SUV
              </button>
              <button type="button" className="btn btn-secondary btn-sm px-4">
                Van
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm px-4  mx-1"
              >
                Magic
              </button>
            </div>
            <div className="form-floating mb-3">
              <input
                type="search"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">
                Type Car Name for any Specific Type
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Your email id is:</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Mobile number</label>
              <div className="text-center small text-muted">
                (We will send OTP to the mobile number)
              </div>
            </div>
            <Button
              className="w-100"
              variant="primary"
              onClick={() => setModalShow(true)}
            >
              verify OTP
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}

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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
