import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  selectValue,
} from "../store/slices/counterSlice";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const count = useSelector(selectValue);
  const dispatch = useDispatch();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center flex-column">
      <Head>
        <title>Carbuk</title>
      </Head>
      <Image
        src="/car-gray-2.jpg"
        layout="fill"
        style={{ filter: "blur(2px)" }}
      />
      <div style={{ zIndex: 1, backdropFilter: "blur(14px)", padding: "1rem" }}>
        <div className="mb-3 d-flex flex-row">
          <Image src="/carbuk_logo.png" layout="fixed" width={70} height={40} />
          <h1 className="text-white">Welcome to Carbuk</h1>
        </div>
        <form>
          <div className="mb-3 d-flex flex-row">
            <div className="form-floating w-50">
              <select className="form-select" id="floatingSelectGrid">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <label for="floatingSelectGrid">Select Pickup Location</label>
            </div>
            <div className="form-floating w-50">
              <select className="form-select" id="floatingSelectGrid">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <label for="floatingSelectGrid">Select Dropoff Location</label>
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
              <label for="floatingInput">Select Pickup Time</label>
            </div>
            <div className="form-floating w-50">
              <input
                type="date"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value="2022-09-08"
              />
              <label for="floatingInput">Select Pickup Date</label>
            </div>
          </div>
          <div className="mb-3">
            <label
              for="exampleInputPassword1"
              className="form-label text-white"
            >
              Select number of persons
            </label>
            <button
              type="button"
              className="btn btn-secondary btn-sm ms-4 px-4"
            >
              -
            </button>
            <button type="button" className="btn btn-primary btn-sm px-4 mx-1">
              1
            </button>
            <button type="button" className="btn btn-secondary btn-sm px-4">
              +
            </button>
          </div>
          <div className="mb-3">
            <label
              for="exampleInputPassword1"
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
            <button type="button" className="btn btn-primary btn-sm px-4 mx-1">
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
            <label for="floatingInput">
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
            <label for="floatingInput">Your email id is:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Mobile number</label>
            <div class="text-center small text-muted">
              (We will send OTP to the mobile number)
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
