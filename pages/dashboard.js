import Image from "next/image";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../firebaseConfig";

const bookingsRef = collection(db, "bookings");

export default function Home() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(bookingsRef, (snapshot) => {
      const b = [];
      snapshot.forEach((doc) => {
        b.push({ key: doc.id, ...doc.data() });
      });
      b.sort((a, b) => b.bookingNumber - a.bookingNumber);
      setBookings(b);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Image
        src="/car-gray-2.jpg"
        layout="fill"
        objectFit="cover"
        style={{ filter: "blur(2px)" }}
        alt="background-image"
      />
      <NavBar />
      <div
        className="d-flex align-items-center justify-content-center flex-column"
        style={{ zIndex: 1 }}
      >
        <div
          style={{
            backdropFilter: "blur(14px)",
            padding: "1rem",
            maxWidth: "100vw",
            overflowX: "auto",
          }}
        >
          <div style={{ color: "white" }}>
            Total Bookings: {bookings.length + 1}
          </div>
          <table>
            <thead>
              <tr>
                <th>
                  Booking
                  <br />
                  Number
                </th>
                <th>Name</th>
                <th>Email Id</th>
                <th>Mobile No</th>
                <th>Pickup</th>
                <th>Destination</th>
                <th>
                  No of
                  <br />
                  Person
                </th>
                <th>Car Type</th>
                <th>
                  Pickup Date
                  <br />
                  and Time
                </th>
                <th>Distance</th>
                <th>
                  Total
                  <br />
                  Fare
                </th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(
                ({
                  key,
                  bookingNumber,
                  carType,
                  destination,
                  emailId,
                  mobileNumber,
                  name,
                  noofPerson,
                  pickup,
                  pickupDate,
                  pickupTime,
                }) => (
                  <tr key={key} className="newItem">
                    <td>{bookingNumber}</td>
                    <td>{name}</td>
                    <td>{emailId}</td>
                    <td>{mobileNumber}</td>
                    <td>{pickup}</td>
                    <td>{destination}</td>
                    <td>{noofPerson}</td>
                    <td>{carType}</td>
                    <td>
                      {pickupTime}
                      {" | "}
                      {pickupDate}
                    </td>
                    <td>5 km</td>
                    <td>500 ₹</td>
                    <td>
                      <div style={{ cursor: "pointer" }}>🗑️</div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <button
            onClick={() =>
              setBookings([
                {
                  key: bookings.length + 1,
                  bookingNumber: bookings.length + 1,
                  carType: "0",
                  destination: "0",
                  emailId: "0@gmail.com",
                  mobileNumber: 1,
                  name: "00",
                  noofPerson: 1,
                  pickup: "0",
                  pickupDate: "2022-10-08",
                  pickupTime: "15:20",
                },
                ...bookings,
              ])
            }
          >
            Add
          </button>
        </div>
      </div>
    </main>
  );
}
